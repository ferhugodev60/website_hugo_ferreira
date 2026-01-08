"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.1]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full bg-studio-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background avec Parallaxe */}
                <motion.div
                    style={{ scale: imgScale, opacity: imgOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/images/background.jpg"
                        alt="Studio Background"
                        fill
                        className="object-cover grayscale contrast-125"
                        priority
                    />

                    {/* LE MASQUE "TOTAL BLEND" : 3 couches de dégradés */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background: `
                                /* 1. Fondu progressif vers le bas pour supprimer la ligne horizontale */
                                linear-gradient(to top, var(--color-studio-black) 0%, transparent 25%),
                                /* 2. Fondu progressif vers le haut */
                                linear-gradient(to bottom, var(--color-studio-black) 0%, transparent 15%),
                                /* 3. Vignettage radial pour le centre */
                                radial-gradient(circle at center, 
                                    transparent 0%, 
                                    rgba(0,0,0,0.4) 50%, 
                                    var(--color-studio-black) 100%
                                )
                            `
                        }}
                    />
                </motion.div>

                {/* Contenu Principal */}
                <motion.div
                    style={{ scale, opacity, y }}
                    className="relative z-10 text-center space-y-8"
                >
                    <header className="space-y-4">
                        <span className="text-studio-neon text-[10px] uppercase tracking-[0.5em] font-bold block">
                            Digital Architecture • Sound Composition
                        </span>

                        <h1 className="text-7xl md:text-9xl font-black tracking-tight text-white leading-none">
                            HUGO <span className="text-studio-accent/20">FERREIRA</span>
                        </h1>
                    </header>

                    <p className="max-w-2xl mx-auto text-studio-accent/60 text-lg md:text-xl font-light leading-relaxed px-6 italic font-mono">
                        2nd MIAGE master&#39;s student in Amiens (France). I want to be a UI/UX Designer.
                    </p>
                </motion.div>

                {/* Indicateur de Scroll */}
                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-12 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-widest text-studio-neon/40">Initiating Session</span>
                    <div className="w-px h-16 bg-gradient-to-b from-studio-neon/50 to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}