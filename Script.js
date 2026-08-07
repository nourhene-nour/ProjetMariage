/* =========================================
   COMPTE À REBOURS
========================================= */

const weddingDate = new Date("2026-12-12T14:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance < 0) {

        document.getElementById("countdown").innerHTML =
            "<h2 class='col-span-4 text-3xl text-sky-700 font-bold'>💍 C'est le grand jour !</h2>";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);



/* =========================================
   ANIMATION DES CARTES
========================================= */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.remove("opacity-0");
            entry.target.classList.remove("translate-y-12");

            entry.target.classList.add("opacity-100");
            entry.target.classList.add("translate-y-0");

        }

    });

});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("opacity-0");
    section.classList.add("translate-y-12");
    section.classList.add("duration-1000");

    observer.observe(section);

});

/* =======================
   NEIGE
======================= */

for(let i=0;i<80;i++){

    const snow=document.createElement("div");

    snow.className="snowflake";

    snow.innerHTML="❄";

    snow.style.left=Math.random()*100+"vw";

    snow.style.animationDuration=(8+Math.random()*10)+"s";

    snow.style.animationDelay=Math.random()*10+"s";

    snow.style.fontSize=(8+Math.random()*15)+"px";

    document.body.appendChild(snow);

}

/* =======================
   Particules
======================= */
for(let i=0;i<25;i++){

    const s=document.createElement("div");

    s.className="spark";

    s.style.left=Math.random()*100+"vw";

    s.style.animationDuration=(8+Math.random()*8)+"s";

    s.style.animationDelay=Math.random()*10+"s";

    document.body.appendChild(s);

}
/* =======================
   Cachet de la lettre
======================= */
const seal = document.getElementById("seal");

seal.addEventListener("click", function (e) {

    e.preventDefault();

    // Empêche un deuxième clic
    seal.style.pointerEvents = "none";

    // Le rabat s'ouvre
    flap.classList.add("open");

    // Le contenu apparaît après l'ouverture
    setTimeout(() => {
        letterContent.classList.add("show");
    }, 1500);

    // Le bouton apparaît
    setTimeout(() => {
        discoverBtn.classList.add("show");
    }, 2200);

});








document.addEventListener("DOMContentLoaded", () => {

    const seal = document.getElementById("seal");
    const flap = document.getElementById("flap");
    const letterContent = document.getElementById("letterContent");
    const discoverBtn = document.getElementById("discoverBtn");
    const bgMusic = document.getElementById("bgMusic");
    // Vérification pour éviter les erreurs
    if (!seal || !flap || !letterContent || !discoverBtn) {
        console.error("Un ou plusieurs éléments sont introuvables.");
        return;
    }

    seal.addEventListener("click", function (e) {

        e.preventDefault();
        // Démarre la musique
bgMusic.volume = 0.5;
bgMusic.play().catch(error => {
    console.log("Lecture audio bloquée :", error);
});

        // Animation du cachet
        seal.classList.add("clicked");

        // Ouverture du rabat
        setTimeout(() => {
            flap.classList.add("open");
        }, 300);

        // Apparition du contenu
        setTimeout(() => {
            letterContent.classList.add("show");
        }, 1500);

        // Apparition du bouton
        setTimeout(() => {
            discoverBtn.classList.add("show");
        }, 2200);

    });
    
    discoverBtn.addEventListener("click", function (e) {

    e.preventDefault();

    const invitation = document.getElementById("invitation");

    invitation.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

});

  