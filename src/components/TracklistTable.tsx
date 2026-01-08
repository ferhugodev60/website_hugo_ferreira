"use client";

import { motion } from "framer-motion";
import { Play, Pause, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { useAudioStore } from "@/store/useAudioStore";
import { useUIStore } from "@/store/useUIStore"; // Import du store UI

export default function TracklistTable() {
    const { currentTrackId, isPlaying, playTrack, togglePlay } = useAudioStore();
    const { openModal } = useUIStore(); // Action pour ouvrir la modal

    const handlePlay = (id: string) => {
        if (currentTrackId === id) {
            togglePlay();
        } else {
            playTrack(id);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-20">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold tracking-tighter uppercase text-studio-neon">
                    Recent Tracks <span className="text-white/30 ml-2">// Projects</span>
                </h2>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">
                    {projects.length} Files Loaded
                </span>
            </div>

            <div className="space-y-1">
                {projects.map((project, index) => {
                    const isCurrent = currentTrackId === project.id;
                    const isActive = isCurrent && isPlaying;

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group flex items-center gap-4 p-4 rounded-lg transition-all border border-transparent 
                                ${isCurrent ? 'bg-white/10 border-white/20' : 'hover:bg-white/5 hover:border-white/10'}`}
                        >
                            {/* ID & Play Button */}
                            <div className="w-12 flex items-center justify-center relative">
                                <span className={`font-mono text-xs transition-opacity ${isActive ? 'opacity-0' : 'group-hover:opacity-0 text-white/30'}`}>
                                    {project.id}
                                </span>
                                <button
                                    onClick={() => handlePlay(project.id)}
                                    className={`absolute transition-all cursor-pointer text-studio-neon 
                                        ${isActive ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'}`}
                                >
                                    {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                </button>
                            </div>

                            {/* Title & Category */}
                            <div className="flex-1 min-w-0">
                                <h3 className={`text-lg font-medium truncate uppercase tracking-tight transition-colors ${isActive ? 'text-studio-neon' : 'text-white'}`}>
                                    {project.title}
                                </h3>
                                <p className="text-xs text-white/40 uppercase tracking-widest font-mono">
                                    {project.category}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="hidden md:flex items-center gap-2">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/60 font-mono uppercase">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* BPM */}
                            <div className="hidden lg:block w-24 text-center">
                                <span className={`text-xs font-mono italic ${isActive ? 'text-studio-neon' : 'text-studio-neon/60'}`}>
                                    {project.bpm} BPM
                                </span>
                            </div>

                            {/* Redirection Button -> Modal */}
                            <button
                                onClick={() => openModal(project.id)}
                                className="w-12 flex justify-end text-white/20 group-hover:text-studio-neon transition-colors cursor-pointer"
                            >
                                <ExternalLink size={16} />
                            </button>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}