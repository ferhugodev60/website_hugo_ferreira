"use client";

import { useEffect, useRef } from "react";
import { useAudioStore } from "@/store/useAudioStore";
import { projects } from "@/data/projects";

export default function AudioEngine() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const contextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    // Ajout de isMuted ici
    const { isPlaying, currentTrackId, volume, isMuted, setAnalyser, setProgress, currentTime } = useAudioStore();

    // 1. Initialisation unique de l'Audio Graph
    useEffect(() => {
        if (!audioRef.current || sourceRef.current) return;
        const initAudio = () => {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = ctx.createAnalyser();
            const source = ctx.createMediaElementSource(audioRef.current!);
            source.connect(analyser);
            analyser.connect(ctx.destination);
            contextRef.current = ctx;
            sourceRef.current = source;
            setAnalyser(analyser);
        };
        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, [setAnalyser]);

    // --- NOUVEAU : SYNCHRONISATION DU VOLUME ---
    useEffect(() => {
        if (audioRef.current) {
            // Logique : Si isMuted est vrai, volume = 0, sinon on prend la valeur du store
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    // 2. Synchronisation du temps
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => setProgress(audio.currentTime, audio.duration || 0);

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", updateProgress);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", updateProgress);
        };
    }, [setProgress, currentTrackId]);

    // 3. Gestion du Seek
    useEffect(() => {
        if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 1) {
            audioRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    // 4. Lecture/Pause
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(() => {});
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // 5. Changement de source
    useEffect(() => {
        if (!audioRef.current || !currentTrackId) return;
        const track = projects.find(p => p.id === currentTrackId);
        if (track) {
            audioRef.current.src = track.previewUrl;
            if (isPlaying) audioRef.current.play().catch(() => {});
        }
    }, [currentTrackId]);

    return <audio ref={audioRef} preload="auto" crossOrigin="anonymous" />;
}