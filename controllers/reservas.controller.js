const Reserva = require('../models/reserva');
const { response } = require('express');


const getReservas = async (req, res = response) => {

  const reservas = await Reserva.find()
    .populate('usuario', 'nombre')
    .populate({ 
      path: 'habitacion',
      populate: {
        path: 'hotel'
      } 
    });

  res.json({
    ok: true,
    reservas
  });
}

const postReserva = async (req, res = response) => {


  const uid = req.uid;

  const reserva = new Reserva({
    usuario: uid,
    ...req.body
  });

  try {

    const ReservaDB = await reserva.save();

    res.json({
      ok: true,
      Reserva: ReservaDB
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el post de Reserva'
    });
  }
}

const putReserva = async (req, res = response) => {

  const uid = req.params.id;


  try {

    res.json({
      ok: true,
      uid
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el put de reservas'
    });
  }
}


module.exports = {
  getReservas,
  postReserva,
  putReserva
}
