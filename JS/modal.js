/* ==========================================
    GLOBAL MODAL SYSTEM (REFACTORED)
========================================== */

const ModalSystem = (() => {
  console.log("SISTEMA DE MODALES INICIALIZADO CORRECTAMENTE"); // <--- Añade esto
  let activeModal = null;

  // Selectores estándar para reutilizar en todo el sitio
  const CLASSES = {
    modal: "modal",
    content: "modal__content",
    isOpen: "is-open",
    noScroll: "no-scroll" // Clase que ya tienes en tu CSS
  };

  const openModal = (modal) => {
    if (!modal) return;

    modal.classList.add(CLASSES.isOpen);
    modal.setAttribute("aria-hidden", "false");
    
    // USAR LA CLASE CSS EN EL BODY
    document.body.classList.add(CLASSES.noScroll);

    const focusTarget = modal.querySelector(`.${CLASSES.content}, [role="dialog"]`);
    if (focusTarget) focusTarget.focus();

    activeModal = modal;
  };

  const closeModal = (modal) => {
    if (!modal) return;

    modal.classList.remove(CLASSES.isOpen);
    modal.setAttribute("aria-hidden", "true");
    
    // QUITAR LA CLASE DEL BODY
    document.body.classList.remove(CLASSES.noScroll);

    activeModal = null;
  };

  const handleOpen = (e) => {
    const trigger = e.target.closest("[data-modal-open]");
    if (!trigger) return;

    const modalId = trigger.getAttribute("data-modal-open");
    const modal = document.getElementById(modalId);

    openModal(modal);
  };

  const handleClose = (e) => {
    // Busca el botón de cierre o el overlay (si decides que el overlay cierre)
    if (!e.target.closest("[data-modal-close]")) return;

    const modal = e.target.closest(`.${CLASSES.modal}`);
    closeModal(modal);
  };

  const handleEsc = (e) => {
    if (e.key === "Escape" && activeModal) {
      closeModal(activeModal);
    }
  };

  const handleOutsideClick = (e) => {
    if (!activeModal) return;

    // Ahora busca la clase genérica .modal__content
    const content = activeModal.querySelector(`.${CLASSES.content}`);
    
    // Si el clic fue fuera del contenido, cerramos
    if (content && !content.contains(e.target)) {
      closeModal(activeModal);
    }
  };

  const init = (root = document) => {
    root.addEventListener("click", handleOpen);
    root.addEventListener("click", handleClose);
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleOutsideClick);
    console.log("SISTEMA DE MODALES LISTO");
  };

  return { init, openModal, closeModal }; // Exponemos los métodos
})();

// Al final de tu archivo modal-system.js
window.ModalSystem = ModalSystem;

//llamada al manejador de modales
ModalSystem.init();