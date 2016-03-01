import Koa from 'koa'

import logger from 'koa-logger'
import convert from 'koa-convert'
import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'

import config from './config/config.js'
import errMsgs from './config/errors.js'
import {publicRouter, privateRouter} from './config/routes.js'

const app = new Koa()
app.context.conf = config

/**
 * Middlewares
 */
app.use(compose([bodyParser(), logger()]))

/**
 * Routes
 */
app.use(compose([publicRouter.routes(), publicRouter.allowedMethods()]))

app.use(convert(jwt({
  secret: 'shared-secret',
  passthrough: true
})))
app.use(compose([privateRouter.routes(), privateRouter.allowedMethods()]))

// Custom 404
app.use((ctx) => {
  if (ctx.status === 404) {
    ctx.body = {
      message: errMsgs[ctx.status]
    }
  }
})

/**
 * Start server
 */
const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))
