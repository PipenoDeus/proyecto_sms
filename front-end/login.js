document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí deberías hacer una solicitud POST a tu API para autenticar al usuario
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error de inicio de sesión');
    })
    .then(data => {
        localStorage.setItem('token', data.token); // Si tu API devuelve un token
        window.location.href = 'index.html'; // Redirigir a la página de gestión de campañas
    })
    .catch(error => console.error('Error:', error));
});
