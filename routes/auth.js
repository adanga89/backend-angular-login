const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

//Registro de Usuario
router.post('/new', crearUsuario);

//Login de Usuario
router.post('/', loginUsuario);

//
router.get('/renew', revalidarToken)


module.exports = router;