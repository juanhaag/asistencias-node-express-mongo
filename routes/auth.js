const router = require("express").Router();
const Profesor = require("../models/Profesor");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const bcrypt = require("bcrypt");
//Validaciones
const schemaRegister = Joi.object({
  nombre: Joi.string().min(4).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  cursos: Joi.array().items(
    Joi.object({
      nombre: Joi.string().required(),
    })
  ),
});
const schemaLogin = Joi.object({
  email: Joi.string().min(4).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});
router.post("/register", async (req, res) => {
  // Validar datos del registro
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const isEmailExist = await Profesor.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email ya registrado" });
  }
  // hash contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const profesor = new Profesor({
    nombre: req.body.nombre,
    email: req.body.email,
    password,
    cursos: req.body.cursos,
  });
  try {
    const profesorDB = await profesor.save();
    res.status(200).json({
      mensaje: "Profesor registrado",
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
router.post("/login", async (req, res) => {
  // validaciones
  const { error } = schemaLogin.validate(req.body);

  console.log("-----------------------------\nIntento de login");
  const ip = req.ip; // Obtiene la dirección IP del cliente
  const userAgent = req.get("User-Agent"); // Obtiene el agente del usuario
  console.log(`IP: ${ip}, User Agent: ${userAgent}`);
  console.log("-----------------------------\nIntento de login");
  if (error) return res.status(400).json({ error: error.details[0].message });
  const profesor = await Profesor.findOne({ email: req.body.email });
  if (!profesor)
    return res.status(400).json({ error: "Usuario no encontrado" });
  const validPassword = await bcrypt.compare(
    req.body.password,
    profesor.password
  );
  if (validPassword) {
    const token = jwt.sign(
      {
        name: profesor.email,
        password: profesor.password,
      },
      process.env.TOKEN_SECRET
    );
    return res.header("auth-token", token).json({
      error: null,
      token,
    });
  }
});
router.get("/login", (req, res) => {
  res.render("../views/login.ejs");
});
module.exports = router;
