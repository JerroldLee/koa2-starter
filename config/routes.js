import jwt from 'koa-jwt'
import convert from 'koa-convert'
import router from 'koa-router'

import errMsgs from './errors'

const opts = {prefix: '/api'}

const publicRouter = router(opts)
const privateRouter = router(opts)

const data = {foo: 'bar'}

privateRouter.use(async (ctx, next) => {
  try {
    const decoded = jwt.verify(ctx.headers.authorization, ctx.conf.jwt.key)
    if (decoded.foo === data.foo) {
      await next()
    } else {
      ctx.throw(401)
    }
  } catch (err) {
    ctx.status = 401
    ctx.body = {
      message: errMsgs[ctx.status],
      err
    }
  }
})

publicRouter.get('/', (ctx) => {
  const {key, expiresIn, alg} = ctx.conf.jwt

  ctx.body = {
    message: 'Public API',
    token: jwt.sign(data, key, {
      expiresIn: expiresIn,
      algorithm: alg
    })
  }
})

privateRouter.get('/private', (ctx) => {
  ctx.body = {message: 'Private API'}
})

const setJWT = convert(jwt({
  secret: 'shared-secret',
  passthrough: true
}))

const custom404 = (ctx) => {
  if (ctx.status === 404) {
    ctx.body = {
      message: errMsgs[ctx.status]
    }
  }
}

export default [
  publicRouter.routes(),
  publicRouter.allowedMethods(),
  setJWT,
  privateRouter.routes(),
  privateRouter.allowedMethods(),
  custom404
]
