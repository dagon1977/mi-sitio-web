document.addEventListener('DOMContentLoaded', () => {
    // Toggle menú móvil
    const menuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('.main-nav');
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', () => {
            const expanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!expanded));
            mainNav.classList.toggle('active');
        });
    }

    // Inicialización del slider si está presente
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-slider')) {
        new Swiper('.hero-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
});

