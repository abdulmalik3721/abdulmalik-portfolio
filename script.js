/* =========================================================
   ABDUL MALIK — PORTFOLIO INTERACTIONS
========================================================= */

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================================
   1. MOBILE NAVIGATION
========================================================= */

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   2. ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationItems = document.querySelectorAll(
    ".nav-links a"
);

if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                navigationItems.forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    );

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   3. SCROLL REVEAL ANIMATIONS
========================================================= */

if (
    !reduceMotion &&
    "IntersectionObserver" in window
) {

    const revealTargets = document.querySelectorAll(
        ".section-heading, .about-mark, .about-copy, .skill-card, .course-list > div, .timeline-item, .contact-panel"
    );


    revealTargets.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealTargets.forEach((element) => {

        revealObserver.observe(element);

    });

}