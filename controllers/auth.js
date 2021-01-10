
const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require("../models/user")
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req,res = response)=>{
    
    const {email,password} = req.body;
    try {
        const existeEmail = await User.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado"
            });
        }
        const user = new User(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);


        await user.save();
        // Generar el JWT
        const token = await generarJWT(user.id);
        res.json({
            ok:true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "hable con el admin B))"
        })
    } 
}

// const login.... rq res...
// {ok:true, msg: "login"}
const login = async(req,res = response)=>{
    
    const {email,password} = req.body;
    try {
        const userDB = await User.findOne({email});
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "no existe email"
            });
        }
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: "contraseña invalida"
            })
        }
        // generar el JWT
        const token = await generarJWT(userDB.id);
        res.json({
            ok:true,
            user:userDB,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "hable con el admin B))"
        })
    } 
}

const renewToken = async (req,res = response) =>{
    // const uid uid del usuario
    const uid = req.uid;
    // generar un nuevo JWT, generarJWT... uid..
    const token = await generarJWT(uid);
    // obtener el usuario por el uid, Usuario.findbyId..
    const user = await User.findById(uid);
    
    res.json({
        ok:true,
        user,
        token
    });
}



module.exports = {
    crearUsuario,
    login,
    renewToken
}