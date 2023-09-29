const { Schema, model } = require('mongoose');

const HotelSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  cantidad_habitaciones: {
    type: String,
    required: true
  },
  numero_estrellas: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
  enable: {
    type: Boolean,
    required: true
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
}, { collection: 'hoteles'});

HotelSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object
})

module.exports = model('Hotel', HotelSchema);

