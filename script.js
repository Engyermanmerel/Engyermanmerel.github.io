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
});

// 1. Lógica de Cambio de Tema (Dark/Light) / Nav Bar
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('span');

themeBtn.addEventListener('click', () => {
  // Alterna la clase en el body
  document.body.classList.toggle('light-theme');
  
  // Cambia el icono dependiendo del modo
  if (document.body.classList.contains('light-theme')) {
    themeIcon.textContent = 'dark_mode'; // Icono de luna
  } else {
    themeIcon.textContent = 'light_mode'; // Icono de sol
  }
});

// 2. Lógica de Cambio de Idioma (Básico)
const langBtn = document.getElementById('lang-toggle');

langBtn.addEventListener('click', () => {
  // Alterna el texto del botón entre EN y ES
  if (langBtn.textContent === 'EN') {
    langBtn.textContent = 'ES';
    // Aquí llamarías a una función para cambiar los textos de tu página
    console.log("Cambiando a Español...");
  } else {
    langBtn.textContent = 'EN';
    console.log("Switching to English...");
  }
});

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

//==== Abrir Modal de Proyectos ====
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

// Inicialización
const modals = new ModalManager();

// ---- Modal for Professional Experience
const modal = document.getElementById("expModal");
const closeBtn = document.getElementById("closeExpModal");

  const expData = {
    hk: {
      title: "Project Engineer",
      company: "Herrenknecht AG",
      desc: "Worked on engineering projects for tunneling systems, preparing technical documentation, coordinating design validations, and supporting multidisciplinary teams.",
      tasks: [
        "Generated technical reports and project documentation.",
        "Supported mechanical design validation and review processes.",
        "Collaborated with international engineering teams.",
        "Assisted with engineering planning and technical coordination."
      ],
      tools: ["SolidWorks", "FEA", "MS Project", "Engineering Reports"],
      link: "experience/herrenknecht.html"
    },
    crtg: {
      title: "Industrial Piping Design (Intern)",
      company: "China Railway Tunnel Group (CRTG)",
      desc: "Supported industrial piping design, layouts, and engineering documentation for tunneling infrastructure projects in Panamá.",
      tasks: [
        "Created piping layouts and technical drawings.",
        "Supported drafting and documentation processes.",
        "Assisted engineers with design coordination.",
        "Worked with technical teams on construction planning."
      ],
      tools: ["AutoCAD", "Piping Drafting", "3D Layout", "Technical Documentation"],
      link: "experience/crtg.html"
    }
  };

  document.querySelectorAll(".btn-details-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".experience-item");
      const id = card.dataset.expId;
      const data = expData[id];

      document.getElementById("modalTitle").textContent = data.title;
      document.getElementById("modalCompany").textContent = data.company;
      document.getElementById("modalDesc").textContent = data.desc;

      const tasksEl = document.getElementById("modalTasks");
      tasksEl.innerHTML = "";
      data.tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        tasksEl.appendChild(li);
      });

      const toolsEl = document.getElementById("modalTools");
      toolsEl.innerHTML = "";
      data.tools.forEach(tool => {
        const span = document.createElement("span");
        span.textContent = tool;
        toolsEl.appendChild(span);
      });

      document.getElementById("modalLink").href = data.link;

      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });