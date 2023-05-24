const mongoose = require("mongoose");

const profesorSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cursos: [],
});

module.exports = mongoose.model("Profesores", profesorSchema);
