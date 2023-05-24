document.getElementById("yearField").addEventListener("change", () => {
  const anioCursada = document.getElementById("yearField").value;
  let materia = document.getElementById("materiaField");
  if (anioCursada == "2") {
    materia.innerHTML = `
      <option value="Ingles 2">
              Ingles 2
    </option>
      <option value="Analisis Matematico 2">
              Analisis Matematico 2
    </option>
      <option value="estadistica">
              Estadistica
    </option>
      <option value="Ingenieria de software 1">
              Ingenieria de software 1
    </option>
    </option>
      <option value="Algoritmo y estructura de datos 2">
              Algoritmo y estructura de datos 2
    </option>
      <option value="Sistemas operativos">
              Sistemas operativos
    </option>
      <option value="Base de datos">
              Base de datos 
    </option>
      <option value="Practicas Profesionalizantes 2">
              Practicas Profesionalizantes 2
    </option>
    `;
  } else if (anioCursada == "3") {
    materia.innerHTML = `
      <option value="Ingles 3">
              Ingles 3
      </option>
      <option value="Aspectos legales de la profesion">
              Aspectos legales de la profesion
      </option>
      <option value="Seminario de actualizacion">
              Seminario de actualizacion
      </option>
      <option value="Redes y comunicacion">
              Redes y comunicacion
      </option>
      <option value="Ingenieria de software 2">
              Ingenieria de software 2
      </option>
      <option value="Algoritmo y estructura de datos 3">
              Algoritmo y estructura de datos 3
      </option>
      <option value="Practicas profesionalizantes 3">
              Practicas profesionalizantes 3
      </option>
      `;
  } else if (anioCursada == "1") {
    materia.innerHTML = `
        <option value="ingles1">Ingles 1</option>
            <option value="Ciencia, Tecnologia y sociedad">
              Ciencia, Tecnologia y sociedad
            </option>
            <option value="Analisis matematico 1">
              Analisis matematico 1
            </option>
            <option value="algebra">Algebra</option>
            <option value="Algoritmo y estructura de datos 1">
              Algoritmo y estructura de datos 1
            </option>
            <option value="Sistemas y organizaciones">
              Sistemas y organizaciones
            </option>
            <option value="Arquitectura de computadores">
              Arquitectura de computadores
            </option>
            <option value="Practicas profesionalizantes 1">
              Practicas profesionalizantes 1
            </option>
        `;
  }
});
async function enviarData() {
  const dataAsistencia = {
    nombre: document.getElementById("nombreField").value,
    dni: document.getElementById("dniField").value,
    materia: document.getElementById("materiaField").value,
    anioCursada: document.getElementById("yearField").value,
  };
  if (
    dataAsistencia.nombre &&
    dataAsistencia.dni &&
    dataAsistencia.materia &&
    dataAsistencia.anioCursada
  ) {
    const response = await fetch("/servicios/asistencia", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(dataAsistencia),
    });
    Toastify({
      text: "Asistencia registrada!",
      className: "info",
      style: {
        background: "#8705d5",
      },
    }).showToast();
    return response;
  } else {
    Toastify({
      text: "LLENAR TODOS LOS CAMPOS!",
      className: "info",
      style: {
        background: "#8705d5",
      },
    }).showToast();
  }
}
document
  .getElementById("btnCargarAsistencia")
  .addEventListener("click", (e) => {
    e.preventDefault();
    enviarData();
  });

document.getElementById("btnBuscar").addEventListener("click", async () => {
  const dni = document.getElementById("buscarDni").value;
  let areaTabla = document.getElementById("tablaAsistencias");
  const response = await fetch(
    `/servicios/buscardni/${dni}`,
    {
      method: "get",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  );
  response.json().then((data) => {
    
    if (data.length > 0) {
      areaTabla.innerHTML = `
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Materia</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>`;
      data.forEach((element) => {
        areaTabla.innerHTML += `
          <tr>
            <td>${element.nombre}</td>
            <td>${element.materia}</td>
            <td>${element.fecha}</td>
          </tr>`;
      });
      areaTabla.innerHTML += `</tbody>`;
    } else {
      Toastify({
        text: "No se encontro a nadie con ese DNI!",
        className: "info",
        style: {
          background: "#8705d5",
        },
      }).showToast();
    }
  });
});
