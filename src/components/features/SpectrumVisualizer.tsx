"use client";

import { useEffect, useRef } from "react";
import { useAudioStore } from "@/store/useAudioStore";

export default function SpectrumVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { analyser, isPlaying } = useAudioStore();

    useEffect(() => {
        if (!analyser || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!isPlaying) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;

                // Couleur Neon Studio
                ctx.fillStyle = `rgba(0, 255, 102, ${dataArray[i] / 255})`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

                x += barWidth;
            }
        };

        draw();
    }, [analyser, isPlaying]);

    return (
        <canvas
            ref={canvasRef}
            width={200}
            height={40}
            className="opacity-50"
        />
    );
}