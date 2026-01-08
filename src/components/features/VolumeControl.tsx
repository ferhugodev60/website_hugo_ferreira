"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";
import { useState } from "react";

export default function VolumeControl() {
    const { volume, setVolume, isMuted, toggleMute } = useAudioStore();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex items-center gap-3 px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                <motion.button
                    key={isMuted ? "muted" : "unmuted"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={toggleMute}
                    className="text-studio-neon hover:text-white transition-colors cursor-pointer"
                >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>
            </AnimatePresence>

            <motion.div
                className="flex items-center"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                    width: isHovered ? 80 : 0,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "circOut" }}
            >
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 appearance-none rounded-full cursor-pointer accent-studio-neon transition-all"
                    style={{
                        backgroundImage: `linear-gradient(to right, #95FF00 ${volume * 100}%, transparent ${volume * 100}%)`
                    }}
                />
            </motion.div>

            {/* Affichage du pourcentage en petit */}
            <span className="font-mono text-[10px] text-white/30 w-8">
                {isMuted ? "MUTE" : `${Math.round(volume * 100)}%`}
            </span>
        </div>
    );
}