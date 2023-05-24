document.getElementById("btnTodos").addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  let areaTabla = document.getElementById("tablaAsistencias2");
  console.log(token);
  const response = await fetch(`/servicios/dashboard/todos?token=${token}`, {
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
      data.forEach((element) => {
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
});

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
      data.sort((a,b)=>{
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
