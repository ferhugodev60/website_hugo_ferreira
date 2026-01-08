import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AudioEngine from "@/components/layout/AudioEngine";
import TimeDisplay from "@/components/features/TimeDisplay";
import CurrentTrackDisplay from "@/components/features/CurrentTrackDisplay";
import PlayerProgressBar from "@/components/features/PlayerProgressBar";
import VolumeControl from "@/components/features/VolumeControl";
import SpectrumVisualizer from "@/components/features/SpectrumVisualizer"; // Import du moteur audio

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "HUGO FERREIRA | Studio",
        template: "%s | Hugo Ferreira"
    },
    description: "Creative Technologist & Beatmaker. Fusion entre code et design sonore.",
    openGraph: {
        title: "HUGO FERREIRA | Creative Technologist",
        description: "Exploration immersive de projets numériques et sonores.",
        url: "https://ton-portfolio.com", // À changer au déploiement
        siteName: "Hugo Ferreira Portfolio",
        images: [
            {
                url: "/og-image.jpg", // Prépare une capture de ton Hero section
                width: 1200,
                height: 630,
            },
        ],
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "HUGO FERREIRA",
        description: "Creative Technologist & Beatmaker.",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="bg-studio-black text-studio-accent">
        <body
            className={`${inter.className} antialiased`}
            suppressHydrationWarning={true}
        >
        {/* Moteur audio persistant (pas de rechargement lors du changement de route) */}
        <AudioEngine />

        {/* Effet de grain visuel */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-grain" />

        <main className="relative min-h-screen">
            {children}
        </main>

        <footer className="fixed bottom-0 w-full border-t border-white/10 bg-studio-black/95 backdrop-blur-xl z-50">
            <PlayerProgressBar />

            <div className="max-w-screen-2xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">

                {/* 1. Infos Track : Gauche */}
                <div className="flex items-center gap-3 md:gap-6 flex-1">
                    <div className="h-8 w-8 md:h-10 md:w-10 bg-white/5 rounded flex items-center justify-center border border-white/10 shrink-0 relative overflow-hidden">
                        <SpectrumVisualizer />
                    </div>
                    <CurrentTrackDisplay />
                </div>

                {/* 2. Timecode : Centre */}
                <div className="hidden sm:flex flex-col items-center font-mono px-4">
                    <TimeDisplay />
                    <p className="text-[7px] uppercase tracking-[0.3em] opacity-30">SMPTE</p>
                </div>

                {/* 3. Contrôles & Status : Droite */}
                <div className="flex items-center gap-2 md:gap-6 flex-1 justify-end">

                    {/* Contrôle du Volume (Apparaît au survol) */}
                    <div className="hidden md:block">
                        <VolumeControl />
                    </div>

                    {/* Séparateur vertical */}
                    <div className="hidden md:block h-4 w-px bg-white/10" />

                    {/* Status Session */}
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-studio-neon animate-pulse shadow-[0_0_8px_rgba(149,255,0,0.5)]" />
                        <span className="hidden lg:inline text-[10px] uppercase tracking-widest text-white/40 font-mono">
                            Live Session
                        </span>
                    </div>
                </div>
            </div>
        </footer>
        </body>
        </html>
    );
}