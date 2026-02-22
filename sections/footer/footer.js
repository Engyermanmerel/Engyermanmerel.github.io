async function loadFooter() {
    const response = await fetch('sections/footer/footer.html');
    const html = await response.text();
    document.getElementById('footer-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Footer se ha cargado.`);
}

loadFooter();