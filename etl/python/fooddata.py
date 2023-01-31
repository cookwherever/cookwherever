import json
import re

import bigjson
import requests

from graphql import api_url_and_headers

url, headers = api_url_and_headers('upsert-fdc-food')

def c():
    with open('data/fooddata/FoodData_Central_sr_legacy_food_json_2021-10-28.json', 'rb') as f:
        foods = bigjson.load(f)
        foods = foods["SRLegacyFoods"]
        for food in foods:
            fdcId = int(food['fdcId'])
            description = food['description']

            portions = []
            for portion in food['foodPortions']:
                mass = float(portion['gramWeight'])
                name = portion.get('modifier')
                sequence = portion.get('sequenceNumber')
                comment = None

                matches = re.match(r'^(oz|cup|lb), (.*)$', name)
                if matches:
                    comment = matches.group(1).replace(", ", " ")

                already_exists = False
                for p in portions:
                    if p['unit']['name'] == name:
                        already_exists = True

                if already_exists:
                    continue

                portions.append({
                    "sequence": sequence,
                    "amount": 1,
                    "unit": {
                        "name": name,
                        "comment": comment
                    },
                    "mass": mass
                })

            body = {
                "fdcId": fdcId,
                "description": description,
                "portions": portions
            }

            print(description, portions)

            resp = requests.post(url, headers=headers, data=json.dumps(body))
            if resp.status_code != 200:
                print(resp.status_code)
                print(resp.text)

def b():
    with open('data/fooddata/FoodData_Central_foundation_food_json_2022-04-28.formatted.json', 'rb') as f:
        foods = bigjson.load(f)
        foods = foods["FoundationFoods"]
        for food in foods:
            fdcId = int(food['fdcId'])
            description = food['description']

            portions = []
            for portion in food['foodPortions']:
                measureUnit = portion["measureUnit"]
                sequence = portion.get('sequenceNumber')

                mass = float(portion['gramWeight'])
                comment = portion.get('modifier')
                name = measureUnit['abbreviation']

                portions.append({
                    "sequence": sequence,
                    "amount": 1,
                    "unit": {
                        "name": name,
                        "comment": comment
                    },
                    "mass": mass
                })

            body = {
                "fdcId": fdcId,
                "description": description,
                "portions": portions
            }

            print(description, portions)

            resp = requests.post(url, headers=headers, data=json.dumps(body))
            if resp.status_code != 200:
                print(resp.status_code)
                print(resp.text)


def a():
    with open('data/fooddata/FoodData_Central_survey_food_json_2021-10-28.json', 'rb') as f:
        surveyFoods = bigjson.load(f)
        surveyFoods = surveyFoods["SurveyFoods"]
        for food in surveyFoods:
            fdcId = int(food['fdcId'])
            description = food['description']

            portions = []
            for portion in food['foodPortions']:
                portion_description = portion["portionDescription"]
                sequence = portion.get('sequenceNumber')

                matches = re.match(r'^(\d+) (.*)$', portion_description)
                if matches is None:
                    continue

                amount = int(matches.group(1))
                unit = matches.group(2)
                mass = float(portion['gramWeight'])
                comment = None

                matches = re.match(r'^(oz|cup),(.*)$', unit)
                if matches:
                    comment = matches.group(1)

                portions.append({
                    "sequence": sequence,
                    "amount": amount,
                    "unit": {
                        "name": unit,
                        "comment": comment
                    },
                    "mass": mass
                })

            body = {
                "fdcId": fdcId,
                "description": description,
                "portions": portions
            }

            print(description, portions)

            resp = requests.post(url, headers=headers, data=json.dumps(body))
            if resp.status_code != 200:
                print(resp.status_code)
                print(resp.text)

#a()
#b()
c()
