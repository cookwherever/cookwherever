package source

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"strings"

	"github.com/cookwherever/cookwherever/gocook/pkg/types"
	"github.com/cookwherever/cookwherever/gocook/pkg/util"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
)

var (
	sourceProcessorLookup = map[string]types.SourceProcessor{
		"cooksthesaurus": NewCooksThesaurus(),
	}
)

func init() {
	for _, processor := range sourceProcessorLookup {
		os.MkdirAll(processor.ParsedDir(), 0755)
		os.MkdirAll(processor.ProcessedDir(), 0755)
	}
}

func ProcessCommand(ctx *cli.Context) error {
	processor := sourceProcessorLookup["cooksthesaurus"]
	processor.Process()
	return nil
}

func ParseCommand(ctx *cli.Context) error {
	sourceName := ctx.Args().First()
	if sourceName == "" {
		log.Error().
			Msg("must provide at least one source name as an argument")
		return errors.New("must provide at least one source name as an argument")
	}

	sourceProcessor, ok := sourceProcessorLookup[sourceName]
	if !ok {
		log.Error().
			Str("sourceName", sourceName).
			Msg("unable to find source processor with name")
		return fmt.Errorf("unable to find source processor with name: %s", sourceName)
	}

	fqlScript := ctx.String("script")
	if fqlScript == "" {
		log.Error().
			Str("script", fqlScript).
			Msg("must provide path to an FQL script to execute")
		return errors.New("must provide path to an FQL script to execute")
	}

	script, err := ioutil.ReadFile(fqlScript)
	if err != nil {
		log.Error().
			Err(err).
			Str("script", fqlScript).
			Msg("unable to read FQL script")
		return err
	}

	sourceFile := ctx.String("source-file")

	sourceFilePath := path.Join(sourceProcessor.SourceDir(), sourceFile)
	files := []string{sourceFilePath}

	if sourceFile == "" {
		files, err = util.WalkMatch(sourceProcessor.SourceDir(), "*.html")
		if err != nil {
			log.Error().Err(err).Msg("unable to walk source")
			return err
		}
	}

	log.Info().
		Str("source", sourceName).
		Msg("parsing files for source")

	for _, file := range files {
		log.Info().
			Str("file", file).
			Msg("parsing source file")
		res, err := sourceProcessor.Parse(string(script), file)
		if err != nil {
			log.Error().
				Err(err).
				Str("file", file).
				Msg("encoutered error while parsing source file")
			return err
		}

		serialized, err := json.MarshalIndent(res, "", "  ")
		if err != nil {
			log.Error().
				Err(err).
				Str("file", file).
				Msg("unable to serialized parsed source file")
			return err
		}

		parsedFileName := path.Base(file)
		fileExt := path.Ext(parsedFileName)
		fileNameBase := strings.TrimSuffix(parsedFileName, fileExt)

		parsedFilePath := path.Join(sourceProcessor.ParsedDir(), fileNameBase+".json")
		err = ioutil.WriteFile(parsedFilePath, serialized, 0755)
		if err != nil {
			log.Error().
				Err(err).
				Str("file", file).
				Msg("unable to write parsed source file")
			return err
		}
	}
	return nil
}
