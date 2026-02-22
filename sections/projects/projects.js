//Inyectar HTML a la etiqueta div de el index.html (Archivo Maestro)
async function loadProjects() {
    const response = await fetch('sections/projects/projects.html');
    const html = await response.text();
    document.getElementById('pro-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Projects Section ha cargado.`);
}

loadProjects();

//Logica para mover el carrusel de los proyectos
const carousel = document.getElementById('carousel');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;
const totalCards = document.querySelectorAll('.proj__carrusel-card').length;

function updateCarousel() {
    carousel.style.transform = `translateX(${-index * 20}%)`;
}

prev.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : totalCards - 1;
    updateCarousel();
});

next.addEventListener('click', () => {
    index = (index < totalCards - 1) ? index + 1 : 0;
    updateCarousel();
});

//==== Logica Modal de las Cards para la sección de Projects ====
class ModalManager {
    constructor() {
        // Seleccionamos elementos una sola vez para mejorar rendimiento
        this.overlays = document.querySelectorAll('.overlay');
        this.init();
    }

    init() {
        // 1. Abrir modales de forma dinámica
        // Buscamos cualquier botón que tenga la clase 'open-modal'
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-modal');
            if (btn) {
                // Asumimos que el ID del modal está en un data-attribute o se deriva del ID del botón
                // Ejemplo: botón id="openModal5" -> busca "modal5"
                const modalId = btn.id.replace('openModal', 'modal');
                console.log("Se presiono el boton de Skill 1");
                this.openModal(modalId);
            }
        });

        // 2. Cerrar modales (Delegación de eventos para el botón X)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-close]');
            if (btn) {
                const modalId = btn.getAttribute('data-close');
                this.closeModal(modalId);
            }
        });

        // 3. Cerrar al hacer clic en el overlay
        this.overlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay.id);
                }
            });
        });

        // 4. Tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAllModals();
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false'); // A11y
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true'); // A11y
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        const activeModal = document.querySelector('.overlay.active');
        if (activeModal) {
            this.closeModal(activeModal.id);
        }
    }
}