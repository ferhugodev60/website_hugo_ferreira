"use client";

import { useAudioStore } from "@/store/useAudioStore";
import { projects } from "@/data/projects";

export default function CurrentTrackDisplay() {
    const { currentTrackId } = useAudioStore();

    // Récupération du morceau correspondant avec les nouveaux attributs
    const currentTrack = projects.find(p => p.id === currentTrackId);

    if (!currentTrack) {
        return (
            <div className="flex flex-col">
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] animate-pulse">
                    // Standby_Mode
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-w-0">
            {/* 1. NOM DE L'ARTISTE (Neon & Bold) */}
            <span className="text-[9px] md:text-[10px] font-black text-studio-neon uppercase tracking-[0.2em] leading-none mb-1 truncate">
                {currentTrack.artist}
            </span>

            {/* 2. NOM DU SON (Blanc & Impactant) */}
            <h4 className="text-sm md:text-base font-black text-white uppercase tracking-tighter truncate leading-tight max-w-[150px] md:max-w-[300px]">
                {currentTrack.trackName}
            </h4>

            {/* 3. METADATA (BPM / Stack) */}
            <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px] text-white/20 font-mono uppercase tracking-tighter">
                    {currentTrack.bpm} BPM
                </span>
                <span className="text-[8px] text-white/10 font-mono hidden sm:inline">
                    // {currentTrack.category}
                </span>
            </div>
        </div>
    );
}