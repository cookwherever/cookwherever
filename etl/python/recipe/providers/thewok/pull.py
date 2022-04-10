from ...constants import thewok_provider
from ...ingredients import normalize_ingredient_groups


def normalize_recipe(recipe_id, recipe):
    recipe['name'] = recipe['name'].title()
    recipe['source'] = f"{recipe['source']} - {recipe_id}"
    recipe['source_provider_id'] = thewok_provider['id'],

    ingredient_groups = recipe['recipe_ingredient_groups']
    ingredient_groups_formatted = [{"name": k, "ingredients": v} for k, v in ingredient_groups.items()]
    recipe['recipe_ingredient_groups'] = ingredient_groups_formatted
    normalize_ingredient_groups(ingredient_groups_formatted)

    recipe_directions = recipe['recipe_directions']
    new_recipe_directions = []
    for direction in recipe_directions:
        new_directions = direction.split(". ")
        new_recipe_directions.extend(new_directions)

    recipe['recipe_directions'] = new_recipe_directions

    return recipe
