from ._abstract import AbstractScraper


class JoshuaWeissman(AbstractScraper):
    WITH_SCHEMA = True

    @classmethod
    def host(cls):
        return "joshuaweissman.com"

    def title(self):
        return self.soup.find('h1', {'class': 'blog-post-title-font'})

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

    def tags(self):
        return [tag.get_text().strip() for tag in self.soup.findAll('a', {'class': 'tag'})]

    def image(self):
        try:
            return self.schema.image()
        except Exception as e:
            print(e)
            return None

    def ingredients(self):
        return self.schema.ingredients()

    def ingredient_groups(self):
        return self.schema.ingredients()

    def instructions(self):
        return self.schema.instructions()

    def ratings(self):
        try:
            return self.schema.ratings()
        except Exception as e:
            print(e)
            return None
