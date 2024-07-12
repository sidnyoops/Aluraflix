document.addEventListener('DOMContentLoaded', function() {
    const categorias = document.querySelectorAll('.categoria');

    // Datos de ejemplo del db.json (simulados aquí)
    const videos = [
        {
            "id": 1,
            "titulo": "Introducción a AluraFlix",
            "categoria": "Frontend",
            "imagen": "https://i.ytimg.com/vi/94yuIVdoevc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC4vOyTMbOEWeCiqupoKk3e_Nrlqw",
            "video": "https://www.youtube.com/watch?v=_-9grhDhxiU",
            "descripcion": "Una breve introducción a la plataforma AluraFlix."
        },
        {
            "id": 2,
            "titulo": "Backend avanzado con AluraFlix",
            "categoria": "Backend",
            "imagen": "https://media.licdn.com/dms/image/sync/D4E27AQHZ17kQikQ86Q/articleshare-shrink_800/0/1711305968972?e=2147483647&v=beta&t=qJDynWSsiwA-dGYtHz684TqVUc6NbwfFb2jdBkNeYds",
            "video": "https://www.youtube.com/watch?v=VIDEO_ID",
            "descripcion": "Conceptos avanzados de desarrollo backend utilizando AluraFlix."
        },
        {
            "id": 3,
            "titulo": "Innovación en AluraFlix",
            "categoria": "Innovación",
            "imagen": "https://i.ytimg.com/vi/aDhrEm-3kYY/mqdefault.jpg",
            "video": "https://www.youtube.com/watch?v=VIDEO_ID",
            "descripcion": "Cómo AluraFlix impulsa la innovación en el desarrollo de aplicaciones."
        },
        {
            "id": 4,
            "titulo": "Gestión de proyectos con AluraFlix",
            "categoria": "Gestión",
            "imagen": "https://media.licdn.com/dms/image/D4D22AQEs2UB_rCSuHg/feedshare-shrink_800/0/1693862899643?e=2147483647&v=beta&t=wQHNlkHEsXtVfFTdKAoeQ4BH2ZD9KQmalArbfPd3pPs",
            "video": "https://www.youtube.com/watch?v=VIDEO_ID",
            "descripcion": "Estrategias efectivas de gestión de proyectos utilizando AluraFlix."
        }
    ];

    // Función para crear cards
    function crearCard(video) {
        return `
            <div class="card" data-id="${video.id}">
                <img src="${video.imagen}" alt="${video.titulo}">
                <div class="card-buttons">
                    <button class="editar">Editar</button>
                    <button class="borrar">Borrar</button>
                </div>
                <div class="card-info">
                    <h4>${video.titulo}</h4>
                    <p>${video.descripcion}</p>
                </div>
            </div>
        `;
    }

    // Mostrar cards en las categorías
    categorias.forEach(categoria => {
        const nombreCategoria = categoria.querySelector('h3').textContent;
        const cardsContainer = categoria.querySelector('.cards');

        videos.forEach(video => {
            if (video.categoria === nombreCategoria) {
                cardsContainer.innerHTML += crearCard(video);
            }
        });
    });

    // Event listener para editar y borrar cards
    categorias.forEach(categoria => {
        const cardsContainer = categoria.querySelector('.cards');

        cardsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('editar')) {
                const card = e.target.closest('.card');
                const id = card.dataset.id;
                const video = videos.find(v => v.id === parseInt(id));

                // Mostrar formulario de edición
                const form = document.createElement('form');
                form.innerHTML = `
                    <input type="text" id="titulo" value="${video.titulo}" placeholder="Título" required>
                    <input type="text" id="categoria" value="${video.categoria}" placeholder="Categoría" required>
                    <input type="url" id="imagen" value="${video.imagen}" placeholder="URL de imagen" required>
                    <input type="url" id="video" value="${video.video}" placeholder="URL de video" required>
                    <textarea id="descripcion" placeholder="Descripción">${video.descripcion}</textarea>
                    <button type="button" class="guardar">Guardar</button>
                    <button type="button" class="cancelar">Cancelar</button>
                `;
                card.appendChild(form);

                // Ocultar información de la card
                card.querySelector('.card-info').style.display = 'none';
                card.querySelector('.card-buttons').style.display = 'none';

                // Event listener para guardar cambios
                form.querySelector('.guardar').addEventListener('click', function() {
                    video.titulo = form.querySelector('#titulo').value;
                    video.categoria = form.querySelector('#categoria').value;
                    video.imagen = form.querySelector('#imagen').value;
                    video.video = form.querySelector('#video').value;
                    video.descripcion = form.querySelector('#descripcion').value;

                    // Actualizar información en la card
                    card.querySelector('img').src = video.imagen;
                    card.querySelector('img').alt = video.titulo;
                    card.querySelector('h4').textContent = video.titulo;
                    card.querySelector('p').textContent = video.descripcion;

                    // Limpiar formulario y ocultar formulario
                    form.reset();
                    form.remove();
                    card.querySelector('.card-info').style.display = 'block';
                    card.querySelector('.card-buttons').style.display = 'flex';
                });

                // Event listener para cancelar edición
                form.querySelector('.cancelar').addEventListener('click', function() {
                    form.reset();
                    form.remove();
                    card.querySelector('.card-info').style.display = 'block';
                    card.querySelector('.card-buttons').style.display = 'flex';
                });
            }

            if (e.target.classList.contains('borrar')) {
                const card = e.target.closest('.card');
                const id = card.dataset.id;
                const videoIndex = videos.findIndex(v => v.id === parseInt(id));
                if (videoIndex > -1) {
                    videos.splice(videoIndex, 1); // Remove from array
                }
                card.remove(); // Remove from DOM
            }
        });
    });

    // Desplazamiento suave a las categorías
    window.scrollToCategory = function(categoryId) {
        const categoryElement = document.getElementById(categoryId);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
});
