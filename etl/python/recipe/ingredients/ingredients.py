import json
from fractions import Fraction
from unicodedata import normalize

from .constants import fractions
from .parse_ingredients import parse_ingredients, ingredients_file


def save_parsed_ingredients(ingredients = None):
    parsed_ingredients = []
    ingredients_to_save = parsed_ingredients
    if ingredients is not None:
        ingredients_to_save = ingredients

    with open(ingredients_file, "w") as f:
        json.dump(ingredients_to_save, f)

def normalize_vulgar_fraction(fraction):
    return normalize('NFKC', fraction).replace('⁄', '/')

def convert_to_float(frac_str):
    try:
        return float(frac_str)
    except ValueError:
        if '/' not in frac_str:
            if ' ' in frac_str:
                return frac_str.split(' ')[0]
            return frac_str

        num, denom = frac_str.split('/')
        try:
            leading, num = num.split(' ')
            whole = float(leading)
        except ValueError:
            whole = 0
        frac = float(num) / float(denom)
        return whole - frac if whole < 0 else whole + frac

def find_fractions(string):
    new_string = string
    for c in string:
        if c in fractions:
            new_string = new_string.replace(c, " " + normalize_vulgar_fraction(c))
    return new_string


def format_fraction(fraction):
    try:
        # 1/2-3/4 teaspoon red pepper flakes
        if '-' in fraction:
            f = fraction.split('-')
            return float(Fraction(f[0])), f"({fraction})"

        return float(sum(Fraction(s) for s in fraction.split())), None
    except Exception as e:
        print(e)
        return None, fraction


def normalize_ingredient_groups(ingredient_groups, parsed_ingredients=[]):
    ingredients_to_parse = []
    for i, ingredient_group in enumerate(ingredient_groups):
        ingredients = [find_fractions(ingredient) for ingredient in ingredient_group.get('ingredients')]
        ingredients_to_parse.extend(ingredients)

    processed_ingredients = parse_ingredients(ingredients_to_parse, [])

    processed_ingredient_idx = 0
    for i, ingredient_group in enumerate(ingredient_groups):
        ingredients = ingredient_group.get('ingredients')
        new_ingredients = []

        for ingredient in ingredients:
            nlp_ingredients = processed_ingredients[processed_ingredient_idx]
            processed_ingredient_idx += 1

            for parsed_ingredient in nlp_ingredients:
                qty = parsed_ingredient.get("qty")

                extra_comment = None
                if qty is not None:
                    qty, extra_comment = format_fraction(qty)

                comment = parsed_ingredient.get("comment")
                if comment is None:
                    comment = ''

                if extra_comment is not None:
                    comment += extra_comment

                # TODO (breadchris) normalize ingredient name http://agailloty.rbind.io/project/nlp_clean-text/
                normalized_name = parsed_ingredient.get("name").lower() if parsed_ingredient.get("name") is not None else None

                new_ingredients.append({
                    "text": ingredient,
                    "name": normalized_name,
                    "amount": qty,
                    "units": parsed_ingredient.get("unit"),
                    "comment": comment
                })

        ingredient_group['ingredients'] = new_ingredients
