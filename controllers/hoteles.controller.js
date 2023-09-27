const Hotel = require('../models/hotel');
const { response } = require('express');


const getHoteles = async (req, res = response) => {
  
  const hoteles = await Hotel.find()
    .populate('usuario', 'nombre');

  res.json({
    ok: true,
    hoteles
  });
}

const getHotelesByID = async (req, res = response) => {

  const hid = req.params.id;

  try {
    const HotelDB = await Hotel.findById(hid)
        .populate('usuario', 'nombre');

    if (!HotelDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese Hotel'
      });
    }

    res.json({
      ok: true,
      hotel: HotelDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el getpor id de hotel'
    });
  }
}

const postHotel = async (req, res = response) => {

  const uid = req.uid;

  const hotel = new Hotel( {
    usuario: uid,
    ...req.body
  } );

  try {

    const hotelDB = await hotel.save();

    res.json({
      ok: true,
      hotel: hotelDB
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el post de hotel'
    });
  }
}

const putHotel = async (req, res = response) => {

  const hid = req.params.id;
  const uid = req.uid;


  try {

    const HotelDB = await Hotel.findById(hid);

    if (!HotelDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese Hotel'
      });
    }

    const newValuesHotel = {
      ...req.body,
      usuario: uid
    }

    const HotelActualizado = await Hotel.findByIdAndUpdate(hid, newValuesHotel, { new: true });


    res.json({
      ok: true,
      hotel: HotelActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el put de hotel'
    });
  }
}


module.exports = {
  getHoteles,
  getHotelesByID,
  postHotel,
  putHotel
}
