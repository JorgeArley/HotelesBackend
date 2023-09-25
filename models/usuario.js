const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: true
  },
  apellidos: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  fecha_nacimiento: {
    type: String,
    require: true
  },
  genero: {
    type: String,
    require: true
  },
  tipo_documento: {
    type: String,
    require: true
  },
  doc_user: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  telefono: {
    type: String,
    require: true
  },
  contacto_emergencia: {
    type: String,
  },
  tel_contacto: {
    type: String,
  },
});

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object
})

module.exports = model('Usuario', UsuarioSchema);

