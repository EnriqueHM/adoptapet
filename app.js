// Express
const express = require('express');
const app = express();

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configuracion de la BD

const mongoose = require('mongoose');
require('./config/passport');

mongoose.connect(
"mongodb+srv://juanrike:<password@>@cluster0.92vrh.mongodb.net/Adoptpet?retryWrites=true&w=majority"
);

// Habilita debugeo
mongoose.set("debug", true);

// esto debe ser antes de las rutas
require('./models/Usuario');
require('./models/Mascota');

// Aqui se define el router
app.use('/v1', require('./routes'));

// Iniciando el servidor
const PORT = 4001;
app.listen(PORT, ()=> {
    console.log(`ITS ALIVE!!! Server listening on port ${PORT}`)
})
/*
//const gods = [{name:'Zeus'}, {name: 'Hades'}, {name: 'Hermes'}]

const gods = { 
    Zeus: { live: 'Olympus', symbol: 'Thunderbolt' }, 
    Hades : { live : 'Underworld', symbol: 'Cornucopia' } 
  };

app.get('/gods', (req, res)=>{
    res.send(gods);
})

const constelaciones = [
    {
        name:'Andromeda',
        abreviatura : 'And',
        superficie :  722.3,
        num_estrellas : 152,
        estr_mas_brillante : 'Alpheratz' 
    },
    {
        name:'El Centauro',
        abreviatura : 'Cen',
        superficie :  1060.4,
        num_estrellas : 281,
        estr_mas_brillante : 'Alfa Centauri' 
    },
    {
        name:'Escorpión',
        abreviatura : 'Esc',
        superficie :  1060.4,
        num_estrellas : 281,
        estr_mas_brillante : 'Antares' 
    }]

app.get('/constelaciones', (req, res)=>{
    res.send(constelaciones);
});

app.get('/gods/:name', (req, res) => {
    let name = req.params.name;
    let god = gods[name];
    if(god){
        res.send(god);
    }else{
        res.status(404).send("No se encontro");
    }
})

// Arreglar
function getConstellation(param){
    return constelaciones[param]
}

app.get('/constelaciones/:param', (req, res)=>{
    let searchBy = req.params.param;
    constelacion = getConstellation(searchBy);
    if(constelacion){
        res.send(constelaciones);
    }else{
        res.status(404).send("Constellation not found");
    }
})

app.put('/gods/:name', (req,res) =>{
    let god = req.params.name;
    gods[god] = req.body
    res.send(gods);
})
*/