"use client";

import { useAudioStore } from "@/store/useAudioStore";
import { useCallback } from "react";

export const useSoundEffects = () => {
    const { volume, isMuted } = useAudioStore();

    const playSFX = useCallback((filePath: string) => {
        if (isMuted || volume === 0) return;

        const audio = new Audio(filePath);
        audio.volume = volume;
        audio.play().catch(() => {});
    }, [volume, isMuted]);

    return {
        playClick: () => playSFX("/audio/sfx/click.wav"),
        playTransmit: () => playSFX("/audio/sfx/transmit.wav"),
    };
};