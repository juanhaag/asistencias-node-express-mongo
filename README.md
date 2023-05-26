# asistencias-node-express-mongo
Documentación de la Aplicación Web
Introducción
    Requisitos
    Funcionalidades
        Carga de Asistencia
        Búsqueda de Alumnos
        Acceso al Dashboard
        Generación de Archivo CSV
    Flujo de la Aplicación
    Controlador de Asistencias

Requisitos<a name="requisitos"></a>

Requerimientos del sistema

    Node.js: La aplicación está escrita en JavaScript y se ejecuta en el entorno de Node.js. Asegúrate de tener Node.js instalado en tu sistema.

    NPM: NPM es el administrador de paquetes de Node.js y se utiliza para instalar las dependencias requeridas por la aplicación.

Dependencias de la aplicación

Estas son las dependencias que la aplicación utiliza y que deben ser instaladas:

    express: Framework web utilizado para crear y gestionar el servidor HTTP.

    body-parser: Middleware que analiza los datos enviados en el cuerpo de las solicitudes HTTP.

    mongoose: Biblioteca de modelado de objetos MongoDB para Node.js que proporciona una interfaz para interactuar con la base de datos MongoDB.

    dotenv: Módulo utilizado para cargar las variables de entorno desde un archivo .env en el entorno de desarrollo.

    cors: Middleware utilizado para habilitar el intercambio de recursos de origen cruzado (CORS) en el servidor.

    ejs: Motor de plantillas utilizado para renderizar las vistas en formato HTML.

    jsonwebtoken: Biblioteca utilizada para generar y verificar tokens de autenticación JWT (JSON Web Tokens).

    bcrypt: Biblioteca utilizada para el hash y la verificación de contraseñas.

    jsonwebtoken: Biblioteca utilizada para generar y verificar tokens de autenticación JWT (JSON Web Tokens).
Funcionalidades<a name="funcionalidades"></a>

Autenticación y Autorización: La aplicación proporciona funcionalidades de autenticación y autorización para los usuarios. Los usuarios pueden registrarse con un correo electrónico y una contraseña, iniciar sesión en la aplicación y acceder a las características protegidas. Se utilizan tokens de autenticación JSON Web Tokens (JWT) para gestionar las sesiones de los usuarios y garantizar la seguridad de la aplicación.

Gestión de Asistencias: Los profesores pueden realizar un seguimiento de las asistencias de los alumnos a través del panel de control. Pueden registrar la asistencia de los alumnos en diferentes materias y fechas específicas. Los datos de asistencia se almacenan en una base de datos MongoDB y se gestionan mediante operaciones de lectura y escritura.

Dashboard del Profesor: El panel de control proporciona una vista personalizada para cada profesor. Los profesores pueden ver una lista de sus cursos y materias asociadas. Pueden acceder a informes y estadísticas sobre las asistencias de los alumnos, incluyendo el promedio de asistencia por alumno, generar un archivo CSV de las asistencias y buscar asistencias por número de identificación (DNI).

Interfaz de Usuario Amigable: La aplicación web ofrece una interfaz de usuario intuitiva y fácil de usar. Los profesores pueden navegar por las diferentes secciones de la aplicación, interactuar con los elementos de la interfaz y realizar acciones como registrar asistencias, generar informes y buscar datos específicos.

Exportación de Datos: Los profesores tienen la opción de exportar los datos de asistencias en formato CSV. Esto les permite realizar análisis posteriores o utilizar los datos en otras herramientas o sistemas externos.
Carga de Asistencia<a name="carga-de-asistencia"></a>

Esta función permite a los estudiantes cargar la asistencia. La página de inicio (index) incluirá un formulario dinámico que cambiará según el año seleccionado. Los detalles de implementación de este formulario se proporcionarán en la siguiente sección.
Búsqueda de Alumnos<a name="búsqueda-de-alumnos"></a>

