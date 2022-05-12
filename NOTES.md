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


```
project:
build
make container

infra:
update tags (renovate?)
kompose -f docker-compose.yaml -f docker-compose.prod.yaml convert -c -o k8s
helm --debug upgrade food-data -namespace food-data k8s


```