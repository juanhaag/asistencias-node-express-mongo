const express = require("express");
const Asistencia = require("../models/Asistencia");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/asistencia", async (req, res) => {
  const { dni, nombre, materia, anio, email } = req.body;
  try {
    const fechaHoy = new Date();
    const fechaParse = fechaHoy.toLocaleDateString("en-US");
    const asistenciaDB = new Asistencia({
      nombre,
      email,
      dni,
      materia,
      fecha: fechaParse,
      anio,
    });
    await asistenciaDB.save();
    enviarMail({ materia,nombre },fechaParse);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("Asistencia cargada!");
});
function enviarMail(req,fecha) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_CORREO,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_CORREO,
    to: process.env.EMAIL_CORREO,
    subject: `Asistencia ${req.materia} el dia  ${fecha} `,
    html: `
    <h1>Hola ${req.nombre} quedo registrada tu asistencia a ${req.materia} el dia ${fecha}</h1>
    <img src="https://gyazo.com/69d85c1b793f6bf190b4bcebd1bc8bcc" alt="Imagen" style="display:block; width:300px; height:auto;">
  `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
router.get("/", (req, res) => {
  res.status(404).send("No existe la ruta donde");
});
module.exports = router;
