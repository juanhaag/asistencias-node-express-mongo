const router = require("express").Router();
const Profesor = require("../models/Profesor");
const Asistencia = require("../models/Asistencia");
const { parse } = require("json2csv");
router.get("/", async (req, res) => {
  res.render("../views/dashboard");
});
router.get("/todos", async (req, res) => {
  let asistencias = [];
  const profesorDB = await Profesor.find({ email: req.profesor.name });
  for (const element of profesorDB[0].cursos) {
    const asistencia = await Asistencia.find({ materia: element.nombre });
    //Usamos spread para poder exparcir los arrays de las materias en uno solo
    asistencias = [...asistencias, ...asistencia];
  }

  console.log(asistencias);
  res.send(asistencias);
});
router.get("/buscardni/:dni", async (req, res) => {
  let asistencias = [];
  const dni = req.params.dni;
  const profesorDB = await Profesor.find({ email: req.profesor.name });
  for (const element of profesorDB[0].cursos) {
    const asistencia = await Asistencia.find({ materia: element.nombre });
    //Usamos spread para poder exparcir los arrays de las materias en uno solo
    asistencias = [...asistencias, ...asistencia];
  }
  asistencias.filter((e) => e.dni == dni);
  res.send(asistencias);
});
router.get("/generarcsv", async (req, res) => {
  let asistencias = [];
  const profesorDB = await Profesor.find({ email: req.profesor.name });
  for (const element of profesorDB[0].cursos) {
    const asistencia = await Asistencia.find({ materia: element.nombre });
    //Usamos spread para poder exparcir los arrays de las materias en uno solo
    asistencias = [...asistencias, ...asistencia];
  }
  asistencias.sort((a, b) => {
    if (a.materia > b.materia) {
      return 1;
    }
    if (a.materia < b.materia) {
      return -1;
    }
    return 0;
  });
  const fields = ["nombre", "dni", "materia", "fecha"];
  const opts = { fields };
  const csv = parse(asistencias,opts);
  console.log(csv);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=asistencias.csv");
  res.send(csv);
});
module.exports = router;
