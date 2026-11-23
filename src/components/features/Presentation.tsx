import { Play } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { site } from "@/data/site";

export default function Presentation() {
    const { src, poster } = site.video;

    return (
        <section id="presentation" className="w-full max-w-6xl mx-auto px-6 py-20">
            <SectionHeader label="Présentation" title="Qui je suis et comment je peux vous aider" />

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                {src ? (
                    <video
                        src={src}
                        poster={poster ?? undefined}
                        controls
                        playsInline
                        preload="none"
                        aria-label={site.video.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
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
