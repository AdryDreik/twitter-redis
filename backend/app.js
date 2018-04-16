const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');
const port = 3000;
const app = express();

// Redis
let client = redis.createClient();

client.on('connect', () => {
  console.log('Conectado con Redis');
});

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// request init
app.get('/', (req, res, next) => {
  res.send('Aplicacion con Redis');
});

// obteniendo el usuario

app.get('/user/:username', (req, res, next) => {
  client.hgetall(req.params.username, (err, obj) => {
    console.log('-----------errr-------------------------');
    console.log(err);
    console.log('------------------------------------');
    if (!obj) {
    } else {
      console.log('----------obj--------------------------');
      console.log(obj);
      console.log('------------------------------------');
    }
  })
});

// adicionando el usuario

app.post('/user', (req, res, next) => {
  client.hmset(req.body.user, [
    'username', req.body.user,
    'comments', ''
  ], (err, reply) => {
    console.log('-----------aaaaaa-------------------------');
    console.log(err);
    console.log('------------------------------------');
    if (err) {
      rs = {
        response: false,
        message: err.message
      };
    }
    console.log('-----------vbbbbbbb-------------------------');
    console.log(reply);
    console.log('------------------------------------');
    rs = {
      response: true,
      message: 'Usuario registrado satisfactoriamente.',
      data: reply
    };
    return res.json(rs);
  });
});

// port listen
app.listen(port, () => {
  console.log(`Aplicacion corriendo en el puerto ${port}`);
});

