FROM node:11.13.0-alpine

ARG BUILD_MODE

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

EXPOSE 3000

ENV HOST 0.0.0.0

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install

RUN if [ "$BUILD_MODE" != "development" ]; \
then { \
  echo "Building..."; \
  npm run build; \
  echo "Removing devDependencies for production..."; \
  npm prune --production; \
} \
fi

# start the app
CMD [ "npm", "run", "start" ]