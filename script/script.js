/**
 * script.js — Portfolio global script
 * Gère : menu burger, textes compétences, envoi formulaire, scroll header
 */

// UTILITAIRES
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// HEADER — effet scroll
const header = $('header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// MENU BURGER
const btnMenuBurger = $('#btnMenuBurger');
const divMenuBurger = $('#divMenuBurger');

if (btnMenuBurger && divMenuBurger) {
  // Ouvrir
  btnMenuBurger.addEventListener('click', () => {
    divMenuBurger.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  // Fermer en cliquant hors du menu
  divMenuBurger.addEventListener('click', (e) => {
    if (e.target === divMenuBurger) {
      closeMenu();
    }
  });

  // Fermer avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function closeMenu() {
    divMenuBurger.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// TEXTES COMPÉTENCES
const competenceTexts = {
  poo:    { short: 'POO',               long: 'Programmation Orientée Objet (POO)' },
  mc:     { short: 'MCD, MLD, MPD',     long: 'Modélisation de données (MCD, MLD, MPD)' },
  mvc:    { short: 'MVC',               long: 'Architecture MVC' },
  allGit: { short: 'Git / GitHub / GitLab', long: 'Git / GitHub / GitLab (versioning, travail collaboratif)' },
};

const isMobile = () => window.innerWidth <= 768;

function setCompetenceTexts() {
  Object.entries(competenceTexts).forEach(([id, texts]) => {
    const el = $(`#${id}`);
    if (el) el.textContent = isMobile() ? texts.short : texts.long;
  });
}

setCompetenceTexts();
window.addEventListener('resize', setCompetenceTexts, { passive: true });

// FORMULAIRE CONTACT — EmailJS
const form = $('#form');
const divEnvoieReussi = $('#divEnvoieReussi');
const divEnvoieRate   = $('#divEnvoieRate');

if (typeof emailjs !== 'undefined') {
  emailjs.init('bftxRLzKlmLyd9mb9');
}

function showNotification(el, duration = 3500) {
  el.style.display = 'flex';
  setTimeout(() => { el.style.display = 'none'; }, duration);
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Envoi…';

    emailjs
      .sendForm('service_n7n0stg', 'template_iisydtv', form)
      .then(() => {
        showNotification(divEnvoieReussi);
        form.reset();
      })
      .catch(() => {
        showNotification(divEnvoieRate);
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Envoyer';
      });
  });
}

// Tableau des projets
const projects = [
  {
    name: 'Forest Game',
    image: '../assets/testProjetImg.png',
    github: 'https://github.com/DarisB1/jeu-du-potager',
    description:
      'Arrose les plantes en bleu et laisse passer la nuit pour les faire pousser. Un jeu de jardinage pixel-art.',
    languages: ['HTML', 'CSS', 'JS'],
  },

  {
    name: 'Tic Tac Toe',
    image: '../assets/ticTacToe.png',
    github: 'https://github.com/DarisB1/tic-tac-toe',
    description:
      'Jeu de stratégie pour deux joueurs sur une grille 3×3. Alignez trois symboles pour gagner !',
    languages: ['HTML', 'CSS', 'JS'],
  },

  {
    name: 'ToDo List MVC',
    image: '../assets/todoPhp.png',
    github: 'https://github.com/DarisB1/todo_php',
    description:
      'Application PHP MVC de gestion de tâches avec authentification, listes, tâches, upload d’images et interface dédiée à la productivité.',
    languages: ['PHP', 'MySQL', 'MVC', 'HTML', 'CSS', 'JS'],
  },
];

let currentIndex = 0;

const desktopContainer = document.querySelector('.articleProjet');
const mobileContainer = document.querySelector('.articleProjetMobile');

// Affiche les projets
function renderProjects() {
  renderDesktopProject();
  renderMobileProjects();
}

// Affiche le projet actuel sur desktop
function renderDesktopProject() {
  if (!desktopContainer) {
    return;
  }

  if (projects.length === 0) {
    desktopContainer.innerHTML = '<p>Aucun projet disponible.</p>';
    return;
  }

  const project = projects[currentIndex];

  const previousIndex =
    (currentIndex - 1 + projects.length) % projects.length;

  const nextIndex =
    (currentIndex + 1) % projects.length;

  const previousProject = projects[previousIndex];
  const nextProject = projects[nextIndex];

  desktopContainer.innerHTML = '';

  // Colonne de navigation
  const nav = createElement('section', {
    className: 'sectionNomProjet',
  });

  const previousName = createElement('span', {
    className: 'spanCarrousel',
    textContent: previousProject.name,
  });

  nav.appendChild(previousName);

  const buttonPrevious = createElement('button', {
    className: 'btnArrow',
    type: 'button',
    ariaLabel: 'Projet précédent',
  });

  const arrowUp = createElement('img', {
    className: 'imgArrowUp',
    src: '../assets/arrow.svg',
    alt: 'Projet précédent',
  });

  buttonPrevious.appendChild(arrowUp);

  buttonPrevious.addEventListener('click', () => {
    navigate(-1);
  });

  nav.appendChild(buttonPrevious);

  const currentName = createElement('span', {
    className: 'spanNomProjet',
    textContent: project.name,
  });

  nav.appendChild(currentName);

  const buttonNext = createElement('button', {
    className: 'btnArrow',
    type: 'button',
    ariaLabel: 'Projet suivant',
  });

  const arrowDown = createElement('img', {
    className: 'imgArrowDown',
    src: '../assets/arrow.svg',
    alt: 'Projet suivant',
  });

  buttonNext.appendChild(arrowDown);

  buttonNext.addEventListener('click', () => {
    navigate(1);
  });

  nav.appendChild(buttonNext);

  const nextName = createElement('span', {
    className: 'spanCarrousel',
    textContent: nextProject.name,
  });

  nav.appendChild(nextName);

  // Image du projet
  const imageLink = createElement('a', {
    className: 'imgLink',
    href: project.github || '#',
    target: project.github ? '_blank' : '_self',
    rel: project.github ? 'noopener noreferrer' : '',
    ariaLabel: `Voir ${project.name} sur GitHub`,
  });

  const projectImage = createElement('img', {
    className: 'imgProjet',
    src: project.image,
    alt: `Capture du projet ${project.name}`,
  });

  const overlay = createElement('span', {
    className: 'overlayText',
    textContent: 'Voir sur GitHub',
  });

  imageLink.appendChild(projectImage);
  imageLink.appendChild(overlay);

  // Description du projet
  const descriptionSection = createElement('section', {
    className: 'sectionDescription',
  });

  const title = createElement('h2', {
    textContent: project.name,
  });

  const description = createElement('span', {
    id: 'spanDesc',
    textContent: project.description,
  });

  const separator = createElement('img', {
    src: '../assets/separateur.svg',
    alt: '',
    ariaHidden: 'true',
  });

  // Technologies
  const languagesContainer = createElement('div', {
    className: 'divdescLangages',
  });

  const languagesTitle = createElement('h3', {
    textContent: 'Technologies',
  });

  const languages = createElement('div', {
    className: 'divLangages',
  });

  project.languages.forEach((language) => {
    const tag = createElement('span', {
      textContent: language,
    });

    languages.appendChild(tag);
  });

  languagesContainer.appendChild(languagesTitle);
  languagesContainer.appendChild(languages);

  descriptionSection.appendChild(title);
  descriptionSection.appendChild(description);
  descriptionSection.appendChild(separator);
  descriptionSection.appendChild(languagesContainer);

  // Bouton GitHub
  if (project.github) {
    const githubButton = createElement('a', {
      className: 'btnLien',
      href: project.github,
      target: '_blank',
      rel: 'noopener noreferrer',
      textContent: 'Voir sur GitHub',
    });

    descriptionSection.appendChild(githubButton);
  }

  desktopContainer.appendChild(nav);
  desktopContainer.appendChild(imageLink);
  desktopContainer.appendChild(descriptionSection);

  // Animation
  desktopContainer.style.animation = 'none';
  void desktopContainer.offsetHeight;
  desktopContainer.style.animation =
    'fadeUp 0.4s ease-out forwards';
}

// Affiche tous les projets sur mobile
function renderMobileProjects() {
  if (!mobileContainer) {
    return;
  }

  mobileContainer.innerHTML = '';

  projects.forEach((project) => {
    const section = createElement('section', {
      className: 'sectionProjetMobile',
    });

    const title = createElement('h2', {
      textContent: project.name,
    });

    const image = createElement('img', {
      className: 'imgProjet',
      src: project.image,
      alt: `Capture du projet ${project.name}`,
      loading: 'lazy',
    });

    const description = createElement('span', {
      textContent: project.description,
    });

    const separator = createElement('img', {
      src: '../assets/separateur.svg',
      alt: '',
      ariaHidden: 'true',
    });

    // Technologies
    const languagesContainer = createElement('div', {
      className: 'divdescLangages',
    });

    const languagesTitle = createElement('h3', {
      textContent: 'Technologies',
    });

    const languages = createElement('div', {
      className: 'divLangages',
    });

    project.languages.forEach((language) => {
      const tag = createElement('span', {
        textContent: language,
      });

      languages.appendChild(tag);
    });

    languagesContainer.appendChild(languagesTitle);
    languagesContainer.appendChild(languages);

    section.appendChild(title);
    section.appendChild(image);
    section.appendChild(description);
    section.appendChild(separator);
    section.appendChild(languagesContainer);

    // Bouton GitHub
    if (project.github) {
      const githubButton = createElement('a', {
        className: 'btnLien',
        href: project.github,
        target: '_blank',
        rel: 'noopener noreferrer',
        textContent: 'Voir sur GitHub',
      });

      section.appendChild(githubButton);
    }

    mobileContainer.appendChild(section);
  });
}

// Change de projet
function navigate(direction) {
  currentIndex =
    (currentIndex + direction + projects.length) %
    projects.length;

  renderDesktopProject();
}

// Crée un élément HTML
function createElement(tag, properties = {}) {
  const element = document.createElement(tag);

  Object.keys(properties).forEach((property) => {
    const value = properties[property];

    if (property === 'className') {
      element.className = value;
      return;
    }

    if (property === 'ariaLabel') {
      element.setAttribute('aria-label', value);
      return;
    }

    if (property === 'ariaHidden') {
      element.setAttribute('aria-hidden', value);
      return;
    }

    if (property === 'textContent') {
      element.textContent = value;
      return;
    }

    element[property] = value;
  });

  return element;
}

// Lance l'affichage
renderProjects();