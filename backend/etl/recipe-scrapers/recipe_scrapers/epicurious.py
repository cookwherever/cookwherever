from ._abstract import AbstractScraper
from ._utils import get_minutes, get_yields, normalize_string
from functools import cached_property
import json


class Epicurious(AbstractScraper):
    @classmethod
    def host(cls):
        return "epicurious.com"

    @cached_property
    def recipe(self):
        recipe_json = self.soup.find('script', {'type': 'application/ld+json'}).get_text()
        return json.loads(recipe_json)

    def title(self):
        return self.recipe['name']

    def total_time(self):
        minutes = self.recipe.get('totalTime')
        if minutes is None:
            return None
        return get_minutes(minutes)

    def yields(self):
        yields = self.recipe.get('recipeYield')
        if yields is None:
            return None
        return get_yields(yields)

    def image(self):
        img = self.recipe['logo']['url']
        return img

    def ingredients(self):
        return self.recipe['recipeIngredient']

    def instructions(self):
        return [ins['text'] for ins in self.recipe['recipeInstructions']]

    def ratings(self):
        rating = self.soup.find("span", {"class": "rating"})
        rating = rating.get_text().split("/")[0] if rating is not None else None
        rating = float(rating) if rating is not None else None
        return rating

    def reviews(self):
        result = []
        reviews = self.soup.find("div", {"class": "reviews"})
        if len(reviews.find_all("li")):
            for li in reviews.find_all("li"):
                rating = li.find("img", {"class": "fork-rating"})
                try:
                    rating_value = int(rating.get("src").split("_forks.png")[0][-1])
                except Exception:
                    rating_value = 0

                result.append(
                    {
                        "review_text": normalize_string(li.find("p").get_text()),
                        "rating": rating_value,
                    }
                )

        return result
