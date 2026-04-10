async function loadAboutMe() {
    const response = await fetch('sections/lab/lab.html');
    const html = await response.text();
    document.getElementById('lab-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Lab Section se ha cargado.`);
}

loadAboutMe();