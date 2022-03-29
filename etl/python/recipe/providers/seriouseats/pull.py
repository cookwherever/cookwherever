from json import JSONDecodeError

from recipe_scrapers import scrape_me
import requests

from ...ingredients import normalize_ingredient_groups

headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-api-key": "fad43e07-2ce3-4c04-97a2-ffd099ecbfd9",
    "referrer": "https://www.seriouseats.com/charred-asparagus-with-miso-bearnaise-sauce",
}


def get_urls():
    for recipe_id in range(5130375, 5137950):
        url = f"https://www.relish.com/api/v1/recipe/{recipe_id}/?type=origin"
        resp = requests.get(url, headers=headers)
        try:
            resp_json = resp.json()
            yield recipe_id, resp_json.get("url")
        except JSONDecodeError as e:
            print(e)
            yield recipe_id, None


def get_recipe(recipe_id, url, page_data):
    scraper = scrape_me(url, page_data=page_data)

    if not scraper.is_article():
        print(f"page is not a recipe {url}")
        return

    if (not scraper.title()) and (not scraper.instructions()):
        print(f"no recipe found for {url}")
        return

    instructions = scraper.instructions().split('\n') if scraper.instructions() else []
    extended_instructions = []
    for instruction in instructions:
        extended_instructions.extend(instruction.split('. '))

    return {
        'name': scraper.title(),
        'source': url,
        'extraction_metadata': {
            'recipe_id': recipe_id,
            'yield': scraper.yields(),
            'time': scraper.total_time(),
        },
        'image': scraper.image(),
        'recipe_directions': extended_instructions,
        'recipe_ingredient_groups': [
            {
                'name': None,
                'ingredients': scraper.ingredients() if scraper.ingredients() else []
            }
        ],
        'recipe_tags': scraper.tags()
    }


def normalize_recipe(recipe_id, recipe):
    ingredient_groups = recipe['recipe_ingredient_groups']
    normalize_ingredient_groups(ingredient_groups)
    return recipe
