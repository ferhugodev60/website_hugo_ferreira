"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useUIStore } from "@/store/useUIStore";
import SectionHeader from "@/components/ui/section-header";

export default function Projects() {
    const { openModal } = useUIStore();

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-20">
            <SectionHeader label="Réalisations" title="Mes projets" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <motion.button
                        key={project.id}
                        type="button"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                        viewport={{ once: true }}
                        onClick={() => openModal(project.id)}
                        className="group flex flex-col items-stretch justify-start text-left rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] cursor-pointer transition-colors duration-300 hover:border-studio-neon/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-neon"
                    >
                        <div className="relative aspect-video w-full overflow-hidden bg-white/[0.02]">
                            {project.coverUrl ? (
                                <Image
                                    src={project.coverUrl}
                                    alt={`Page d'accueil du site ${project.title}`}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center px-6 text-center text-2xl md:text-3xl font-bold tracking-tight text-white/20">
                                    {project.title}
                                </span>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <h3 className="text-lg font-bold tracking-tight text-white">{project.title}</h3>
                                {project.statusLabel && (
                                    <span className="px-3 py-1 rounded-full border border-studio-neon/30 text-studio-neon text-xs">
                                        {project.statusLabel}
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 text-sm text-white/60 leading-relaxed">{project.summary}</p>
                            <span className="mt-4 inline-block text-sm font-semibold text-studio-neon">
                                En savoir plus
                            </span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