Los usuarios podrán buscar alumnos por su número de identificación (DNI) y obtener listados de alumnos según los criterios de búsqueda. Proporciona detalles sobre cómo se realizará la búsqueda y cómo se mostrarán los resultados.
Acceso al Dashboard<a name="acceso-al-dashboard"></a>

Los profesores podrán acceder a un dashboard mediante un proceso de inicio de sesión. Cada profesor tendrá un array de materias asociadas a él. En el dashboard, se mostrarán las materias correspondientes al profesor y se podrán ver todas las asistencias relacionadas con esas materias. También habrá opciones para seleccionar el formato de visualización de las asistencias (porcentaje o asistencia individual).
Generación de Archivo CSV<a name="generación-de-archivo-csv"></a>

Los profesores tendrán la opción de generar un archivo CSV basado en la lista de asistencias, lo cual les permitirá exportar los datos a una hoja de cálculo como Excel. Proporciona detalles sobre cómo se generará el archivo CSV y cómo se relacionará con la lista de asistencias.
Flujo de la Aplicación<a name="flujo-de-la-aplicación"></a>


Permite a los estudiantes cargar una asistencia.

    Método: POST
    Ruta: /asistencia
    Parámetros de entrada:
        dni (String): DNI del estudiante.
        nombre (String): Nombre del estudiante.
        materia (String): Materia de la asistencia.
        anio (String): Año de la asistencia.

Ejemplo de solicitud:

POST /asistencia
Content-Type: application/json

{
  "dni": "12345678",
  "nombre": "Juan Perez",
  "materia": "Matemáticas",
  "anio": "2023"
}

Respuesta exitosa:

    Código de estado: 200
    Cuerpo de la respuesta: "Asistencia cargada!"

Si ocurre un error durante la carga de asistencia, se mostrará un mensaje de error y se registrará en la consola.
Obtener Asistencia

Obtiene la lista de asistencias.

    Método: GET
    Ruta: /

Respuesta:

    Código de estado: 404
    Cuerpo de la respuesta: "No existe la ruta donde"

Este ccontrolador exporta el enrutador router de Express para ser utilizado en otros módulos.
Uso

const express = require("express");
const Asistencia = require("../models/Asistencia");
const router = express.Router();

module.exports = router;

Controlador de Autenticación

Este controlador maneja las operaciones de autenticación, incluyendo el registro y el inicio de sesión de profesores.
Registro de Profesor

Permite a los profesores registrarse en la aplicación.

    Método: POST
    Ruta: /register
    Parámetros de entrada:
        nombre (String): Nombre del profesor.
        email (String): Dirección de correo electrónico del profesor.
        password (String): Contraseña del profesor.
        cursos (Array): Array de objetos que representan los cursos del profesor. Cada objeto debe tener un campo nombre (String) que representa el nombre del curso.

Ejemplo de solicitud:

POST /register
Content-Type: application/json

{
  "nombre": "Juan Perez",
  "email": "juan@example.com",
  "password": "secretpassword",
  "cursos": [
    {"nombre": "Matemáticas"},
    {"nombre": "Historia"}
  ]
}

Respuesta exitosa:

    Código de estado: 200
    Cuerpo de la respuesta: {"mensaje": "Profesor registrado"}

Si ocurre un error durante el registro, se mostrará un mensaje de error y se registrará en la consola.
Inicio de Sesión de Profesor

Permite a los profesores iniciar sesión en la aplicación.

    Método: POST
    Ruta: /login
    Parámetros de entrada:
        email (String): Dirección de correo electrónico del profesor.
        password (String): Contraseña del profesor.

Ejemplo de solicitud:

POST /login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "secretpassword"
}

Respuesta exitosa:

    Código de estado: 200
    Cabecera de respuesta: "auth-token": TOKEN
    Cuerpo de la respuesta: {"error": null, "token": TOKEN}

