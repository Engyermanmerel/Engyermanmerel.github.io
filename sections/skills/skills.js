//Inyectar HTML a la etiqueta div de el index.html (Archivo Maestro)
async function loadSkills() {
    const response = await fetch('sections/skills/skills.html');
    const html = await response.text();
    document.getElementById('skills-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Skills Section se ha cargado.`);

    // MOVER LOS MODALES AL BODY (Fuera de la sección de skills)
    const modals = container.querySelectorAll('.modal');
    modals.forEach(modal => document.body.appendChild(modal));
    
    console.log("Modales movidos al root para evitar problemas de capa.");

}

loadSkills();