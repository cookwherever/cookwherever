# Cook Wherever

[Cook Wherever](https://cookwherever.com) is an open source project to attempt to making cooking more accessible and engaging for everyone.

[my latest progress video](https://player.twitch.tv/?video=1666744420)

## The Dream
* Search for recipes from all of your favorite places, yes even grandma's cookbook.
* Confidently make a recipe, even if you haven't made it before or don't have exactly all the ingredients.
* Follow along with a recipe without having to scroll back and forth or guess what a step means.
* Collect and share recipes that are your "go tos" to help you and others know how people get through the day.

I have a rant about recipes [here](https://gist.github.com/breadchris/e09c92c46c6af9a96028a945108ef7d4) if you are interested in learning more about why I feel this project needs to exist.

To see the best example of this guy in action, check out this [recipe](https://recipes.cookwherever.com/recipe/seriouseats-no-waste-tacos-de-carnitas-with-salsa-verde-recipe-56562).

## What do we got in the repo
* **Wiki** (in progress) This [wiki](wiki/content/) is an abitious project and any contributes are very welcome. This wiki is an attempt to capture everything and anything about cooking. Whether it is a fast food burger recipe or chemical equations for acidic reactions, substitutes for buttermilk or frequency of cow milking, this wiki will capture everything. This will always need some love and over time more information will be captured and organized better. In the future, I hope to have a schema for every ingredient so that things such as important temperatures or common substitutions can be surfaced on a recipe page. 
* **Extension** (in progress)
* **Processing Recipes** (exists, works) I have some infrastructure for pulling recipes in the [etl](etl/) folder which does some smart things like normalizing them so that they can all be displayed in the same format on the site.
* **Website** (purely functional, doesn't look pretty) You can check out the [frontend](frontend/) folder to explore the code for the website if you are into that.

## Setup Instructions 
TODO, This will at least get you somewhere:
```
# In one terminal:
cd frontend/
yarn
yarn start
```

```
# In another
sudo docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up
```
