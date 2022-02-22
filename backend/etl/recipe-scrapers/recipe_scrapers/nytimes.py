from ._abstract import AbstractScraper


class NYTimes(AbstractScraper):
    WITH_SCHEMA = True

    @classmethod
    def host(cls):
        return "cooking.nytimes.com"

    def title(self):
        return self.schema.title()

    def total_time(self):
        try:
            return self.schema.total_time()
        except Exception as e:
            print(e)
            return None

    def yields(self):
        try:
            return self.schema.yields()
        except Exception as e:
            print(e)
            return None

    def image(self):
        try:
            return self.schema.image()
        except Exception as e:
            print(e)
            return None

    def ingredients(self):
        return self.schema.ingredients()

    def instructions(self):
        return self.schema.instructions()

    def ratings(self):
        try:
            return self.schema.ratings()
        except Exception as e:
            print(e)
            return None
