FROM python:3.7.2-slim

WORKDIR /app

ADD . /app

RUN apt-get update && \

     apt-get -y --no-install-recommends install \

     libgomp1

RUN pip install -r requirements.txt

CMD python app.py