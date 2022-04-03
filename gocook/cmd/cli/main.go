package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/MontFerret/ferret/pkg/compiler"
	"github.com/MontFerret/ferret/pkg/drivers"
	"github.com/MontFerret/ferret/pkg/drivers/http"
	"github.com/MontFerret/ferret/pkg/runtime"
	"github.com/MontFerret/ferret/pkg/runtime/core"
	"github.com/MontFerret/ferret/pkg/runtime/values"
	"gocook/util"
	"os"
	"path"
	"path/filepath"
	"strings"
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

func getRecipeFromPage(file string) (*ProcessedRecipe, error) {

	query := `
LET doc = PARSE(IO::FS::READ(@file))

LET _ = ELEMENT_EXISTS(doc, '.crlg') ? INNER_TEXT_SET(doc, '.crlg', '') : ''

LET name = ELEMENT_EXISTS(doc, '.chap_hd') ? INNER_TEXT(doc, '.chap_hd') : ''

LET ingredients = LISTTOMAP(doc, '.ing-ts', '.ing-list')

LET directions = (
	FOR row IN ELEMENTS(doc, '.noindent_para_ts')
		RETURN INNER_TEXT(row)
)

RETURN {
  name,
  source: 'The Wok: Recipes and Techniques by J. Kenji López-Alt',
  recipe_ingredient_groups: ingredients,
  recipe_directions: directions
}`

	comp := compiler.New()

	if err := comp.RegisterFunction("listtomap", listToMap); err != nil {
		return nil, err
	}

	program, err := comp.Compile(query)

	if err != nil {
		return nil, err
	}

	ctx := context.Background()

	ctx = drivers.WithContext(ctx, http.NewDriver(), drivers.AsDefault())

	out, err := program.Run(ctx, runtime.WithParam("file", file))

	if err != nil {
		return nil, err
	}

	var res ProcessedRecipe

	err = json.Unmarshal(out, &res)

	if err != nil {
		return nil, err
	}

	res.Name = strings.Title(res.Name)

	return &res, nil
}

func main() {
	if len(os.Args) != 2 {
		println("usage: <path>")
		return
	}
	folder := os.Args[1]

	files, err := util.WalkMatch(folder, "*.html")
	if err != nil {
		panic(err)
	}

	for _, file := range files {
		recipe, err := getRecipeFromPage(file)
		if err != nil {
			panic(err)
		}

		if recipe.Name == "" {
			continue
		}

		out, err := json.MarshalIndent(recipe, "", "  ")
		if err != nil {
			panic(err)
		}

		filename := filepath.Base(file)
		name := strings.TrimSuffix(filename, filepath.Ext(filename))

		err = os.WriteFile(path.Join("out", name+".json"), out, 0644)
		if err != nil {
			panic(err)
		}
	}
}
