package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/MontFerret/ferret/pkg/compiler"
	"github.com/MontFerret/ferret/pkg/drivers"
	"github.com/MontFerret/ferret/pkg/drivers/http"
	"github.com/MontFerret/ferret/pkg/runtime"
	"github.com/MontFerret/ferret/pkg/runtime/core"
	"github.com/MontFerret/ferret/pkg/runtime/values"
	"github.com/cookwherever/cookwherever/gocook/pkg/util"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type ProcessedRecipe struct {
	Name               string              `json:"name"`
	Source             string              `json:"source"`
	Image              string              `json:"image"`
	Directions         []string            `json:"recipe_directions"`
	IngredientGroups   map[string][]string `json:"recipe_ingredient_groups"`
	Tags               []string            `json:"recipe_tags"`
	ExtractionMetadata map[string]string   `json:"extraction_metadata"`
}

type Ingredient struct {
	Name string `json:"name"`
	Link bool   `json:"link"`
	Text string `json:"text"`
}

type CooksThesaurus struct {
	Ingredients []Ingredient `json:"ingredients"`
}

func queryArgs(args []core.Value) (el drivers.HTMLDocument, keySelector drivers.QuerySelector, valueSelector drivers.QuerySelector, err error) {
	err = core.ValidateArgs(args, 3, 3)
	if err != nil {
		return
	}

	el, err = drivers.ToDocument(args[0])
	if err != nil {
		return
	}

	keySelector, err = drivers.ToQuerySelector(args[1])
	if err != nil {
		return
	}

	valueSelector, err = drivers.ToQuerySelector(args[2])
	if err != nil {
		return
	}
	return
}

func Print(ctx context.Context, args ...core.Value) (core.Value, error) {
	err := core.ValidateArgs(args, 1, core.MaxArgs)

	if err != nil {
		return values.None, err
	}

	printLog := log.Info()

	for idx, input := range args {
		printLog.Interface(fmt.Sprintf("%d", idx), input)
	}

	printLog.Msg("log")

	return values.None, nil
}

func listToMap(ctx context.Context, args ...core.Value) (core.Value, error) {
	el, keySelector, valueSelector, err := queryArgs(args)
	if err != nil {
		println("cannot get query args", err)
		return values.None, err
	}

	querySelector, err := drivers.ToQuerySelector(
		values.NewString(fmt.Sprintf("%s,%s", keySelector, valueSelector)),
	)
	if err != nil {
		println("cannot create query selector", err)
		return values.None, err
	}

	val, err := el.QuerySelectorAll(ctx, querySelector)
	if err != nil {
		println("cannot get elements")
		return values.None, err
	}

	elementMap := map[string][]string{}
	var currentGroup string

	val.ForEach(func(value core.Value, idx int) bool {
		e, err := drivers.ToElement(value)
		if err != nil {
			println(err)
			return false
		}

		classValue, err := e.GetAttribute(ctx, "class")
		if err != nil {
			println(err)
			return false
		}

		text, err := e.GetInnerText(ctx)
		if err != nil {
			println(err)
			return false
		}

		if strings.Contains(keySelector.String(), classValue.String()) {
			currentGroup = text.String()
			elementMap[currentGroup] = []string{}
		}

		if strings.Contains(valueSelector.String(), classValue.String()) {
			list := elementMap[currentGroup]
			elementMap[currentGroup] = append(list, text.String())
		}
		return true
	})

	mapValues := values.NewObject()
	for k, v := range elementMap {
		var strVals []core.Value
		for _, s := range v {
			strVals = append(strVals, values.NewString(s))
		}
		mapValues.Set(values.NewString(k), values.NewArrayOf(strVals))
	}

	return mapValues, err
}

func getRecipeFromPage(script, file string) (*CooksThesaurus, error) {
	comp := compiler.New()

	if err := comp.RegisterFunction("listtomap", listToMap); err != nil {
		return nil, err
	}

	if err := comp.RegisterFunction("debug", Print); err != nil {
		return nil, err
	}

	program, err := comp.Compile(script)

	if err != nil {
		return nil, err
	}

	ctx := context.Background()

	ctx = drivers.WithContext(ctx, http.NewDriver(), drivers.AsDefault())

	out, err := program.Run(ctx, runtime.WithParam("file", file))

	if err != nil {
		return nil, err
	}

	//var res ProcessedRecipe
	var res CooksThesaurus

	err = json.Unmarshal(out, &res)
	if err != nil {
		return nil, err
	}

	// res.Name = strings.Title(res.Name)

	return &res, nil
}

func processFile(script, file string) {
	println("parsing", file)
	recipe, err := getRecipeFromPage(script, file)
	if err != nil {
		panic(err)
	}

	// if recipe.Name == "" {
	// 	continue
	// }

	out, err := json.MarshalIndent(recipe, "", "  ")
	if err != nil {
		panic(err)
	}

	filename := filepath.Base(file)
	name := strings.TrimSuffix(filename, filepath.Ext(filename))

	err = os.WriteFile(path.Join("cooksthesaurus", name+".json"), out, 0644)
	if err != nil {
		panic(err)
	}
}

func main() {
	zerolog.SetGlobalLevel(zerolog.DebugLevel)
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	// if len(os.Args) != 3 {
	// 	println("usage: <script> <path>")
	// 	return
	// }
	scriptFile := os.Args[1]
	folder := os.Args[2]

	script, err := ioutil.ReadFile(scriptFile)
	if err != nil {
		panic(err)
	}

	if len(os.Args) == 4 {
		page := os.Args[3]
		processFile(string(script), page)
		return
	}

	files, err := util.WalkMatch(folder, "*.html")
	if err != nil {
		panic(err)
	}

	for _, file := range files {
		processFile(string(script), file)
	}
}
