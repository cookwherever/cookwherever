package types

type SourceProcessor interface {
	Parse(script, file string) (res interface{}, err error)
	Process() (err error)
	SourceDir() string
	ParsedDir() string
	ProcessedDir() string
}
