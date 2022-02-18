from json import JSONDecodeError, dumps

from recipe_scrapers import scrape_me
import requests

from atk.pull import LINE_NUMBER_RE
from ingredients import normalize_ingredient_groups

headers = {
  'Connection': 'keep-alive',
  'Pragma': 'no-cache',
  'Cache-Control': 'no-cache',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="92"',
  'x-requested-with': 'XMLHttpRequest',
  'sec-ch-ua-mobile': '?0',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://www.epicurious.com/search/?meal=buffet%2Cappetizer%2Cbrunch%2Cside%2Cdinner%2Cdessert%2Clunch&content=recipe&page=2',
  'Accept-Language': 'en-US,en;q=0.9'
}

def get_urls():
    num_left = None
    page = 1
    size = 100

    while True:
        if num_left is not None and num_left < size:
            size = num_left

        url = f'https://origin-services.epicurious.com/api/search/v1/query/?size={size}&content=recipe&page={page}&xhr=true'
        resp = requests.get(url, headers=headers)
        recipes_resp = resp.json()

        if num_left == size:
            break

        if num_left is None:
            num_left = recipes_resp['numFound']

        recipe_count = len(recipes_resp['items'])
        num_left -= recipe_count

        for recipe in recipes_resp['items']:
            yield recipe['id'], f"https://epicurious.com{recipe['url']}"

        page += 1


def get_recipe(recipe_id, url, page_data):
    scraper = scrape_me(url, page_data=page_data)

    if (not scraper.title()) and (not scraper.instructions()):
        print(f"no recipe found for {url}")
        return

    return {
        'name': scraper.title(),
        'source': url,
        'extraction_metadata': {
            'recipe_id': recipe_id,
            'yield': scraper.yields(),
            'time': scraper.total_time(),
        },
        'image': scraper.image(),
        'recipe_directions': scraper.instructions() if scraper.instructions() else [],
        'recipe_ingredient_groups': [
            {
                'name': None,
                'ingredients': scraper.ingredients() if scraper.ingredients() else []
            }
        ],
    }


def normalize_recipe(recipe_id, recipe):
    ingredient_groups = recipe['recipe_ingredient_groups']
    normalize_ingredient_groups(ingredient_groups)

    for i, direction in enumerate(recipe['recipe_directions']):
        direction = LINE_NUMBER_RE.sub('', direction)

        direction = direction.strip()

        recipe['recipe_directions'][i] = direction

    return recipe