document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        // Manejo de la respuesta del servidor
        if (response.ok) {
            document.getElementById('message').innerText = 'Usuario registrado exitosamente.';
            document.getElementById('registerForm').reset(); // Limpia el formulario
        } else {
            document.getElementById('message').innerText = data.message || 'Error en el registro.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Error al conectar con el servidor.';
    }
});
