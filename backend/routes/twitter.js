const express = require('express');
const app = express.Router();
const moment = require('moment');
moment.locale('es');
const redis = require('redis');
// Redis
let client = redis.createClient();

client.on('connect', () => {
  console.log('Conectado con Redis');
});
// obteniendo la informacion del usuario
app.get('/user', (req, res, next) => {
  try {
    // client.hgetall(req.params.username, (err, obj) => {
    //   if (err) {
    //     throw new Error(err.message);
    //   } else {
    //     if (!obj) {
    //       return res.json({
    //         response: false,
    //         message: 'El usuario no existe',
    //         data: null
    //       })
    //     } else {
    //       return res.json({
    //         response: true,
    //         message: 'Usuario satisfactoriamente recuperado',
    //         data: obj
    //       })
    //     }
    //   }
    // })
    client.lrange('usuarios', 0, -1, (err, reply) => {
      if (err) throw new Error(err.message);
      return res.json({
        response: true,
        message: 'Registros exitosamente recuperados',
        data: reply
      });
    });
  } catch (err) {
    return res.json({
      response: true,
      message: err.message
    })
  }
});

// adicionando el usuario si existe no se hace nada, pero si no existe se esta creando

app.post('/user', (req, res, next) => {
  try {
    // client.hgetall(req.body.user, (err, obj) => {
    //   if (err) throw new Error(err.message);
    //   if (!obj) {
    //     client.hmset(req.body.user, [
    //       'createAt', moment().format('MMMM Do YYYY', 'h:mm:ss a'),
    //       'comments', `Hola a todos mi nombre es ${req.body.user}`
    //     ], (err, reply) => {
    //       if (err) throw new Error(err.message);
    //       res.json({
    //         response: true,
    //         message: 'Usuario registrado satisfactoriamente.',
    //         data: reply
    //       });
    //     });
    //   } else {
    //     res.json({
    //       response: true,
    //       message: `Usuario logueado exitosamente, bienvenido a la seccion de comentarios.`,
    //       data: obj
    //     });
    //   }
    // })
    let mensaje;
    if (req.body.comments) {
      mensaje = req.body.comments;
    } else {
      mensaje = 'Hola a todos'
    }
    client.rpush(['usuarios', `${req.body.user.trim()}: ${mensaje}`], function (err, reply) {
      res.json({
        response: true,
        message: `Bienvenido a la seccion de comentarios ${req.body.user}`,
        data: []
      });
    });
  } catch (err) {
    res.json({
      response: false,
      message: err.message
    })
  }




});

module.exports = app;
