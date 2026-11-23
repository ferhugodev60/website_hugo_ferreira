"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Globe, Clock } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { projects } from "@/data/projects";

export default function ProjectModal() {
    const { isModalOpen, selectedProjectId, closeModal } = useUIStore();
    const project = projects.find(p => p.id === selectedProjectId);
    const prefersReducedMotion = useReducedMotion();

    // Empêche le scroll de la page derrière la modale tant qu'elle est ouverte
    useEffect(() => {
        if (!isModalOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isModalOpen]);

    const handleLiveView = (url?: string) => {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    if (!project) return null;

    const ctaButton = (
        <button
            onClick={() => handleLiveView(project.liveUrl)}
            disabled={!project.liveUrl}
            className={`w-full font-semibold py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2
                ${project.liveUrl
                ? 'bg-white text-black hover:bg-studio-neon cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
            {project.liveUrl ? (
                <Globe size={18} />
            ) : project.comingSoon ? (
                <Clock size={18} />
            ) : (
                <Globe size={18} />
            )}
            {project.liveUrl
                ? "Voir le projet"
                : project.comingSoon
                ? project.statusLabel ?? "Bientôt disponible"
                : "Projet hors ligne"}
        </button>
    );

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-10">
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
                        className="relative w-full h-[100dvh] flex flex-col overflow-hidden md:h-auto md:block md:max-w-4xl md:max-h-[85vh] md:overflow-y-auto bg-[#0a0a0a] border-0 md:border md:border-white/10 rounded-none md:rounded-2xl shadow-2xl"
                    >
                        <button
                            onClick={closeModal}
                            aria-label="Fermer"
                            className="absolute top-6 right-6 z-50 flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex-1 overflow-y-auto md:overflow-visible">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Colonne Gauche (Infos) */}
                            <div className="relative overflow-hidden bg-black/50 p-8 border-b md:border-b-0 md:border-r border-white/5">
                                {/* Fond animé façon marbrure, dans la teinte de la marque */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <motion.div
                                        className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-studio-neon/15 blur-[90px]"
                                        animate={prefersReducedMotion ? undefined : { x: [0, 40, -20, 0], y: [0, 30, -15, 0] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <motion.div
                                        className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]"
                                        animate={prefersReducedMotion ? undefined : { x: [0, -30, 20, 0], y: [0, -25, 15, 0] }}
                                        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>

                                <div className="relative z-10">
                                <span className="text-studio-neon text-[10px] font-bold uppercase tracking-[0.3em]">
                                    Projet n°{Number(project.id)}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-white mt-4 leading-tight">
                                    {project.title}
                                </h2>
                                {project.coverUrl && (
                                    <div className="relative mt-8 aspect-video rounded-xl overflow-hidden border border-white/10">
                                        <Image
                                            src={project.coverUrl}
                                            alt={`Page d'accueil du site ${project.title}`}
                                            fill
                                            sizes="(min-width: 768px) 400px, 100vw"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                )}
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

                                <div className="hidden md:block mt-10">
                                    {ctaButton}
                                </div>
                            </div>
                        </div>
                        </div>

                        {/* Barre fixe mobile : le CTA reste toujours visible, sans scroll */}
                        <div className="md:hidden shrink-0 border-t border-white/10 p-4 bg-[#0a0a0a]">
                            {ctaButton}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
