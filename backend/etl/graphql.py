import requests
import json

insert_recipes_one = """
mutation CreateRecipe(
  $recipes: [recipes_insert_input!]!
) {
  insert_recipes(
    objects: $recipes
    on_conflict: {
        constraint: recipes_source_key,
        update_columns: [name, image, extraction_metadata, updated_at],
    }
  ) {
    returning {
        id
    }
  }
}
"""


def execute_create_recipes(recipes):
    headers = {
        "x-hasura-admin-secret": "ilikefood123",
        "content-type": "application/json"
    }

    body = {
        "query": insert_recipes_one,
        "variables": {
            "recipes": recipes
        }
    }

    resp = requests.post("https://food.vanderpot.net/v1/graphql", headers=headers, data=json.dumps(body))
    if resp.status_code != 200:
        print(resp.status_code)
        print(resp.text)
        return None

    resp_json = resp.json()
    if 'data' not in resp_json:
        raise Exception("unable to find 'data' in response: " + str(resp_json))

    return resp_json["data"]["insert_recipes"]
