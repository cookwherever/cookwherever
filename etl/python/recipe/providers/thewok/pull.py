from ...ingredients import normalize_ingredient_groups


def normalize_recipe(recipe_id, recipe):
    ingredient_groups = recipe['recipe_ingredient_groups']
    ingredient_groups_formatted = [{"name": k, "ingredients": v} for k, v in ingredient_groups.items()]
    recipe['recipe_ingredient_groups'] = ingredient_groups_formatted
    normalize_ingredient_groups(ingredient_groups_formatted)
    return recipe
