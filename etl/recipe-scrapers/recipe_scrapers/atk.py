from ._abstract import AbstractScraper


class AllRecipes(AbstractScraper):
    @classmethod
    def host(cls):
        return "americastestkitchen.com"

    def author(self):
        return 'atk'

    def tags(self):
        return [tag.get_text().strip() for tag in self.soup.findAll("span", {"class": "label__text"})]

    def title(self):
        return self.schema.title()

    def total_time(self):
        return self.schema.total_time()

    def yields(self):
        return self.schema.yields()

    def image(self):
        return self.schema.image()

    def ingredients(self):
        return self.schema.ingredients()

    def instructions(self):
        return self.schema.instructions()

    def ratings(self):
        return self.schema.ratings()
