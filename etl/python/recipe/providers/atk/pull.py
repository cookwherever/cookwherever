import json
from bs4 import BeautifulSoup

from ...constants import LINE_NUMBER_RE
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
    'cookie': '_vwo_uuid_v2=DA58FFBF57E3E2DAEFCA8268BDAD13B37|4092f6fe1d33fe64106e4d07ef3068f0; _ga=GA1.2.1945227257.1621030640; _vwo_uuid=DA58FFBF57E3E2DAEFCA8268BDAD13B37; _pin_unauth=dWlkPU9XSmpOREJsWWpndE16VmpZaTAwWm1KakxXRXlPRGd0WVRaak1URTRaakJtWkRSag; _hjid=eda3d61f-483c-48c3-8e58-8867205ee065; BCSessionID=ec2484f3-c753-46a2-9bae-d8480f88b13c; bcVWOCookieNewsletterClickers=; bcVWOCookieAllRegistrants=; bcVWOReturningSeven=; ConstructorioID_client_id=7186b8f3-6477-4312-821c-80af79db51db; __pdst=737f9126aab74c7d87fe325b7869e860; osano_consentmanager_uuid=7dbda215-971f-4a12-b48a-18ad787fbe0b; osano_consentmanager=DadWl2gwAbEcfiuA-rjPly0hU8kTKK6z9qZmDW-4vqJBOnolFEmWkezWktUGzsw7g2bsRio5-34YF3i5C8hygI3dFyCO7c5a9pIznC2qKSg97Jhg06LBgJJGM8J1rHGXzB9DKesSbbW-MQ1lvuZxQR7KmYw87H3GGi605eS_XeH7CgET6x5Q5YPFFVAPOmuOYmHKxGweOmg2AkIZmjtNsfS5aV0y3l6yg5a2vA==; osano_consentmanager_expdate=1658448446644; __tac=; _vis_opt_exp_418_combi=1; _ALGOLIA=1b172795-c649-43a6-aac5-637660337f72; incode=MASAD00L0; ref=new_search_experience_1; _vis_opt_s=5|; _vwo_ds=3:a_0,t_0:0$1621030639:16.18226082::5_0:3_0,2_0:0; __idcontext=eyJjb29raWVJRCI6IlBDNEVXUlNMTUlCVlpUTUJNS1lOWTU1TkhLSEZJNkRGTk1MSk41VERXNVJBPT09PSIsImRldmljZUlEIjoiUEM0RVdSU0xNNFNGM1JHT1BPVjdRM1ZFSEhJVlc3S0NHUVQ0NUJBNDQ1V0E9PT09IiwiaXYiOiJSRUNNQTZBVEJEN09PV1FUV0pTSUVHWURRQT09PT09PSIsInYiOjF9; __pnahc=134217727; __tbc={jzx}dJ49dPMkKFgkhz4Tqz5tC749l3iQnIBV7HzcdBsqzMJlomjgPYDKL35dfaCO5bdCholmrZ81T4Gv6UrOJwz6B_bvO2r8K52ajpEInYyM6wY; __pat=-18000000; xbc={jzx}GTjEih3-V3m43uEp8cqyDzI1zH9KSO-ZjiO29qKz7ueFPTA8zA-dvelAQyZo5wLvWTaL66rrHe2uMY8sE4oRdl1933anX-6vJrSdURymR_VuIvsWcZIC_ySPxGysN4fnGZ2tyLkHn9mOyL0ObO29QihHbetfPuPQeWwidNQ5wctUscLV-TEcrLBAWf2evXRBVf4KAFxB_Mk-748Sl4lE_GWKseMTTwuKrQKvqzJdfXHlCt6IgYTiryCrqMo2N20EOMl5_mb7y_Hk2w0oIwNGhzwb-U9Spud-5tfG6vpsrfTEls_uTlM3vWugq16ZlCsoFJUEPr6N-oz0Ri7jzEPmsq5F3hds2z5L2NSijVdAjlFUAMnhBIbh7LSo6SWeBzLPQUF_Ebb_b8H1E0hxRGoi4rzSCLlQSB8mCz-3cT9TZwEr3jAuJOGHHSasXGYwPeAt; __tae=1630454188099; _uetvid=a66d66c0db9211ebb5801b972e148fcf; entryPoint=/recipes/1377-classic-apple-pie; api_authorization_client=atk; _derived_epik=dj0yJnU9S1M2VEVVcXd4SUxUZ0tuSTRqQmIySXVDOXk0ZGZlbk0mbj00R1ZkaW41Y1JxZzFBcFBWNXdwdFd3Jm09MSZ0PUFBQUFBR0UyY0NjJnJtPTEmcnQ9QUFBQUFHRTJjQ2M; api_authorization_token=eaXxb/oe/jyn8QSE+cctXdI2J0Yvkou/5gt2nWPKvbb67rRmrlYbBLKZ6ea6hMrtfK2ebJjjVqNU7GicfkrNoQ==; auth_token=R6u8v_6xzXifWdTloW62tw; user_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY3RpdmVfbWVtYmVyc2hpcHMiOlsiY2lvIiwiYXRrIiwiY2NvIiwiY29va2Jvb2tfY29sbGVjdGlvbiJdLCJhY3RpdmVfcmVnaXN0cmF0aW9ucyI6WyJjaW8iLCJhdGsiLCJjY28iLCJzY2hvb2wiXSwiYXVkIjoiYW1lcmljYW5vMTIzIiwiY2FuY2VsbGVkX21lbWJlcnNoaXBzIjpbInNjaG9vbCJdLCJkZnBfbWVtYmVyc2hpcF9zdHJpbmciOiJhbGxfYWNjZXNzIiwiZW1haWwiOiJjaHJpc2xlZ29saWZlQGdtYWlsLmNvbSIsImV4cCI6MTYzMTMzNzUxNywiZXh0ZXJuYWxfaWQiOiIxOTc1MTE0IiwiZmlyc3RfbmFtZSI6IkNocmlzIiwiaWF0IjoxNjMxMzIzMTE3LCJpZCI6OTM5NDYxNSwiaXNzIjoiYW1lcmljYXN0ZXN0a2l0Y2hlbi5jb20iLCJqdGkiOiIwNDE4OWE2NTgzNDQwZGNmMTZiMTM2ODVlZDliODZjOSIsImxhc3RfbmFtZSI6IlRob21wc29uIiwic2VnbWVudCI6Im11bHRpc2l0ZSIsInBhY2thZ2VfbmFtZSI6Ik11bHRpLVNpdGUgTWVtYmVyc2hpcCIsInBpYW5vX2FjdGl2ZV9tZW1iZXJzaGlwcyI6IltcImNpb1wiLFwiYXRrXCIsXCJjY29cIixcImNvb2tib29rX2NvbGxlY3Rpb25cIl0iLCJwaWFub19hY3RpdmVfcmVnaXN0cmF0aW9ucyI6IltcImNpb1wiLFwiYXRrXCIsXCJjY29cIixcInNjaG9vbFwiXSIsInBpYW5vX2NhbmNlbGxlZF9tZW1iZXJzaGlwcyI6IltcInNjaG9vbFwiXSIsInBpYW5vX3NjaG9vbF9zZWdtZW50IjoiY2FuY2VsbGVkX3NlbGYiLCJwaWFub19zZWdtZW50IjoibXVsdGlzaXRlIiwicm9sZSI6Im1lbWJlciIsInN1YiI6IjkzOTQ2MTUiLCJzdXJ2ZXkiOnsiaWQiOm51bGwsIm5hbWUiOm51bGwsImxvY2F0aW9uIjpudWxsLCJhY3RpdmVBdCI6bnVsbCwidmlld2VkQXQiOm51bGwsImNvbXBsZXRlZEF0IjpudWxsLCJjb21wbGV0aW9uVHlwZSI6bnVsbCwiZWxpZ2libGUiOmZhbHNlfSwiaWRfZGlnZXN0IjoiNjQxOWVlYTI5ZmEwYjZkNTA2NTEwNDU3ZjQzMDQ0ZDdlYWVjYmRkYyJ9.6D6fY79R50pmDRT1wSmOB_Zj5CicupNY36iFHOqcqAY; recent_auth=true'
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

