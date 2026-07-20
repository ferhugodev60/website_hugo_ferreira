import { ProjectTrack } from "@/types";

export const projects: ProjectTrack[] = [
    {
        id: "01",
        title: "L'Atelier de la Route du Rhum",
        artist: "Hugo Ferreira",
        trackName: "Alpha",
        category: "Web",
        stack: ["React", "Tailwind", "Node", "Express", "Stripe"],
        previewUrl: "/audio/alpha-preview.mp3",
        context: "Un artisan spécialisé dans le rhum arrangé, basé à Compiègne, qui voulait vendre ses bouteilles, ses cartes cadeaux et ses ateliers en ligne, sans disposer d'aucune plateforme e-commerce.",
        approach: "Un site e-commerce sur-mesure (React, Tailwind, Node, Express, Stripe) avec vente de bouteilles, achat de cartes cadeaux et réservation d'ateliers en ligne.",
        result: "Site e-commerce livré et en production, aujourd'hui la plateforme de vente de l'atelier.",
        liveUrl: "https://atelier-route-du-rhum.com/"
    },
    {
        id: "02",
        title: "Greenlight District",
        artist: "Hugo Ferreira",
        trackName: "Alpha",
        category: "Web",
        stack: ["React", "Tailwind", "Node", "Express"],
        previewUrl: "/audio/alpha-preview.mp3",
        context: "Un concept-store de sneakers et streetwear à Compiègne, existant uniquement en physique, sans vitrine pour présenter sa sélection en ligne.",
        approach: "Un site sur-mesure (React, Tailwind, Node, Express) pensé comme une vitrine directe, avec une direction visuelle alignée sur l'univers streetwear de la marque.",
        result: "Site livré et en production, aujourd'hui la vitrine digitale du commerce.",
        liveUrl: "https://www.greenlightdistrict.fr/"
    },
    {
        id: "03",
        title: "Le Verger de Mathis",
        artist: "Hugo Ferreira",
        trackName: "Alpha",
        category: "Web",
        stack: ["React", "Tailwind", "Node", "Express"],
        previewUrl: "/audio/alpha-preview.mp3",
        context: "Un producteur de pommes qui souhaite permettre la réservation de récoltes directement en ligne.",
        approach: "Un site de réservation sur-mesure (React, Tailwind, Node, Express), actuellement en cours de développement.",
        result: "Projet en préparation — lancement à venir.",
        comingSoon: true
    }
];
