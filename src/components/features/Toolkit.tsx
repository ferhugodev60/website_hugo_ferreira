"use client";

import { motion } from "framer-motion";

export default function Toolkit() {
    const tools = [
        {
            name: "React",
            category: "Frontend_Library",
            logo: "https://cdn.simpleicons.org/react/61DAFB",
            description: "Développement d'interfaces dynamiques et modulaires."
        },
        {
            name: "Tailwind",
            category: "Styling_Engine",
            logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            description: "Conception de systèmes de design atomiques et fluides."
        },
        {
            name: "Node.js",
            category: "Backend_Runtime",
            logo: "https://cdn.simpleicons.org/nodedotjs/339933",
            description: "Logique serveur et architectures scalables."
        },
        {
            name: "FL Studio",
            category: "Audio_DAW",
            logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/fl-studio.webp",
            description: "Composition musicale, Sound Design et mixage pro."
        }
    ];

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-24">
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold tracking-tighter uppercase text-studio-neon">
                    Toolkit_Inventory <span className="text-white/30 ml-2">// Stack & Software</span>
                </h2>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                    Nodes_Detected: 04
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative bg-white/[0.03] border border-white/5 p-8 rounded-2xl hover:border-studio-neon/40 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-studio-neon/0 group-hover:bg-studio-neon/[0.02] transition-colors duration-500" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* LOGO AVEC ROTATION INFINIE FIXÉE */}
                            <motion.div
                                className="mb-6 h-12 w-12 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                                // Utilisation d'un tableau [0, 360] pour garantir un loop infini sans retour arrière
                                animate={tool.name === "React" ? { rotate: [0, 360] } : {}}
                                transition={tool.name === "React" ? {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatType: "loop" // Force le redémarrage à 0 sans effet miroir
                                } : {}}
                            >
                                <img
                                    src={tool.logo}
                                    alt={`${tool.name} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>

                            <div className="space-y-1">
                                <span className="text-[8px] font-mono text-studio-neon/40 uppercase tracking-[0.2em]">
                                    {tool.category}
                                </span>
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    {tool.name}
                                </h3>
                            </div>

                            <div className="mt-4 w-8 h-px bg-white/10 group-hover:w-16 group-hover:bg-studio-neon transition-all duration-500" />

                            <p className="mt-4 text-[11px] text-white/40 font-mono leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {tool.description}
                            </p>
                        </div>

                        <div className="absolute bottom-2 right-3 text-[7px] font-mono text-white/5 group-hover:text-studio-neon/20 transition-colors uppercase">
                            Module_0{index + 1}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}