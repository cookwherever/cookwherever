package main

import (
	"os"

	"github.com/cookwherever/cookwherever/gocook/pkg/source"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"
)

func main() {
	zerolog.SetGlobalLevel(zerolog.DebugLevel)
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	app := &cli.App{
		Name:  "gocook",
		Usage: "Play with your food!",
		Commands: []*cli.Command{
			{
				Name:  "parse",
				Usage: "Parse data from a source.",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:  "script",
						Usage: "The FQL script to run on the source.",
					},
					&cli.StringFlag{
						Name:  "source-file",
						Usage: "A single file from a source to process.",
					},
				},
				Action: source.ParseCommand,
			},
			{
				Name:   "process",
				Usage:  "Process parsed data from a source.",
				Action: source.ProcessCommand,
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal().Err(err)
	}
}
