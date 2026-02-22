//Inyectar HTML a la etiqueta div de el index.html (Archivo Maestro)
async function loadExperience() {
    const response = await fetch('sections/experience/experience.html');
    const html = await response.text();
    document.getElementById('exp-section').innerHTML = html;
    
    // Aquí puedes inicializar eventos de esta sección
    console.log(`Hola, el Experience Section se ha cargado.`);
}

loadExperience();

//Logica modal para las cards de la sección experience
const modals = new ModalManager();
const modal = document.getElementById("expModal");
const closeBtn = document.getElementById("closeExpModal");

const expData = {
    hk: {
        title: "Project Engineer",
        company: "Herrenknecht AG",
        desc: "Worked on engineering projects for tunneling systems, preparing technical documentation, coordinating design validations, and supporting multidisciplinary teams.",
        tasks: [
        "Generated technical reports and project documentation.",
        "Supported mechanical design validation and review processes.",
        "Collaborated with international engineering teams.",
        "Assisted with engineering planning and technical coordination."
        ],
        tools: ["SolidWorks", "FEA", "MS Project", "Engineering Reports"],
        link: "experience/herrenknecht.html"
    },
    crtg: {
        title: "Industrial Piping Design (Intern)",
        company: "China Railway Tunnel Group (CRTG)",
        desc: "Supported industrial piping design, layouts, and engineering documentation for tunneling infrastructure projects in Panamá.",
        tasks: [
        "Created piping layouts and technical drawings.",
        "Supported drafting and documentation processes.",
        "Assisted engineers with design coordination.",
        "Worked with technical teams on construction planning."
        ],
        tools: ["AutoCAD", "Piping Drafting", "3D Layout", "Technical Documentation"],
        link: "experience/crtg.html"
    }
    };

    document.querySelectorAll(".btn-details-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const card = e.target.closest(".experience-item");
        const id = card.dataset.expId;
        const data = expData[id];

        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalCompany").textContent = data.company;
        document.getElementById("modalDesc").textContent = data.desc;

        const tasksEl = document.getElementById("modalTasks");
        tasksEl.innerHTML = "";
        data.tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        tasksEl.appendChild(li);
        });

        const toolsEl = document.getElementById("modalTools");
        toolsEl.innerHTML = "";
        data.tools.forEach(tool => {
        const span = document.createElement("span");
        span.textContent = tool;
        toolsEl.appendChild(span);
        });

        document.getElementById("modalLink").href = data.link;

        modal.classList.add("active");
    });
    });

    closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
});