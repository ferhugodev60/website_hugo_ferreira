"use client";

import TracklistTable from "@/components/TracklistTable";
import ContactTerminal from "@/components/features/ContactTerminal";
import ProjectModal from "@/components/features/ProjectModal";
import Manifesto from "@/components/features/Manifesto";
import Hero from "@/components/features/Hero";

export default function Home() {
    return (
        <div className="bg-studio-black">
            <ProjectModal />

            <Hero />

            <section className="relative z-10 pb-10">
                <TracklistTable />
            </section>

            <Manifesto />

            <section className="relative z-10 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,102,0.02))]">
                <ContactTerminal />
            </section>
        </div>
    );
}