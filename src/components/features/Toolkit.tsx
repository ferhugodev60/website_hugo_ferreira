"use client";

import { motion } from "framer-motion";

export default function Toolkit() {
    const tools = [
        {
            name: "React",
            category: "Librairie Frontend",
            logo: "https://cdn.simpleicons.org/react/61DAFB",
            description: "Développement d'interfaces dynamiques et modulaires."
        },
        {
            name: "Next.js",
            category: "Framework React",
            logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
            description: "Rendu hybride, routing et Server Actions pour des applications full-stack."
        },
        {
            name: "Tailwind",
            category: "Moteur de Styles",
            logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            description: "Conception de systèmes de design atomiques et fluides."
        },
        {
            name: "Node.js",
            category: "Runtime Backend",
            logo: "https://cdn.simpleicons.org/nodedotjs/339933",
            description: "Logique serveur et architectures scalables."
        }
    ];

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-24">
            <div className="mb-12 border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold text-studio-neon uppercase tracking-[0.3em]">
                    Stack & Outils
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
                    Ce que j&apos;utilise au quotidien
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative bg-white/[0.03] border border-white/5 p-8 rounded-2xl md:hover:border-studio-neon/40 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-studio-neon/0 md:group-hover:bg-studio-neon/[0.02] transition-colors duration-500" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <motion.div
                                className="mb-6 h-12 w-12 flex items-center justify-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-[filter] duration-500"
                                animate={tool.name === "React" ? { rotate: 360 } : undefined}
                                whileHover={{ scale: 1.1 }}
                                transition={{
                                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 0.3, ease: "easeOut" }
                                }}
                            >
                                <img
                                    src={tool.logo}
                                    alt={`${tool.name} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>

                            <div className="space-y-1">
                                <span className="text-[10px] text-studio-neon/50 uppercase tracking-[0.15em]">
                                    {tool.category}
                                </span>
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    {tool.name}
                                </h3>
                            </div>

                            <div className="mt-4 h-px transition-all duration-500 w-16 bg-studio-neon md:w-8 md:bg-white/10 md:group-hover:w-16 md:group-hover:bg-studio-neon" />

                            <p className="mt-4 text-[11px] text-white/40 leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                                {tool.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}