const btnMenuBurger = document.getElementById("btnMenuBurger");
const divMenuBurger = document.getElementById("divMenuBurger");
const poo = document.getElementById("poo");
const mc = document.getElementById("mc");
const mvc = document.getElementById("mvc");
const allGit = document.getElementById("allGit");
const divEnvoieReussi = document.getElementById("divEnvoieReussi");
const divEnvoieRate = document.getElementById("divEnvoieRate");
const form = document.getElementById("form");

if (typeof emailjs !== "undefined") {
  emailjs.init("bftxRLzKlmLyd9mb9");
}

btnMenuBurger.addEventListener("click", () => {
  divMenuBurger.style.display = "flex";
});

if (poo && window.innerWidth <= 431) {
  poo.textContent = "POO";
  mc.textContent = "MCD, MLD, MPD";
  mvc.textContent = "MVC";
  allGit.textContent = "Git / GitHub / GitLab";
} else if (poo) {
  poo.textContent = "Programmation Orientée Objet (POO)";
  mc.textContent = "Modélisation de données (MCD, MLD, MPD)";
  mvc.textContent = "Architecture MVC";
  allGit.textContent = "Git / GitHub / GitLab (versioning, travail collaboratif)";
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs
      .sendForm("service_n7n0stg", "template_iisydtv", this)
      .then(() => {
        divEnvoieReussi.style.display = "flex";
        form.reset();
        setTimeout(() => {
          divEnvoieReussi.style.display = "none";
        }, 3000);
      })
      .catch(() => {
        divEnvoieRate.style.display = "flex";
        setTimeout(() => {
          divEnvoieRate.style.display = "none"
        }, 3000);
      });
  });
}

