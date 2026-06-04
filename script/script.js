/**
 * script.js — Portfolio global script
 * Gère : menu burger, textes compétences, envoi formulaire, scroll header
 */

// =============================================
// UTILITAIRES
// =============================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// =============================================
// HEADER — effet scroll
// =============================================
const header = $('header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// =============================================
// MENU BURGER
// =============================================
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

// =============================================
// TEXTES COMPÉTENCES (adaptatifs selon écran)
// =============================================
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

// =============================================
// FORMULAIRE CONTACT — EmailJS
// =============================================
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

// =============================================
// CARROUSEL PROJETS
// =============================================
const projects = [
  {
    name: 'Forest Game',
    image: '../assets/testProjetImg.png',
    github: 'https://github.com/DarisB1/jeu-du-potager',
    description: 'Arrose les plantes en bleu et laisse passer la nuit pour les faire pousser. Un jeu de jardinage pixel-art.',
    languages: ['HTML', 'CSS', 'JS'],
  },
  {
    name: 'Tic Tac Toe',
    image: '../assets/ticTacToe.png',
    github: 'https://github.com/DarisB1/tic-tac-toe',
    description: 'Jeu de stratégie pour deux joueurs sur une grille 3×3. Alignez trois symboles pour gagner !',
    languages: ['HTML', 'CSS', 'JS'],
  },
  {
    name: 'API Project',
    image: '../assets/testProjetImg.png',
    github: 'https://github.com/DarisB1/nomProjetPasEncoreMis',
    description: 'Projet utilisant une API externe avec fetch pour récupérer et afficher des données dynamiquement.',
    languages: ['JS'],
  },
];

let currentIndex = 0;
const container = $('.articleProjet');

if (container) {
  function renderProject(index) {
    const project  = projects[index];
    const prevProj = projects[(index - 1 + projects.length) % projects.length];
    const nextProj = projects[(index + 1) % projects.length];

    container.innerHTML = '';

    // -- Navigation colonne gauche --
    const nav = el('section', { className: 'sectionNomProjet' });

    nav.appendChild(el('span', { className: 'spanCarrousel', textContent: prevProj.name }));

    const btnUp = el('button', { className: 'btnArrow', ariaLabel: 'Projet précédent' });
    btnUp.appendChild(el('img', { className: 'imgArrowUp', src: '../assets/arrow.svg', alt: 'haut' }));
    btnUp.addEventListener('click', () => navigate(-1));
    nav.appendChild(btnUp);

    nav.appendChild(el('span', { className: 'spanNomProjet', textContent: project.name }));

    const btnDown = el('button', { className: 'btnArrow', ariaLabel: 'Projet suivant' });
    const arrowDown = el('img', { className: 'imgArrowDown', src: '../assets/arrow.svg', alt: 'bas' });
    btnDown.appendChild(arrowDown);
    btnDown.addEventListener('click', () => navigate(1));
    nav.appendChild(btnDown);

    nav.appendChild(el('span', { className: 'spanCarrousel', textContent: nextProj.name }));

    // -- Image / lien --
    const link = el('a', { className: 'imgLink', href: project.github, target: '_blank', rel: 'noopener noreferrer' });
    link.appendChild(el('img', { className: 'imgProjet', src: project.image, alt: project.name }));
    link.appendChild(el('span', { className: 'overlayText', textContent: 'Voir sur GitHub' }));

    // -- Description --
    const desc = el('section', { className: 'sectionDescription' });
    desc.appendChild(el('h2', { textContent: project.name }));
    desc.appendChild(el('span', { id: 'spanDesc', textContent: project.description }));
    desc.appendChild(el('img', { src: '../assets/separateur.svg', alt: '' }));

    const langContainer = el('div', { className: 'divdescLangages' });
    langContainer.appendChild(el('h3', { textContent: 'Technologies' }));
    const tags = el('div', { className: 'divLangages' });
    project.languages.forEach(lang => tags.appendChild(el('span', { textContent: lang })));
    langContainer.appendChild(tags);
    desc.appendChild(langContainer);

    container.append(nav, link, desc);

    // Animation d'entrée
    container.style.animation = 'none';
    container.offsetHeight; // reflow
    container.style.animation = 'fadeUp 0.4s ease-out forwards';
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + projects.length) % projects.length;
    renderProject(currentIndex);
  }

  // Helper pour créer des éléments avec propriétés
  function el(tag, props = {}) {
    const node = document.createElement(tag);
    Object.assign(node, props);
    return node;
  }

  renderProject(currentIndex);
}
