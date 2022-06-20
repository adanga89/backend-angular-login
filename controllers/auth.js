const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { db } = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {

    const {email, name, pass} = req.body;

    try {
         //Verificar Email
        const usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "Usaurio Existente"
            })
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        //HAshear contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.pass = bcrypt.hashSync(pass, salt);

        //Generar JWT


        //Crear usuario
        await dbUser.save();
        
        //Respuesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name
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