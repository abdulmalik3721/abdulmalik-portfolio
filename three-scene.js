/* =========================================================
   ABDUL MALIK — REAL-TIME THREE.JS HOLOGRAM

   Features:
   1. 3D energy sphere
   2. Rotating wireframe shell
   3. Three orbital rings
   4. Floating satellites
   5. 650 floating particles
   6. Cyan and purple lighting

========================================================= */

import * as THREE from "three";


/* =========================================================
   1. FIND HOLOGRAM CONTAINER
========================================================= */

const host = document.getElementById("hologram3d");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if (host) {

    try {

        /* =====================================================
           2. CREATE SCENE
        ===================================================== */

        const scene = new THREE.Scene();


        /* =====================================================
           3. CREATE CAMERA
        ===================================================== */

        const camera = new THREE.PerspectiveCamera(
            38,
            1,
            0.1,
            100
        );

        camera.position.set(0, 0, 7.2);


        /* =====================================================
           4. CREATE WEBGL RENDERER
        ===================================================== */

        const renderer = new THREE.WebGLRenderer({

            alpha: true,

            antialias: true,

            powerPreference: "high-performance"

        });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, 2)
        );

        renderer.setSize(
            host.clientWidth || 280,
            host.clientHeight || 270
        );

        renderer.setClearColor(0x000000, 0);

        renderer.outputColorSpace = THREE.SRGBColorSpace;

        host.appendChild(renderer.domElement);


        /* =====================================================
           5. MAIN HOLOGRAM GROUP
        ===================================================== */

        const hologram = new THREE.Group();

        scene.add(hologram);


        /* =====================================================
           6. ENERGY CORE
        ===================================================== */

        const coreGeometry = new THREE.IcosahedronGeometry(
            1.05,
            4
        );

        const coreMaterial = new THREE.MeshPhysicalMaterial({

            color: 0x4adfff,

            emissive: 0x087aa8,

            emissiveIntensity: 1.15,

            metalness: 0.38,

            roughness: 0.18,

            transmission: 0.12,

            transparent: true,

            opacity: 0.92,

            wireframe: false

        });

        const core = new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );

        hologram.add(core);


        /* =====================================================
           7. WIREFRAME SHELL
        ===================================================== */

        const wireGeometry = new THREE.IcosahedronGeometry(
            1.18,
            2
        );

        const wireMaterial = new THREE.MeshBasicMaterial({

            color: 0x9defff,

            wireframe: true,

            transparent: true,

            opacity: 0.38

        });

        const wireShell = new THREE.Mesh(
            wireGeometry,
            wireMaterial
        );

        hologram.add(wireShell);


        /* =====================================================
           8. ORBITAL RINGS
        ===================================================== */

        const ringMaterials = [

            new THREE.MeshBasicMaterial({
                color: 0x4adfff,
                transparent: true,
                opacity: 0.9
            }),

            new THREE.MeshBasicMaterial({
                color: 0xb49aff,
                transparent: true,
                opacity: 0.78
            }),

            new THREE.MeshBasicMaterial({
                color: 0x70bfff,
                transparent: true,
                opacity: 0.65
            })

        ];


        const rings = [];


        const ringSettings = [

            [1.75, 0.025, 0.15, 0.38],

            [1.52, 0.02, 1.12, -0.35],

            [1.92, 0.018, 0.72, 1.05]

        ];


        ringSettings.forEach(
            ([radius, tube, rotX, rotY], index) => {

                const ring = new THREE.Mesh(

                    new THREE.TorusGeometry(
                        radius,
                        tube,
                        8,
                        150
                    ),

                    ringMaterials[index]

                );


                ring.rotation.set(
                    rotX,
                    rotY,
                    0.25 * index
                );


                hologram.add(ring);

                rings.push(ring);

            }
        );


        /* =====================================================
           9. LUMINOUS SATELLITES
        ===================================================== */

        const satellites = [];


        for (let i = 0; i < 5; i += 1) {

            const satellite = new THREE.Mesh(

                new THREE.SphereGeometry(
                    i % 2 === 0 ? 0.055 : 0.035,
                    16,
                    16
                ),

                new THREE.MeshBasicMaterial({

                    color:
                        i % 2 === 0
                            ? 0x8ff4ff
                            : 0xc4a8ff

                })

            );


            hologram.add(satellite);

            satellites.push(satellite);

        }


        /* =====================================================
           10. FLOATING PARTICLES
        ===================================================== */

        const particleCount = 650;

        const particlePositions = new Float32Array(
            particleCount * 3
        );


        for (let i = 0; i < particleCount; i += 1) {

            const radius = 1.8 + Math.random() * 1.15;

            const theta = Math.random() * Math.PI * 2;

            const phi = Math.acos(
                2 * Math.random() - 1
            );


            particlePositions[i * 3] =
                radius * Math.sin(phi) * Math.cos(theta);


            particlePositions[i * 3 + 1] =
                radius * Math.sin(phi) * Math.sin(theta);


            particlePositions[i * 3 + 2] =
                radius * Math.cos(phi);

        }


        const particleGeometry = new THREE.BufferGeometry();

        particleGeometry.setAttribute(

            "position",

            new THREE.BufferAttribute(
                particlePositions,
                3
            )

        );


        const particleMaterial = new THREE.PointsMaterial({

            color: 0x75dfff,

            size: 0.018,

            transparent: true,

            opacity: 0.72,

            sizeAttenuation: true

        });


        const particles = new THREE.Points(
            particleGeometry,
            particleMaterial
        );

        hologram.add(particles);


        /* =====================================================
           11. LIGHTING
        ===================================================== */

        scene.add(
            new THREE.AmbientLight(
                0x9bcfff,
                1.2
            )
        );


        const cyanLight = new THREE.PointLight(
            0x38dfff,
            18,
            12
        );

        cyanLight.position.set(
            2.5,
            2.5,
            3.5
        );

        scene.add(cyanLight);


        const violetLight = new THREE.PointLight(
            0x9b68ff,
            14,
            12
        );

        violetLight.position.set(
            -2.5,
            -1.5,
            2
        );

        scene.add(violetLight);


        /* =====================================================
           12. RESIZE HANDLING
        ===================================================== */

        const clock = new THREE.Clock();


        function resizeRenderer() {

            const width = Math.max(
                host.clientWidth,
                1
            );

            const height = Math.max(
                host.clientHeight,
                1
            );


            camera.aspect = width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height,
                false
            );

        }


        const resizeObserver = new ResizeObserver(
            resizeRenderer
        );

        resizeObserver.observe(host);

        resizeRenderer();


        /* =====================================================
           13. ANIMATION LOOP
        ===================================================== */

        function renderFrame() {

            const elapsed = clock.getElapsedTime();


            // Main hologram rotation
            hologram.rotation.y = elapsed * 0.22;

            hologram.rotation.x =
                Math.sin(elapsed * 0.35) * 0.12;


            // Energy core rotation
            core.rotation.y = elapsed * 0.32;

            core.rotation.x = elapsed * 0.18;


            // Wireframe movement
            wireShell.rotation.y = -elapsed * 0.16;

            wireShell.rotation.x = elapsed * 0.1;


            // Orbital ring movement
            rings[0].rotation.z = elapsed * 0.34;

            rings[1].rotation.z = -elapsed * 0.26;

            rings[2].rotation.y = elapsed * 0.2;


            // Floating particles
            particles.rotation.y = -elapsed * 0.035;


            // Satellites moving around the core
            satellites.forEach(
                (satellite, index) => {

                    const angle =
                        elapsed * (0.55 + index * 0.07) +
                        (index * Math.PI * 2) / satellites.length;


                    const radius =
                        1.72 + (index % 2) * 0.18;


                    satellite.position.set(

                        Math.cos(angle) * radius,

                        Math.sin(angle * 1.1) * 0.42,

                        Math.sin(angle) * radius * 0.52

                    );

                }
            );


            renderer.render(
                scene,
                camera
            );

        }


        /* =====================================================
           14. START ANIMATION
        ===================================================== */

        if (reduceMotion) {

            renderFrame();

        } else {

            renderer.setAnimationLoop(renderFrame);

        }


        /* =====================================================
           15. HIDE CSS FALLBACK AFTER WEBGL STARTS
        ===================================================== */

        const fallback = host.querySelector(
            ".holo-fallback"
        );

        if (fallback) {

            fallback.style.display = "none";

        }


        /* =====================================================
           16. CLEANUP
        ===================================================== */

        window.addEventListener(
            "beforeunload",
            () => {

                resizeObserver.disconnect();

                renderer.setAnimationLoop(null);

                renderer.dispose();

                coreGeometry.dispose();
                coreMaterial.dispose();

                wireGeometry.dispose();
                wireMaterial.dispose();

                ringMaterials.forEach(
                    (material) => material.dispose()
                );

                particleGeometry.dispose();
                particleMaterial.dispose();

            },
            { once: true }
        );


    } catch (error) {

        console.error(
            "Three.js hologram could not start. The CSS fallback remains visible.",
            error
        );

    }

}