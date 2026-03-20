async function loadHero() {
    const response = await fetch('sections/hero/hero.html');
    const html = await response.text();
    document.getElementById('hero-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Hero ha cargado.`);

    // --- AQUÍ CONECTAS AMBOS ---
    // Si i18n es un objeto global, lo llamas así:
    if (window.i18n) {
        window.i18n.updatePage(); 
    }

    //Abrir y Cerrar el menu de la versión mobile
    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("menuOverlay");
    const links = mobileMenu.querySelectorAll("a");

    function openMenu() {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow= "auto";
    }

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    /* Cerrar cuando se hace click en un link */
    links.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    /* Cerrar con tecla ESC */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });
}

loadHero();