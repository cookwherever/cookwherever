import bisect
import json
import time
import traceback

from warcio.capture_http import capture_http

import os
import sys
import atk
import nyt
import seriouseats
import epicurious
import joshuaweissman
import requests  # requests must be imported after capture_http
import concurrent.futures
from warcio.archiveiterator import ArchiveIterator

from slugify import slugify
from graphql import execute_create_recipes
from ingredients import save_parsed_ingredients
from parse_ingredients import load_parsed_ingredients
from util import debug
from urllib.parse import urlparse

recipe_providers = {
    "atk": atk,
    "nyt": nyt,
    "seriouseats": seriouseats,
    "epicurious": epicurious,
    "joshuaweissman": joshuaweissman
}


def ensure_dir(d):
    if not os.path.isdir(d):
        os.mkdir(d)


def get_archive_filename(provider_name, recipe_id):
    return f"archive/{provider_name}/{recipe_id}.warc.gz"


def load_content_from_url(provider_name, recipe_id):
    archive_filename = get_archive_filename(provider_name, recipe_id)
    for record in ArchiveIterator(open(archive_filename, 'rb'), arc2warc=True):
        if record.rec_type == 'response':
            content = record.content_stream().read()
            if len(content) < 1024:
                continue
            with open('/tmp/test', 'wb') as f:
                f.write(content)
            url = record.rec_headers.get_header('WARC-Target-URI')
            return url, content
    return None, None


def load_url(name, recipe_id, url, headers):
    if url is None:
        print(f"{recipe_id} url is None")

    print(f"pulling {name} {recipe_id}: {url}")
    web_archive_file = f"archive/{name}/{recipe_id}.warc.gz"
    if os.path.exists(web_archive_file):
        print(f"cached {name} {recipe_id}")
        return

    with capture_http(web_archive_file):
        resp = requests.get(url, timeout=10, headers=headers, allow_redirects=True)

    if resp.status_code != 200:
        print(f"failed to pull {name} {recipe_id}")
        debug(resp.text)
        os.remove(web_archive_file)


def filter_providers(provider):
    return {k: v for k, v in recipe_providers.items() if provider is not None and k == provider}.items()


def cache_recipe_content(provider, recipe_id):
    for name, provider in filter_providers(provider):
        provider_dir = os.path.join('archive', name)
        ensure_dir(provider_dir)

        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
            futures = []
            for recipe_id, url in provider.get_urls(recipe_id):
                future = executor.submit(load_url, name, recipe_id, url, provider.headers)
                futures.append(future)

            # TODO create a separate bucket if getting recipe fails
            for future in concurrent.futures.as_completed(futures):
                try:
                    data = future.result()
                except Exception as exc:
                    print(traceback.format_exc())


def process_recipe(provider, provider_name, recipe):
    parts = recipe.split('.')
    recipe_id = parts[0]
    url, page_content = load_content_from_url(provider_name, recipe_id)

    if url is None:
        print(f"unable to load recipe {provider_name} {recipe_id}")
        return

    print(f"parsing {provider_name} {recipe_id} {url}")
    recipe = provider.get_recipe(recipe_id, url, page_content)

    provider_dir = os.path.join('recipes', provider_name)
    ensure_dir(provider_dir)

    recipe_save_file = os.path.join(provider_dir, f"{recipe_id}.json")
    print(f"saving recipe {recipe_save_file}")
    with open(recipe_save_file, 'w') as f:
        f.write(json.dumps(recipe))


def process_recipe_content(provider, recipe_id):
    for provider_name, provider in filter_providers(provider):
        recipes = os.listdir(os.path.join("archive", provider_name))
        if recipe_id is not None:
            recipes = [f'{recipe_id}.json']
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
            futures = []
            for recipe in recipes:
                future = executor.submit(process_recipe, provider, provider_name, recipe)
                futures.append(future)

            # TODO create a separate bucket if parsing fails
            for future in concurrent.futures.as_completed(futures):
                try:
                    data = future.result()
                except Exception as exc:
                    print(traceback.format_exc())


def normalize_recipe(provider, provider_name, recipe_filename):
    parts = recipe_filename.split('.')
    recipe_id = parts[0]

    print(f"normalizing recipe {provider_name} {recipe_filename}")
    with open(os.path.join("recipes", provider_name, recipe_filename)) as f:
        recipe_model = json.load(f)

    if recipe_model is None:
        print(f"recipe not able to be loaded: {recipe_id}")
        return

    recipe = provider.normalize_recipe(recipe_id, recipe_model)
    debug(json.dumps(recipe, indent=2))

    provider_dir = os.path.join('normalized', provider_name)
    ensure_dir(provider_dir)

    recipe_save_file = os.path.join(provider_dir, f"{recipe_id}.json")
    print(f"saving recipe {recipe_save_file}")
    with open(recipe_save_file, 'w') as f:
        f.write(json.dumps(recipe))


def normalize_recipes(provider, recipe_id):
    for provider_name, provider in filter_providers(provider):
        recipes = os.listdir(os.path.join("recipes", provider_name))
        if recipe_id is not None:
            recipes = [f'{recipe_id}.json']

        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
            i = 0
            window = 100
            while i < len(recipes):
                futures = []
                for recipe in recipes[i:i+window]:
                    future = executor.submit(normalize_recipe, provider, provider_name, recipe)
                    futures.append(future)

                for future in concurrent.futures.as_completed(futures):
                    try:
                        future.result()
                    except Exception as exc:
                        print(traceback.format_exc())

                save_parsed_ingredients()
                i += 100


