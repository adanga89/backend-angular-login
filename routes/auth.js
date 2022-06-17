const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

//Registro de Usuario
router.post('/new', [
    check('name', 'Nombre es Requerido').not().isEmpty().isLength({min: 6}),
    check('email', 'Email Obligatorio').isEmail(),
    check('pass', 'Password Obligatorio').isLength({ min: 6}),
    validarCampos
] ,crearUsuario);

//Login de Usuario
router.post('/', [
    check('email', 'Email Obligatorio').isEmail(),
    check('pass', 'Password Obligatorio').isLength({ min: 6}),
    validarCampos
] , loginUsuario);

//
router.get('/renew', revalidarToken)


module.exports = router;