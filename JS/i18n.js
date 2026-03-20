const i18n = {
    
    async fetchTranslations(lang) {
        const response = await fetch(`./i18n/${lang}.json`);
        return await response.json();
    },

    async changeLanguage(lang) {
        const translations = await this.fetchTranslations(lang);
        
        // Buscamos todos los elementos con el atributo data-i18n
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        // Actualizamos el atributo lang en el HTML (Vital para accesibilidad y SEO)
        document.documentElement.lang = lang;
        // Guardamos la preferencia
        localStorage.setItem("user-lang", lang);
    },

    init() {
        // 1. Prioridad: Lo que el usuario eligió antes. 
        // 2. Segunda opción: El idioma de su navegador. 
        // 3. Tercera opción: Español por defecto.
        const savedLang = localStorage.getItem("user-lang") || 
                          navigator.language.split('-')[0] || 
                          "es";
        this.changeLanguage(savedLang);
    },

    async updatePage() {
        const lang = document.documentElement.lang || 'es';
        const translations = await this.fetchTranslations(lang);
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            el.textContent = translations[key] || key;
        });
    }
};

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => i18n.init());

// Evento para el botón de cambio
document.getElementById("lang-switcher").addEventListener("click", () => {
    const newLang = document.documentElement.lang === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
});

// Hacerlo disponible para otros scripts
window.i18n = i18n;
export default i18n;