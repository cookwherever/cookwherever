import os


DEBUG = os.environ.get('DEBUG') == 'true'


def debug(s):
    if DEBUG:
        print(s)
