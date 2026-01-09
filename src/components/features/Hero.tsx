"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SocialLinks from "@/components/layout/SocialLinks";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { playClick } = useSoundEffects();

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
        playClick();
        const projectsSection = document.getElementById("projects-archive");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
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
                </motion.div>

                {/* 3. MAIN CONTENT (HUGO FERREIRA) */}
                <motion.div
                    style={{ scale, opacity, y }}
                    className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center md:items-start text-center md:text-left"
                >
                    <header className="w-full flex flex-col items-center md:items-start">
                        <span className="text-studio-neon text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
                            Interface Design • Musical composition
                        </span>

                        <div className="flex flex-col items-center md:items-start w-full">
                            <h1 className="text-6xl md:text-9xl font-black text-white leading-none uppercase tracking-[0.02em] md:tracking-tighter">
                                HUGO
                            </h1>
                            <div className="h-[6rem] md:h-[9rem] w-full max-w-[400px] md:max-w-none mx-auto md:mx-0 -mt-2 md:-mt-6 md:-ml-2 overflow-visible">
                                <TextHoverEffect text="FERREIRA" />
                            </div>
                        </div>
                    </header>

                    <p className="max-w-2xl text-studio-accent/60 text-sm md:text-xl font-light leading-relaxed italic font-mono mt-2 md:mt-2 px-4 md:px-0">
                        Passionné par le Web Design et la Musique Assistée par Ordinateur (MAO)
                    </p>

                    <motion.div className="flex justify-center md:justify-start pt-8 md:pt-10 w-full">
                        <button
                            onClick={scrollToProjects}
                            className="group relative flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all hover:border-studio-neon/50"
                        >
                            <div className="absolute inset-0 bg-studio-neon translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors">
                                Explore_Archive
                            </span>
                            <ChevronDown size={16} className="relative z-10 text-studio-neon group-hover:text-black transition-colors animate-bounce" />
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