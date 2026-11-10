
/* ==========================================
   ABDUL MALIK - PORTFOLIO JAVASCRIPT
========================================== */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* ==========================================
   1. SMOOTH ENTRANCE ANIMATION
========================================== */

if (!prefersReducedMotion) {

    window.addEventListener("load", () => {

        const elements = [
            ".monitor-scene",
            ".scene-footer",
            ".navbar"
        ];

        elements.forEach((selector, index) => {

            const element = document.querySelector(selector);

            if (!element) return;

            element.animate(
                [
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ],
                {
                    duration: 1000,
                    delay: index * 180,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    fill: "both"
                }
            );

        });

    });

}
