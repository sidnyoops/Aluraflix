document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        const titulo = formulario.querySelector('#titulo').value;
        const categoria = formulario.querySelector('#categoria').value;
        const imagen = formulario.querySelector('#imagen').value;
        const video = formulario.querySelector('#video').value;  // Aquí es la URL del video
        const descripcion = formulario.querySelector('#descripcion').value;

        // Crear objeto de video
        const nuevoVideo = {
            id: videos.length + 1,
            titulo: titulo,
            categoria: categoria,
            imagen: imagen,
            video: video,
            descripcion: descripcion
        };

        // Agregar el nuevo video al arreglo
        videos.push(nuevoVideo);

        // Guardar videos en localStorage
        localStorage.setItem('videos', JSON.stringify(videos));

        // Limpiar formulario
        formulario.reset();

        // Mostrar mensaje de éxito (puedes implementarlo según necesites)
        console.log('Video agregado con éxito:', nuevoVideo);

        // Actualizar la página principal si está abierta en otra pestaña
        if (window.opener) {
            window.opener.actualizarPaginaPrincipal();
        }
    });

    formulario.addEventListener('reset', function() {
        // Limpiar formulario cuando se presiona el botón de Limpiar
        formulario.reset();
    });

    // Llamar a actualizarPaginaPrincipal al cargar la página para mostrar los videos existentes
    actualizarPaginaPrincipal();
});

function actualizarPaginaPrincipal() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const categorias = ['frontend', 'backend', 'innovacion', 'gestion'];

    categorias.forEach(categoria => {
        const contenedor = document.querySelector(`.categoria[data-categoria="${categoria}"] .cards`);
        contenedor.innerHTML = ''; // Limpiar contenido actual

        videos
            .filter(video => video.categoria.toLowerCase() === categoria.toLowerCase())
            .forEach(video => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${video.imagen}" alt="${video.titulo}">
                    <h3>${video.titulo}</h3>
                    <p>${video.descripcion}</p>
                    <a href="${video.video}" target="_blank">Ver Video</a>  <!-- Enlace al video -->
                `;
                contenedor.appendChild(card);
            });
    });
}

