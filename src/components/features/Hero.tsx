"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // On suit la progression du scroll sur ce conteneur spécifique
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- TRANSFORMATIONS ---
    // Le texte grossit et s'efface
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    // L'image de fond dézoome et devient plus sombre
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.1]);

    // Les éléments secondaires s'envolent vers le haut
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full bg-studio-black">
            {/* Conteneur bloqué à l'écran */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background avec parallaxe inverse */}
                <motion.div
                    style={{ scale: imgScale, opacity: imgOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
                        alt="Studio Background"
                        fill
                        className="object-cover grayscale contrast-125"
                        priority
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--color-studio-black)_90%)]" />
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
                        "Merging code rigour with beatmaking instinct."
                    </p>
                </motion.div>

                {/* Indicateur de Scroll qui disparaît vite */}
                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-12 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-widest text-studio-neon/40">Initiating Session</span>
                    <div className="w-px h-16 bg-linear-to-b from-studio-neon/50 to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}