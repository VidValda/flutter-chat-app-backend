
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
    client.emit("bandas-activas",bands.getBands());
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });
    client.on("mensaje",(payload)=>{
        console.log("Mensaje",payload);
        io.emit("mensaje", {admin: "Nuevo mensaje"});
    });
    client.on("vote-band",(payload)=>{
        bands.voteBand(payload.id);
        io.emit("bandas-activas",bands.getBands());
    })
    client.on("add-band",(payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit("bandas-activas",bands.getBands());
    })
    client.on("delete-band",(payload)=>{
        bands.deleteBand(payload.id);
        io.emit("bandas-activas",bands.getBands());
    })
});

