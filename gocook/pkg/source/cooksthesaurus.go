package source

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"path"
	"text/template"

	"github.com/cookwherever/cookwherever/gocook/pkg/constants"
	"github.com/cookwherever/cookwherever/gocook/pkg/types"
	"github.com/cookwherever/cookwherever/gocook/pkg/util"
	"github.com/gosimple/slug"
	"github.com/rs/zerolog/log"
	"gopkg.in/yaml.v2"
)

type CooksThesaurusProcessor struct{}

func NewCooksThesaurus() types.SourceProcessor {
	return &CooksThesaurusProcessor{}
}

func (s *CooksThesaurusProcessor) SourceDir() string {
	return constants.CooksThesaurusSourceDir
}

func (s *CooksThesaurusProcessor) ParsedDir() string {
	return constants.CooksThesaurusParsedDir
}

func (s *CooksThesaurusProcessor) ProcessedDir() string {
	return constants.CooksThesaurusProcessedDir
}

func (s *CooksThesaurusProcessor) Parse(script, file string) (res interface{}, err error) {
	var ingredients types.CooksThesaurus

	out, err := ParseSourceAsHtml(script, file)
	if err != nil {
		log.Error().Err(err).Msg("unable to parse cooks thesaurus")
		return
	}

	err = json.Unmarshal(out, &ingredients)
	if err != nil {
		log.Error().Err(err).Msg("unable to parse script output")
		return
	}

	res = ingredients
	return
}

type IngredientLeaf struct {
	Name             string
	Description      string
	Ingredients      []IngredientLeaf
	ChildIngredients IngredientTree
}

type IngredientTree map[string]IngredientTree

type IngredientPageHeader struct {
	Title string   `yaml:"title"`
	Tags  []string `yaml:"tags"`
}

type IngredientPage struct {
	Header  string
	Content string
	Names   string
}

func createIngredientMarkdown(ingredient types.Ingredient) (page []byte, err error) {
	out, err := yaml.Marshal(IngredientPageHeader{
		Title: util.CleanText(ingredient.Name),
		Tags: []string{
			"ingredient",
		},
	})
	if err != nil {
		log.Error().Err(err).Msg("unable to marshal ingredient")
		return
	}

	tmpl, err := template.New("ingredient-page").Parse(
		`---
{{.Header}}
---
{{.Content}}
`)
	if err != nil {
		log.Error().Err(err).Msg("unable to parse template")
		return
	}

	var buf bytes.Buffer
	err = tmpl.Execute(&buf, IngredientPage{
		Header:  string(out),
		Content: ingredient.Text,
	})
	if err != nil {
		log.Error().Err(err).Msg("unable to execute template")
		return
	}
	page = buf.Bytes()
	return
}

func (s *CooksThesaurusProcessor) Process() (err error) {
	files, err := util.WalkMatch(s.ParsedDir(), "*.json")
	if err != nil {
		return err
	}

	ingredientLookup := map[string][]types.Ingredient{}
	ingredientTreeLookup := map[string]IngredientTree{}
	for _, file := range files {
		var (
			contents   []byte
			ingredient types.CooksThesaurus
		)
		contents, err = ioutil.ReadFile(file)
		if err != nil {
			return err
		}

		err = json.Unmarshal(contents, &ingredient)
		if err != nil {
			log.Error().Err(err).Msg("unable to loaded parsed script output")
			return
		}

		ingredientFileName := path.Base(file)
		ingredientLookup[ingredientFileName] = ingredient.Ingredients
		ingredientTreeLookup[ingredientFileName] = IngredientTree{}
	}

	for fileName, ingredients := range ingredientLookup {
		_ = ingredientTreeLookup[fileName]
		for _, ingredient := range ingredients {
			if ingredient.Link {
				continue
			}

			out, err := createIngredientMarkdown(ingredient)
			if err != nil {
				continue
			}

			var name string
			if len(ingredient.Names) == 0 {
				name = ingredient.Name
			} else {
				name = ingredient.Names[0]
			}
			cleanName := util.CleanText(name)

			ingredientSlug := slug.Make(cleanName)

			filePath := path.Join(constants.CooksThesaurusProcessedDir, ingredientSlug+".md")

			err = ioutil.WriteFile(filePath, out, 0755)
			if err != nil {
				log.Error().
					Err(err).
					Msg("unable to write file")
				continue
			}
		}
	}

	return
}
