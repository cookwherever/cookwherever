FROM mtlynch/ingredient-phrase-tagger:python3

#RUN pip3 install cython
#RUN pip3 install grpcio

COPY model /var/task/

ENV MODEL_FILE /var/task/_data/20201020_1755-nyt-ingredients-snapshot-2015-461547e.crfmodel

WORKDIR /

RUN mkdir /code

COPY requirements.txt /
RUN python3 -m pip install -r requirements.txt

COPY ingredient_parsing.py /code

CMD ["python3", "/code/ingredient_parsing.py"]
