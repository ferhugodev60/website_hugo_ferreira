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
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold tracking-tighter uppercase text-studio-neon">
                    Project Archive <span className="text-white/30 ml-2">// Portfolio</span>
                </h2>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                    {projects.length} Entries Detected
                </span>
            </div>

            <div className="space-y-1">
                {projects.map((project, index) => {
                    const isCurrent = currentTrackId === project.id;
                    const isActive = isCurrent && isPlaying;

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            // Effet Over épuré : uniquement couleur et bordure, pas de mouvement
                            whileHover={{
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                borderColor: "rgba(149, 255, 0, 0.2)"
                            }}
                            onClick={() => handleProjectSelect(project.id)}
                            className={`group flex items-center gap-4 p-4 rounded-xl transition-all border duration-300 cursor-pointer
                                ${isCurrent
                                ? 'bg-white/10 border-white/20'
                                : 'border-transparent bg-transparent'
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

                            {/* Nom du Projet & Catégorie */}
                            <div className="flex-1 min-w-0">
                                <h3 className={`text-lg font-bold truncate uppercase tracking-tight transition-colors ${isActive ? 'text-studio-neon' : 'text-white'}`}>
                                    {project.title}
                                </h3>
                                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono">
                                    {project.category}
                                </p>
                            </div>

                            {/* Stack Technique */}
                            <div className="hidden md:flex items-center gap-2">
                                {project.stack.slice(0, 3).map((tech) => (
                                    <span key={tech} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[9px] text-white/40 font-mono uppercase tracking-widest">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* BPM Info */}
                            <div className="hidden lg:block w-24 text-right">
                                <span className={`text-xs font-mono italic ${isActive ? 'text-studio-neon' : 'text-white/20'}`}>
                                    {project.bpm} BPM
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}