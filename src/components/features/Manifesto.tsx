"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
    const text = "Le code devient matière. Une approche où la rigueur du développement rencontre l'exigence du design.";
    const words = text.split(" ");

    const facts = [
        { label: "Rôle", value: "Développeur Full-Stack" },
        { label: "Stack", value: "React / Node" },
        { label: "Statut", value: "Ouvert aux projets" },
        { label: "Localisation", value: "Compiègne, FR" }
    ];

    return (
        <section className="max-w-6xl mx-auto px-6 py-20 relative">
            {/* Ligne de connexion verticale (masquée sur mobile, prend trop de place) */}
            <div className="hidden md:block absolute top-0 left-10 w-px h-full bg-linear-to-b from-studio-neon/20 via-studio-neon/10 to-transparent" />

            <div className="md:pl-12 space-y-12">
                {/* Header de section */}
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-studio-neon uppercase tracking-[0.3em]">
                        Manifeste
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                </div>

                {/* Texte manifeste, révélé mot par mot */}
                <div className="max-w-3xl">
                    <p className="text-2xl md:text-4xl font-bold tracking-tighter text-white leading-tight">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
                                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block mr-[0.3em]"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
                </div>

                {/* Quelques repères */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {facts.map((item, i) => (
                        <div key={i}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">{item.label}</p>
                            <p className="text-sm text-white/80">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
