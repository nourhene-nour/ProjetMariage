/* =========================================================
   ENVELOPPE 3D
   CONTROLEUR GSAP
========================================================= */


/*
    Ce fichier concerne uniquement :

    index.html
        ↓
    enveloppe
        ↓
    sceau
        ↓
    ouverture 3D
        ↓
    invitation.html
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           RÉCUPÉRATION DES ÉLÉMENTS
        ================================================= */

        const scene =
            document.getElementById("scene");

        const envelope =
            document.getElementById("envelope");

        const flap =
            document.getElementById("flap");

        const seal =
            document.getElementById("seal");

        const shadow =
            document.getElementById("movingShadow");

        const hint =
            document.getElementById("hint");

        const sheen =
            document.querySelector(".paper-sheen");


        /* =================================================
           VÉRIFICATION
        ================================================= */

        if (
            !scene ||
            !envelope ||
            !flap ||
            !seal ||
            !shadow
        ) {

            console.error(
                "Éléments de l'enveloppe introuvables."
            );

            return;

        }


        /* =================================================
           ÉTAT
        ================================================= */

        let opened = false;


        /* =================================================
           ÉTAT INITIAL
        ================================================= */

        gsap.set(
            flap,
            {
                rotationX: 0,
                transformOrigin:
                    "50% 0%"
            }
        );


        gsap.set(
            shadow,
            {
                scaleY: 1,
                scaleX: 1,
                opacity: .52
            }
        );


        gsap.set(
            seal,
            {
                xPercent: -50,
                yPercent: -50
            }
        );


        /* =================================================
           APPARITION INITIALE
        ================================================= */

        const intro =
            gsap.timeline();


        intro

            .from(
                envelope,
                {
                    y: 45,
                    scale: .96,
                    opacity: 0,

                    duration: 1.2,

                    ease:
                        "power3.out"
                }
            )

            .from(
                seal,
                {
                    scale: .65,
                    opacity: 0,

                    duration: .7,

                    ease:
                        "back.out(1.7)"
                },
                "-=.45"
            )

            .from(
                hint,
                {
                    y: 10,
                    opacity: 0,

                    duration: .5
                },
                "-=.25"
            );


        /* =================================================
           MICRO-MOUVEMENT DU SCEAU
        ================================================= */

        const idleSeal =
            gsap.to(
                seal,
                {
                    y: "-=3",

                    duration: 2.2,

                    repeat: -1,

                    yoyo: true,

                    ease:
                        "sine.inOut"
                }
            );


        /* =================================================
           PARALLAXE SOURIS
        ================================================= */

        const handlePointerMove =
            (event) => {


                if (opened) {
                    return;
                }


                const rect =
                    scene.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    )
                    /
                    rect.width
                    -
                    .5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    )
                    /
                    rect.height
                    -
                    .5;


                /*
                    Le mouvement est volontairement
                    très léger.

                    Le but est de donner une impression
                    de profondeur, pas de faire tourner
                    l'enveloppe comme un objet 3D.
                */

                gsap.to(
                    envelope,
                    {
                        rotationY:
                            x * 2.5,

                        rotationX:
                            -y * 2,

                        duration: .7,

                        ease:
                            "power2.out",

                        overwrite:
                            true
                    }
                );


                /*
                    Le sceau suit légèrement
                    le mouvement.
                */

                gsap.to(
                    seal,
                    {
                        xPercent: -50,
                        yPercent: -50,

                        x:
                            x * 8,

                        y:
                            y * 5,

                        duration: .7,

                        ease:
                            "power2.out",

                        overwrite:
                            true
                    }
                );

            };


        scene.addEventListener(
            "pointermove",
            handlePointerMove,
            {
                passive: true
            }
        );


        /* =================================================
           RESET PAR SORTIE
        ================================================= */

        scene.addEventListener(
            "pointerleave",
            () => {


                if (opened) {
                    return;
                }


                gsap.to(
                    envelope,
                    {
                        rotationY: 0,
                        rotationX: 0,

                        duration: .8,

                        ease:
                            "power3.out"
                    }
                );


                gsap.to(
                    seal,
                    {
                        x: 0,
                        y: 0,

                        duration: .8,

                        ease:
                            "power3.out"
                    }
                );

            }
        );


        /* =================================================
           HOVER DU SCEAU
        ================================================= */

        seal.addEventListener(
            "pointerenter",
            () => {


                if (opened) {
                    return;
                }


                gsap.to(
                    seal,
                    {
                        scale: 1.07,

                        duration: .35,

                        ease:
                            "power2.out"
                    }
                );


                gsap.to(
                    seal,
                    {
                        filter:
                            "drop-shadow(0 12px 18px rgba(42,86,118,.34))",

                        duration: .35
                    }
                );

            }
        );


        seal.addEventListener(
            "pointerleave",
            () => {


                if (opened) {
                    return;
                }


                gsap.to(
                    seal,
                    {
                        scale: 1,

                        duration: .35,

                        ease:
                            "power2.out"
                    }
                );


                gsap.to(
                    seal,
                    {
                        filter:
                            "drop-shadow(0 9px 12px rgba(37,73,101,.25))",

                        duration: .35
                    }
                );

            }
        );


        /* =================================================
           CLIC SUR LE SCEAU
        ================================================= */

        seal.addEventListener(
            "click",
            () => {


                /*
                    Empêche plusieurs clics.
                */

                if (opened) {
                    return;
                }


                opened = true;


                scene.classList.add(
                    "is-opening"
                );


                /*
                    Arrêt du mouvement flottant.
                */

                idleSeal.pause();


                /*
                    Disparition du texte.
                */

                gsap.to(
                    hint,
                    {
                        opacity: 0,
                        y: 10,

                        duration: .25
                    }
                );


                /* =========================================
                   TIMELINE PRINCIPALE
                ========================================= */

                const opening =
                    gsap.timeline();


                /* -----------------------------------------
                   1 — PRESSION DU SCEAU
                ----------------------------------------- */

                opening.to(
                    seal,
                    {
                        scale: .88,

                        duration: .18,

                        ease:
                            "power2.in"
                    }
                );


                /* -----------------------------------------
                   2 — DÉCOLLEMENT DU SCEAU
                ----------------------------------------- */

                opening.to(
                    seal,
                    {
                        y: "-=18",

                        scale: .96,

                        duration: .28,

                        ease:
                            "power2.out"
                    }
                );


                /* -----------------------------------------
                   3 — DÉBUT OUVERTURE RABAT
                ----------------------------------------- */

                opening.to(
                    flap,
                    {
                        rotationX: -105,

                        duration: 1.35,

                        ease:
                            "power3.inOut"
                    },
                    "-=.08"
                );


                /* -----------------------------------------
                   4 — OMBRE QUI SUIT LE RABAT
                ----------------------------------------- */

                opening.to(
                    shadow,
                    {
                        scaleY: .35,

                        scaleX: .78,

                        opacity: .12,

                        duration: 1.15,

                        ease:
                            "power3.inOut"
                    },
                    "<"
                );


                /* -----------------------------------------
                   5 — REFLET DE LUMIÈRE
                ----------------------------------------- */

                if (sheen) {

                    opening.to(
                        sheen,
                        {
                            x: "200%",

                            duration: 1.1,

                            ease:
                                "power2.inOut"
                        },
                        "-=1.05"
                    );

                }


                /* -----------------------------------------
                   6 — FIN DE ROTATION
                ----------------------------------------- */

                opening.to(
                    flap,
                    {
                        rotationX: -180,

                        duration: .55,

                        ease:
                            "power2.inOut"
                    }
                );


                /* -----------------------------------------
                   7 — DISPARITION DU SCEAU
                ----------------------------------------- */

                opening.to(
                    seal,
                    {
                        opacity: 0,

                        scale: .82,

                        y: "-=35",

                        duration: .45,

                        ease:
                            "power2.in"
                    },
                    "-=.35"
                );


                /* -----------------------------------------
                   8 — TRANSITION DE LA PAGE
                ----------------------------------------- */

                opening.to(
                    scene,
                    {
                        opacity: 0,

                        duration: .7,

                        ease:
                            "power2.in"
                    }
                );


                /* -----------------------------------------
                   9 — NAVIGATION
                ----------------------------------------- */

                opening.call(
                    () => {

                        window.location.href =
                            "invitation.html";

                    }
                );


            }
        );

    }
);