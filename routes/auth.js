const { Router, response } = require('express');

const router = Router();

//Registro de Usuario
router.post('/new', (req, res) => {
    return res.json({
        ok: true,
        msg: "Crear usuario /new"
    })
});

//Login de Usuario
router.post('/', (req, res) => {
    return res.json({
        ok: true,
        msg: "Login usuario /new"
    })
});

//
router.get('/renew', (req, res) => {
    return res.json({
        ok: true,
        msg: "Renew"
    })
})


module.exports = router;