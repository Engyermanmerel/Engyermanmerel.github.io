async function loadGallery() {
    const response = await fetch('sections/gallery/gallery.html');
    const html = await response.text();
    document.getElementById('gallery-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Gallery ha cargado.`);
}

loadGallery();