package util

import (
	"regexp"
	"strings"
	"unicode"
)

var cleanRegex = regexp.MustCompile(`\s+`)

func CleanText(s string) string {
	cleannedText := strings.Map(func(r rune) rune {
		if r == '\u00a0' {
			return ' '
		}
		if unicode.IsGraphic(r) {
			return r
		}
		return ' '
	}, s)
	return cleanRegex.ReplaceAllString(cleannedText, " ")
}
