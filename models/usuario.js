const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fecha_nacimiento: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  tipo_documento: {
    type: String,
    required: true
  },
  doc_user: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object
})

module.exports = model('Usuario', UsuarioSchema);

