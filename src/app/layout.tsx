import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AudioEngine from "@/components/layout/AudioEngine";
import Footer from "@/components/layout/Footer"; // Import du moteur audio

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

        <Footer />
        </body>
        </html>
    );
}