Si las credenciales de inicio de sesión son válidas, se generará un token de autenticación (TOKEN) utilizando el algoritmo de firma JWT. El token se incluirá en la cabecera de la respuesta con el nombre "auth-token". El token también se incluirá en el cuerpo de la respuesta para facilitar su uso por parte del cliente.
Uso

const router = require("express").Router();
const Profesor = require("../models/Profesor");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

module.exports = router;

Middleware de Verificación de Token

Este middleware se utiliza para verificar la autenticidad y validez de un token de autenticación.
Uso

    Instala las dependencias necesarias, incluyendo jsonwebtoken.

    Importa el módulo jsonwebtoken y define el middleware verifyToken en tu archivo:

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Obtén el token de la solicitud
  const token = req.query.token || req.header("auth-token");

  // Verifica si el token está presente
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Agrega el objeto decodificado a la solicitud para su posterior uso
    req.profesor = decoded;

    // Llama al siguiente middleware
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no válido" });
  }
};

module.exports = verifyToken;

    Utiliza el middleware verifyToken en las rutas o controladores que requieran autenticación:

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// Rutas protegidas por autenticación
router.get("/ruta-protegida", verifyToken, (req, res) => {
  // Acciones para la ruta protegida
});

// Otras rutas...

module.exports = router;

    Asegúrate de tener configurada la variable de entorno TOKEN_SECRET con tu clave secreta para firmar y verificar los tokens.

Funcionamiento

El middleware verifyToken se encarga de realizar las siguientes acciones:

    Obtiene el token de la solicitud, ya sea desde los parámetros de consulta (req.query.token) o desde la cabecera (req.header("auth-token")).

    Verifica si el token está presente. Si no se encuentra, devuelve un código de estado 401 (Acceso denegado) y un mensaje de error.

    Intenta verificar y decodificar el token utilizando la clave secreta configurada (process.env.TOKEN_SECRET). Si el token es válido, el objeto decodificado se agrega a la solicitud en la propiedad profesor para su posterior uso.

    Si el token no es válido, se devuelve un código de estado 400 (Solicitud incorrecta) y un mensaje de error.

    Si todo es exitoso, el middleware pasa la solicitud al siguiente middleware o controlador utilizando la función next().
    
   Controlador del Dashboard de los Profesores

Este controlador se encarga de manejar las solicitudes relacionadas con el dashboard de los profesores.
Uso

    Asegúrate de tener instaladas las dependencias necesarias, incluyendo express, json2csv, mongoose, y los modelos Profesor y Asistencia.

    Importa los módulos y define las rutas en tu archivo de controlador:


const router = require("express").Router();
const Profesor = require("../models/Profesor");
const Asistencia = require("../models/Asistencia");
const { parse } = require("json2csv");

// Ruta principal del dashboard
router.get("/", async (req, res) => {
  // Obtén el profesor desde la base de datos
  const profesorDB = await Profesor.find({ email: req.profesor.name });

  // Crea un array para almacenar todas las materias
  const materias = [];

  // Recorre los cursos del profesor y agrega las materias al array
  for (const curso of profesorDB[0].cursos) {
    materias.push(curso.nombre);
  }

  // Renderiza la vista del dashboard con los datos necesarios
  res.render("../views/dashboard", {
    titulo: profesorDB[0].nombre,
    materias: materias,
  });
});

// Otras rutas relacionadas con el dashboard...

module.exports = router;

    Configura las rutas adicionales según tus necesidades. Por ejemplo, el controlador proporciona las siguientes rutas:
        /todos: Devuelve todas las asistencias de una materia específica.
        /todospromedio: Devuelve el promedio de asistencias de todos los estudiantes en una materia específica.
        /buscardni/:dni: Busca las asistencias de un estudiante específico por su número de identificación (DNI).
        /generarcsv: Genera un archivo CSV con las asistencias.
    Asegúrate de tener los modelos Profesor y Asistencia definidos correctamente en los archivos correspondientes.

Funcionamiento

