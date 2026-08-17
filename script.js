/* =====================================================
   CORESETUP STUDIO
   VERSION 2
   THREE.JS DIGITAL GLOBE
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

document.body.classList.add("loading");

const preloader =
    document.querySelector(".preloader");

const loaderLine =
    document.querySelector(".loader-line span");

const loaderPercent =
    document.querySelector(".loader-percent");


let progress = 0;


const loaderInterval =
    setInterval(() => {

        progress +=
            Math.random() * 12;

        if (progress >= 100) {

            progress = 100;

            clearInterval(loaderInterval);

            setTimeout(() => {

                preloader.classList.add("hidden");

                document.body.classList.remove(
                    "loading"
                );

            }, 500);

        }


        loaderLine.style.width =
            `${progress}%`;

        loaderPercent.textContent =
            `${Math.floor(progress)
                .toString()
                .padStart(2,"0")}%`;

    }, 100);


/* =====================================================
   THREE.JS GLOBE
===================================================== */

const canvas =
    document.getElementById("globe");


if (canvas && typeof THREE !== "undefined") {


    const container =
        document.querySelector(
            ".globe-container"
        );


    const scene =
        new THREE.Scene();


    /* -----------------------------------------------
       CAMERA
    ------------------------------------------------ */

    const camera =
        new THREE.PerspectiveCamera(
            35,
            container.clientWidth /
            container.clientHeight,
            0.1,
            1000
        );


    camera.position.z = 5;


    /* -----------------------------------------------
       RENDERER
    ------------------------------------------------ */

    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    /* -----------------------------------------------
       GROUP
    ------------------------------------------------ */

    const globeGroup =
        new THREE.Group();


    scene.add(
        globeGroup
    );


    /* -----------------------------------------------
       MAIN SPHERE
    ------------------------------------------------ */

    const sphereGeometry =
        new THREE.SphereGeometry(
            1.55,
            64,
            64
        );


    const sphereMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x0c1428,
            transparent: true,
            opacity: 0.75
        });


    const sphere =
        new THREE.Mesh(
            sphereGeometry,
            sphereMaterial
        );


    globeGroup.add(
        sphere
    );


    /* -----------------------------------------------
       WIREFRAME
    ------------------------------------------------ */

    const wireGeometry =
        new THREE.SphereGeometry(
            1.57,
            32,
            24
        );


    const wireMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x4263ff,
            wireframe: true,
            transparent: true,
            opacity: 0.14
        });


    const wire =
        new THREE.Mesh(
            wireGeometry,
            wireMaterial
        );


    globeGroup.add(
        wire
    );


    /* -----------------------------------------------
       ATMOSPHERE
    ------------------------------------------------ */

    const atmosphereGeometry =
        new THREE.SphereGeometry(
            1.66,
            64,
            64
        );


    const atmosphereMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x3155ff,
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide
        });


    const atmosphere =
        new THREE.Mesh(
            atmosphereGeometry,
            atmosphereMaterial
        );


    globeGroup.add(
        atmosphere
    );


    /* -----------------------------------------------
       CITY / NETWORK POINTS
    ------------------------------------------------ */

    const points =
        new THREE.Group();


    globeGroup.add(
        points
    );


    const pointMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x6d84ff
        });


    const pointGeometry =
        new THREE.SphereGeometry(
            0.022,
            6,
            6
        );


    const locations = [];


    /*
        Approximate global coordinates.
        These are visual points only.
    */

    const cities = [

        [52.52, 13.40],
        [51.50, -0.12],
        [48.85, 2.35],
        [40.71, -74.00],
        [34.05, -118.24],
        [37.77, -122.41],
        [25.20, 55.27],
        [35.67, 139.65],
        [31.23, 121.47],
        [1.35, 103.81],
        [-33.86, 151.20],
        [-23.55, -46.63],
        [19.43, -99.13],
        [43.65, -79.38],
        [55.75, 37.61],
        [28.61, 77.20],
        [22.31, 114.16],
        [59.32, 18.06],
        [41.90, 12.49],
        [52.37, 4.90],
        [50.11, 8.68],
        [41.38, 2.17],
        [38.72, -9.13],
        [59.91, 10.75],
        [-1.29, 36.82],
        [6.52, 3.37],
        [30.04, 31.23],
        [24.71, 46.67],
        [13.75, 100.50]

    ];


    function latLonToVector(
        lat,
        lon,
        radius
    ) {

        const phi =
            (90 - lat)
            * Math.PI / 180;

        const theta =
            (lon + 180)
            * Math.PI / 180;


        return new THREE.Vector3(

            -radius *
            Math.sin(phi) *
            Math.cos(theta),

            radius *
            Math.cos(phi),

            radius *
            Math.sin(phi) *
            Math.sin(theta)

        );

    }


    cities.forEach(
        city => {

            const position =
                latLonToVector(
                    city[0],
                    city[1],
                    1.59
                );


            const point =
                new THREE.Mesh(
                    pointGeometry,
                    pointMaterial
                );


            point.position.copy(
                position
            );


            points.add(
                point
            );


            locations.push(
                position.clone()
            );

        }
    );


    /* -----------------------------------------------
       RANDOM NETWORK POINTS
    ------------------------------------------------ */

    for (
        let i = 0;
        i < 110;
        i++
    ) {

        const lat =
            Math.random() * 160 - 80;

        const lon =
            Math.random() * 360 - 180;


        const position =
            latLonToVector(
                lat,
                lon,
                1.59
            );


        const point =
            new THREE.Mesh(
                pointGeometry,
                pointMaterial
            );


        point.scale.setScalar(
            Math.random() * .7 + .35
        );


        point.position.copy(
            position
        );


        points.add(
            point
        );

        locations.push(
            position.clone()
        );

    }


    /* -----------------------------------------------
       NETWORK LINES
    ------------------------------------------------ */

    const lineGroup =
        new THREE.Group();


    globeGroup.add(
        lineGroup
    );


    const lineMaterial =
        new THREE.LineBasicMaterial({
            color: 0x4263ff,
            transparent: true,
            opacity: 0.13
        });


    /*
       Connect selected city nodes.
    */

    for (
        let i = 0;
        i < 14;
        i++
    ) {

        const start =
            locations[
                i % locations.length
            ];


        const end =
            locations[
                (i * 5 + 3)
                % locations.length
            ];


        const midpoint =
            start.clone()
                .add(end)
                .normalize()
                .multiplyScalar(1.9);


        const curve =
            new THREE.QuadraticBezierCurve3(
                start,
                midpoint,
                end
            );


        const pointsCurve =
            curve.getPoints(25);


        const geometry =
            new THREE.BufferGeometry()
                .setFromPoints(
                    pointsCurve
                );


        const line =
            new THREE.Line(
                geometry,
                lineMaterial
            );


        lineGroup.add(
            line
        );

    }


    /* -----------------------------------------------
       ORBIT RINGS
    ------------------------------------------------ */

    function createOrbit(
        radius,
        rotation
    ) {

        const geometry =
            new THREE.TorusGeometry(
                radius,
                0.006,
                8,
                100
            );


        const material =
            new THREE.MeshBasicMaterial({
                color: 0x4263ff,
                transparent: true,
                opacity: 0.25
            });


        const orbit =
            new THREE.Mesh(
                geometry,
                material
            );


        orbit.rotation.set(
            rotation.x,
            rotation.y,
            rotation.z
        );


        globeGroup.add(
            orbit
        );

    }


    createOrbit(
        1.9,
        {
            x: 0.5,
            y: 0.2,
            z: 0.3
        }
    );


    createOrbit(
        2.05,
        {
            x: 1.2,
            y: 0.8,
            z: 0
        }
    );


    /* -----------------------------------------------
       STARS
    ------------------------------------------------ */

    const starGeometry =
        new THREE.BufferGeometry();


    const starPositions = [];


    for (
        let i = 0;
        i < 900;
        i++
    ) {

        starPositions.push(
            (Math.random() - .5) * 12,
            (Math.random() - .5) * 12,
            (Math.random() - .5) * 12
        );

    }


    starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            starPositions,
            3
        )
    );


    const starMaterial =
        new THREE.PointsMaterial({
            color: 0x5b6fa8,
            size: 0.012,
            transparent: true,
            opacity: 0.55
        });


    const stars =
        new THREE.Points(
            starGeometry,
            starMaterial
        );


    scene.add(
        stars
    );


    /* -----------------------------------------------
       MOUSE INTERACTION
    ------------------------------------------------ */

    let mouseX = 0;
    let mouseY = 0;

    let targetRotationX = 0;
    let targetRotationY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                (event.clientX /
                window.innerWidth) * 2 - 1;


            mouseY =
                (event.clientY /
                window.innerHeight) * 2 - 1;


            targetRotationY =
                mouseX * .35;


            targetRotationX =
                mouseY * .18;

        }
    );


    /* -----------------------------------------------
       ANIMATION
    ------------------------------------------------ */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        /*
           Automatic rotation.
        */

        globeGroup.rotation.y +=
            0.0018;


        /*
           Smooth mouse movement.
        */

        globeGroup.rotation.x +=
            (targetRotationX -
             globeGroup.rotation.x)
            * .025;


        globeGroup.rotation.y +=
            (targetRotationY -
             globeGroup.rotation.y)
            * .008;


        /*
           Slight breathing effect.
        */

        const scale =
            1 +
            Math.sin(
                elapsed * .7
            ) * .008;


        globeGroup.scale.set(
            scale,
            scale,
            scale
        );


        /*
           Star movement.
        */

        stars.rotation.y =
            elapsed * .003;

        stars.rotation.x =
            elapsed * .001;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* -----------------------------------------------
       RESIZE
    ------------------------------------------------ */

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }
    );

}


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const cursorRing =
    document.querySelector(".cursor-ring");


