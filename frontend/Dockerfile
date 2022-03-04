FROM node:14-alpine
WORKDIR /usr/src/app

COPY yarn.lock /usr/src/app/
COPY package.json /usr/src/app/
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile

COPY . /usr/src/app
RUN yarn run build:production

FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=0 /usr/src/app/build /static
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf%