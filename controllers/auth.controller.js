const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJwt } = require('../helpers/jwt');


const login = async (req, res = response) => {

  const {email, password} = req.body;

  try {
    const usuarioDB = await Usuario.findOne({email}); 


    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      });
    }

    //verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no valida'
      });
    }

    //generar token
    const token = await generarJwt(usuarioDB.id);

        
    res.json({
      ok: true,
      token,
      email,
      type: usuarioDB.type
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el post de login'
    });
  }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJwt( uid );

    try{
      
      const {email} = await Usuario.findOne({_id: uid});

      res.json({
          ok: true,
          email,
          token,
      });

   
    } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el post de login'
    });
  }

}

module.exports = {
  login,
  renewToken
}
