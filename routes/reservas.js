/**
 * Ruta: /api/reservas
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getReservas, postReserva, putReserva } = require('../controllers/reservas.controller');



const router = Router();

router.get('/', getReservas);
router.post('/',
  [
    validarJwt,
    check('fecha_ingreso', 'fecha_ingreso es requerido').not().isEmpty(),
    check('fecha_salida', 'fecha_salida es requerido').not().isEmpty(),
    check('cantidad_personas', 'cantidad_personas es requerido').not().isEmpty(),
    check('ciudad_destino', 'ciudad_destino es requerido').not().isEmpty(),
    check('contacto_emergencia', 'contacto_emergencia es requerido').not().isEmpty(),
    check('tel_contacto', 'tel_contacto es requerido').not().isEmpty(),
    validarCampos,
  ],
  postReserva
);
router.put('/:id',
  [
    validarCampos,
  ],
  putReserva
);


module.exports = router;