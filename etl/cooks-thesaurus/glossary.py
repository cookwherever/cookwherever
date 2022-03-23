import requests
from bs4 import BeautifulSoup

glossary_start_url = "http://online-cookbook.com/goto/cook?p=glossaryl"


def get_glossary_terms_page(url):
    resp = requests.get(url)
    if not resp.ok:
        print(f"unable to complete request: {resp.status_code}")
        print(resp.text)
        return

    parsed_page = BeautifulSoup(resp.text, 'html.parser')
    glossary_table = parsed_page.find(lambda tag: tag.name == "table" and len(tag.findChildren('tr')) > 5)

    table = [
        [td.get_text(strip=True) for td in tr.find_all('td')]
        for tr in glossary_table.find_all('tr')
    ]

    print(table)

    return [], None


def get_glossary_terms():
    glossary_terms = []
    next_url = glossary_start_url
    while True:
        terms, next_url = get_glossary_terms_page(next_url)
        glossary_terms.extend(terms)

        if next_url is None:
            break


if __name__ == '__main__':
    get_glossary_terms()