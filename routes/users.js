const {Router, response} = require("express");
const { getUsers } = require("../controllers/users");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
// post: /
// validar email, password

// validarJWT
router.get("/",validateJWT, getUsers );


module.exports = router;

