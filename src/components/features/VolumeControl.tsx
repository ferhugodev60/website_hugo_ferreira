"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects"; // Import du hook
import { useState } from "react";

export default function VolumeControl() {
    const { volume, setVolume, isMuted, toggleMute } = useAudioStore();
    const { playClick } = useSoundEffects(); // Initialisation
    const [isHovered, setIsHovered] = useState(false);

    const handleMuteToggle = () => {
        playClick(); // Déclenchement du son au clic
        toggleMute();
    };

    return (
        <div
            className="relative flex items-center gap-2 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={handleMuteToggle}
                className="text-white/40 hover:text-studio-neon transition-colors cursor-pointer p-1"
            >
                {isMuted || volume === 0 ? (
                    <VolumeX size={16} className="text-red-500/60" />
                ) : (
                    <Volume2 size={16} />
                )}
            </button>

            <motion.div
                className="overflow-hidden flex items-center"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                    width: isHovered ? 80 : 0,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
            >
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-white/10 appearance-none rounded-full cursor-pointer accent-studio-neon"
                    style={{
                        backgroundImage: `linear-gradient(to right, #95FF00 ${ (isMuted ? 0 : volume) * 100}%, transparent 0%)`
                    }}
                />
            </motion.div>

            <span className="font-mono text-[9px] text-white/20 w-7">
                {isMuted ? "OFF" : `${Math.round(volume * 100)}%`}
            </span>
        </div>
    );
}