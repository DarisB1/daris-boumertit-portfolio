const projects = [
  {
    name: "Forest Game",
    image: "../assets/testProjetImg.png",
    github: "https://github.com/DarisB1/jeu-du-potager",
    description:
      "Arrose les plantes en bleu et laisse passer la nuit pour les faire pousser...",
    languages: ["HTML", "CSS", "JS"],
  },
  {
    name: "tic tac toe",
    image: "../assets/tictactoe.png",
    github: "https://github.com/DarisB1/tic-tac-toe",
    description: "Le Tic-Tac-Toe est un jeu de stratégie pour deux joueurs où chacun place à tour de rôle son symbolesur une grille de 3x3. Le but est d'aligner trois de ses symboles horizontalement, verticalement ou en diagonale avant l'adversaire.",
    languages: ["HTML", "CSS", "JS"],
  },
  {
    name: "API Project",
    image: "../assets/api.png",
    github: "https://github.com/DarisB1/nomProjetPasEncoreMis",
    description: "Projet utilisant une API externe avec fetch.",
    languages: ["JS"],
  },
];

let currentIndex = 0;
const btnUp = document.getElementById("btnArrowUp");
const btnDown = document.getElementById("btnArrowDown");
const container = document.querySelector(".articleProjet");

function createContainer(className, id, tag) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (id) element.id = id;
  return element;
}

function createText(className, id, tag, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (id) element.id = id;
  element.textContent = text;
  return element;
}

function createImg(className, id, src, alt) {
  const img = document.createElement("img");
  if (className) img.className = className;
  if (id) img.id = id;
  img.src = src;
  img.alt = alt;
  return img;
}

function renderProject(index) {
  container.innerHTML = "";

  const project = projects[index];

  // SECTION NOMS
  const sectionNomProjet = createContainer("sectionNomProjet", "", "section");

  const spanPrev = createText("spanCarrousel", "", "span", projects[(index - 1 + projects.length) % projects.length].name);
  sectionNomProjet.appendChild(spanPrev);

  const btnUpNew = createContainer("btnArrow", "btnArrowUp", "button");
  const imgUp = createImg("imgArrowUp", "", "../assets/arrow.svg", "arrow up");
  btnUpNew.appendChild(imgUp);
  btnUpNew.addEventListener("click", prevProject);
  sectionNomProjet.appendChild(btnUpNew);

  const spanCurrent = createText("spanNomProjet", "", "span", project.name);
  sectionNomProjet.appendChild(spanCurrent);

  const btnDownNew = createContainer("btnArrow", "btnArrowDown", "button");
  const imgDown = createImg("imgArrowDown", "", "../assets/arrow.svg", "arrow down");
  imgDown.style.transform = "rotate(180deg)";
  btnDownNew.appendChild(imgDown);
  btnDownNew.addEventListener("click", nextProject);
  sectionNomProjet.appendChild(btnDownNew);

  const spanNext = createText("spanCarrousel", "", "span", projects[(index + 1) % projects.length].name);
  sectionNomProjet.appendChild(spanNext);

  // IMAGE + LINK
  const link = document.createElement("a");
  link.href = project.github;
  link.target = "_blank";
  link.className = "imgLink";

  const imgProjet = createImg("imgProjet", "", project.image, "img projet");

  const overlay = createText("overlayText", "", "span", "Lien vers le GitHub");

  link.appendChild(imgProjet);
  link.appendChild(overlay);

  // DESCRIPTION
  const sectionDescription = createContainer(
    "sectionDescription",
    "",
    "section",
  );

  const h2 = createText("", "", "h2", project.name);

  const spanDesc = createText("", "spanDesc", "span", project.description);

  const separator = createImg("", "", "../assets/separateur.svg", "separation");

  const divLangContainer = createContainer("divdescLangages", "", "div");

  const h3 = createText("", "", "h3", "Langages");

  const divLangages = createContainer("divLangages", "", "div");

  project.languages.forEach((lang) => {
    const spanLang = createText("", "", "span", lang);
    divLangages.appendChild(spanLang);
  });

  divLangContainer.appendChild(h3);
  divLangContainer.appendChild(divLangages);

  sectionDescription.appendChild(h2);
  sectionDescription.appendChild(spanDesc);
  sectionDescription.appendChild(separator);
  sectionDescription.appendChild(divLangContainer);

  // AJOUT FINAL
  container.appendChild(sectionNomProjet);
  container.appendChild(link);
  container.appendChild(sectionDescription);
}

function nextProject() {
  currentIndex = (currentIndex + 1) % projects.length;
  renderProject(currentIndex);
}

function prevProject() {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  renderProject(currentIndex);
}

renderProject(currentIndex);

if (btnUp) {
  btnUp.addEventListener("click", prevProject);
}

if (btnDown) {
  btnDown.addEventListener("click", nextProject);
}
