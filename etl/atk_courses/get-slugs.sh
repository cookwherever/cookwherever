#!/bin/sh
PAGE=$1
curl "https://www.onlinecookingschool.com/learn/browse?page=$PAGE" \
  -H 'Connection: keep-alive' \
  -H 'Accept: */*' \
  -H 'nonce: 2n8mdgdg83mb3avfqfx0175w' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36' \
  -H 'authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVG9rZW4iOiJneXQ3Nmw3cHI2cmJjY3lxYnYwemRhemRkcjFtZmxvIiwiaWF0IjoxNjE2NTY4OTA1LCJleHAiOjE2NDgxMDQ5MDR9.8jMRvUkIksh5Z7GOEU5qhgI2l5wvtr7UurVcaT9VfUY' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://www.onlinecookingschool.com/learn/dashboard' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Cookie: csrf-token=1rBOIRma-19wG3rzLpGQu-0txglVl-qkw824; csrf-token.sig=ZDpvdAPD6eRqbQiV_QyU08Ij8So; password=fihapa; koa:sess=eyJzZWNyZXQiOiJJTXN4Ml9GSWMtbGZTTFk1OTNtVzJzLVkifQ==; koa:sess.sig=WU2IKrlNtHv9TkDku8wwkvW36Xk; __stripe_mid=e5bb5159-52a3-48b8-bec0-2f3fa09599b403c611; __stripe_sid=f1e92c0d-ca30-4dfb-85f7-008078839b1d9f3b2f; visitId=0.9855885563644573; authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVG9rZW4iOiJneXQ3Nmw3cHI2cmJjY3lxYnYwemRhemRkcjFtZmxvIiwiaWF0IjoxNjE2NTY4OTA1LCJleHAiOjE2NDgxMDQ5MDR9.8jMRvUkIksh5Z7GOEU5qhgI2l5wvtr7UurVcaT9VfUY; authToken.sig=fdkfpCWeprqQg2TAqX0cKP3e1ZE; authTokenExpires=Thu Mar 24 2022 06:55:05 GMT+0000 (Coordinated Universal Time); authTokenExpires.sig=j3jktrA68lz-LBVf3zY2lyomFgk; cookiePopup=1' \
  --compressed \
	-o "pages/$PAGE.json"
