"use client";

import { useAudioStore } from "@/store/useAudioStore";

export default function TimeDisplay() {
    const { currentTime } = useAudioStore();

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <p className="text-xl font-bold tracking-widest text-white/90">
            {formatTime(currentTime)}
        </p>
    );
}