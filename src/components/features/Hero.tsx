"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SocialLinks from "@/components/layout/SocialLinks";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { playClick } = useSoundEffects();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- TRANSFORMATIONS ---
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.1]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const scrollToProjects = () => {
        playClick();
        const projectsSection = document.getElementById("projects-archive");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full bg-studio-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 1. SOCIAL LINKS */}
                <motion.div style={{ opacity }} className="absolute top-0 right-0 z-50">
                    <SocialLinks />
                </motion.div>

                {/* 2. BACKGROUND & MASKS - GESTION RESPONSIVE */}
                <motion.div
                    style={{ scale: imgScale, opacity: imgOpacity }}
                    className="absolute inset-0 z-0"
                >
                    {/* Image DESKTOP : visible à partir de 'md' (768px+) */}
                    <Image
                        src="/images/background.webp"
                        alt="Studio Background Desktop"
                        fill
                        className="object-cover grayscale contrast-125 hidden md:block"
                        priority
                    />

                    {/* Image MOBILE : visible uniquement sous 'md' */}
                    <Image
                        src="/images/background-mobile.webp"
                        alt="Studio Background Mobile"
                        fill
                        className="object-cover grayscale contrast-125 block md:hidden"
                        priority
                    />

                    {/* Calques de dégradés pour la lisibilité */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background: `
                                linear-gradient(to top, var(--color-studio-black) 0%, transparent 25%),
                                linear-gradient(to bottom, var(--color-studio-black) 0%, transparent 15%),
                                radial-gradient(circle at center, 
                                    transparent 0%, 
                                    rgba(0,0,0,0.4) 50%, 
                                    var(--color-studio-black) 100%
                                )
                            `
                        }}
                    />
                </motion.div>

                {/* 3. MAIN CONTENT (TEXT + CTA) */}
                <motion.div
                    style={{ scale, opacity, y }}
                    className="relative z-10 text-center space-y-10"
                >
                    <header className="space-y-4">
                        <span className="text-studio-neon text-[10px] uppercase tracking-[0.5em] font-bold block">
                            Interface Design • Musical composition
                        </span>
                        <h1 className="text-5xl md:text-9xl font-black tracking-tight text-white leading-none">
                            HUGO <span className="text-studio-accent/20">FERREIRA</span>
                        </h1>
                    </header>

                    <p className="max-w-2xl mx-auto text-studio-accent/60 text-base md:text-xl font-light leading-relaxed px-6 italic font-mono">
                        Passionné par le Web Design et la Musique Assistée par Ordinateur (MAO)
                    </p>

                    <motion.div className="flex justify-center pt-4">
                        <button
                            onClick={scrollToProjects}
                            className="group relative flex items-center gap-3 px-8 py-4 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all hover:border-studio-neon/50"
                        >
                            <div className="absolute inset-0 bg-studio-neon translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                            <span className="relative z-10 text-[11px] font-mono uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-300">
                                Explore_Archive
                            </span>
                            <ChevronDown
                                size={16}
                                className="relative z-10 text-studio-neon group-hover:text-black transition-colors duration-300 animate-bounce"
                            />
                        </button>
                    </motion.div>
                </motion.div>

                {/* 4. SCROLL INDICATOR */}
                <motion.div style={{ opacity }} className="absolute bottom-12 flex flex-col items-center gap-4">
                    <span className="text-[10px] uppercase tracking-widest text-studio-neon/40">Initiating Session</span>
                    <div className="w-px h-16 bg-gradient-to-b from-studio-neon/50 to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}