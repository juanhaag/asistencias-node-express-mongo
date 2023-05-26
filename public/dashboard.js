

document.getElementById("btnTodos").addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  let areaTabla = document.getElementById("tablaAsistencias2");
  const promedioCheck = document.getElementById("promedioCheck");
  const materia = document.getElementById("materiaField").value;
  if (!promedioCheck.checked) {
    const response = await fetch(
      `/servicios/dashboard/todos?materia=${materia}`,
      {
        method: "get",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    );
    response.json().then((data) => {
      console.log(data);
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
        data[0].forEach((element) => {
          areaTabla.innerHTML += `
            <tr>
              <td>${element.nombre}</td>
              <td>${element.materia}</td>
              <td>${element.fecha}</td>
            </tr>`;
        });
        areaTabla.innerHTML += `</tbody>`;
      }
    });
  } else {
    traerTodosPresentesConPromedio(token,materia);
  }
});

async function traerTodosPresentesConPromedio(token) {
  let areaTabla = document.getElementById("tablaAsistencias2");
  const numeroClases = document.getElementById("cantidadClases").value;
  const materia = document.getElementById("materiaField").value;
  if (numeroClases =="" || numeroClases < 0) {
    Toastify({
      text: "Recuerda introducir la cantidad de clases para calcular promedio",
      className: "info",
      style: {
        background: "#8705d5",
      },
    }).showToast();
  } else {
    console.log(materia);
    const response = await fetch(
      `/servicios/dashboard/todospromedio?numeroclases=${numeroClases}&materia=${materia}`,
      {
        method: "get",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    );
    response.json().then((data) => {
      console.log(data);
      if (data.length > 0) {
        areaTabla.innerHTML = `
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>`;
        data.forEach((element) => {
          let promedio = element.promedio;
          if(promedio >100){
            promedio = 100
          }
          areaTabla.innerHTML += `
            <tr>
              <td>${element.nombre}</td>
              <td>${element.dni}</td>
              <td>${promedio.toFixed(2)}%</td>
            </tr>`;
        });
        areaTabla.innerHTML += `</tbody>`;
      }
    });
  }
}

document.getElementById("btnBuscar").addEventListener("click", async () => {
  const dni = document.getElementById("buscarDni").value;
  let areaTabla = document.getElementById("tablaAsistencias1");
  const response = await fetch(`/servicios/buscardni/${dni}`, {
    method: "get",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
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
      data.sort((a, b) => {
        if (a.materia > b.materia) {
          return 1;
        }
        if (a.materia < b.materia) {
          return -1;
        }
        return 0;
      });
      data.forEach((element) => {
        areaTabla.innerHTML += `
          <tr>
            <td>${element.nombre.toUpperCase()}</td>
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

document.getElementById("generarCsv").addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  fetch("/servicios/dashboard/generarcsv", {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
});
