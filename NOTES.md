# declarative web scraping
```yaml
recipe:
  title:
    pipeline:
      input:
        page: https://gogole.com/a/recipe.html`
        xpath: //div
      steps: # what are the io types of steps
        - javascript: -|
            some js
            here we go  
        - 
```


## ideas

* [ ] generator which inspects ferret script return types to generate a go struct