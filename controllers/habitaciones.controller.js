const Habitacion = require('../models/habitacion');
const bcrypt = require('bcryptjs');
const { response } = require('express');


const getHabitaciones = async (req, res = response) => {

  const desde = Number(req.params.desde) || 0;

  const [ habitaciones, total ] = await Promise.all([
    Habitacion.find()
    .skip(desde)
    .limit(50)
    .populate('usuario', 'nombre')
    .populate('hotel', 'nombre imagen'),
    Habitacion.count()
  ]);

  res.json({
    ok: true,
    habitaciones,
    total
  });
}

const postHabitacion = async (req, res = response) => {


  const uid = req.uid;

  const habitacion = new Habitacion({
    usuario: uid,
    ...req.body
  });

  try {
    
    const habitacionDB = await habitacion.save();

    res.json({
      ok: true,
      habitacion: habitacionDB
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el post de habitacion'
    });
  }
}

const putHabitacion = async (req, res = response) => {

  const uid = req.params.id;


  try {
    //validar token 

    // const HabitacionDB = await Habitacion.findById(uid);

    // if (!HabitacionDB) {
    //   return res.status(404).json({
    //     ok: false,
    //     msg: 'No existe ese Habitacion'
    //   });
    // }

    // //actualizaciones

    // const { password, email, ...campos } = req.body;
    // if (HabitacionDB.email !== email) {
    //   const existEmail = await Habitacion.findOne({ email });
    //   if (existEmail) {
    //     return res.status(400).json({
    //       ok: false,
    //       msg: 'Ya existe un Habitacion con ese email'
    //     });
    //   }
    // }

    // campos.email = email;
    // const HabitacionActualizado = await Habitacion.findByIdAndUpdate(uid, campos, { new: true });


    res.json({
      ok: true,
      uid
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el put de habitacion'
    });
  }
}


module.exports = {
  getHabitaciones,
  postHabitacion,
  putHabitacion
}
