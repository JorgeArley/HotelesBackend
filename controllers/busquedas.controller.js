const Reserva = require('../models/reserva');
const { response } = require('express');


const getTodo = async (req, res = response) => {

  const busqueda = req.params.busqueda;
  const regex = new RegExp( busqueda, 'i');
  
  
  const reservas = await Reserva
      .find({ $or: [
        { cantidad_personas: regex },
        { ciudad_destino: regex },
        { fecha_ingreso: regex },
        { fecha_salida: regex }
      ]})
      .populate('usuario', 'nombre')
      .populate({ 
        path: 'habitacion',
        populate: {
          path: 'hotel'
        } 
      });

  res.json({
    ok: true,
    msg: busqueda,
    reservas
  });
}


module.exports = {
  getTodo,

}
