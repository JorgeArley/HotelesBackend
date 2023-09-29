/**
 * Ruta: /api/hoteles
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getHoteles, postHotel, putHotel, getHotelesByID } = require('../controllers/hoteles.controller');


const router = Router();

router.get('/',validarJwt, getHoteles);
router.get('/:id',validarJwt, getHotelesByID);
router.post('/',
  [
    validarJwt,
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('direccion', 'direccion es requerido').not().isEmpty(),
    check('imagen', 'imagen es requerido').not().isEmpty(),
    check('cantidad_habitaciones', 'cantidad_habitaciones es requerido').not().isEmpty(),
    check('numero_estrellas', 'numero_estrellas es requerido').not().isEmpty(),
    check('pais', 'pais es requerido').not().isEmpty(),
    check('enable', 'estado del hotel es requerido').not().isEmpty(),
    validarCampos
  ],
  postHotel
);
router.put('/:id',
  [
    validarJwt,
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('direccion', 'direccion es requerido').not().isEmpty(),
    check('imagen', 'imagen es requerido').not().isEmpty(),
    check('cantidad_habitaciones', 'cantidad_habitaciones es requerido').not().isEmpty(),
    check('numero_estrellas', 'numero_estrellas es requerido').not().isEmpty(),
    check('pais', 'estado del hotel es requerido').not().isEmpty(),
    check('enable', 'pais es requerido').not().isEmpty(),
    validarCampos
  ],
  putHotel
);


module.exports = router;