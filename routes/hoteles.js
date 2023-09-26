/**
 * Ruta: /api/hoteles
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getHoteles, postHotel, putHotel } = require('../controllers/hoteles.controller');


const router = Router();

router.get('/',validarJwt, getHoteles);
router.post('/',
  [
    validarJwt,
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('direccion', 'direccion es requerido').not().isEmpty(),
    check('imagen', 'imagen es requerido').not().isEmpty(),
    check('cantidad_habitaciones', 'cantidad_habitaciones es requerido').not().isEmpty(),
    check('numero_estrellas', 'numero_estrellas es requerido').not().isEmpty(),
    check('pais', 'pais es requerido').not().isEmpty(),
    validarCampos
  ],
  postHotel
);
router.put('/:id',
  [
    
  ],
  putHotel
);


module.exports = router;