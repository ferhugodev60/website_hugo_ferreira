"use client";

import TracklistTable from "@/components/TracklistTable";
import Contact from "@/components/features/Contact";
import ProjectModal from "@/components/features/ProjectModal";
import Manifesto from "@/components/features/Manifesto";
import Hero from "@/components/features/Hero";
import Toolkit from "@/components/features/Toolkit";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Home() {
    return (
        <div className="bg-studio-black">
            {/* Composant de la modale (toujours présent pour l'état global) */}
            <ProjectModal />

            {/* Section d'accueil avec le bouton CTA */}
            <Hero />

            <section id="projects" className="relative z-10 pb-10">
                <TracklistTable />
            </section>

            {/* Section Manifesto */}
            <Manifesto />

            <Toolkit />

            {/* Section Contact avec effet de dégradé néon */}
            <section id="contact" className="relative z-10 bg-[linear-gradient(to_bottom,transparent,rgba(57,255,20,0.02))]">
                <Contact />
            </section>

            <SiteFooter />
        </div>
    );
}