FROM amazoncorretto:17-alpine-jdk
COPY dist/ /usr/src/app/
WORKDIR /usr/src/app/
CMD http-server page_acesso/browser/ --port 8088
EXPOSE 8088
