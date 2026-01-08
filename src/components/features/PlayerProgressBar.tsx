"use client";

import { useAudioStore } from "@/store/useAudioStore";
import { useRef } from "react";

export default function PlayerProgressBar() {
    const { currentTime, duration, seek } = useAudioStore();
    const barRef = useRef<HTMLDivElement>(null);

    // Calcul du pourcentage d'avancement
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!barRef.current || duration === 0) return;

        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // Position du clic
        const percentage = Math.max(0, Math.min(1, x / rect.width));

        seek(percentage * duration);
    };

    return (
        <div
            ref={barRef}
            onClick={handleSeek}
            className="group absolute top-0 left-0 w-full h-1 bg-white/5 cursor-pointer overflow-hidden transition-all hover:h-2"
        >
            {/* Background de progression (Neon Glow) */}
            <div
                className="h-full bg-linear-to-r from-studio-neon via-studio-neon to-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            >
                {/* Effet de lueur sur la tête de lecture */}
                <div className="absolute right-0 top-0 h-full w-4 bg-studio-neon blur-md opacity-50" />
            </div>
        </div>
    );
}