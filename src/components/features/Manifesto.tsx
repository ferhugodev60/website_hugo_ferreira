"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
    const text = "FUSIONNER LA RIGUEUR DU CODE ET L'INSTINCT DU BEATMAKING POUR CRÉER DES INTERFACES QUI RÉSONNENT. SYSTÈME PRÊT POUR NOUVELLE COLLABORATION.";

    return (
        <section className="max-w-6xl mx-auto px-6 py-20 relative">
            {/* Ligne de connexion verticale */}
            <div className="absolute top-0 left-10 w-px h-full bg-linear-to-b from-studio-neon/20 via-studio-neon/10 to-transparent" />

            <div className="pl-12 space-y-12">
                {/* Header Transition */}
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-studio-neon border border-studio-neon/30 px-2 py-0.5 rounded">
                        04 // SYSTEM_MANIFESTO
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                </div>

                {/* Animation Texte Décodeur */}
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-bold tracking-tighter text-white leading-tight uppercase"
                    >
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, color: "#95FF00" }}
                                whileInView={{ opacity: 1, color: "#ffffff" }}
                                transition={{ delay: i * 0.015, duration: 0.1 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-3 h-8 bg-studio-neon ml-2 align-middle"
                        />
                    </motion.p>
                </div>

                {/* Grid de status pour habiller le bas du manifesto */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40">
                    {[
                        { label: "LATENCY", value: "0.4ms" },
                        { label: "CORE_PROCESS", value: "CREATIVE_DEV" },
                        { label: "BITRATE", value: "320KBPS" },
                        { label: "LOCATION", value: "FR_BORD_01" }
                    ].map((item, i) => (
                        <div key={i} className="font-mono">
                            <p className="text-[8px] uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                            <p className="text-[10px] text-studio-neon">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}