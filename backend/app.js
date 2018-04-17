const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const twitter = require('./routes/twitter');
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Request-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT, OPTIONS')
  next()
})

// request init
app.get('/', (req, res, next) => {
  res.send('Aplicacion con Redis');
});

// twitter
app.use('/', twitter);

// port listen
app.listen(port, () => {
  console.log(`Aplicacion corriendo en el puerto ${port}`);
});

module.exports = app;