def format_recipe(recipe_file, recipe):
    try:
        parsed_source = urlparse(recipe.get('source'))
        source_name = parsed_source.hostname.split('.')[-2]
    except Exception as e:
        source_name = recipe.get('source')

    recipe_slug = slugify(f"{source_name}-{recipe.get('name')}")

    print(recipe_slug)

    directions = recipe.get('recipe_directions')

    if directions is None:
        raise Exception(f'directions do not exist on {recipe_file}')

    formatted_directions = [
        {"seq_num": i, "step": step}
        for i, step in enumerate(directions)
    ]

    tags = [t for t in set(recipe.get('recipe_tags'))] if recipe.get('recipe_tags') is not None else []

    formatted_tags = []
    if tags is not None:
        formatted_tags = [
            {"seq_num": i, "name": name.lower()}
            for i, name in enumerate(tags)
        ]

    ingredient_groups = recipe.get('recipe_ingredient_groups')

    formatted_recipe_ingredient_groups = [{
        "seq_num": i,
        "name": ingredient_group.get('name'),
        "group_ingredients": {
            "data": [
                {
                    **ingredient,
                    "seq_num": j
                }
                for j, ingredient in enumerate(ingredient_group.get('ingredients'))
            ],
            "on_conflict": {
                "constraint": "recipe_ingredients_group_id_seq_num_key",
                "update_columns": ["name", "amount", "units", "comment", "text"]
            }
        }
    } for i, ingredient_group in enumerate(ingredient_groups)]

    return {
        "name": recipe.get("name"),
        "source": recipe.get("source"),
        "image": recipe.get("image"),
        "slug": recipe_slug,
        "video": recipe.get("video"),
        "recipe_directions": {
            "data": formatted_directions,
            "on_conflict": {
                "constraint": "recipe_directions_recipe_id_seq_num_key",
                "update_columns": ["step"]
            }
        },
        "recipe_ingredient_groups": {
            "data": formatted_recipe_ingredient_groups,
            "on_conflict": {
                "constraint": "recipe_ingredient_groups_recipe_id_seq_num_key",
                "update_columns": ["name"]
            }
        },
        "recipe_tags": {
            "data": formatted_tags,
            "on_conflict": {
                "constraint": "recipe_tags_recipe_id_name_key",
                "update_columns": ["name"]
            }
        },
        "extraction_metadata": recipe.get("extraction_metadata")
    }


def process_recipe_file(recipe_file):
    recipe = json.load(open(recipe_file))

    return format_recipe(recipe_file, recipe)


def upsert_processed_recipes(provider, recipe_id):
    recipe_folder = os.path.join('normalized', provider)

    recipe_files = os.listdir(recipe_folder)
    if recipe_id is not None:
        recipe_files = [f'{recipe_id}.json']

    recipes_to_save = []

    for n, recipe_file in enumerate(recipe_files):
        print(f"processing {recipe_file}")
        recipe = process_recipe_file(os.path.join(recipe_folder, recipe_file))

        recipes_to_save.append(recipe)

        if n % 30 == 0:
            ids = None
            while True:
                ids = execute_create_recipes(recipes_to_save)
                if ids is not None:
                    break
                time.sleep(5)

            print(f"inserted recipes: {ids}")
            recipes_to_save = []

    if len(recipes_to_save) > 0:
        ids = execute_create_recipes(recipes_to_save)
        print(f"inserted recipes: {ids}")


def verify_recipe_file(recipe_file):
    recipe = json.load(open(recipe_file))

    issue = None
    for ingredient_group in recipe['recipe_ingredient_groups']:
        for ingredient in ingredient_group['ingredients']:
            if ingredient['name'] is None:
                debug(f'ingredient is not parsed: {ingredient}')
                continue

            if ingredient['name'] not in ingredient['text']:
                issue = f'ingredient is not parsed correctly: {ingredient}'

    return issue


def verify_normalized_recipes(provider, recipe_id):
    recipe_folder = os.path.join('normalized', provider)

    recipe_files = os.listdir(recipe_folder)
    if recipe_id is not None:
        recipe_files = [f'{recipe_id}.json']

    recipes_with_issues = []

    for n, recipe_file in enumerate(recipe_files):
        print(f"verifying {recipe_file}")
        recipe_path = os.path.join(recipe_folder, recipe_file)
        issue = verify_recipe_file(recipe_path)

        if issue:
            recipes_with_issues.append([recipe_path, issue])

    print(recipes_with_issues)


def main():
    if len(sys.argv) < 2:
        print("usage: <step> [provider] [recipe id]")
        return

    step = sys.argv[1]

    if step == 'ingredients':
        parsed_ingredients = load_parsed_ingredients()
        print(f'there are {len(parsed_ingredients)} cached ingredients')

        action = sys.argv[2]
        ingredient = sys.argv[3]

        ingredient_idx = bisect.bisect(parsed_ingredients, [ingredient, []])

        ingredient_info = None
        if ingredient_idx != len(parsed_ingredients) and \
                parsed_ingredients[ingredient_idx][0] == ingredient:
            ingredient_info = parsed_ingredients[ingredient_idx]

        if action == 'search':
            if ingredient_info is None:
                print(f'could not find {ingredient}')
                return
            print(ingredient_info)
        elif action == 'delete':
            del parsed_ingredients[ingredient_idx]
            save_parsed_ingredients(parsed_ingredients)

        return

    provider = sys.argv[2] if len(sys.argv) >= 3 else None
    recipe_id = sys.argv[3] if len(sys.argv) >= 4 else None

    if step == 'cache':
        cache_recipe_content(provider, recipe_id)
    elif step == 'process':
        process_recipe_content(provider, recipe_id)
    elif step == 'normalize':
        normalize_recipes(provider, recipe_id)
    elif step == 'verify':
        verify_normalized_recipes(provider, recipe_id)
    elif step == 'upsert':
        upsert_processed_recipes(provider, recipe_id)

if __name__ == "__main__":
    main()
