export const jwt = {
  key: 'k',
  expiresIn: '1m',
  alg: 'HS256'
}

export const db = {
  host: '127.0.0.1',
  port: 27017,
  name: 'db-name',
  user: '',
  pass: ''
}

export default {jwt, db}
