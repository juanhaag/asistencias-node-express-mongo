const express = require("express");
const Asistencia = require("../models/Asistencia");
const router = express.Router();

router.post("/asistencia", async (req, res) => {
  const { dni, nombre, materia, anio } = req.body;
  try {
    const fechaHoy = new Date();
    const fechaParse = fechaHoy.toLocaleDateString("en-US");
    const asistenciaDB = new Asistencia({
      nombre,
      dni,
      materia,
      fecha: fechaParse,
      anio,
    });
    await asistenciaDB.save();
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("Asistencia cargada!");
});

router.get("/", (req, res) => {

  res.status(404).send("No existe la ruta donde");
});
module.exports = router;
