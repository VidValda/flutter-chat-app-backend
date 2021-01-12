
const { comprobarJWT } = require("../helpers/jwt");
const {io} = require("../index");
const {userConnected,userDisconnected,grabarMensaje} = require("../controllers/socket")




//Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente conectado");
    const[valido, uid] = comprobarJWT(client.handshake.headers["x-token"])
    // Verify authenticcation
    if(!valido){return client.disconnect();}
    // authenticated client
    userConnected(uid);
    // Ingresar a una sala al cliente
    // Sala global, client.id, 5ffbcdd9d76586632844f36f
    client.join(uid);
    // Escuchar mensaje del cliente
    client.on("mensaje-personal", async (payload)=>{
        await grabarMensaje(payload);
        io.to(payload.to).emit("mensaje-personal",payload);
    });
    



    client.on('disconnect', () => {
        userDisconnected(uid);
    });
});

