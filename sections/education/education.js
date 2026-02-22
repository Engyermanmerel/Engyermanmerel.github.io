async function loadEducation() {
    const response = await fetch('sections/education/education.html');
    const html = await response.text();
    document.getElementById('edu-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Education Section ha cargado.`);
}

loadEducation();