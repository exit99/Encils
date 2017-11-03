FROM python:3.6-alpine

MAINTAINER "Bitplex"
LABEL project="Encils"
LABEL version = "1.0.0"
LABEL author="Zach Kazanski"
LABEL author_email="kazanski.zachary@gmail.com"

RUN apk add --update \
    nginx \
    supervisor \
    python-dev \
    build-base \
    linux-headers \
    pcre-dev \
    py-pip \
    mariadb-dev \
    gcc \
    g++ 

RUN chown -R nginx:www-data /var/lib/nginx

RUN mkdir /etc/nginx/sites-enabled
RUN mkdir /run/nginx
RUN rm /etc/nginx/nginx.conf
ADD docker/nginx/nginx.conf /etc/nginx/
ADD docker/nginx/nginx-app.conf /etc/nginx/sites-enabled/

RUN pip install https://github.com/unbit/uwsgi/archive/uwsgi-2.0.zip#egg=uwsgi
RUN mkdir /etc/uwsgi
ADD docker/uwsgi /etc/uwsgi/

ADD docker/newrelic.ini /app/newrelic.ini

RUN rm /etc/supervisord.conf
ADD docker/supervisord/supervisord.conf /etc/

EXPOSE 80

COPY api/ /api
RUN mv /api/schooltext_api/prod_settings.py /api/schooltext_api/local.py
WORKDIR api

RUN pip install -r reqs.txt

ENV PYTHONPATH /api/

CMD supervisord -n
