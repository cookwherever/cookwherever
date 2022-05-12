import json
from bs4 import BeautifulSoup

from ...constants import LINE_NUMBER_RE, atk_provider
from ...ingredients import normalize_ingredient_groups

headers = {
    'authority': 'www.americastestkitchen.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': ''
}


def get_urls():
    for recipe_id in range(0, 13805):
        yield recipe_id, f"https://www.americastestkitchen.com/api/v1/recipes/{recipe_id}"


double_return = "\r\n\r\n"
single_return = "\r\n"


def process_recipe(recipe_id, content):
    try:
        api_recipe = json.loads(content)
    except Exception as e:
        print(f"unable to load {recipe_id}")
        return

    print(json.dumps(api_recipe, indent=2))

    name = api_recipe.get('title')
    photo = api_recipe.get('photo')
    image = photo.get('image_url') if photo is not None else ""

    instructions = []
    for instruction in api_recipe.get('instructions'):
        if instruction is None:
            continue
        direction_seperator = double_return if double_return in instruction else single_return
        instructions.extend(instruction.split(direction_seperator))

    source = api_recipe.get('web_url')

    ingredient_groups = api_recipe.get('recipe_ingredient_groups')
    recipe_ingredient_groups = []
    for ingredient_group in ingredient_groups:
        group_name = ingredient_group.get('name')
        ingredients = ingredient_group.get('recipe_ingredients')
        recipe_group_ingredients = []
        for ingredient in ingredients:
            quantity = ingredient.get('quantity')
            measurement = ingredient.get('measurement')
            pre = ingredient.get('pre')
            post = ingredient.get('post')

            quantity = quantity + " " if quantity is not None else ""
            measurement = measurement + " " if measurement is not None else ""
            pre = pre + " " if pre is not None else ""
            post = " " + post if post is not None else ""

            ingredient_name = ingredient.get('ingredient').get('name')

            text = f"{pre}{quantity}{measurement}{ingredient_name}{post}"

            recipe_group_ingredients.append(text)

        recipe_ingredient_groups.append({
            "name": group_name,
            "ingredients": recipe_group_ingredients,
        })

    tags = []

    extraction_metadata = {
        "recipe_id": recipe_id
    }

    return {
        "name": name,
        "source": source,
        "source_provider_id": atk_provider['id'],
        "image": image,
        "recipe_directions": instructions,
        "recipe_ingredient_groups": recipe_ingredient_groups,
        "recipe_tags": tags,
        "extraction_metadata": extraction_metadata
    }


def get_recipe(recipe_id, url, page_data):
    return process_recipe(recipe_id, page_data)


def remove_tags(text):
    return BeautifulSoup(text, 'html.parser').get_text()


def normalize_recipe(recipe_id, recipe):
    for i, direction in enumerate(recipe['recipe_directions']):
        try:
            direction = remove_tags(direction)
        except Exception as e:
            print(f'direction is not html: {direction}')

        direction = direction.strip()

        direction = LINE_NUMBER_RE.sub('', direction)

        recipe['recipe_directions'][i] = direction

    ingredient_groups = recipe['recipe_ingredient_groups']
    normalize_ingredient_groups(ingredient_groups)

    return recipe

