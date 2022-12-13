package constants

import "path"

const (
	DataDir = "data"
)

var (
	SourceDir    = path.Join(DataDir, "source")
	ParsedDir    = path.Join(DataDir, "parsed")
	ProcessedDir = path.Join(DataDir, "processed")
)

var (
	TheWokSourceDir         = path.Join(SourceDir, "TheWok")
	CooksThesaurusSourceDir = path.Join(SourceDir, "www.foodsubs.com")

	CooksThesaurusParsedDir = path.Join(ParsedDir, "www.foodsubs.com")

	CooksThesaurusProcessedDir = path.Join(ProcessedDir, "www.foodsubs.com")
)
