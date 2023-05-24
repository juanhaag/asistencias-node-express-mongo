const router = require("express").Router();
const Profesor = require("../models/Profesor");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const profesor = new Profesor({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(req.body.email)) {
    const profesor = await Profesor.findOne({ email: req.body.email });
    if (req.body.password === profesor.password) {
      const token = jwt.sign(
        {
          name: profesor.email,
          password: profesor.password,
        },
        process.env.TOKEN_SECRET
      );
      return res.header("auth-token", token).json({
        error: null,
        token
      });
    }
    if (!profesor) {
      return res
        .status(400)
        .json({ error: "Hubo un error al encontrar el mail del profesor" });
    }
  }
});
router.get("/login", (req, res) => {
  res.render('../views/login.ejs');
});
module.exports = router;