let cursorX = 0;
let cursorY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener(
    "mousemove",
    event => {

        cursorX =
            event.clientX;

        cursorY =
            event.clientY;


        if (cursor) {

            cursor.style.left =
                `${cursorX}px`;

            cursor.style.top =
                `${cursorY}px`;

        }

    }
);


function cursorAnimation() {

    ringX +=
        (cursorX - ringX) * .12;

    ringY +=
        (cursorY - ringY) * .12;


    if (cursorRing) {

        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;

    }


    requestAnimationFrame(
        cursorAnimation
    );

}


cursorAnimation();


/* =====================================================
   CURSOR HOVER
===================================================== */

document
    .querySelectorAll(
        "a, button, input, textarea, .service-card"
    )
    .forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        }
    );


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.querySelector(
        ".menu-toggle"
    );

const mobileMenu =
    document.querySelector(
        ".mobile-menu"
    );


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );

}


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        }
    );


/* =====================================================
   SCROLL REVEALS
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal-section"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =====================================================
   COUNTERS
===================================================== */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const element =
                        entry.target;


                    const target =
                        parseInt(
                            element.dataset.count
                        );


                    let current = 0;


                    const duration =
                        1300;


                    const start =
                        performance.now();


                    function update(
                        timestamp
                    ) {

                        const progress =
                            Math.min(
                                (timestamp - start)
                                / duration,
                                1
                            );


                        current =
                            Math.floor(
                                progress * target
                            );


                        element.textContent =
                            current;


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                update
                            );

                        } else {

                            element.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        update
                    );


                    counterObserver.unobserve(
                        element
                    );

                }
            );

        },
        {
            threshold: .7
        }
    );


