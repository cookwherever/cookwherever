FROM mtlynch/ingredient-phrase-tagger:python3

COPY model /var/task/

ENV MODEL_FILE /var/task/_data/20201020_1755-nyt-ingredients-snapshot-2015-461547e.crfmodel

WORKDIR /

RUN mkdir /code

COPY requirements.txt /
RUN pip3 install -r requirements.txt

COPY ingredient_parsing.py /code

ENTRYPOINT python3 /code/ingredient_parsing.py
