let router = require('express').Router();

const {
    crearUsuario, 
    obtenerUsuarios, 
    modificarUsuario, 
    eliminarUsuario
} = require('../controllers/usuarios');

const auth = require('./auth')

router.get('/', auth.requerido, obtenerUsuarios);
router.get('/:id', auth.requerido, obtenerUsuarios);
router.post('/', crearUsuario); // no se requiere para que un usuario pueda registrarse
router.post('/entrar', iniciarSesion);
router.put('/:id', auth.requerido,modificarUsuario);
router.delete('/:id', auth.requerido,eliminarUsuario);

module.exports = router;