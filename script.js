/* =========================================================
   CORESETUP STUDIO
   INTERACTIONS
========================================================= */
document.addEventListener(
    "DOMContentLoaded",
    () => {
        /* =========================================
           CUSTOM CURSOR
        ========================================= */
        const cursor =
            document.querySelector(".cursor");
        const follower =
            document.querySelector(
                ".cursor-follower"
            );
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        document.addEventListener(
            "mousemove",
            (event) => {
                mouseX =
                    event.clientX;
                mouseY =
                    event.clientY;
                if (cursor) {
                    cursor.style.left =
                        mouseX + "px";
                    cursor.style.top =
                        mouseY + "px";
                }
            }
        );
        function animateCursor() {
            followerX +=
                (mouseX - followerX) * .12;
            followerY +=
                (mouseY - followerY) * .12;
            if (follower) {
                follower.style.left =
                    followerX + "px";
                follower.style.top =
                    followerY + "px";
            }
            requestAnimationFrame(
                animateCursor
            );
        }
        animateCursor();
        /* =========================================
           CURSOR HOVER
        ========================================= */
        const hoverElements =
            document.querySelectorAll(
                "a, button, input, textarea, .service"
            );
        hoverElements.forEach(
            element => {
                element.addEventListener(
                    "mouseenter",
                    () => {
                        document.body
                            .classList
                            .add("cursor-hover");
                    }
                );
                element.addEventListener(
                    "mouseleave",
                    () => {
                        document.body
                            .classList
                            .remove("cursor-hover");
                    }
                );
            }
        );
        /* =========================================
           MOBILE MENU
        ========================================= */
        const menuButton =
            document.querySelector(
                ".mobile-menu-btn"
            );
        const mobileMenu =
            document.querySelector(
                ".mobile-menu"
            );
        if (menuButton && mobileMenu) {
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
            const menuLinks =
                mobileMenu.querySelectorAll(
                    "a"
                );
            menuLinks.forEach(
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
        }
        /* =========================================
           REVEAL ANIMATIONS
        ========================================= */
        const revealElements =
            document.querySelectorAll(
                ".service, .project, .process-item, .stat"
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
                element.style.opacity =
                    "0";
                element.style.transform =
                    "translateY(35px)";
                element.style.transition =
                    "opacity .8s ease, transform .8s ease";
                revealObserver.observe(
                    element
                );
            }
        );
        /* =========================================
           VISIBLE CLASS
        ========================================== */
        const revealStyle =
            document.createElement(
                "style"
            );
        revealStyle.innerHTML = `
            .service.visible,
            .project.visible,
            .process-item.visible,
            .stat.visible {
                opacity: 1 !important;
                transform:
                    translateY(0) !important;
            }
        `;
        document.head.appendChild(
            revealStyle
        );
        /* =========================================
           HERO PARALLAX
        ========================================= */
        const heroGrid =
            document.querySelector(
                ".hero-grid"
            );
        window.addEventListener(
            "scroll",
            () => {
                const scroll =
                    window.scrollY;
                if (
                    heroGrid &&
                    scroll < window.innerHeight
                ) {
                    heroGrid.style.transform =
                        `translateY(${scroll * .12}px)`;
                }
            },
            {
                passive: true
            }
        );
        /* =========================================
           PROJECT TILT
        ========================================= */
        const visualCards =
            document.querySelectorAll(
                ".project-visual"
            );
        visualCards.forEach(
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
                            * -4;
                        const rotateY =
                            ((x / rect.width) - .5)
                            * 4;
                        card.style.transform =
                            `perspective(1000px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)`;
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
        /* =========================================
           CONTACT FORM
        ========================================== */
        const form =
            document.querySelector(
                ".contact-form"
            );
        const formMessage =
            document.querySelector(
                ".form-message"
            );
        if (form) {
            form.addEventListener(
                "submit",
                event => {
                    event.preventDefault();
                    const name =
                        document.querySelector(
                            "#name"
                        ).value.trim();
                    const email =
                        document.querySelector(
                            "#email"
                        ).value.trim();
                    const company =
                        document.querySelector(
                            "#company"
                        ).value.trim();
                    const message =
                        document.querySelector(
                            "#message"
                        ).value.trim();
                    if (
                        !name ||
                        !email ||
                        !message
                    ) {
                        formMessage.textContent =
                            "Bitte fülle alle Pflichtfelder aus.";
                        return;
                    }
                    const subject =
                        encodeURIComponent(
                            "Neue CoreSetup Projektanfrage"
                        );
                    const body =
                        encodeURIComponent(
                            `Name: ${name}
Email: ${email}
Unternehmen: ${company}
Projekt:
${message}`
                        );
                    window.location.href =
                        `mailto:info@coresetup.studio?subject=${subject}&body=${body}`;
                    formMessage.textContent =
                        "Deine Anfrage wird vorbereitet...";
                }
            );
        }
        /* =========================================
           SMOOTH ANCHOR SCROLL
        ========================================== */
        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                anchor => {
                    anchor.addEventListener(
                        "click",
                        event => {
                            const targetId =
                                anchor
                                    .getAttribute(
                                        "href"
                                    );
                            if (
                                targetId === "#"
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
                                    targetId
                                );
                            if (target) {
                                event.preventDefault();
                                target.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });
                            }
                        }
                    );
                }
            );
    }
);
