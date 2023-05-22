const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asistenciaSchema = new Schema({
  nombre: String,
  dni:Number,
  materia: String,
  fecha:String,
  anio:Number
})
module.exports = mongoose.model('Asistencia', asistenciaSchema);