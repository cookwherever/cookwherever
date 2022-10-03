package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/adrg/frontmatter"
	"github.com/samber/lo"
)

func walkAllFilesInDir(dir string, ignoredPaths []string, cb func(dir, path string) error) error {
	return filepath.Walk(dir, func(p string, info os.FileInfo, e error) error {
		if e != nil {
			return e
		}

		// skip hidden directories
		if info.Name()[0] == '.' {
			return nil
		}

		pDir, _ := path.Split(p)

		if lo.ContainsBy(ignoredPaths, func(ignoredPath string) bool { return strings.Contains(pDir, ignoredPath) }) {
			println("skipping ignored path", pDir)
			return nil
		}

		if info.Mode().IsRegular() {
			return cb(dir, p)
		}
		return nil
	})
}

type Matter struct {
	Title string   `yaml:"title"`
	Tags  []string `yaml:"tags"`
}

func formatFrontMatter(m Matter) string {
	s := "---\n"
	s += fmt.Sprintf("title: %s\n", m.Title)
	s += "tags:\n"
	for _, tag := range m.Tags {
		s += fmt.Sprintf("- %s\n", tag)
	}
	s += "---\n"
	return s
}

func lintPathForFrontmatter(base string, filepath string) error {
	println("Formatting", path.Join(filepath, base))
	contents, err := os.Open(filepath)
	if err != nil {
		panic(err)
	}

	var matter Matter

	rest, err := frontmatter.Parse(contents, &matter)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	adjustedFilepath := strings.ReplaceAll(filepath, base, "")
	dir, filename := path.Split(adjustedFilepath)
	categories := strings.Split(dir, "/")

	if !lo.ContainsBy(matter.Tags, func(element string) bool { return element == "reviewed" || element == "unreviewed" }) {
		matter.Tags = append(matter.Tags, "unreviewed")
	}

	matter.Tags = append(matter.Tags, categories...)
	matter.Tags = lo.Uniq(matter.Tags)
	matter.Tags = lo.Filter(matter.Tags, func(v string, i int) bool {
		return v != "" && v != "ingredient"
	})

	if matter.Title == "" {
		matter.Title = strings.ReplaceAll(filename, ".md", "")
	}

	newFrontMatter := formatFrontMatter(matter)

	ioutil.WriteFile(filepath, []byte(newFrontMatter+string(rest)), 0600)
	return nil
}

func main() {
	absPath, err := filepath.Abs("./content")
	if err != nil {
		panic(err)
	}

	templatePath, err := filepath.Abs("./content/templates")
	if err != nil {
		panic(err)
	}

	ignoredPaths := []string{templatePath}
	walkAllFilesInDir(absPath, ignoredPaths, lintPathForFrontmatter)
}
