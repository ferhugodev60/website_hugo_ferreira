"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SocialLinks from "@/components/layout/SocialLinks";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- TRANSFORMATIONS ---
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.1]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

    const scrollToProjects = () => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToPresentation = (event: React.MouseEvent) => {
        event.preventDefault();
        document.getElementById("presentation")?.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full bg-studio-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 1. SOCIAL LINKS : Centré uniquement sur mobile, fixe à droite sur desktop
                    - Mobile : absolute + inset-x-0 + justify-center
                    - Desktop (md) : fixed + top-10 + right-10 (garde ton design exact)
                */}
                <motion.div
                    style={{ opacity }}
                    className="absolute md:fixed top-10 inset-x-0 md:inset-x-auto md:right-10 z-[70] flex justify-center md:justify-end px-6"
                >
                    <SocialLinks />
                </motion.div>

                {/* 2. BACKGROUND & MASKS */}
                <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="absolute inset-0 z-0">
                    <Image
                        src="/images/background.webp"
                        alt="Studio Desktop"
                        fill
                        className="object-cover grayscale contrast-125 hidden md:block"
                        priority
                    />
                    <Image
                        src="/images/background-mobile.webp"
                        alt="Studio Mobile"
                        fill
                        className="object-cover grayscale contrast-125 block md:hidden"
                        priority
                    />
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background: `linear-gradient(to top, var(--color-studio-black) 0%, transparent 25%), radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)`
                        }}
                    />
                    {/* Voile sombre supplémentaire sur mobile : le fond mange trop les CTA */}
                    <div className="absolute inset-0 z-10 bg-black/45 md:hidden" />
                </motion.div>

                {/* 3. MAIN CONTENT (HUGO FERREIRA) */}
                <motion.div
                    style={{ scale, opacity, y }}
                    className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center md:items-start text-center md:text-left"
                >
                    <h1 className="w-full flex flex-col items-center md:items-start">
                        <span className="sr-only">Hugo Ferreira, création de sites web sur-mesure</span>
                        <span aria-hidden="true" className="flex flex-col items-center md:items-start w-full">
                            <span className="block text-6xl md:text-9xl font-black text-white leading-none uppercase tracking-[0.02em] md:tracking-tighter">
                                HUGO
                            </span>
                            {/* Mobile : texte plein et statique (pas de survol tactile possible) */}
                            <span className="block md:hidden text-6xl font-black text-white leading-none uppercase tracking-[0.02em] -mt-1">
                                FERREIRA
                            </span>
                            {/* Desktop : effet interactif au survol de la souris */}
                            <span className="hidden md:block h-[9rem] w-full -mt-6 -ml-2 overflow-visible">
                                <TextHoverEffect text="FERREIRA" />
                            </span>
                        </span>
                    </h1>

                    <p className="max-w-2xl text-studio-accent/80 text-sm md:text-lg leading-relaxed mt-4">
                        Vitrine, réservation ou boutique en ligne pour commerçants et artisans : je m&apos;occupe de tout, et
                        je reste à vos côtés après la mise en ligne.
                    </p>

                    <motion.div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 pt-8 w-full">
                        <button
                            onClick={scrollToContact}
                            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-studio-neon rounded-full text-sm font-semibold text-black hover:bg-white transition-colors cursor-pointer"
                        >
                            Réserver mon appel gratuit
                        </button>

                        <button
                            onClick={scrollToProjects}
                            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-white hover:text-studio-neon hover:border-studio-neon/40 transition-colors cursor-pointer"
                        >
                            Voir mes réalisations
                        </button>
                    </motion.div>

                    <a
                        href="#presentation"
                        onClick={scrollToPresentation}
                        className="mt-4 py-2 text-xs md:text-sm text-white/70 underline-offset-4 hover:text-white hover:underline focus-visible:underline"
                    >
                        Qui suis-je ? Découvrez-moi en vidéo
                    </a>
                </motion.div>

                {/* 4. SCROLL INDICATOR (desktop uniquement, prend trop de place sur mobile) */}
                <motion.div
                    style={{ opacity }}
                    animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden md:flex absolute bottom-4 flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-studio-neon/40">Scroll</span>
                    <div className="w-px h-16 bg-gradient-to-b from-studio-neon/50 to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}