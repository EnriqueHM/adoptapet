/*  Archivo controllers/usuarios.js
 *  Simulando la respuesta de objetos Usuario
 *  en un futuro aquí se utilizarán los modelos
 */

/*

// importamos el modelo de usuarios
const Usuario = require('../models/Usuario')

// CRUD
function obtenerUsuarios(req, res){
    var usuario1 = new Usuario('1','juancho', 'Juan', 'Vega', 'juan@vega.com', 'abc', 'normal');
    var usuario2 = new Usuario('2', 'montse', 'Montserrat', 'Vega', 'mon@vega.com', '123', 'normal');
    res.send([usuario1, usuario2]);
}

function crearUsuario(req, res){
    var usuario = new Usuario(req.body)
    console.log(req.body)
    res.status(201).send(usuario);
}

function modificarUsuario(req,res){
    var usuario = new Usuario(req.id, 'juancho', 'Juan', 'Vega', 'juan@vega.com', 'abc', 'normal');    
    var modificaciones = req.body;
    usuario = {...usuario, ...modificaciones} 
    res.send(usuario)
}

function eliminarUsuario(req, res){
    res.status(200).send(`El usuario ${req.params.id} fue eliminado`);
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario
}
*/
const mongoose = require('mongoose');
const  Usuario = mongoose.model('Usuario');
const passport = require('passport');

function crearUsuario(req, res, next){
    const body = req.body,
     password= body.password

    delete body.password
    const user = Usuario(body)

    user.crearPassword(password);
    user.save()
    .then(user => {
        return res.status(200).json(user.toAuthJSON());
    })
    .catch(next)
}

function obtenerUsuarios(req, res, next){
    Usuario.findById(req.usuario.id) //por userProperty
    .then(user => {
        if (!user){
            return res.sendStatus(401);
        }
    })
    .catch(next)
}

function modificarUsuario(req, res, next){
    Usuario.findById(req.usuario.id).then(user =>{
        //.
        //.
        //.
        if (typeof nuevaInfo.password !== 'undefined')
            user.crearPassword(nuevaInfo.password)
        user.save().then(updateUser => {
            res.status(201).json(updateUser.publicData())
        }).catch(next)
    }).catch(next)
}

function eliminarUsuario(req, res, next){
    Usuario.findOneAndDelete({_id: req.usuario.id})
    .then(r => 
        {res.status(200).send("Usuario eliminado")
    }).catch(next)
}

function iniciarSesion(req, res, next){
    if( !req.body.email || !req.body.password){
        return res.status(422).json({ error: { email: "falta informacion"}})
    }

    passport.authenticate('local',
    {session: false},
    function(err, user, info){
        if (err){
            return next(err)
        }
        if (user){
            user.token = user.generaJWT();
        }else{
            return res.status(422).json(info);
        }
    })(req, res, next)
}

