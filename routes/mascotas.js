let router = require('express').Router();

const {
    crearMascota, 
    obtenerMascotas, 
    modificarMascota, 
    eliminarMascota,
    count
} = require('../controllers/mascotas');

router.get('/', obtenerMascotas);
router.get('/count/:cat', count);
router.get('/:id', obtenerMascotas);
router.post('/', crearMascota);
router.put('/:id', modificarMascota);
router.delete('/:id', eliminarMascota);

module.exports = router;