package types

type Ingredient struct {
	Name  string   `json:"name"`
	Names []string `json:"names"`
	Link  bool     `json:"link"`
	Text  string   `json:"text"`
}

type CooksThesaurus struct {
	Ingredients []Ingredient `json:"ingredients"`
}
