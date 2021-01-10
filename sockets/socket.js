
const {io} = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Faraon Love Shaddy"));
bands.addBand(new Band("Bon jovi"));
bands.addBand(new Band("Héroes del silencio"));
bands.addBand(new Band("Metallica"));



//Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente conectado");
    
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });
});

