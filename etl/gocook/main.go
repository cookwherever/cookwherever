package main

import (
	"context"
	"encoding/json"
	"github.com/MontFerret/ferret/pkg/compiler"
	"github.com/MontFerret/ferret/pkg/drivers"
	"github.com/MontFerret/ferret/pkg/drivers/http"
	"github.com/MontFerret/ferret/pkg/runtime"
	"github.com/MontFerret/ferret/pkg/runtime/core"
	"github.com/MontFerret/ferret/pkg/runtime/values"
	"github.com/MontFerret/ferret/pkg/runtime/values/types"
	"gocook/util"
	"os"
	"path"
	"path/filepath"
	"strings"
)

type Ingredient struct {
	Name string            `json:"name"`
	Type map[string]string `json:"type"`
}

type Recipe struct {
	Title       string       `json:"title"`
	Ingredients []Ingredient `json:"ingredients"`
	Directions  []string     `json:"directions"`
}

func listToMap(ctx context.Context, args ...core.Value) (core.Value, error) {
	// it's just a helper function which helps to validate a number of passed args
	err := core.ValidateArgs(args, 1, 1)

	if err != nil {
		// it's recommended to return built-in None type, instead of nil
		return values.None, err
	}

	// this is another helper functions allowing to do type validation
	err = core.ValidateType(args[0], types.Array)

	if err != nil {
		return values.None, err
	}

	// cast to built-in string type
	str := args[0].(values.String)

	return values.NewString(strings.ToUpper(str.String() + "_ferret")), nil
}

func getRecipeFromPage(file string) (*Recipe, error) {

	query := `
LET doc = PARSE(IO::FS::READ(@file))

LET title = ELEMENT_EXISTS(doc, '.chap_hd') ? INNER_TEXT(doc, '.chap_hd') : ''

LET ingredients = (
	FOR row IN ELEMENTS(doc, '.ing-ts,.ing-list')
		RETURN {
			name: INNER_TEXT(row),
			type: ATTR_GET(row, 'class')
		}
)

LET directions = (
	FOR row IN ELEMENTS(doc, '.noindent_para_ts')
		RETURN ELEMENT_EXISTS(row, '.tc') ? INNER_TEXT(row, '.tc') : ''
)

RETURN {
  title,
  ingredients,
  directions
}`

	comp := compiler.New()

	program, err := comp.Compile(query)

	if err != nil {
		return nil, err
	}

	// create a root context
	ctx := context.Background()

	ctx = drivers.WithContext(ctx, http.NewDriver(), drivers.AsDefault())

	out, err := program.Run(ctx, runtime.WithParam("file", file))

	if err != nil {
		return nil, err
	}

	var res Recipe

	err = json.Unmarshal(out, &res)

	if err != nil {
		return nil, err
	}

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

		if recipe.Title == "" {
			continue
		}

		out, err := json.MarshalIndent(recipe, "", "  ")
		if err != nil {
			panic(err)
		}

		err = os.WriteFile(path.Join("out", filepath.Base(file)), out, 0644)
		if err != nil {
			panic(err)
		}
	}
}

/*
   return {
       "name": name,
       "source": source,
       "image": image,
       "recipe_directions": instructions,
       "recipe_ingredient_groups": recipe_ingredient_groups,
       "recipe_tags": tags,
       "extraction_metadata": extraction_metadata
   }

*/
