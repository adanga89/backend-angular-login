const { response } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {

    const {email, name, pass} = req.body;

    try {
         //Verificar Email
        let usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "Usaurio Existente"
            })
        }

        // Crear usuario con el modelo
        usuario = new Usuario( req.body );

        //HAshear contraseña


        //Generar JWT


        //Crear usuario
        await usuario.save();

        //Respuesta
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name,
            msg: "Crear usuario /new"
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
   
};

const loginUsuario = (req, res) => {

    const {email, password} = req.body;

    return res.json({
        ok: true,
        msg: "Login usuario /new"
    })
};

const revalidarToken = (req, res) => {
    return res.json({
        ok: true,
        msg: "Renew"
    })
};

module.exports = {
    crearUsuario,
    loginUsuario, 
    revalidarToken
}