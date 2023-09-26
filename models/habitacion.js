const { Schema, model } = require('mongoose');

const HabitacionSchema = Schema({
  habilitado: {
    type: Boolean,
    required: true
  },
  disponible: {
    type: Boolean,
    required: true
  },
  costo_base: {
    type: String,
    required: true
  },
  impuesto: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  }
}, { collection: 'habitaciones'});

HabitacionSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object
})

module.exports = model('Habitacion', HabitacionSchema);

