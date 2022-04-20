package source

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"path"
	"strings"
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

type IngredientPageHeader struct {
	Title string   `yaml:"title"`
	Tags  []string `yaml:"tags"`
}

type Link struct {
	Name string
	To   string
}

type IngredientPage struct {
	Header  string
	Content string
	Names   string
	Links   []Link
}

func createIngredientMarkdown(ingredient types.Ingredient, links []Link) (page []byte, err error) {
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

### Links
{{ range .Links }}
{{ if .Name }}* {{ .Name }} - [[{{ .To }}]]{{ else }}* [[{{ .To }}]]{{ end }}{{ end }}
`)
	if err != nil {
		log.Error().Err(err).Msg("unable to parse template")
		return
	}

	var buf bytes.Buffer
	err = tmpl.Execute(&buf, IngredientPage{
		Header:  string(out),
		Content: ingredient.Text,
		Links:   links,
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

		var ingredientLinks []Link
		var mainIngredient types.Ingredient
		var ingredientsToProcess []types.Ingredient

		for _, i := range ingredient.Ingredients {
			if i.MainPage || strings.EqualFold(i.Name, ingredient.Name) {
				mainIngredient = i
				mainIngredient.Name = strings.ToLower(mainIngredient.Name)
				continue
			}

			if i.Link {
				ingredientLinks = append(ingredientLinks, Link{
					Name: strings.ToLower(i.Name),
					To:   slug.Make(strings.ReplaceAll(strings.ToLower(i.Text), "#", "")),
				})
				continue
			} else {
				ingredientLinks = append(ingredientLinks, Link{
					Name: "",
					To:   slug.Make(strings.ToLower(i.Name)),
				})
			}

			if i.Text == i.Name {
				continue
			}

			ingredientsToProcess = append(ingredientsToProcess, i)
		}

		if mainIngredient.Name == "" {
			mainIngredient = types.Ingredient{
				Name: strings.ToLower(ingredient.Name),
			}
		}

		for _, i := range ingredientsToProcess {
			processIngredient(i, []Link{
				{
					To: slug.Make(mainIngredient.Name),
				},
			})
		}
		processIngredient(mainIngredient, ingredientLinks)
	}

	return
}

func processIngredient(ingredient types.Ingredient, links []Link) {
	out, err := createIngredientMarkdown(ingredient, links)
	if err != nil {
		return
	}

	var name string
	if len(ingredient.Names) == 0 {
		name = ingredient.Name
	} else {
		name = ingredient.Names[0]
	}
	cleanName := util.CleanText(strings.ToLower(name))

	ingredientSlug := slug.Make(cleanName)

	filePath := path.Join(constants.CooksThesaurusProcessedDir, ingredientSlug+".md")

	err = ioutil.WriteFile(filePath, out, 0755)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to write file")
	}
}
