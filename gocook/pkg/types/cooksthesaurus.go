package types

type Ingredient struct {
	Name     string   `json:"name"`
	Names    []string `json:"names"`
	MainPage bool     `json:"mainPage`
	Link     bool     `json:"link"`
	Text     string   `json:"text"`
}

type CooksThesaurus struct {
	Name        string       `json:"name"`
	Ingredients []Ingredient `json:"ingredients"`
}
