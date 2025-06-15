document.addEventListener('DOMContentLoaded', function () {
    // Filtros de la galería
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    const noItemsMessage = document.querySelector('.no-gallery-items');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Manejar clase activa en botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                let itemsFound = false;

                galleryItems.forEach(item => {
                    // Cerrar cualquier video abierto al cambiar de filtro
                    if (item.classList.contains('video-item')) {
                        const playerContainer = item.querySelector('.video-player-container');
                        const video = playerContainer.querySelector('video');
                        const iframe = playerContainer.querySelector('iframe');
                        if (video) video.pause();
                        if (iframe) { // Detener video de YouTube
                             playerContainer.innerHTML = '<button class="close-video-btn" aria-label="Cerrar video">&times;</button>'; // Limpiar
                        }
                        playerContainer.style.display = 'none';
                    }


                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block'; // O 'grid', 'flex' según el display original
                        itemsFound = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                if (noItemsMessage) {
                    noItemsMessage.style.display = itemsFound ? 'none' : 'block';
                }
            });
        });
    }

    // Funcionalidad para items de video (HTML5 y YouTube)
    galleryItems.forEach(item => {
        if (item.classList.contains('video-item')) {
            const thumbnailContainer = item.querySelector('.video-thumbnail-container');
            const playerContainer = item.querySelector('.video-player-container');
            const closeButton = playerContainer.querySelector('.close-video-btn');

            if (thumbnailContainer && playerContainer && closeButton) {
                thumbnailContainer.addEventListener('click', function () {
                    playerContainer.style.display = 'flex';
                    
                    // Si es un video de YouTube
                    if (thumbnailContainer.classList.contains('youtube-video')) {
                        const youtubeId = thumbnailContainer.getAttribute('data-youtube-id');
                        // Limpiar contenido anterior y añadir el iframe
                        playerContainer.innerHTML = ''; // Limpiar para evitar duplicados
                        const iframe = document.createElement('iframe');
                        iframe.setAttribute('width', '560'); // Valores por defecto, se ajustan con CSS
                        iframe.setAttribute('height', '315');
                        iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`);
                        iframe.setAttribute('title', 'YouTube video player');
                        iframe.setAttribute('frameborder', '0');
                        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                        iframe.setAttribute('allowfullscreen', '');
                        playerContainer.appendChild(iframe);
                        playerContainer.appendChild(closeButton.cloneNode(true)); // Añadir clon del botón cerrar
                         // Re-asignar evento al nuevo botón cerrar
                        playerContainer.querySelector('.close-video-btn').addEventListener('click', closeVideo);

                    } else { // Si es video HTML5
                        const video = playerContainer.querySelector('video');
                        if (video) video.play();
                    }
                });
                
                function closeVideo() {
                    playerContainer.style.display = 'none';
                    const video = playerContainer.querySelector('video');
                    const iframe = playerContainer.querySelector('iframe');
                    if (video) video.pause();
                    if (iframe) {
                         // Para YouTube, remover el iframe para detenerlo completamente
                         playerContainer.innerHTML = ''; // Limpiar el contenido del reproductor
                         // Volver a añadir el botón de cerrar para la próxima vez
                         playerContainer.appendChild(closeButton.cloneNode(true));
                         playerContainer.querySelector('.close-video-btn').addEventListener('click', closeVideo);
                    }
                }
                closeButton.addEventListener('click', closeVideo);
            }
        }
    });
});