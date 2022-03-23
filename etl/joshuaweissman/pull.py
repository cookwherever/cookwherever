import json

import requests
from ingredients import normalize_ingredient_groups

headers = {
    "accept": "application/json, text/plain, */*",
    "authorization": "CI3GioLwefvoGkhbKmAymPmlBtdtAD_p0eKSPRWO-hc.eyJpbnN0YW5jZUlkIjoiN2EzYTE3MDUtODY2Zi00NDg5LWExOGItMjdiNTNjNDJhY2FmIiwiYXBwRGVmSWQiOiIxNGJjZGVkNy0wMDY2LTdjMzUtMTRkNy00NjZjYjNmMDkxMDMiLCJtZXRhU2l0ZUlkIjoiNDMwZjdmNDEtMjQzOC00MTM3LTgyOTQtZDM2MDI0ODNmMjU4Iiwic2lnbkRhdGUiOiIyMDIyLTAzLTIzVDA2OjM4OjUyLjkxN1oiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6ImZkZTdlYzViLWMzYTItNDdmZC04OGFmLTk4OWVhMGNjMjU5OCIsImJpVG9rZW4iOiIzOTM1Njg0NC1hMjU3LTA1YmUtMjMxZi1mNGQ1MThjMTVlZjciLCJzaXRlT3duZXJJZCI6ImQxMjk2MzgwLTBiZmMtNDlhYy1hMTFhLTI2Mjg0ODQzMjhlZCJ9",
    "instance": "CI3GioLwefvoGkhbKmAymPmlBtdtAD_p0eKSPRWO-hc.eyJpbnN0YW5jZUlkIjoiN2EzYTE3MDUtODY2Zi00NDg5LWExOGItMjdiNTNjNDJhY2FmIiwiYXBwRGVmSWQiOiIxNGJjZGVkNy0wMDY2LTdjMzUtMTRkNy00NjZjYjNmMDkxMDMiLCJtZXRhU2l0ZUlkIjoiNDMwZjdmNDEtMjQzOC00MTM3LTgyOTQtZDM2MDI0ODNmMjU4Iiwic2lnbkRhdGUiOiIyMDIyLTAzLTIzVDA2OjM4OjUyLjkxN1oiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6ImZkZTdlYzViLWMzYTItNDdmZC04OGFmLTk4OWVhMGNjMjU5OCIsImJpVG9rZW4iOiIzOTM1Njg0NC1hMjU3LTA1YmUtMjMxZi1mNGQ1MThjMTVlZjciLCJzaXRlT3duZXJJZCI6ImQxMjk2MzgwLTBiZmMtNDlhYy1hMTFhLTI2Mjg0ODQzMjhlZCJ9",
    "locale": "en",
    "x-wix-site-revision": "436",
    "Referer": "https://www.joshuaweissman.com/_partials/wix-thunderbolt/dist/clientWorker.160f7ab2.bundle.min.js",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36"
}


def get_urls(requested_recipe_id=None):
    content_base = "https://www.joshuaweissman.com/_api/communities-blog-node-api/_api/posts/content/"
    query = '?fieldsets=urls,content'
    if requested_recipe_id is not None:
        yield requested_recipe_id, f"{content_base}{requested_recipe_id}{query}"
        return

    offset = 0
    size = 100
    while True:
        url = f"https://www.joshuaweissman.com/_api/communities-blog-node-api/_api/posts?offset={offset}&size={size}&pinnedFirst=true&excludeContent=true"
        r = requests.get(url, headers=headers)
        recipes = r.json()
        for recipe in recipes:
            recipe_id = recipe['id']

            yield recipe_id, f"{content_base}{recipe_id}{query}"

        offset += size

        if len(recipes) != size:
            break


def get_recipe(recipe_id, url, page_data):
    print(f"processing jdawg {recipe_id}")
    recipe = json.loads(page_data)
    blocks = recipe['content']['blocks']
    source_url = recipe['url']['base'] + recipe['url']['path']

    entities = recipe['content']['entityMap']
    video = None
    for _, data in entities.items():
        if 'data' not in data.keys():
            continue
        if 'src' not in data['data'].keys():
            continue
        if type(data['data']['src']) == str:
            video = data['data']['src']

    adding_ingredients = False
    adding_directions = False

    ingredient_groups = []
    current_group = None

    directions = []

    for block in blocks:
        block_text = block['text']
        if block_text == 'INGREDIENTS:':
            adding_ingredients = True
            continue
        if block_text == 'INSTRUCTIONS:':
            adding_ingredients = False
            adding_directions = True
            continue

        block_type = block['type']
        if block_type == 'unstyled' and adding_ingredients:
            if block_text == '':
                continue
            if current_group is not None:
                ingredient_groups.append(current_group)
            current_group = {"name": block_text.replace(' Ingredients:', ''), "ingredients": []}
            continue
        if block_type == 'unordered-list-item' and adding_ingredients:
            if current_group is None:
                current_group = {"name": None, "ingredients": []}
            current_group["ingredients"].append(block_text)
            continue

        if block_type == 'ordered-list-item' and adding_directions:
            directions.append(block_text)
            continue

    if current_group is not None:
        ingredient_groups.append(current_group)

    # print(ingredient_groups)
    # print(directions)

    return {
        'name': recipe['title'],
        'source': source_url,
        'image': None,
        'recipe_directions': directions,
        'recipe_ingredient_groups': ingredient_groups,
        'recipe_tags': [],
        'video': video,
        'extraction_metadata': {
            'recipe_id': recipe_id,
        },
    }


def normalize_recipe(recipe_id, recipe):
    ingredient_groups = recipe['recipe_ingredient_groups']
    normalize_ingredient_groups(ingredient_groups)
    return recipe
