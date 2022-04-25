FROM golang:1.18 as build

RUN apt update && apt install wget make

ARG HUGO_VERSION="0.89.4"
RUN wget --quiet "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" && \
    tar xzf hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    rm -r hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    mv hugo /usr/bin

RUN go install --tags extended github.com/jackyzha0/hugo-obsidian@latest

COPY ./ /site
WORKDIR /site
RUN make build
RUN GIT_CONFIG_NOSYSTEM=true hugo

FROM nginx:alpine
COPY --from=build /site/public /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
