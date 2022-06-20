const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { db } = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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
        const token = await generarJWT( dbUser.id, name);

        //Crear usuario
        await dbUser.save();
        
        //Respuesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name, 
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
   
};

const loginUsuario = async (req, res) => {

    const {email, pass} = req.body;

    try {

        const dbUser = await Usuario.findOne({email});

        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: process.env.Debug ? "Correo Inexistente" : "Usuario o Constraseña Incorrectos" 
            })
        }

        //Confirmar Password
        const validPassword = bcrypt.compareSync(pass, dbUser.pass)
        
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: process.env.Debug ? "Password no coincide" : "Usuario o Constraseña Incorrectos" 
            })
        }

        //Generar JWT
        const token = await generarJWT( dbUser.id, dbUser.name);

        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name, 
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }

   
};

const revalidarToken = async (req, res) => {

    const {uid, name} = req;
    //Generar JWT
    const token = await generarJWT( uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    })
};

module.exports = {
    crearUsuario,
    loginUsuario, 
    revalidarToken
}