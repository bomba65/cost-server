const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const port = process.env.PORT || 3001;
const server = restify.createServer({
  name: 'restify server'
});

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['X-App-Version', 'Authorization'],
  exposeHeaders: []
});

const authClient = require('./client').authClient
const client = require('./client').default
const qs = require('querystring');

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({
  requestBodyOnGet: true
}));
server.pre(cors.preflight);
server.use(cors.actual);

server.pre((req, res, next) => {
  console.info(`${req.method} - ${req.url}`);
  return next();
});

/*
server.post('/auth',  function(req, res) {
  const d = req.body;
  d.grant_type = 'password';
  authClient.post('/token', qs.stringify(d))
    .then((response) => {
      console.log('then');
      res.send(response.status, response.data)
    }).catch(({ response }) => {
      console.log('catch');
      res.send(response.status, response.data)
    }).catch(err => {
      console.log(err);
      res.send(403, 'BAD REQUEST')
    });
});

server.get('/profile', function (req, res) {
  const d = req.getQuery();
  const a = req.headers.authorization;
  client.get('/getUserInfo?'+d, {headers: {authorization: a}}).then((response) => {
    console.log('then');
    res.send(response.status, response.data);
  }).catch(({ response }) => {
    console.log('catch');
    res.send(response.status, response.data)
  }).catch(err => {
    console.log(err);
    res.send(403, 'BAD REQUEST');
  });
});

server.post('/changePassword', function (req, res) {
  const d = req.body;
  const a = req.headers.authorization;
  client.post('/changePassword', qs.stringify(d), {headers: {authorization: a}}).then((response) => {
    console.log('then');
    res.send(response.status, response.data);
  }).catch(({ response }) => {
    console.log('catch');
    res.send(response.status, response.data)
  }).catch(err => {
    console.log(err);
    res.send(403, 'BAD REQUEST');
  });
});
*/

server.get('*', function (req, res) {
  console.log(req.path());

  authClient.get(req.path()).then((response) => {
    console.log('then');
    res.send(response.status, response.data);
  }).catch(({ response }) => {
    console.log('catch');
    res.send(response.status, response.data)
  });
});

server.listen(port, () => {
  console.info(`api is running on port ${port}`);
});