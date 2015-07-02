# Run on a node server
FROM node:latest

# Specify maintainer
MAINTAINER Scott Magee <smagee@sapient.com>

# Install ruby
RUN apt-get update && apt-get install -y ruby ruby-dev

# Install compass 
RUN gem install compass

# Copy source files
COPY . /src

# Create a nonroot user, and switch to it
RUN /usr/sbin/useradd --create-home --home-dir /usr/local/nonroot --shell /bin/bash nonroot
RUN /usr/sbin/adduser nonroot sudo
RUN chown -R nonroot /src

RUN /bin/su nonroot

# Install dependencies
RUN cd /src; npm install

# Install grunt-cli
RUN npm install -g grunt-cli

#Run grunt to build dist folder
RUN cd /src; grunt

#Start the server
EXPOSE 8080
CMD ["node", "/src/dist/server/app.js"]