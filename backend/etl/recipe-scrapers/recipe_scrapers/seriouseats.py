from ._abstract import AbstractScraper
from ._utils import get_minutes, get_yields, normalize_string


class SeriousEats(AbstractScraper):
    @classmethod
    def host(cls):
        return "seriouseats.com"

    def author(self):
        author = self.soup.find("meta", {"name": "sailthru.author"})
        return author["content"] if author else None

    def title(self):
        return self.soup.find("h1").get_text()

    def is_article(self):
        return self.soup.find("div", {"class": "article__container"}) is not None

    def total_time(self):
        total_time = self.soup.find("div", {"class": "total-time"})
        if total_time is None:
            return 0

        return get_minutes(
            total_time.find(
                "span", {"class": "meta-text__data"}
            )
        )

    def yields(self):
        recipe_yields = self.soup.find("div", {"class": "recipe-yield"})

        if recipe_yields is None:
            recipe_yields = self.soup.find("div", {"class": "recipe-serving"})

        if recipe_yields is None:
            return None

        return get_yields(
            recipe_yields.find(
                "span", {"class": "meta-text__data"}
            )
        )

    def ingredients(self):
        ingredients = self.soup.findAll("li", {"class": "ingredient"})
        return [normalize_string(ingredient.get_text()) for ingredient in ingredients]

    def instructions(self):
        instructions = self.soup.findAll("li", {"class": "mntl-sc-block-group--LI"})

        return "\n".join(
            [normalize_string(instruction.get_text()) for instruction in instructions]
        )

    def ratings(self):
        rating = self.soup.find("meta", {"property": "og:rating"})
        rating = (
            round(float(rating["content"]), 2) if rating and rating["content"] else -1.0
        )
        return rating
