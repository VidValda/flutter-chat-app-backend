const {Router, response} = require("express");
const { check } = require("express-validator");
const { crearUsuario,login,renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/new",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("email","El email es obligatorio").isEmail(),
    check("password","El password es obligatorio").not().isEmpty(),
    validateFields
],crearUsuario);

// post: /
// validar email, password
router.post("/",[
    check("email","El email es obligatorio").isEmail(),
    check("password","El password es obligatorio").not().isEmpty(),
    validateFields
],login);

// validarJWT
router.get("/renew",validateJWT, renewToken );


module.exports = router;

