FROM golang:1.18 as build

RUN apt update && apt install wget make

ARG HUGO_VERSION="0.104.2"
RUN wget "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" && \
    tar xzf hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    rm -r hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    mv hugo /usr/bin

# TODO (cthompson) remove once changes are accepted upstream
RUN go env -w GOPROXY="direct"
RUN go install github.com/breadchris/hugo-obsidian@latest

COPY ./ /site
WORKDIR /site
RUN find content -type f -exec grep -q '^- unreviewed' {} \; -exec rm {} +
RUN make build
RUN GIT_CONFIG_NOSYSTEM=true hugo

FROM nginx:alpine
COPY --from=build /site/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
