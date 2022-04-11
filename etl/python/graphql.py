import os

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
        update_columns: [name, image, extraction_metadata, updated_at, slug],
    }
  ) {
    returning {
        id
    }
  }
}
"""

upsert_recipe_providers = """
mutation UpsertProviders($sources: [recipe_sources_insert_input!]!) {
  insert_recipe_sources(objects: $sources, on_conflict: {constraint: recipe_sources_pkey, update_columns: [name, description]}) {
    affected_rows
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

    graphql_env = os.environ.get('GRAPHQL_URL')

    graphql_url = graphql_env if graphql_env is not None else "http://localhost:8080/v1/graphql"

    resp = requests.post(graphql_url, headers=headers, data=json.dumps(body))
    if resp.status_code != 200:
        print(resp.status_code)
        print(resp.text)
        return None

    resp_json = resp.json()
    if 'data' not in resp_json:
        raise Exception("unable to find 'data' in response: " + str(resp_json))

    return resp_json["data"]["insert_recipes"]


def upsert_providers(sources):
    headers = {
        "x-hasura-admin-secret": "ilikefood123",
        "content-type": "application/json"
    }

    body = {
        "query": upsert_recipe_providers,
        "variables": {
            "sources": sources
        }
    }

    graphql_env = os.environ.get('GRAPHQL_URL')

    graphql_url = graphql_env if graphql_env is not None else "http://localhost:8080/v1/graphql"

    resp = requests.post(graphql_url, headers=headers, data=json.dumps(body))
    if resp.status_code != 200:
        print(resp.status_code)
        print(resp.text)
        return None

    resp_json = resp.json()
    if 'data' not in resp_json:
        raise Exception("unable to find 'data' in response: " + str(resp_json))

    return resp_json["data"]["insert_recipe_sources"]