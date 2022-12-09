import re

LINE_NUMBER_RE = re.compile(r'^[\d]+\. ')

atk_provider = {
    "name": "America's Test Kitchen",
    "url": "",
    "description": ""
}

bbc_provider = {
    "name": "BBC",
    "url": "",
    "description": ""
}

epicurious_provider = {
    "name": "Epicurious",
    "url": "",
    "description": ""
}

joshua_weissman_provider = {
    "name": "Joshua Weissman",
    "url": "",
    "description": ""
}

nyt_provider = {
    "name": "New York Times",
    "url": "",
    "description": ""
}

serious_eats_provider = {
    "name": "Serious Eats",
    "url": "",
    "description": ""
}

thewok_provider = {
    "name": "The Wok: Recipes and Techniques by J. Kenji López-Alt",
    "url": "",
    "description": ""
}

providers = [
    atk_provider,
    bbc_provider,
    epicurious_provider,
    joshua_weissman_provider,
    nyt_provider,
    serious_eats_provider,
    thewok_provider
]
