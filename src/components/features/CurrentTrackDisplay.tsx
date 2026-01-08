"use client";

import { useAudioStore } from "@/store/useAudioStore";
import { projects } from "@/data/projects";

export default function CurrentTrackDisplay() {
    const { currentTrackId } = useAudioStore();

    // Trouver le morceau correspondant dans tes data
    const currentTrack = projects.find(p => p.id === currentTrackId);

    if (!currentTrack) {
        return (
            <p className="text-sm font-medium text-white/20 uppercase tracking-tight italic">
                Standby Mode...
            </p>
        );
    }

    return (
        <div className="flex flex-col">
            <h4 className="text-sm font-bold text-white uppercase truncate max-w-[150px] md:max-w-[300px]">
                {currentTrack.title}
            </h4>
            <p className="text-[10px] text-white/40 font-mono tracking-tighter">
                {currentTrack.stack.join(" • ")}
            </p>
        </div>
    );
}