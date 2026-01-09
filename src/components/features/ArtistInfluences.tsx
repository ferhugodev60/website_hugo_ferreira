"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { favoriteArtists } from "@/data/artists";

export function ArtistInfluences() {
    return (
        /* 1. Utilisation de 'max-w-6xl' pour correspondre exactement au TracklistTable.
           2. Suppression de 'border-t' pour enlever la barre sous le Manifesto.
        */
        <section className="w-full max-w-6xl mx-auto px-6 py-24">
            {/* Header de section style DAW */}
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold tracking-tighter uppercase text-studio-neon">
                    Sensory_Influences <span className="text-white/30 ml-2">// Artists</span>
                </h2>
                {/* Masqué sur mobile pour éviter la surcharge visuelle */}
                <span className="hidden md:block text-[10px] text-white/40 uppercase tracking-widest font-mono">
                    Inspiration_Nodes: {favoriteArtists.length}
                </span>
            </div>

            {/* Le composant Aceternity UI */}
            <div className="py-10">
                <AnimatedTestimonials
                    testimonials={favoriteArtists}
                    autoplay={true}
                />
            </div>
        </section>
    );
}