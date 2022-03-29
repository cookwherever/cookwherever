from recipe_scrapers import scrape_me

from ...ingredients import normalize_ingredient_groups

headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
}


def get_urls(recipe_id=None):
    recipe_ranges = [
        (9, 12973),
        (1012377, 1022498),
    ]

    if recipe_id is not None:
        recipe_ranges = [(recipe_id, recipe_id + 1)]

    for recipe_range in recipe_ranges:
        for recipe_id in range(recipe_range[0], recipe_range[1]):
            yield recipe_id, f"https://cooking.nytimes.com/recipes/{recipe_id}"


def get_recipe(recipe_id, url, page_data):
    scraper = scrape_me(url, page_data=page_data)

    if (not scraper.title()) and (not scraper.instructions()):
        print("no recipe found for {recipe_id}")
        return

    return {
        'name': scraper.title(),
        'source': url,
        'image': scraper.image(),
        'recipe_directions': scraper.instructions().split('\n') if scraper.instructions() else [],
        'recipe_ingredient_groups': [
            {
                'name': None,
                'ingredients': scraper.ingredients() if scraper.ingredients() else []
            }
        ],
        'recipe_tags': scraper.tags(),
        'extraction_metadata': {
            'recipe_id': recipe_id,
            'nutrients': scraper.nutrients(),
            'yield': scraper.yields(),
            'time': scraper.total_time(),
        },
    }


def normalize_recipe(recipe_id, recipe):
    ingredient_groups = recipe['recipe_ingredient_groups']
    normalize_ingredient_groups(ingredient_groups)
    return recipe
