//const Mascota = require('../models/Mascota')

const mongoose = require('mongoose');
const Mascota = mongoose.model("Mascota");

// CRUD
/*
function crearMascota(req, res){
    var mascota = new Mascota(req.body)
    res.status(200).send(mascota);
}*/

function crearMascota(req, res, next){
    let mascota = new Mascota(req.body);
    mascota.save().then(mas => {  // then es cuando todo sale bien
        res.status(200).send(mas)
    }).catch(next); //next mongoose ya sabe como encargarse del error
}

/*
function obtenerMascotas(req, res){
    var mascota1 = new Mascota(1, 'firulais', 'perro', 'urlperro', 'labrador', 'anunciante', 'CDMX');
    var mascota2 = new Mascota(2, 'michi', 'gato', 'urlgato', 'angora', 'anunciante', 'CDMX');
    res.send([mascota1, mascota2]);
}*/

function obtenerMascotas(req, res, next){
    if(req.params.id){
        Mascota.findById(req.params.id)
        .then(mas => {res.status(200).send(mas)})
        .catch(next)
    }else{
        Mascota.find()
        .then(mas => {res.status(200).send(mas)})
        .catch(next)
    }
}

/*
function modificarMascota(req, res){
    var usuario = new Mascota(req.params.id, 'firulais', 'perro', 'urlfoto', 'labrador', 'anunciante', 'centro')
    var modificaciones = req.body;
    usuario = {...usuario, ...modificaciones} 
    res.send(usuario)
}*/

function modificarMascota(req, res, next){
    Mascota.findById(req.params.id)
    .then(mascota => {
        if(!mascota){ return res.sendStatus(401); }
        let nuevaInfo = req.body;
        if(typeof nuevaInfo.nombre !== "undefined")
            mascota.nombre = nuevaInfo.nombre;        
        if(typeof nuevaInfo.categoria !== "undefined")
            mascota.categoria = nuevaInfo.categoria;  
        if(typeof nuevaInfo.fotos !== "undefined")
            mascota.fotos = nuevaInfo.fotos;  
        if(typeof nuevaInfo.descripcion !== "undefined")
            mascota.descripcion = nuevaInfo.descripcion; 
        if(typeof nuevaInfo.anunciante !== "undefined")
            mascota.anunciante = nuevaInfo.anunciante;
        if(typeof nuevaInfo.ubicacion !== "undefined")
            mascota.ubicacion = nuevaInfo.ubicacion;  
        mascota.save()
        .then(updated => {res.status(200).json(updated.publicData())}) //Se hace explicitamente la conversion a json
        .catch(next)
    })
    .catch(next)
}

/*
function eliminarMascota(req, res){
    res.status(200).send(`La mascota ${req.params.id} fue eliminada`);
}*/

function eliminarMascota(req, res, next){
    Mascota.findByIdAndDelete({_id:req.params.id})
    .then(r => {res.status(200).send("La mascota se elimino.")})
    .catch(next)
}

function count(req, res, next){
    let categoria = req.params.cat
    Mascota.aggregate([
        {'$match' : {'categoria' : categoria}},
        {'$count' : 'total'}
    ]).then(r => {res.status(200).send(r)
    }).catch(next)
}

module.exports = {
    crearMascota,
    obtenerMascotas,
    modificarMascota,
    eliminarMascota,
    count
}