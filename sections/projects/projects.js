async function loadProjects() {
    try {
        const response = await fetch('sections/projects/projects.html');
        const html = await response.text();
        const container = document.getElementById('pro-section');
        container.innerHTML = html;

        console.log(`Sección de Proyectos inyectada.`);

        // --- LÓGICA DE CARRUSEL DINÁMICO ---
        const carousel = container.querySelector('.proj__carrusel'); 
        const prev = container.querySelector('#prev');
        const next = container.querySelector('#next');
        const cards = container.querySelectorAll('.proj__carrusel-card');
        
        if (!carousel || cards.length === 0) return;

        let index = 0;

        function updateCarousel() {
            // Calculamos el ancho de una sola tarjeta incluyendo su gap/margen
            const cardWidth = cards[0].offsetWidth; 
            const gap = 20; // El gap que definiste en tu CSS (ajusta si es necesario)
            
            // Calculamos el desplazamiento exacto en píxeles
            const moveAmount = index * (cardWidth + gap);
            
            carousel.style.transform = `translateX(${-moveAmount}px)`;
            carousel.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        }

        next.addEventListener('click', () => {
            // Evitamos que el índice supere el número de tarjetas
            // (Restamos 1 o el número de tarjetas visibles si quieres tope)
            if (index < cards.length - 1) {
                index++;
            } else {
                index = 0; // Vuelve al inicio
            }
            updateCarousel();
        });

        prev.addEventListener('click', () => {
            if (index > 0) {
                index--;
            } else {
                index = cards.length - 1; // Va al final
            }
            updateCarousel();
        });

        // RE-CÁLCULO AUTOMÁTICO AL CAMBIAR TAMAÑO DE PANTALLA
        window.addEventListener('resize', updateCarousel);

        // Inicialización
        updateCarousel();

    } catch (error) {
        console.error("Error al cargar proyectos:", error);
    }
}

loadProjects();