# Random Quote Generator

## Introduction

simple Restful API to render a random quote or random quote of a specific character.
on app service boot, constructor reads the json file, parse it then cache it.
routes read directly from cache.

### Routes

* `/quotes/random` renders a random quote.
* `quotes/:name` renders a random quote for a specific character.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
