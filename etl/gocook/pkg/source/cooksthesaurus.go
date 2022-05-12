package source

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"os"
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

type IngredientMarkdownPage struct {
	Header   string
	Content  string
	Names    []string
	Links    []Link
	FileName string
}

func createIngredientMarkdown(ingredient types.Ingredient, links []Link, filename string) (page []byte, err error) {
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
{{.Header}}---
{{.Content}}

### Other Names
{{ range .Names }}
* {{ . }}{{ end }}

### Varieties
{{ range .Links }}
{{ if .Name }}* {{ .Name }} - [[{{ .To }}]]{{ else }}* [[{{ .To }}]]{{ end }}{{ end }}

### Sources
* http://foodsubs.com/{{ .FileName }}
`)
	if err != nil {
		log.Error().Err(err).Msg("unable to parse template")
		return
	}

	var buf bytes.Buffer
	err = tmpl.Execute(&buf, IngredientMarkdownPage{
		Header:   string(out),
		Content:  ingredient.Text,
		Links:    links,
		FileName: filename,
		Names:    ingredient.Names,
	})
	if err != nil {
		log.Error().Err(err).Msg("unable to execute template")
		return
	}
	page = buf.Bytes()
	return
}

type IngredientPage struct {
	ingredient types.Ingredient
	links      []Link
	varieties  []types.Ingredient
	filename   string
}

func (s *CooksThesaurusProcessor) Process() (err error) {
	files, err := util.WalkMatch(s.ParsedDir(), "*.json")
	if err != nil {
		return err
	}

	var ingredientPages []IngredientPage
	filenameToName := map[string]string{}

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
		var pageIngredients []types.Ingredient

		for _, i := range ingredient.Ingredients {
			if i.MainPage || strings.EqualFold(i.Name, ingredient.Name) {
				mainIngredient = i
				mainIngredient.Name = strings.ToLower(mainIngredient.Name)
				continue
			}

			if i.Link {
				if strings.Contains(i.Text, ".html") {
					ingredientLinks = append(ingredientLinks, Link{
						Name: strings.ToLower(i.Name),
						To:   i.Text,
					})
					continue
				}
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

			pageIngredients = append(pageIngredients, i)
		}

		if mainIngredient.Name == "" {
			mainIngredient = types.Ingredient{
				Name: strings.ToLower(ingredient.Name),
			}
		}

		_, n := path.Split(file)
		filename := strings.ReplaceAll(n, ".json", ".html")
		filenameToName[filename] = slug.Make(mainIngredient.Name)

		ingredientPages = append(ingredientPages, IngredientPage{
			ingredient: mainIngredient,
			links:      ingredientLinks,
			varieties:  pageIngredients,
			filename:   filename,
		})
	}

	for _, i := range ingredientPages {
		ingredientSlug := slug.Make(i.ingredient.Name)
		folder := path.Join(s.ProcessedDir(), ingredientSlug)

		if err = os.MkdirAll(folder, 0755); err != nil {
			println(err)
			continue
		}

		for n, l := range i.links {
			if name, ok := filenameToName[l.To]; ok {
				i.links[n].To = name
			}
		}

		makeIngredientPages(ingredientSlug, i)
	}
	return
}

func makeIngredientPages(basePath string, ingPage IngredientPage) {
	actualLinks := map[string]bool{}
	for _, i := range ingPage.links {
		if i.Name != "" {
			actualLinks[slug.Make(i.Name)] = true
		}
	}

	var filteredLinks []Link
	for _, i := range ingPage.links {
		_, ok := actualLinks[i.To]
		if i.Name == "" && ok {
			continue
		}
		filteredLinks = append(filteredLinks, i)
	}
	ingPage.links = filteredLinks

	for _, i := range ingPage.varieties {
		ingSlug := slug.Make(ingPage.ingredient.Name)
		processIngredient(basePath, i, []Link{
			{
				To: ingSlug,
			},
		}, ingPage.filename)
	}
	processIngredient(basePath, ingPage.ingredient, ingPage.links, ingPage.filename)
}

func processIngredient(basePath string, ingredient types.Ingredient, links []Link, filename string) {
	out, err := createIngredientMarkdown(ingredient, links, filename)
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

	outPath := constants.CooksThesaurusProcessedDir

	if basePath != "" {
		outPath = path.Join(outPath, basePath)
	}
	outPath = path.Join(outPath, ingredientSlug+".md")

	err = ioutil.WriteFile(outPath, out, 0755)
	if err != nil {
		log.Error().
			Err(err).
			Msg("unable to write file")
	}
}
