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

## Running locally
The project minimally requires the following to be available:
 - a MongoDB database for storing emails
 - a Redis server for storing email-OTP mappings

To streamline development, we've configured `docker-compose.yml` to fire up three extra services: mongo, mongo-express and redis. `mongo-express` docker image provides a UI for managing our database.

### Running locally: option 1 (preferred)

1. start the storage services:
```bash
npm run storage-dev
```

> Tip: If you also prefer a UI to view redis keys, we recommend using [marian/rebrow](https://hub.docker.com/r/marian/rebrow/)
2. start the app
Create a `.env` file in the root directory and provide the [required environment variables](#environment-variables).
```bash
npm run nuxt-dev
```
### Running locally: option 2
Run both commands using `concurrently`
```bash
npm run docker-dev
```
> Warning about race condition: The `nuxt-dev` command requires the Redis server and MongoDB database to be ready. If not, it will fail on startup. We're working on making them resilient but for now, the preferred way to run locally is option 1.


## Environment variables

|Environment variable|Required|Description/Value|
|:-:|:-:|:-:|
|JWT_SECRET|YES|For generating token, ex: `thiscouldbeanything`
|EMAIL_STRING|YES|Used by nodemailer as the sender email. Accepts only Gmail for now|
|EMAIL_PASSWORD|YES|Used by nodemailer as the sender password. If the account uses 2FA, you need to [generate an App Password](https://support.google.com/accounts/answer/185833?hl=en). If not, you need to [enable Less Secure Apps](https://support.google.com/accounts/answer/6010255?hl=en).
|REDIS_OTP_URI|YES|For storing email-otp mappings, ex:`redis://redis:6379`
|OTP_DURATION|NO|For how long Redis will keep email-otp mapping, ex: `300` seconds, default: `300` seconds
|MONGO_URI|YES|For storing email registrations, ex `mongodb://root:example@mongo:27017`


## System diagram

![](assets/system_diagram.png)

## To-do:
  - [ ] update docker-compose.yml
  - [ ] es-lint
  - [ ] write tests
  - [x] create gmail for demo
  - [ ] gitlab workflow (?)