El controlador del dashboard de los profesores maneja las siguientes funcionalidades:

    Ruta principal (/): Esta ruta se utiliza para renderizar la vista del dashboard del profesor. Obtiene los datos del profesor desde la base de datos y muestra el nombre del profesor y las materias asociadas.

    Ruta /todos: Esta ruta se utiliza para obtener todas las asistencias de una materia específica. Itera sobre los cursos del profesor y recopila todas las asistencias correspondientes a esa materia.

    Ruta /todospromedio: Esta ruta devuelve el promedio de asistencias de todos los estudiantes en una materia específica. Al igual que en la ruta /todos, itera sobre los cursos del profesor y recopila las asistencias correspondientes a esa materia. Luego, calcula el promedio de asistencias por alumno y lo devuelve.

    Ruta /buscardni/:dni: Esta ruta busca las asistencias de un estudiante específico por su número de identificación (DNI). Itera sobre los cursos del profesor y recopila todas las asistencias correspondientes a ese estudiante.

    Ruta /generarcsv: Esta ruta genera un archivo CSV con todas las asistencias. Ordena las asistencias por materia y las convierte en formato CSV utilizando la biblioteca json2csv. El archivo CSV resultante se descarga al realizar una solicitud a esta ruta.
    
    Archivo Principal

El archivo principal de tu aplicación es responsable de configurar y ejecutar el servidor Express, establecer la conexión a la base de datos y definir las rutas principales.
Uso

    Asegúrate de tener todas las dependencias necesarias instaladas, incluyendo express, body-parser, mongoose, dotenv y cors.

    Importa los módulos necesarios y configura el servidor Express en tu archivo principal:


const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(cors());

// Conexión a la base de datos
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.xhyrvta.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("Error en la conexión a la base de datos:", e));

// Configuración de vistas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para verificar el token
const verifyToken = require("./routes/verificarToken");

// Definición de las rutas
app.use("/servicios", require("./routes/Asistencia"));
app.use("/servicios", require("./routes/Alumnos"));
app.use("/servicios", require("./routes/auth"));
app.use("/servicios/dashboard", verifyToken, require("./routes/profesorDashboard"));

// Ruta principal
app.get("/", (req, res) => {
  res.render("index");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en ${process.env.APP_HOST}:${port}`);
});

    Asegúrate de tener todos los modelos y controladores requeridos importados correctamente en las rutas correspondientes.

    Configura las variables de entorno en el archivo .env para la conexión a la base de datos.

Funcionamiento

El archivo principal de tu aplicación realiza las siguientes funciones:

    Conexión a la base de datos: Utiliza los valores de las variables de entorno para establecer una conexión a la base de datos MongoDB.

    Configuración de vistas y middleware: Configura el motor de vistas ejs, establece la carpeta de vistas y la carpeta de archivos estáticos. Además, utiliza el middleware body-parser para analizar las solicitudes entrantes.

    Middleware de verificación de token: Utiliza el middleware verifyToken para verificar el token de autenticación en las rutas del dashboard del profesor.

    Definición de rutas: Define las rutas principales de tu aplicación, incluyendo las rutas relacionadas con las asistencias, los alumnos, la autenticación y el dashboard del profesor. Asegúrate de tener los controladores correspondientes importados en cada ruta.

    Ruta principal ("/"): Esta ruta muestra la vista principal de tu aplicación.

    Inicio del servidor: El servidor se inicia y escucha las solicitudes en el puerto definido en la variable port.

Configuración adicional

Asegúrate de tener configuradas las variables de entorno en un archivo .env en el mismo directorio que tu archivo principal. Aquí hay un ejemplo de cómo podrías configurar las variables en el archivo .env:

makefile

USER_DB=nombre_de_usuario
PASS_DB=contraseña
DB_NAME=nombre_de_la_base_de_datos
APP_HOST=localhost

Asegúrate de reemplazar los valores de ejemplo con los valores reales correspondientes a tu base de datos y configuración de host.
