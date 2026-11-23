"use client";

import Projects from "@/components/features/Projects";
import Contact from "@/components/features/Contact";
import ProjectModal from "@/components/features/ProjectModal";
import Presentation from "@/components/features/Presentation";
import Offers from "@/components/features/Offers";
import Process from "@/components/features/Process";
import Hero from "@/components/features/Hero";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Home() {
    return (
        <div className="bg-studio-black">
            {/* Composant de la modale (toujours présent pour l'état global) */}
            <ProjectModal />

            {/* Section d'accueil avec le bouton CTA */}
            <Hero />

            <Presentation />

            <section id="projects" className="relative z-10 pb-10">
                <Projects />
            </section>

            <Process />

            <Offers />

            {/* Section Contact avec effet de dégradé néon */}
            <section id="contact" className="relative z-10 bg-[linear-gradient(to_bottom,transparent,rgba(57,255,20,0.02))]">
                <Contact />
            </section>

            <SiteFooter />
        </div>
    );
}