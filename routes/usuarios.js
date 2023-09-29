/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuario, putUsuario } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJwt, getUsuarios);
router.post('/',
  [
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('apellidos', 'apellidos es requerido').not().isEmpty(),
    check('password', 'password es requerido').not().isEmpty(),
    check('fecha_nacimiento', 'fecha_nacimiento es requerido').not().isEmpty(),
    check('genero', 'genero es requerido').not().isEmpty(),
    check('tipo_documento', 'tipo_documento es requerido').not().isEmpty(),
    check('doc_user', 'documento es requerido').not().isEmpty(),
    check('email', 'email es requerido').isEmail(),
    check('telefono', 'telefono es requerido').not().isEmpty(),
    check('type', 'el role es requerido').not().isEmpty(),
    validarCampos,
  ],
  postUsuario
);
router.put('/:id',
  [
    validarJwt,
    check('nombre', 'nombre es requerido').not().isEmpty(),
    check('apellidos', 'apellidos es requerido').not().isEmpty(),
    check('fecha_nacimiento', 'fecha_nacimiento es requerido').not().isEmpty(),
    check('genero', 'genero es requerido').not().isEmpty(),
    check('tipo_documento', 'tipo_documento es requerido').not().isEmpty(),
    check('doc_user', 'documento es requerido').not().isEmpty(),
    check('email', 'email es requerido').isEmail(),
    check('telefono', 'telefono es requerido').not().isEmpty(),
    validarCampos,
  ],
  putUsuario
);


module.exports = router;