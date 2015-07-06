# openfda-travel
Travel application for checking drug information using OpenFDA data.

[![Build Status](https://travis-ci.org/sapientgov/openfda-travel.svg?branch=master)](https://travis-ci.org/sapientgov/openfda-travel)

#Dev Setup Instructions
For some instructions, sudo priveleges may be required on OSX and Linux.

1. Install Ruby (Windows only): http://rubyinstaller.com
2. Install Compass: `gem install compass` - May need sudo
3. Install NodeJS (v0.10.32+) & NPM: http://nodejs.org/download
4. Install Grunt: `npm install -g grunt-cli` - May need sudo
5. Install modules (Make sure you’re in working directory where package.json is available): `npm install` - May need sudo
6. Install MongoDB using the Installation instructions for your operating system at: https://docs.mongodb.org/manual/
7. Build & launch project using grunt: `grunt dev`