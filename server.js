import Koa from 'koa'
import logger from 'koa-logger'
import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'

import db from './config/database'
import config from './config/config'
import routes from './config/routes'

const app = module.exports = new Koa()
app.context.conf = config

app.use(compose([bodyParser(), logger()]))

app.use(compose(routes))

db.on('connected', () => {
  if (!module.parent) {
    const port = process.env.PORT || 3000
    app.listen(port, console.log(`listening on port ${port}`))
  }
})
