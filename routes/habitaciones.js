/**
 * Ruta: /api/habitaciones
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getHabitaciones, postHabitacion, putHabitacion, getHabitacionByID, getHabitacionByHotel } = require('../controllers/habitaciones.controller');



const router = Router();

router.get('/', getHabitaciones);
router.get('/hotel/:idHotel', getHabitacionByHotel);
router.get('/:id',validarJwt, getHabitacionByID);
router.post('/',
  [
    validarJwt,
    check('habilitado', 'habilitado es requerido').not().isEmpty(),
    check('disponible', 'disponible es requerido').not().isEmpty(),
    check('costo_base', 'costo_base es requerido').not().isEmpty(),
    check('impuesto', 'impuesto es requerido').not().isEmpty(),
    check('tipo', 'tipo es requerido').not().isEmpty(),
    check('ubicacion', 'ubicacion es requerido').not().isEmpty(),
    check('numero', 'numero es requerido').not().isEmpty(),
    check('hotel', 'el id del hotel debe ser valido').isMongoId(),
    validarCampos,
  ],
  postHabitacion
);
router.put('/:id',
  [
    validarCampos,
  ],
  putHabitacion
);


module.exports = router;