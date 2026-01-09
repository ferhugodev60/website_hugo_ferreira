"use client";

import Image from "next/image";
import { Play, Pause } from "lucide-react";
import PlayerProgressBar from "@/components/features/PlayerProgressBar";
import CurrentTrackDisplay from "@/components/features/CurrentTrackDisplay";
import TimeDisplay from "@/components/features/TimeDisplay";
import VolumeControl from "@/components/features/VolumeControl";
import { useAudioStore } from "@/store/useAudioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { projects } from "@/data/projects";

export default function Footer() {
    const { currentTrackId, isPlaying, togglePlay } = useAudioStore();
    const { playClick } = useSoundEffects();

    // Récupération des infos du projet actuel pour la cover
    const currentProject = projects.find(p => p.id === currentTrackId);

    const handleTogglePlay = () => {
        playClick();
        togglePlay();
    };

    return (
        <footer className="fixed bottom-0 w-full border-t border-white/10 bg-studio-black/95 backdrop-blur-xl z-50">
            <PlayerProgressBar />

            <div className="max-w-screen-2xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">

                {/* 1. Infos Track & Contrôles : Gauche */}
                <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">

                    {/* Cover de l'album (Remplace le SpectrumVisualizer) */}
                    <div className="h-10 w-10 md:h-12 md:w-12 bg-white/5 rounded border border-white/10 shrink-0 relative overflow-hidden shadow-lg">
                        {currentProject?.coverUrl ? (
                            <Image
                                src={currentProject.coverUrl}
                                alt={currentProject.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-studio-neon/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-studio-neon animate-pulse" />
                            </div>
                        )}
                    </div>

                    {/* Bouton Play/Stop Rapide */}
                    <button
                        onClick={handleTogglePlay}
                        className="p-2 rounded-full bg-white/5 hover:bg-studio-neon hover:text-studio-black transition-all group cursor-pointer border border-white/5"
                    >
                        {isPlaying ? (
                            <Pause size={18} fill="currentColor" />
                        ) : (
                            <Play size={18} fill="currentColor" className="ml-0.5" />
                        )}
                    </button>

                    {/* Titre et Catégorie */}
                    <div className="min-w-0">
                        <CurrentTrackDisplay />
                    </div>
                </div>

                {/* 2. Timecode : Centre */}
                <div className="hidden md:flex flex-col items-center font-mono px-4 shrink-0">
                    <TimeDisplay />
                    <p className="text-[7px] uppercase tracking-[0.3em] opacity-30">SMPTE System</p>
                </div>

                {/* 3. Volume & Status : Droite */}
                <div className="flex items-center gap-2 md:gap-6 flex-1 justify-end">
                    <div className="hidden md:block">
                        <VolumeControl />
                    </div>

                    <div className="hidden md:block h-4 w-px bg-white/10" />

                    {/* Status Session */}
                    <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 
        ${isPlaying
                            ? 'bg-studio-neon animate-pulse shadow-[0_0_8px_rgba(149,255,0,0.5)]'
                            : 'bg-white/20'
                        } 
        /* On descend la diode de 0.5px pour l'aligner sur le centre des majuscules */
        translate-y-[0.5px]`}
                        />
                        <span className="hidden lg:inline text-[9px] uppercase tracking-widest text-white/40 font-mono leading-none">
        {isPlaying ? "Signal Active" : "Standby"}
    </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}