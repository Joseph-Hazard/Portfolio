
/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


// Open / close mobile menu
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


// Close menu when clicking a navigation link
document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
    });

});


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}


window.addEventListener("scroll", updateActiveNavigation);


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-title, .about-content, .skill-card, .project-card, .timeline-item, .contact-content"
);


// Initial state
revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }


            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";


            // Stop observing once visible
            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   PROJECT CARD STAGGER ANIMATION
   ========================================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 100}ms`;

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

// Automatically update the copyright year.
//
// If you later change the footer to:
//
// <p>© <span id="current-year"></span> Joseph Hazard.</p>
//
// this will automatically keep the year up to date.

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   ACCESSIBILITY
   ========================================================= */

// Allow keyboard users to close the mobile menu with Escape

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    }

});


/* =========================================================
   INITIALIZE
   ========================================================= */

updateActiveNavigation();