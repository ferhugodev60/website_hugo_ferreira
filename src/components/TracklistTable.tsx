"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { projects } from "@/data/projects";
import { useAudioStore } from "@/store/useAudioStore";
import { useUIStore } from "@/store/useUIStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import SpectrumVisualizer from "@/components/features/SpectrumVisualizer";

export default function TracklistTable() {
    const { currentTrackId, isPlaying, playTrack, togglePlay } = useAudioStore();
    const { openModal } = useUIStore();
    const { playClick } = useSoundEffects();

    const handleProjectSelect = (id: string) => {
        playClick();
        openModal(id);

        if (currentTrackId === id) {
            if (!isPlaying) togglePlay();
        } else {
            playTrack(id);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-20">
            {/* HEADER DE SECTION - Aligné sur le reste du portfolio */}
            <div className="mb-8 border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold text-studio-neon uppercase tracking-[0.3em]">
                    Portfolio
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
                    Mes projets
                </h2>
            </div>

            <div className="space-y-1">
                {projects.map((project, index) => {
                    const isCurrent = currentTrackId === project.id;
                    const isActive = isCurrent && isPlaying;

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                            viewport={{ once: true }}
                            onClick={() => handleProjectSelect(project.id)}
                            className={`group flex items-center gap-4 p-4 rounded-xl transition-all border duration-300 cursor-pointer
                                ${isCurrent
                                ? 'bg-white/10 border-white/20'
                                : 'border-transparent bg-transparent hover:bg-white/5 hover:border-studio-neon/20'
                            }`}
                        >
                            {/* Visualiseur ou ID statique */}
                            <div className="w-12 h-12 flex items-center justify-center relative shrink-0">
                                {isActive ? (
                                    <div className="w-6 h-6 text-studio-neon">
                                        <SpectrumVisualizer />
                                    </div>
                                ) : (
                                    <>
                                        <span className={`font-mono text-xs transition-opacity group-hover:opacity-0 ${isCurrent ? 'text-studio-neon font-bold' : 'text-white/30'}`}>
                                            {project.id}
                                        </span>
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity text-studio-neon">
                                            <Play size={20} fill="currentColor" />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Nom du Projet */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2">
                                    <h3 className={`text-lg font-bold uppercase tracking-tight transition-colors ${isActive ? 'text-studio-neon' : 'text-white'}`}>
                                        {project.title}
                                    </h3>
                                    {project.comingSoon && (
                                        <span className="shrink-0 px-2 py-0.5 rounded-full border border-studio-neon/30 text-studio-neon text-[8px] font-mono uppercase tracking-widest">
                                            Bientôt disponible
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stack Technique - Déjà configuré pour se masquer sur mobile */}
                            <div className="hidden md:flex items-center gap-2">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[9px] text-white/60 font-mono uppercase tracking-widest">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}