async function loadHero() {
    const response = await fetch('sections/hero/hero.html');
    const html = await response.text();
    document.getElementById('hero-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Hero ha cargado.`);
}

loadHero();