/**
 * Ruta: /api/sendemail
 */

const { Router } = require('express');
const { postEmail } = require('../controllers/email.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
  [
    validarJwt,
    check('email', 'email es requerido').isEmail(),
    check('reserva', 'dato reserva es requerido').not().isEmpty(),
    validarCampos
  ],
  postEmail
);


module.exports = router;