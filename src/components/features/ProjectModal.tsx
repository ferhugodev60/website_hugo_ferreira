"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Music, Layers, Globe, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useAudioStore } from "@/store/useAudioStore";
import { projects } from "@/data/projects";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function ProjectModal() {
    const { isModalOpen, selectedProjectId, closeModal, openModal } = useUIStore();
    const { isPlaying, togglePlay, playTrack, currentTime, duration, seek } = useAudioStore();
    const { playClick } = useSoundEffects();
    const barRef = useRef<HTMLDivElement>(null);
    const project = projects.find(p => p.id === selectedProjectId);

    const handleLiveView = (url?: string) => {
        if (!url) return;
        playClick();
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleTogglePlay = () => {
        playClick();
        togglePlay();
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!barRef.current || duration === 0) return;
        const rect = barRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        seek(percentage * duration);
    };

    const goToOffset = (offset: number) => {
        if (!project) return;
        const currentIndex = projects.findIndex(p => p.id === project.id);
        const target = projects[(currentIndex + offset + projects.length) % projects.length];
        playClick();
        openModal(target.id);
        playTrack(target.id);
    };

    if (!project) return null;

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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
                            className="absolute top-6 right-6 z-50 flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <X size={18} />
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

                                {/* Lecteur façon playlist : navigue et gère le son sans quitter la modale */}
                                <div className="mt-8 bg-white/[0.03] border border-white/5 rounded-2xl p-5">
                                    <div
                                        ref={barRef}
                                        onClick={handleSeek}
                                        className="group relative h-1 w-full bg-white/10 rounded-full cursor-pointer"
                                    >
                                        <div
                                            className="h-full bg-studio-neon rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-studio-neon shadow-[0_0_8px_rgba(57,255,20,0.6)] opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ left: `calc(${progress}% - 6px)` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2 text-[10px] font-mono text-white/40">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>

                                    <div className="flex items-center justify-center gap-6 mt-4">
                                        <button
                                            onClick={() => goToOffset(-1)}
                                            aria-label="Projet précédent"
                                            className="text-white/50 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <SkipBack size={18} fill="currentColor" />
                                        </button>
                                        <button
                                            onClick={handleTogglePlay}
                                            aria-label={isPlaying ? "Mettre en pause" : "Lancer la lecture"}
                                            className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-black hover:bg-studio-neon transition-colors cursor-pointer"
                                        >
                                            {isPlaying ? (
                                                <Pause size={18} fill="currentColor" />
                                            ) : (
                                                <Play size={18} fill="currentColor" className="ml-0.5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => goToOffset(1)}
                                            aria-label="Projet suivant"
                                            className="text-white/50 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <SkipForward size={18} fill="currentColor" />
                                        </button>
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
