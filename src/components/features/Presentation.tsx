"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { site } from "@/data/site";

export default function Presentation() {
    const { src, poster } = site.video;
    const videoRef = useRef<HTMLVideoElement>(null);
    // Les contrôles du navigateur n'apparaissent qu'après le lancement, pour ne pas masquer la miniature
    const [started, setStarted] = useState(false);

    const startVideo = () => {
        setStarted(true);
        videoRef.current?.play().catch(() => {});
    };

    return (
        <section id="presentation" className="w-full max-w-6xl mx-auto px-6 py-20">
            <SectionHeader label="Présentation" title="Qui je suis et comment je peux vous aider" />

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                {src ? (
                    <>
                        <video
                            ref={videoRef}
                            src={src}
                            poster={poster ?? undefined}
                            controls={started}
                            playsInline
                            preload="none"
                            aria-label={site.video.title}
                            onPlay={() => setStarted(true)}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {!started && (
                            <button
                                type="button"
                                onClick={startVideo}
                                aria-label="Lancer la vidéo de présentation"
                                className="group absolute inset-0 flex items-end justify-end p-4 md:p-8 cursor-pointer"
                            >
                                <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-black/60 text-studio-neon ring-1 ring-studio-neon/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 group-focus-visible:ring-2">
                                    <Play size={28} fill="currentColor" className="ml-1" aria-hidden="true" />
                                </span>
                            </button>
                        )}
                    </>
                ) : (
                    // Emplacement réservé tant que la vidéo n'est pas renseignée dans src/data/site.ts
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <span className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full border border-studio-neon/40 text-studio-neon">
                            <Play size={28} fill="currentColor" className="ml-1" aria-hidden="true" />
                        </span>
                        <p className="text-sm text-white/60">Vidéo à venir</p>
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-center">
                <a
                    href="#contact"
                    className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-studio-neon text-black text-sm font-semibold hover:bg-white transition-colors"
                >
                    Réserver mon appel gratuit
                </a>
            </div>
        </section>
    );
}
