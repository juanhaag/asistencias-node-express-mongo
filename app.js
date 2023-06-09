const express = require("express");
const app = express();
const port = process.env.APP_PORT;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
app.use(cors());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.xhyrvta.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));

//views
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middlewares
const verifyToken = require("./middlewares/verificarToken");

app.use("/servicios", require("./routes/Asistencia"));
app.use("/servicios", require("./routes/Alumnos"));
app.use("/servicios", require("./routes/auth"));
app.use(
  "/servicios/dashboard",
  verifyToken,
  require("./routes/profesorDashboard")
);
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(port, () => {
  console.log(`Funcionando en ${process.env.APP_HOST}:${port}`);
});
