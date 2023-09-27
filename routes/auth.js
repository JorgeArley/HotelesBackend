/**
 * Ruta: /api/login
 */

const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/renew', validarJwt, renewToken);

router.post('/',
    [
        check('email', 'email es requerido').isEmail(),
        check('password', 'password es requerido').not().isEmpty(),
        validarCampos
    ],
    login
);


module.exports = router;