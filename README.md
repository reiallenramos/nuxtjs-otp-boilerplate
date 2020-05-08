# nuxtjs-otp-boilerplate

## Introduction
A project aimed to eliminate several architecture decisions. This boilerplate comes with NuxtJS, ExpressJS, Vuetify, Vuex, nodemailer, and jsonwebtoken.

## Features
### Register
  - Register with an email address to be saved in MongoDB.
### Login
  - If the email is valid, an OTP will be generated and stored in Redis for 5 minutes. The OTP is also sent to the registered email. If it's a match, Express will return a JWT token that Nuxt saves in the browser storage and cookies. Tokens are valid for 30 mins by default.
### Logout
  - JWT logout only happens in the frontend by deleting the stored token in the browser.

## Demo
[Try the demo here!](http://3.1.243.203/)

## Requirements
  - docker, docker-compose
  - redis URI
  - mongoDB URI
  
## Getting started
```bash
# Clone the repository
git clone git@github.com:opengovsg/GoGovSG.git gogovsg

# Go inside the directory
cd gogovsg

# Install dependencies
npm install
```

## Build Setup
To streamline development, we've configured `docker-compose.yml` to fire up two extra services: mongo and redis.

1. start the storage services:
```bash
npm run storage-dev
```
2. start the app
```bash
npm run nuxt-dev
```

## Environment variables
The nodemailer is configured to use gmail (for now).
|

## System diagram

![](assets/system_diagram.png)

## To-do:
  - [ ] update docker-compose.yml
  - [ ] es-lint
  - [ ] write tests
  - [ ] create gmail for demo
  - [ ] gitlab workflow (?)
