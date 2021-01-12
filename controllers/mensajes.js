const { response } = require("express");
const Message = require("../models/message")

const obtenerChat = async(req,res = response)=>{
    const miId = req.uid;
    const mensajesFrom = req.params.from;
    console.log(miId,mensajesFrom);
    const last30 = await Message.find({
        $or:[{from:miId,to:mensajesFrom},{from: mensajesFrom,to:miId}]
    }).sort({createdAt:"desc"}).limit(30);

    res.json({
        ok:true,
        mensajes: last30,
    });
}

module.exports = {
    obtenerChat
}