# Koa2 Starter

Simple Koa 2 starter with fast runtime transformation.  
Inspired from [CoralSH/server](https://github.com/CoralSH/server).

The purpose is to include the minimum Babel plugins required to ensure a fast runtime transformation (useful when using nodemon).

Also includes Koa-JWT and Koa-Router.

Requires **node >= 4.0.0** and **npm >= 3.0.0** (although it should work with npm >= 2.0.0)

*This repo is mainly for personal and example usage.*

## Usage

```sh
$ git clone git@github.com:hugocaillard/koa2-starter.git
```

##### Development (requires nodemon)

```sh
$ npm i
$ npm start
```

##### Compiled

```sh
$ npm run compile
$ NODE_ENV=prod npm start
```

### Example routes

To get a token:

**GET /api**

Then set the Authorization header:

```
  Authorization: 'token'
```

Then:

**GET /api/private**

For this example purpose, the token validity is 1 minute (see `./config/config.js`).
