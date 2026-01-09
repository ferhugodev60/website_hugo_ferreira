"use client";

import TracklistTable from "@/components/TracklistTable";
import ContactTerminal from "@/components/features/ContactTerminal";
import ProjectModal from "@/components/features/ProjectModal";
import Manifesto from "@/components/features/Manifesto";
import Hero from "@/components/features/Hero";
import {ArtistInfluences} from "@/components/features/ArtistInfluences";
import Toolkit from "@/components/features/Toolkit";

export default function Home() {
    return (
        <div className="bg-studio-black">
            {/* Composant de la modale (toujours présent pour l'état global) */}
            <ProjectModal />

            {/* Section d'accueil avec le bouton CTA */}
            <Hero />

            {/* AJOUT DE L'ID : Permet au bouton du Hero de trouver cette cible */}
            <section id="projects-archive" className="relative z-10 pb-10">
                <TracklistTable />
            </section>

            {/* Section Manifesto */}
            <Manifesto />

            <ArtistInfluences />

            <Toolkit />

            {/* Section Contact avec effet de dégradé néon */}
            <section className="relative z-10 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,102,0.02))]">
                <ContactTerminal />
            </section>
        </div>
    );
}