"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Music, Layers, Globe } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { projects } from "@/data/projects";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function ProjectModal() {
    const { isModalOpen, selectedProjectId, closeModal } = useUIStore();
    const { playClick } = useSoundEffects();
    const project = projects.find(p => p.id === selectedProjectId);

    const handleLiveView = (url?: string) => {
        if (!url) return;
        playClick();
        window.open(url, "_blank", "noopener,noreferrer");
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-studio-black/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl"
                    >
                        <button
                            onClick={closeModal}
                            aria-label="Fermer"
                            className="absolute top-6 right-6 z-50 text-white/20 hover:text-white transition-colors p-2"
                        >
                            <X size={24} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Colonne Gauche (Infos) */}
                            <div className="bg-black/50 p-8 border-b md:border-b-0 md:border-r border-white/5">
                                <span className="text-studio-neon text-[10px] font-bold uppercase tracking-[0.3em]">
                                    Projet {project.id}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-white mt-4 leading-tight">
                                    {project.title}
                                </h2>
                                <div className="mt-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg text-studio-neon"><Music size={20} /></div>
                                        <div>
                                            <p className="text-[10px] text-white/30 uppercase font-bold">BPM</p>
                                            <p className="text-white text-lg">{project.bpm}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg text-studio-neon"><Layers size={20} /></div>
                                        <div>
                                            <p className="text-[10px] text-white/30 uppercase font-bold">Stack technique</p>
                                            <p className="text-white/70 text-sm">{project.stack.join(" • ")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Colonne Droite (Récit du projet & Action) */}
                            <div className="p-8 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-studio-neon/70 text-[10px] uppercase font-bold tracking-[0.2em]">Le contexte</p>
                                        <p className="text-white/70 text-sm leading-relaxed">{project.context}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-studio-neon/70 text-[10px] uppercase font-bold tracking-[0.2em]">L&apos;approche</p>
                                        <p className="text-white/70 text-sm leading-relaxed">{project.approach}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-studio-neon/70 text-[10px] uppercase font-bold tracking-[0.2em]">Le résultat</p>
                                        <p className="text-white/70 text-sm leading-relaxed">{project.result}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleLiveView(project.liveUrl)}
                                    disabled={!project.liveUrl}
                                    className={`mt-10 w-full font-semibold py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2
                                        ${project.liveUrl
                                        ? 'bg-white text-black hover:bg-studio-neon cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                        : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                                >
                                    <Globe size={18} />
                                    {project.liveUrl ? "Voir le projet" : "Projet hors ligne"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
