/* eslint-env mocha */

require('babel-core')
var server = require('../server')
var request = require('supertest').agent(server.listen())

describe('API', () => {
  describe('GET /', () => {
    it('should respond 200 with json', done => {
      request
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body = {
          message: res.body.message
        }
      })
      .expect(200, {
        message: 'Public API'
      }, done)
    })
  })

  describe('GET /private with token', () => {
    it('should respond 200 with json', done => {
      request
      .get('/api')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        request
        .get('/api/private')
        .set('Authorization', res.body.token)
        .expect('Content-Type', /json/)
        .expect(200, done)
      })
    })
  })

  describe('GET /private with no token', () => {
    it('should respond 401', done => {
      request
      .get('/api/private')
      .expect(401)
      .expect('Content-Type', /json/, done)
    })
  })
})
