const projects = [
  {
    title: "SIGEDOC",
    category: "institucional",
    label: "Sistema institucional",
    description:
      "Plataforma de gestión documental para administrar acceso, captura y seguimiento de información dentro de un entorno institucional.",
    tags: ["PHP", "Administración", "Gestión documental"],
    images: ["sigedoc-1.jpg", "sigedoc-2.jpg", "sigedoc-3.jpg"],
  },
  {
    title: "Archivo fotográfico SGG",
    category: "publico institucional",
    label: "Sitio público",
    description:
      "Galería pública para memoria institucional, con navegación visual, archivo fotográfico y una interfaz pensada para consulta ciudadana.",
    tags: ["Frontend", "Galería", "Gobierno digital"],
    link: "https://ssg-app.com/galeria/",
    images: [
      "galeria-1.jpg",
      "galeria-2.jpg",
      "galeria-3.jpg",
      "galeria-4.jpg",
      "galeria-5.jpg",
      "galeria-6.jpg",
    ],
  },
  {
    title: "Directorio institucional",
    category: "institucional",
    label: "Herramienta interna",
    description:
      "Directorio virtual para búsqueda, organización y consulta de información institucional desde una interfaz clara y responsiva.",
    tags: ["Búsqueda", "Datos", "UI responsiva"],
    images: [
      "directorio-1.jpg",
      "directorio-2.jpg",
      "directorio-3.jpg",
      "directorio-4.jpg",
      "directorio-5.jpg",
      "directorio-6.jpg",
    ],
  },
  {
    title: "Secretaría General de Gobierno",
    category: "publico institucional",
    label: "Portal institucional",
    description:
      "Página pública de la Secretaría General de Gobierno de Nayarit con estructura institucional, navegación informativa y módulos para contenido ciudadano.",
    tags: ["WordPress", "Portal", "Institucional"],
    link: "https://sgg.nayarit.gob.mx",
    images: ["sgg-nayarit-1.jpg", "sgg-nayarit-2.jpg", "sgg-nayarit-3.jpg"],
  },
  {
    title: "Maya Bay",
    category: "publico privado",
    label: "Sitio de marca",
    description:
      "Sitio visual para restaurante con secciones de promociones, paquetes, carta, bebidas y contacto, diseñado para destacar atmósfera y conversión.",
    tags: ["HTML", "CSS", "Branding"],
    link: "https://mayabay.mx",
    images: [
      "mayabay-1.jpg",
      "mayabay-2.jpg",
      "mayabay-3.jpg",
      "mayabay-4.jpg",
      "mayabay-5.jpg",
    ],
  },
  {
    title: "Print Wraps and Signs",
    category: "publico privado",
    label: "Galería comercial",
    description:
      "Galería de clientes para mostrar proyectos de impresión, rotulación y branding vehicular con una experiencia visual directa.",
    tags: ["Galería", "Clientes", "Web comercial"],
    link: "https://printwrapsigns.com/gallery.html#our-clients",
    images: [
      "print-wraps-signs-1.jpg",
      "print-wraps-signs-2.jpg",
      "print-wraps-signs-3.jpg",
      "print-wraps-signs-4.jpg",
      "print-wraps-signs-5.jpg",
    ],
  },
  {
    title: "Proebapack",
    category: "publico privado",
    label: "Organigrama web",
    description:
      "Módulo web de organigrama para presentar estructura interna de forma navegable, clara y accesible desde navegador.",
    tags: ["HTML", "Organigrama", "Interfaz"],
    link: "https://proebapack.mx/organigrama.html",
    images: [
      "proebapack-1.jpg",
      "proebapack-2.jpg",
      "proebapack-3.jpg",
      "proebapack-4.jpg",
      "proebapack-5.jpg",
    ],
  },
];

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const projectGrid = document.querySelector("[data-project-grid]");
const filterButtons = document.querySelectorAll("[data-filter]");
const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalDescription = document.querySelector("[data-modal-description]");
const modalActions = document.querySelector("[data-modal-actions]");
const modalImage = document.querySelector("[data-modal-image]");
const galleryCount = document.querySelector("[data-gallery-count]");
const previousButton = document.querySelector("[data-gallery-prev]");
const nextButton = document.querySelector("[data-gallery-next]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

let activeProject = null;
let activeImageIndex = 0;

function assetPath(fileName) {
  return `assets/projects/${fileName}`;
}

function renderProjects(filter = "all") {
  projectGrid.innerHTML = "";

  projects
    .filter((project) => filter === "all" || project.category.includes(filter))
    .forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card section-reveal";
      card.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
      card.innerHTML = `
        <div class="project-media">
          <img src="${assetPath(project.images[0])}" alt="Vista previa del proyecto ${project.title}" loading="lazy">
          <span class="project-count">${project.images.length} capturas</span>
        </div>
        <div class="project-body">
          <span class="project-category">${project.label}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <ul class="project-tags">
            ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
          <div class="project-actions">
            <button class="project-action-button primary-action" type="button" data-open-project="${project.title}">
              <span>Ver capturas</span>
            </button>
            ${
              project.link
                ? `<a class="project-action-button secondary-action" href="${project.link}" target="_blank" rel="noopener"><span>Abrir sitio</span></a>`
                : ""
            }
          </div>
        </div>
      `;
      projectGrid.appendChild(card);
    });

  observeReveals();
}

function observeReveals() {
  const revealItems = document.querySelectorAll(".section-reveal:not(.is-observed)");
  revealItems.forEach((item) => {
    item.classList.add("is-observed");
    revealObserver.observe(item);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  header.classList.remove("menu-open");
}

function openModal(project) {
  activeProject = project;
  activeImageIndex = 0;
  modalTitle.textContent = project.title;
  modalCategory.textContent = project.label;
  modalDescription.textContent = project.description;
  modalActions.innerHTML = project.link
    ? `<a class="project-action-button primary-action modal-site-action" href="${project.link}" target="_blank" rel="noopener"><span>Abrir sitio</span></a>`
    : "";
  updateModalImage();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function updateModalImage() {
  const imageName = activeProject.images[activeImageIndex];
  modalImage.src = assetPath(imageName);
  modalImage.alt = `Captura ${activeImageIndex + 1} de ${activeProject.title}`;
  galleryCount.textContent = `${activeImageIndex + 1} / ${activeProject.images.length}`;
}

function moveGallery(direction) {
  if (!activeProject) return;
  const total = activeProject.images.length;
  activeImageIndex = (activeImageIndex + direction + total) % total;
  updateModalImage();
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
  header.classList.toggle("menu-open", !isOpen);
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeMenu();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

projectGrid.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-open-project]");
  if (!trigger) return;
  const project = projects.find((item) => item.title === trigger.dataset.openProject);
  openModal(project);
});

modalCloseButtons.forEach((button) => button.addEventListener("click", closeModal));
previousButton.addEventListener("click", () => moveGallery(-1));
nextButton.addEventListener("click", () => moveGallery(1));

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

window.addEventListener("scroll", updateHeader, { passive: true });

renderProjects();
observeReveals();
updateHeader();
