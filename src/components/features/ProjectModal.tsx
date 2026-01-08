"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Music, Globe } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { projects } from "@/data/projects";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function ProjectModal() {
    const { isModalOpen, selectedProjectId, closeModal } = useUIStore();
    const { playClick } = useSoundEffects();
    const project = projects.find(p => p.id === selectedProjectId);

    // Fonction de redirection avec son
    const handleLiveView = (url?: string) => {
        if (!url) return;
        playClick();

        // On ouvre le lien dans un nouvel onglet
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
                        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Colonne Gauche (Infos) */}
                            <div className="bg-black/50 p-8 border-r border-white/5">
                                <span className="text-studio-neon font-mono text-[10px] uppercase tracking-[0.3em]">Track_Info // {project.id}</span>
                                <h2 className="text-4xl font-black text-white mt-4 uppercase leading-none">{project.title}</h2>
                                <div className="mt-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg text-studio-neon"><Music size={20} /></div>
                                        <div>
                                            <p className="text-[10px] text-white/30 uppercase font-bold">BPM_Sync</p>
                                            <p className="font-mono text-white text-lg">{project.bpm}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg text-studio-neon"><Cpu size={20} /></div>
                                        <div>
                                            <p className="text-[10px] text-white/30 uppercase font-bold">Tech_Stack</p>
                                            <p className="font-mono text-white/70 text-sm italic">{project.stack.join(" • ")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Colonne Droite (Description & Action) */}
                            <div className="p-8 flex flex-col justify-between relative">
                                <button onClick={closeModal} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>

                                <div className="space-y-4">
                                    <p className="text-studio-neon/60 font-mono text-[10px] uppercase font-bold">Description</p>
                                    <p className="text-white/70 text-lg leading-relaxed">{project.description}</p>
                                </div>

                                {/* Bouton de redirection mis à jour */}
                                <button
                                    onClick={() => handleLiveView(project.liveUrl)}
                                    disabled={!project.liveUrl}
                                    className={`mt-12 w-full font-bold py-4 rounded-xl text-sm uppercase tracking-tighter transition-all flex items-center justify-center gap-2
                                        ${project.liveUrl
                                        ? 'bg-white text-black hover:bg-studio-neon cursor-pointer'
                                        : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                                >
                                    <Globe size={18} />
                                    {project.liveUrl ? "View Live Project" : "Project Offline"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}