const Habitacion = require('../models/habitacion');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const ObjectId = require('mongoose').Types.ObjectId; 


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

const getHabitacionByID = async (req, res = response) => {

  const rid = req.params.id;

  try {
    const HabitacionDB = await Habitacion.findById(rid)
        .populate('usuario', 'nombre')
        .populate('hotel', 'nombre imagen')

    if (!HabitacionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese Habitacion'
      });
    }

    res.json({
      ok: true,
      habitacion: HabitacionDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el getpor id de habitacion'
    });
  }
}

const getHabitacionByHotel = async (req, res = response) => {

  const busqueda = req.params.idHotel;

  const query = { hotel: new ObjectId(busqueda) };
  try{

    const habitacion = await Habitacion.find(query)

    if (!habitacion) {
      return res.status(404).json({
        ok: false,
        msg: 'ese hotel no tiene habitaciones asignadas'
      });
    }

    res.json({
      ok: true,
      msg: busqueda,
      habitacion
    });
    


  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el get de habitacion por hotel'
    });
  }
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

  const rid = req.params.id;

  try {

    const HabitacionDB = await Habitacion.findById(rid);

    console.log(HabitacionDB)
    if (!HabitacionDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese Habitacion'
      });
    }

    const newValuesHabitacion = {
      ...req.body
    }


    const HabitacionActualizado = await Habitacion.findByIdAndUpdate(rid, newValuesHabitacion, { new: true });


    res.json({
      ok: true,
      habitacion: HabitacionActualizado
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
  getHabitacionByID,
  getHabitacionByHotel,
  postHabitacion,
  putHabitacion
}
