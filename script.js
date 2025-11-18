 //Input Const
 const images = [
  "img1.png", // Imagen 1
  "img2.png", // Imagen 2
  "img3.png"  // Imagen 3
];

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear()

 // Scroll suave para anclas
 document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
        const id = a.getAttribute('href')
        if(id.length>1){ e.preventDefault(); document.querySelector(id).scrollIntoView({behavior:'smooth'}) }
    })
})

// Intersection Observer para revelar tarjetas
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){ entry.target.animate([
        {opacity:0, transform:'translateY(10px)'},
        {opacity:1, transform:'translateY(0)'}
        ],{duration:400, easing:'ease-out', fill:'forwards'})
        observer.unobserve(entry.target)
    }
})},{threshold:0.1})

document.querySelectorAll('.card, .project-thumb').forEach(el=>observer.observe(el))

// ==== Carrusel ====
const carousel = document.getElementById('carousel');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;
const totalCards = document.querySelectorAll('.carousel_card').length;

function updateCarousel() {
    carousel.style.transform = `translateX(${-index * 38}%)`;
}

prev.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : totalCards - 1;
    updateCarousel();
});

    next.addEventListener('click', () => {
index = (index < totalCards - 1) ? index + 1 : 0;
    updateCarousel();
});

//Modal Manager  
class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        // Event listeners para abrir modales
        document.getElementById('openModal1').addEventListener('click', () => this.openModal('modal1'));
        document.getElementById('openModal2').addEventListener('click', () => this.openModal('modal2'));
        document.getElementById('openModal3').addEventListener('click', () => this.openModal('modal3'));
        document.getElementById('openModal4').addEventListener('click', () => this.openModal('modal4'));
        document.getElementById('openModal5').addEventListener('click', () => this.openModal('modal5'));
        document.getElementById('openModal6').addEventListener('click', () => this.openModal('modal6'));
        document.getElementById('openModal7').addEventListener('click', () => this.openModal('modal7'));
        
        // Event listeners para cerrar modales
        document.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.getAttribute('data-close');
                this.closeModal(modalId);
            });
        });

        // Cerrar modal al hacer click en el overlay
        document.querySelectorAll('.overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay.id);
                }
            });
        });

        // Cerrar modal con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            // Restaurar scroll del body
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        document.querySelectorAll('.overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}

// Inicializar el gestor de modales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
});

//Galery logic
// Array of images (in the order of your gallery)
const imagesGalery = [
  "assets/Gallery/CRTG/img2.jpg",
  "assets/Gallery/Conference/img1.jpg",
  "assets/Gallery/Herrenknecht/img1.png",
  "assets/Gallery/CRTG/img1.jpg"
];

// Array of descriptions (same order, same indexes)
const descriptionsGalery = [
  "This is the description for image 1",
  "Details for image 2 go here",
  "Explanation of image 3",
  "Information about image 4"
];

function changeImage(index) {
  const mainImage = document.getElementById("mainImage");
  const descriptionEl = document.getElementById("imgDescription");
  const buttons = document.querySelectorAll(".galery-btn");

  // Fade out
  mainImage.style.opacity = 0;
  descriptionEl.style.opacity = 0;

  setTimeout(() => {
    // Update the image and description based on array index
    mainImage.src = imagesGalery[index];
    descriptionEl.textContent = descriptionsGalery[index];

    // Fade in
    mainImage.style.opacity = 1;
    descriptionEl.style.opacity = 1;
  }, 300);

  // Update active button
  buttons.forEach(btn => btn.classList.remove("active"));
  buttons[index].classList.add("active");
}
