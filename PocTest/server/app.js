'use strict'

const restify = require('restify');
const r = require('./routes').routes;
const corsMiddleware = require('restify-cors-middleware');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const swaggerUi = require('swagger-ui-restify');
const swaggerDocument = require('../server/lib/swagger.json');

require('dotenv').config()

const server = restify.createServer({
  name: 'Bill Book'
})
const port = process.env.PORT || 3000
server.use(restify.plugins.queryParser({mapParams: true}))
server.use(restify.plugins.gzipResponse())
server.use(restify.plugins.bodyParser({
  mapParams: true,
  mapFiles: true,
  keepExtensions: true,
  multiples:false,
  hash: 'sha1',
 
  uploadDir: 'filesUpload',
  maxFieldsSize: 5 * 1024 * 1024,
  maxFileSize: 50 * 1024 * 1024
}))
const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']
})

server.pre(cors.preflight)
server.use(cors.actual)

morgan.token('userId', (req, res) => {
  let authToken = req.headers['x-auth-token'];
  if(authToken) {
    let decoded = jwt.verify(authToken, process.env.SALT);
    let userid = decoded.userid;
    return userid;
  } else {
    return '';
  }
})

morgan.token('reqPayload', (req, res) => {
  if(req.body) return JSON.stringify(req.body);
  else return '{}';
})
server.get('/api-docs', swaggerUi.setup(swaggerDocument));
server.get('/swagger-ui-init.js', ...swaggerUi.serve);
server.get('/swagger-ui.css', ...swaggerUi.serve);
server.get('/swagger-ui-bundle.js', ...swaggerUi.serve);
server.get('/swagger-ui-standalone-preset.js', ...swaggerUi.serve);

server.get(/\/users\/?.*/, restify.plugins.serveStatic({
  directory: __dirname + '/../public',
}))

// server.use(express.static(__dirname + 'public/billpdfs'));

server.use(function (req, res, next) {
  req.tempStore = {}
  req.responseObject = {}
  req.responseObject.data = {}
  req.responseObject.status = true
  req.responseObject.err = {}
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  return next()
})

r(server)

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

module.exports = server
