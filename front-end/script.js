document.addEventListener('DOMContentLoaded', () => {
    cargarCampanas();

    document.getElementById('campaign-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        const campaignName = document.getElementById('campaign-name').value;

        const nuevaCampana = {
            nombre: campaignName,
            mensaje: '', // Puedes cambiar esto según tus necesidades
            fecha_inicio: new Date().toISOString().split('T')[0], // Fecha actual
            estado: 'activo' // Cambia esto si es necesario
        };

        fetch('http://localhost:3000/api/campanas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaCampana)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al crear la campaña');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            cargarCampanas(); // Actualizar la lista de campañas
            document.getElementById('campaign-form').reset(); // Limpiar el formulario
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error: ' + error.message); // Mostrar error
        });
    });
});

function cargarCampanas() {
    fetch('http://localhost:3000/api/campanas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red al cargar campañas');
            }
            return response.json();
        })
        .then(campanas => {
            const campaignList = document.getElementById('campaign-list');
            campaignList.innerHTML = '';

            campanas.forEach(campana => {
                const li = document.createElement('li');
                li.textContent = `Nombre: ${campana.nombre}, Mensaje: ${campana.mensaje}, Fecha: ${campana.fecha_inicio}, Estado: ${campana.estado}`;
                campaignList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al cargar campañas: ' + error.message); // Mostrar error
        });
}
