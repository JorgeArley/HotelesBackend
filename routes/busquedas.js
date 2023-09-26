/**
 * Ruta: /api/todo/:busqueda
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJwt } = require('../middlewares/validar-jwt');
const { getTodo } = require('../controllers/busquedas.controller');

const router = Router();

router.get('/:busqueda', validarJwt, getTodo);



module.exports = router;