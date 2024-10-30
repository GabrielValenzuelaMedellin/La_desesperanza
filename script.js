document.getElementById('form-agregar').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/agregarPan', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje-agregar').innerText = data.message || data.error;
        cargarPanes(); // Actualiza la lista de panes
        this.reset(); // Limpia el formulario
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('form-actualizar').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/actualizarPan', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje-actualizar').innerText = data.message || data.error;
        cargarPanes(); // Actualiza la lista de panes
        this.reset(); // Limpia el formulario
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('form-eliminar').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/borrarPan', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje-eliminar').innerText = data.message || data.error;
        cargarPanes(); // Actualiza la lista de panes
        this.reset(); // Limpia el formulario
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function cargarPanes() {
    fetch('/obtenerPanes')
        .then(response => response.json())
        .then(data => {
            console.log("Panes obtenidos:", data); // Log para verificar la respuesta
            const listaPanes = document.getElementById('lista-panes');
            listaPanes.innerHTML = '';
            data.forEach(pan => {
                const div = document.createElement('div');
                div.innerText = `ID: ${pan.id_pan} - ${pan.nombre_pan} - $${pan.precio_pan} (${pan.cantidad} disponibles)`;
                listaPanes.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error al cargar panes:', error);
        });
}

// Cargar la lista de panes al inicio
window.onload = cargarPanes;