counters.forEach(
    counter => {

        counterObserver.observe(
            counter
        );

    }
);


/* =====================================================
   MAGNETIC BUTTON
===================================================== */

const magneticButtons =
    document.querySelectorAll(
        ".magnetic-button"
    );


magneticButtons.forEach(
    button => {

        button.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(${x * .18}px,
                               ${y * .18}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    }
);


/* =====================================================
   HERO PARALLAX
===================================================== */

const heroGrid =
    document.querySelector(
        ".hero-grid"
    );

const heroGlow =
    document.querySelector(
        ".glow-one"
    );


window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;


        if (
            heroGrid &&
            scroll <
            window.innerHeight
        ) {

            heroGrid.style.transform =
                `translateY(${scroll * .1}px)`;

        }


        if (
            heroGlow &&
            scroll <
            window.innerHeight
        ) {

            heroGlow.style.transform =
                `translateY(${scroll * .04}px)`;

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   PROJECT TILT
===================================================== */

document
    .querySelectorAll(
        ".project-screen"
    )
    .forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    if (
                        window.innerWidth < 900
                    ) return;


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        ((y / rect.height) - .5)
                        * -3;


                    const rotateY =
                        ((x / rect.width) - .5)
                        * 3;


                    card.style.transform =
                        `perspective(1400px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         scale(1.005)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                contactForm
                    .querySelector(
                        '[name="name"]'
                    )
                    .value
                    .trim();


            const email =
                contactForm
                    .querySelector(
                        '[name="email"]'
                    )
                    .value
                    .trim();


            const company =
                contactForm
                    .querySelector(
                        '[name="company"]'
                    )
                    .value
                    .trim();


            const message =
                contactForm
                    .querySelector(
                        '[name="message"]'
                    )
                    .value
                    .trim();


            const feedback =
                document.querySelector(
                    ".form-message"
                );


            if (
                !name ||
                !email ||
                !message
            ) {

                feedback.textContent =
                    "PLEASE COMPLETE THE REQUIRED FIELDS.";

                return;

            }


            const subject =
                encodeURIComponent(
                    "CoreSetup Studio — New Project"
                );


            const body =
                encodeURIComponent(

                    `Name: ${name}

Email: ${email}

Company: ${company}

Project:

${message}`

                );


            feedback.textContent =
                "OPENING YOUR EMAIL CLIENT...";


            window.location.href =
                `mailto:info@coresetup.studio?subject=${subject}&body=${body}`;

        }
    );

}


/* =====================================================
   SMOOTH ANCHORS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const id =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        id === "#"
                    ) {

                        event.preventDefault();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                        return;

                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                }
            );

        }
    );
