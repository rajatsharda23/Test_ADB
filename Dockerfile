# Use the official Python image as a base
FROM python:3.8

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install system dependencies
RUN apt-get -y update
RUN apt-get install -y curl nano wget nginx git gnupg

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get -y update
RUN apt-get install -y yarn

# Ensure pip is installed and up-to-date
RUN python -m ensurepip --upgrade

# Set environment variables
ENV ENV_TYPE staging
ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
ENV PYTHONPATH=$PYTHONPATH:/src/

# Copy the dependencies file to the working directory
COPY src/requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the application code to the container
COPY . /src/
