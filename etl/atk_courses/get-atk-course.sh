#!/bin/sh
SLUG=$1
curl "https://www.onlinecookingschool.com/learn/courses?slug=$SLUG&clientSlug=" \
  -H 'Connection: keep-alive' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'nonce: r1emb5t8io99mzhfpouuyoer' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36' \
  -H 'authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVG9rZW4iOiJneXQ3Nmw3cHI2cmJjY3lxYnYwemRhemRkcjFtZmxvIiwiaWF0IjoxNjE2NTY4MzI3LCJleHAiOjE2NDgxMDQzMjZ9.DIZo_dw0yLWygmqwLu1gM9gPKZo1q4a9Sg_y9V98V30' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://www.onlinecookingschool.com/learn/course/vegetable-know-how/radishes/recipe-lesson-roasted-radishes-with-yogurt-tahini-sauce?page=2' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Cookie: csrf-token=1rBOIRma-19wG3rzLpGQu-0txglVl-qkw824; csrf-token.sig=ZDpvdAPD6eRqbQiV_QyU08Ij8So; password=fihapa; koa:sess=eyJzZWNyZXQiOiJJTXN4Ml9GSWMtbGZTTFk1OTNtVzJzLVkifQ==; koa:sess.sig=WU2IKrlNtHv9TkDku8wwkvW36Xk; __stripe_mid=e5bb5159-52a3-48b8-bec0-2f3fa09599b403c611; __stripe_sid=f1e92c0d-ca30-4dfb-85f7-008078839b1d9f3b2f; visitId=0.9855885563644573; authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVG9rZW4iOiJneXQ3Nmw3cHI2cmJjY3lxYnYwemRhemRkcjFtZmxvIiwiaWF0IjoxNjE2NTY4MzI3LCJleHAiOjE2NDgxMDQzMjZ9.DIZo_dw0yLWygmqwLu1gM9gPKZo1q4a9Sg_y9V98V30; authToken.sig=ixTzmsE-Qpge1DMW83TOL3TA8ws; authTokenExpires=Thu Mar 24 2022 06:45:27 GMT+0000 (Coordinated Universal Time); authTokenExpires.sig=0mMkOGLfu2k6dJotTxKqY3ipsmI' \
  --compressed \
	-o "courses/$SLUG.json"
