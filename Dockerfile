FROM amazoncorretto:17-alpine-jdk
COPY dist/ /usr/src/app/
RUN apk add --update nodejs && apk add --update npm && npm install --global http-server
WORKDIR /usr/src/app/
CMD http-server page_acesso/browser/ --port 8088
EXPOSE 8088
