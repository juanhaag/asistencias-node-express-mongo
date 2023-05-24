const btnLogear = document.getElementById("btn-ingresar");

btnLogear.addEventListener("click", async (e) => {
  e.preventDefault();

  const dataLogin = {
    email: document.getElementById("emailField").value,
    password: document.getElementById("contraField").value,
  };
  try {
    const response = await fetch(
      /* "http://200.58.98.21:3000/servicios/login" */ "/servicios/login",
      {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(dataLogin),
      }
    );
    const token = await response.json();
      console.log(token);
    //window.location.href = `http://http://200.58.98.21:3000/servicios/dashboard?token=${response}`;
    localStorage.setItem("token", token.token);
    window.location.href = `/servicios/dashboard?token=${token.token}`;
  } catch (error) {
    console.log(error);
  }
});
