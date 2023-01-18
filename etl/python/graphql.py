import json
import os

import requests

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
mutation UpsertProviders($sources: [recipe_source_providers_insert_input!]!) {
  insert_recipe_source_providers(objects: $sources, on_conflict: {constraint: recipe_sources_pkey, update_columns: [name, description]}) {
    affected_rows
  }
}
"""


def api_url_and_headers(action):
    env = os.environ.get('ENV')
    if env == 'production':
        headers = {
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsYnM4OW00cjAwMDBsczVtaTN3M3ZiZTciLCJpYXQiOjE2NzEyOTg5OTB9.o8099H9CBG5VOa_OyPE-Hl1z7vPqiRiVcypGbEdl8PE",
            "content-type": "application/json"
        }
        url = f"https://api.cookwherever.com/operations/{action}"
        return url, headers
    headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsY3kyNmU3djAwMDBnaXA1bWJ0ZmkzdTYiLCJpYXQiOjE2NzM4MjgzNDF9.mMFlnKZYlCxkD1DmCA4VBIpzsoYJGh8PjvMU-t-ba0E',
        "content-type": "application/json"
    }
    url = f"http://localhost:3001/operations/{action}"
    return url, headers


def execute_create_recipes(recipes):
    body = recipes

    url, headers = api_url_and_headers('create-recipe')

    resp = requests.post(url, headers=headers, data=json.dumps(body))
    if resp.status_code != 200:
        print(resp.status_code)
        print(resp.text)
        return None


def upsert_providers(providers):
    return execute_graphql_query(upsert_recipe_providers, {
        "sources": providers
    })


def execute_graphql_query(query, variables):
    body = {
        "query": query,
        "variables": variables
    }

    graphql_url_env = os.environ.get('GRAPHQL_URL')
    graphql_url = graphql_url_env if graphql_url_env is not None else "http://localhost:8080/v1/graphql"
    graphql_secret_env = os.environ.get('GRAPHQL_SECRET')
    graphql_secret = graphql_secret_env if graphql_secret_env is not None else "ilikefood123"

    headers = {
        "x-hasura-admin-secret": graphql_secret,
        "content-type": "application/json"
    }

    resp = requests.post(graphql_url, headers=headers, data=json.dumps(body))
    if resp.status_code != 200:
        print(resp.status_code)
        print(resp.text)
        return None

    resp_json = resp.json()
    if 'data' not in resp_json:
        raise Exception("unable to find 'data' in response: " + str(resp_json))

    return resp_json["data"]
