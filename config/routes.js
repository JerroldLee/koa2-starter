import jwt from 'koa-jwt'
import router from 'koa-router'

import errMsgs from './errors.js'

const opts = {prefix: '/api'}

export const publicRouter = router(opts)
export const privateRouter = router(opts)

let data = {foo: 'bar'}

privateRouter.use((ctx, next) => {
  try {
    let decoded = jwt.verify(ctx.headers.authorization, ctx.conf.jwt.key)
    if (decoded.foo === data.foo) {
      next()
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
  let {key, expiresIn, alg} = ctx.conf.jwt

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
