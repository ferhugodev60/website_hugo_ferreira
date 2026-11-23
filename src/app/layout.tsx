import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://hugo-ferreira.fr"),
    title: {
        default: "Hugo Ferreira | Sites web sur-mesure pour commerçants et artisans",
        template: "%s | Hugo Ferreira"
    },
    description: "Création de sites vitrines, de réservation et de boutiques en ligne sur-mesure pour commerçants, artisans et petites entreprises. Appel gratuit de 20 minutes.",
    openGraph: {
        title: "Hugo Ferreira | Sites web sur-mesure pour commerçants et artisans",
        description: "Des sites sur-mesure qui apportent des clients aux commerçants, artisans et petites entreprises.",
        url: "https://hugo-ferreira.fr",
        siteName: "Hugo Ferreira",
        locale: "fr_FR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hugo Ferreira | Sites web sur-mesure",
        description: "Des sites sur-mesure qui apportent des clients aux commerçants et artisans.",
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
        {/* Effet de grain visuel */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-grain" />

        <main className="relative min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}