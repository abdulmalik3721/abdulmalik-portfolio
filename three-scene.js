
/* ==========================================
   ABDUL MALIK - THREE.JS HOLOGRAM
========================================== */

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";


/* 1. FIND THE HOLOGRAM CONTAINER */

const container = document.getElementById("hologram3d");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if (container) {

    try {

        /* 2. CREATE THE SCENE */

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            1,
            0.1,
            100
        );

        camera.position.z = 5;


        /* 3. CREATE THE RENDERER */

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);


        /* 4. MAIN GLASS SPHERE */

        const sphereGeometry = new THREE.SphereGeometry(
            1,
            64,
            64
        );

        const sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x8b5cf6,
            metalness: 0.35,
            roughness: 0.12,
            transparent: true,
            opacity: 0.32,
            side: THREE.DoubleSide
        });

        const sphere = new THREE.Mesh(
            sphereGeometry,
            sphereMaterial
        );

        scene.add(sphere);


        /* 5. CYAN WIREFRAME */

        const wireGeometry = new THREE.SphereGeometry(
            1.04,
            28,
            20
        );

        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x42d9ff,
            wireframe: true,
            transparent: true,
            opacity: 0.38
        });

        const wireSphere = new THREE.Mesh(
            wireGeometry,
            wireMaterial
        );

        scene.add(wireSphere);


        /* 6. ORBITAL RINGS */

        const ring1 = new THREE.Mesh(
            new THREE.TorusGeometry(1.35, 0.012, 8, 120),
            new THREE.MeshBasicMaterial({
                color: 0x42d9ff,
                transparent: true,
                opacity: 0.9
            })
        );

        const ring2 = new THREE.Mesh(
            new THREE.TorusGeometry(1.5, 0.009, 8, 120),
            new THREE.MeshBasicMaterial({
                color: 0xa78bfa,
                transparent: true,
                opacity: 0.85
            })
        );

        ring1.rotation.x = 1.1;
        ring1.rotation.y = 0.4;

        ring2.rotation.x = 0.5;
        ring2.rotation.y = 1.2;

        scene.add(ring1, ring2);


        /* 7. FLOATING PARTICLES */

        const particleCount = 350;

        const positions = new Float32Array(
            particleCount * 3
        );

        for (let i = 0; i < particleCount; i++) {

            const index = i * 3;

            positions[index] =
                (Math.random() - 0.5) * 4;

            positions[index + 1] =
                (Math.random() - 0.5) * 4;

            positions[index + 2] =
                (Math.random() - 0.5) * 2;

        }

        const particleGeometry = new THREE.BufferGeometry();

        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const particleMaterial = new THREE.PointsMaterial({
            color: 0x9bdfff,
            size: 0.018,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(
            particleGeometry,
            particleMaterial
        );

        scene.add(particles);


        /* 8. LIGHTING */

        const purpleLight = new THREE.PointLight(
            0x8b5cf6,
            3,
            10
        );

        purpleLight.position.set(2, 2, 3);

        const cyanLight = new THREE.PointLight(
            0x42d9ff,
            2,
            10
        );

        cyanLight.position.set(-2, -1, 3);

        scene.add(purpleLight, cyanLight);


        /* 9. RESPONSIVE SIZE */

        function resizeScene() {

            const width = container.clientWidth;
            const height = container.clientHeight;

            if (!width || !height) return;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);

        }

        const resizeObserver = new ResizeObserver(resizeScene);

        resizeObserver.observe(container);

        resizeScene();


        /* 10. ANIMATION */

        const clock = new THREE.Clock();

        function animate() {

            const elapsed = clock.getElapsedTime();

            sphere.rotation.y = elapsed * 0.25;

            sphere.rotation.x =
                Math.sin(elapsed * 0.3) * 0.15;

            wireSphere.rotation.y = -elapsed * 0.18;
            wireSphere.rotation.x = elapsed * 0.12;

            ring1.rotation.z = elapsed * 0.35;
            ring2.rotation.z = -elapsed * 0.25;

            particles.rotation.y = elapsed * 0.035;

            particles.rotation.x =
                Math.sin(elapsed * 0.2) * 0.08;

            renderer.render(scene, camera);

        }


        /* 11. START */

        if (prefersReducedMotion) {

            renderer.render(scene, camera);

        } else {

            renderer.setAnimationLoop(animate);

        }

    } catch (error) {

        console.error(
            "Unable to initialize the Three.js hologram:",
            error
        );

    }

}
