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

  const uid = req.params.id;


  try {
    //validar token 

    // const HotelDB = await Hotel.findById(uid);

    // if (!HotelDB) {
    //   return res.status(404).json({
    //     ok: false,
    //     msg: 'No existe ese Hotel'
    //   });
    // }

    // //actualizaciones

    // const { password, email, ...campos } = req.body;
    // if (HotelDB.email !== email) {
    //   const existEmail = await Hotel.findOne({ email });
    //   if (existEmail) {
    //     return res.status(400).json({
    //       ok: false,
    //       msg: 'Ya existe un Hotel con ese email'
    //     });
    //   }
    // }

    // campos.email = email;
    // const HotelActualizado = await Hotel.findByIdAndUpdate(uid, campos, { new: true });


    res.json({
      ok: true,
      uid
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
  postHotel,
  putHotel
}
