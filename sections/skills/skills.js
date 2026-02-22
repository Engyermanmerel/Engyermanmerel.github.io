//Inyectar HTML a la etiqueta div de el index.html (Archivo Maestro)
async function loadSkills() {
    const response = await fetch('sections/skills/skills.html');
    const html = await response.text();
    document.getElementById('skills-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Skills Section se ha cargado.`);
}

loadSkills();

//Logica modal para los btns sobre la imagen de la skill section

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    
    const skillsButtons = document.querySelectorAll("[data-skills-modal]");
    const skillsCloseElements = document.querySelectorAll("[data-skills-close]");
    

    // Open modal
    skillsButtons.forEach(button => {
      button.addEventListener("click", function () {
        const modalId = this.getAttribute("data-skills-modal");
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add("is-open");
        }
      });
    });

    // Close modal (overlay + close button)
    skillsCloseElements.forEach(element => {
      element.addEventListener("click", function () {
        const modal = this.closest(".skills-modal");
        if (modal) {
          modal.classList.remove("is-open");
        }
      });
    });

    // Close with ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".skills-modal.is-open").forEach(modal => {
          modal.classList.remove("is-open");
        });
      }
    });

  });

})();