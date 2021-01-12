/*
    /api/mensajes
*/

const {Router, response} = require("express");
const { obtenerChat } = require("../controllers/mensajes");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
router.get("/:from",validateJWT, obtenerChat );


module.exports = router;

