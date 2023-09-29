const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({
  fecha_ingreso: {
    type: String,
    required: true
  },
  fecha_salida: {
    type: String,
    required: true
  },
  cantidad_personas: {
    type: String,
    required: true
  },
  ciudad_destino: {
    type: String,
    required: true
  },
  contacto_emergencia: {
    type: String,
    required: true
  },
  tel_contacto: {
    type: String,
    required: true
  },
  residents: {
    type: Array,
    required: true
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  habitacion: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Habitacion'
  }
}, { collection: 'Reservas'});

ReservaSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object
})

module.exports = model('Reserva', ReservaSchema);
