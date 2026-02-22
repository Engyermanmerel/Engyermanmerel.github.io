 //Input Const
 const images = [
  "img1.png", // Imagen 1
  "img2.png", // Imagen 2
  "img3.png"  // Imagen 3
];

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear()

// Scroll suave para anclas
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
        const id = a.getAttribute('href')
        if(id.length>1){ e.preventDefault(); document.querySelector(id).scrollIntoView({behavior:'smooth'}) }
    })
});

// 1. Lógica de Cambio de Tema (Dark/Light) / Nav Bar
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('span');

themeBtn.addEventListener('click', () => {
  // Alterna la clase en el body
  document.body.classList.toggle('light-theme');
  
  // Cambia el icono dependiendo del modo
  if (document.body.classList.contains('light-theme')) {
    themeIcon.textContent = 'dark_mode'; // Icono de luna
  } else {
    themeIcon.textContent = 'light_mode'; // Icono de sol
  }
});

// 2. Lógica de Cambio de Idioma (Básico)
const langBtn = document.getElementById('lang-toggle');

langBtn.addEventListener('click', () => {
  // Alterna el texto del botón entre EN y ES
  if (langBtn.textContent === 'EN') {
    langBtn.textContent = 'ES';
    // Aquí llamarías a una función para cambiar los textos de tu página
    console.log("Cambiando a Español...");
  } else {
    langBtn.textContent = 'EN';
    console.log("Switching to English...");
  }
});

// Intersection Observer para revelar tarjetas
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){ entry.target.animate([
        {opacity:0, transform:'translateY(10px)'},
        {opacity:1, transform:'translateY(0)'}
        ],{duration:400, easing:'ease-out', fill:'forwards'})
        observer.unobserve(entry.target)
    }
})},{threshold:0.1})

document.querySelectorAll('.card, .project-thumb').forEach(el=>observer.observe(el))
