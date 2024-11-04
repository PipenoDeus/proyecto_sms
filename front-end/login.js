async function handleLogin(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // Realiza la solicitud de inicio de sesión
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Inicio de sesión exitoso"); // Mensaje de éxito
            console.log(data); // Muestra la respuesta del servidor en la consola

            // Almacena un token o flag de autenticación
            localStorage.setItem('authToken', data.token); // Si tu API devuelve un token

            // Redirigir al dashboard
            location.href = 'dashboard.html';
        } else {
            const errorText = await response.text();
            console.error("Error al iniciar sesión:", errorText);
            alert("Error de inicio de sesión");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un error en el servidor. Inténtalo nuevamente.");
    }
}

// Agrega el event listener al formulario para llamar a handleLogin al hacer submit
document.getElementById("login-form").addEventListener("submit", handleLogin);