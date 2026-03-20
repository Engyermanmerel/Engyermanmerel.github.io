// 1. Función para cargar secciones dinámicamente
async function loadSection(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al cargar ${url}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        
        console.log(`Sección ${containerId} cargada.`);
    } catch (error) {
        console.error("Error en loadSection:", error);
    }
}

// 2. Lógica de filtrado (Independiente)
function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (!filterBtns.length) return; // Guard clause si no hay botones

    console.log("Inicializando filtros de Blog...");

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manejo de clases activas
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            blogCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isVisible = filterValue === 'all' || category === filterValue;
                
                card.style.display = isVisible ? 'block' : 'none';
                if (isVisible) card.style.animation = 'fadeIn 0.4s ease forwards';
            });
        });
    });
}

// 3. Orquestador (Workflow Principal)
async function initApp() {
    // Esperamos a que la educación cargue
    await loadSection('sections/education/education.html', 'edu-section');
    
    // Si el Blog también es dinámico, cárgalo aquí:
    // await loadSection('sections/blog/blog.html', 'blog-section');

    // Una vez que todo el HTML está en el DOM, inicializamos los filtros
    initBlogFilters();
}

// Estilos de animación una sola vez
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Arrancar la aplicación
document.addEventListener('DOMContentLoaded', initApp);