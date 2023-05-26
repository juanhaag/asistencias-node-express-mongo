const router = require("express").Router();
const Profesor = require("../models/Profesor");
const Asistencia = require("../models/Asistencia");
const { parse } = require("json2csv");
router.get("/", async (req, res) => {
  const profesorDB = await Profesor.find({ email: req.profesor.name });
  // Crear un array para almacenar todas las materias
  const materias = [];
  // Recorrer los cursos del profesor y agregar las materias al array
  for (const curso of profesorDB[0].cursos) {
    materias.push(curso.nombre);
  }
  console.log(materias);
  res.render("../views/dashboard", {
    titulo: profesorDB[0].nombre,
    materias: materias,
  });
});
router.get("/todos", async (req, res) => {
  let asistencias = [];
  let asistenciasMateriaUnica = [];
  const materia = req.query.materia;
  const profesorDB = await Profesor.find({ email: req.profesor.name });
  for (const element of profesorDB[0].cursos) {
    console.log("Nombre elemento", element.nombre, " ", "materia ", materia);
    if (element.nombre === materia) {
      console.log("entre con", materia);
      const asistencia = await Asistencia.find({ materia: element.nombre });
      console.log(asistencia);
      asistenciasMateriaUnica.push(asistencia);
    }
    //Usamos spread para poder exparcir los arrays de las materias en uno solo
    //asistencias = [...asistencias, ...asistencia];
  }

  console.log(asistencias);
  res.send(asistenciasMateriaUnica);
});

//Endpoint encargado de devolver el promedio de todos los estudiantes que contenga dicho profesor
router.get("/todospromedio", async (req, res) => {
  const asistenciasConPromedio = [];
  let asistenciasMateriaUnica = [];
  const materia = req.query.materia;
  const numeroClases = req.query.numeroclases;
  const profesorDB = await Profesor.find({ email: req.profesor.name });
  for (const element of profesorDB[0].cursos) {
    if (element.nombre === materia) {
      console.log("entre con", materia);
      const asistencia = await Asistencia.find({ materia: element.nombre });
      console.log(asistencia);
      asistenciasMateriaUnica.push(asistencia);
    }
  }
  const promediosPorAlumno = {};
  // Recorremos los cursos del profesor para buscar las asistencias correspondientes
  for (const asistencia of asistenciasMateriaUnica[0]) {
    const dni = asistencia.dni; // Cambiar asistencia[0].dni a asistencia.dni
    if (dni in promediosPorAlumno) {
      // Verificamos si el DNI ya está registrado en el objeto promediosPorAlumno

      // Verificar si asistencia es un objeto válido
      // Si el DNI ya está registrado y asistencia es un objeto válido, actualizamos los valores
      promediosPorAlumno[dni].suma += 1;
      promediosPorAlumno[dni].contador = numeroClases;
    } else {
      // Si el DNI no está registrado en el objeto promediosPorAlumno

      // Verificar si asistencia es un objeto válido
      // Si asistencia es un objeto válido, creamos una nueva entrada en promediosPorAlumno

      promediosPorAlumno[dni] = {
        suma: 1,
        contador: numeroClases,
      };
    }
  }
  // Calculamos el promedio por alumno y lo agregamos al array asistenciasConPromedio
  for (const dni in promediosPorAlumno) {
    const promedio =
      (promediosPorAlumno[dni].suma / promediosPorAlumno[dni].contador) * 100;
    asistenciasConPromedio.push({ dni, promedio });
  }
  asistenciasConPromedio.forEach((e) => {
    let asistenciaConNombre = asistenciasMateriaUnica[0].find(
      (asistenciaElemento) => asistenciaElemento.dni == e.dni
    );
    e.nombre = asistenciaConNombre.nombre;
  });
  // Enviamos la respuesta con el array asistenciasConPromedio
  res.send(asistenciasConPromedio);
});

/* router.get("/todospromedio", async (req, res) => {
  let asistencias = [];
  const asistenciasConPromedio = [];
  const materia = req.query.materia;
  const numeroClases = req.query.numeroclases;
  const profesorDB = await Profesor.find({ email: req.profesor.name });
  for (const element of profesorDB[0].cursos) {
    const asistencia = await Asistencia.find({ materia: element.nombre });
    asistencias = [...asistencias, ...asistencia];
  }
  const promediosPorAlumno = {};
  // Recorremos los cursos del profesor para buscar las asistencias correspondientes
  for (const asistencia of asistencias) {
    const dni = asistencia.dni;
    const asistenciasAlumno = asistencias;
    if (dni in promediosPorAlumno) {
      // Verificamos si el DNI ya está registrado en el objeto promediosPorAlumno
      if (asistenciasAlumno?.length) {
        // Verificar si asistenciasAlumno es un array válido
        // Si el DNI ya está registrado y asistenciasAlumno es un array válido, actualizamos los valores
        promediosPorAlumno[dni].suma += 1;

        promediosPorAlumno[dni].contador = numeroClases;
      }
    } else {
      // Si el DNI no está registrado en el objeto promediosPorAlumno
      if (asistenciasAlumno?.length) {
        // Verificar si asistenciasAlumno es un array válido
        // Si asistenciasAlumno es un array válido, creamos una nueva entrada en promediosPorAlumno
        promediosPorAlumno[dni] = {
          suma: 1,
          contador: numeroClases,
        };
      }
    }
  }
  // Calculamos el promedio por alumno y lo agregamos al array asistenciasConPromedio
  for (const dni in promediosPorAlumno) {
    const promedio =
      (promediosPorAlumno[dni].suma / promediosPorAlumno[dni].contador) * 100;
    asistenciasConPromedio.push({ dni, promedio });
  }
  asistenciasConPromedio.forEach((e) => {
    let asistenciaConNombre = asistencias.find(
      (asistenciaElemento) => asistenciaElemento.dni == e.dni
    );
    e.nombre = asistenciaConNombre.nombre;
  });
  // Enviamos la respuesta con el array asistenciasConPromedio
  res.send(asistenciasConPromedio);
}); */
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
  const csv = parse(asistencias, opts);
  console.log(csv);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=asistencias.csv");
  res.send(csv);
});
module.exports = router;
