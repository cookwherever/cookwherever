import bisect
import json
import os
from subprocess import Popen, PIPE
from threading import Lock

from util import debug


ingredients_file = 'ingredients.json'
ingredients_lock = Lock()


def load_parsed_ingredients():
    if not os.path.exists(ingredients_file):
        return []

    with open(ingredients_file) as f:
        return json.load(f)

class KeyifyList(object):
    def __init__(self, inner, key):
        self.inner = inner
        self.key = key

    def __len__(self):
        return len(self.inner)

    def __getitem__(self, k):
        return self.key(self.inner[k])

def parse_ingredients(ingredient_texts, parsed_ingredients=[]):
    ret = []

    if len(ingredient_texts) == 0:
        return ret

    to_parse = []
    for i, ingredient_text in enumerate(ingredient_texts):
        ingredient_idx = bisect.bisect_left(parsed_ingredients, [ingredient_text, []])

        ingredient = {}
        if ingredient_idx != len(parsed_ingredients) and \
                parsed_ingredients[ingredient_idx][0] == ingredient_text:
            ingredient_info = parsed_ingredients[ingredient_idx]
            debug(f"cache hit for {ingredient_text} {ingredient_info[1]}")
            ingredient = ingredient_info[1]
        else:
            to_parse.append(i)

        ret.append(ingredient)

    if len(to_parse) == 0:
        return ret

    cmd = ["sudo", "docker", "run", "--rm", "-i", "ingredient-parser"]
    p = Popen(cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    stdout, stderr = p.communicate("\n".join([ingredient_texts[i] for i in to_parse]).encode('utf-8'))

    if len(stderr) != 0:
        print(stderr)

    ingredients_lock.acquire()
    try:
        keylist = KeyifyList(parsed_ingredients, lambda x: x[0])
        for i, parsed_line in enumerate(stdout.decode().strip().split('\n')):
            ingredient_text = ingredient_texts[i]

            ingredient_info = parsed_line.strip()
            ingredient = json.loads(ingredient_info)

            idx = to_parse[i]
            ret[idx] = ingredient

            ingredient_lookup = [ingredient_text, ingredient]
            idx = bisect.bisect_left(keylist, ingredient_text)
            parsed_ingredients.insert(idx, ingredient_lookup)
    finally:
        ingredients_lock.release()

    return ret
