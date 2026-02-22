async function loadAboutMe() {
    const response = await fetch('sections/about-me/about-me.html');
    const html = await response.text();
    document.getElementById('about-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el About Me ha cargado.`);
}

loadAboutMe();