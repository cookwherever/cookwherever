package types

type ProcessedRecipe struct {
	Name               string              `json:"name"`
	Source             string              `json:"source"`
	Image              string              `json:"image"`
	Directions         []string            `json:"recipe_directions"`
	IngredientGroups   map[string][]string `json:"recipe_ingredient_groups"`
	Tags               []string            `json:"recipe_tags"`
	ExtractionMetadata map[string]string   `json:"extraction_metadata"`
}
