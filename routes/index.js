// importamos las dependencias necesarias
//let router = require('express').Router();
var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('welcome to adoptapet api');
});

//Configurando las rutas
router.use('/usuarios', require('./usuarios'));
router.use('/mascotas', require('./mascotas'));
/*router.use('/solicitudes', require('./solicitudes'));*/

// exportamos nuestro nuevo router
module.exports = router;
