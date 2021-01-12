
const express = require("express");
const path = require("path");
require("dotenv").config();
// DB config
const { dbConnection } = require('./database/config');
dbConnection();
// App de Express
const app = express();


// Lecture and parse of the body

app.use(express.json());

// Servidor de node
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require("./sockets/socket");



// Path pública (carpeta)
const publicPath = path.resolve(__dirname, "public");
 
app.use(express.static(publicPath));

//mis rutas

app.use("/api/login", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/users"));
app.use("/api/mensajes", require("./routes/mensajes"));



server.listen(process.env.PORT,(err) =>{
    if (err) throw new Error(err);
    console.log("Servidor corriendo en puerto", process.env.PORT);
})
