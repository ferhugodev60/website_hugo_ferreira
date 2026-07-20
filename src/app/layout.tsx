import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AudioEngine from "@/components/layout/AudioEngine";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://hugo-ferreira.fr"),
    title: {
        default: "HUGO FERREIRA | Développeur Full-Stack",
        template: "%s | Hugo Ferreira"
    },
    description: "Développeur Full-Stack passionné par la création d'interfaces web sur-mesure.",
    openGraph: {
        title: "HUGO FERREIRA | Développeur Full-Stack",
        description: "Portfolio de projets web sur-mesure, alliant développement et design d'interface.",
        url: "https://hugo-ferreira.fr",
        siteName: "Hugo Ferreira Portfolio",
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "HUGO FERREIRA",
        description: "Développeur Full-Stack.",
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