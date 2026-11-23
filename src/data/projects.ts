import { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "01",
        title: "L'Atelier de la Route du Rhum",
        category: "Web",
        coverUrl: "/images/projects/atelier-route-du-rhum.webp",
        summary: "Boutique en ligne, cartes cadeaux et réservation d'ateliers pour un artisan du rhum arrangé.",
        context: "Un artisan spécialisé dans le rhum arrangé, basé à Compiègne, qui voulait vendre ses bouteilles, ses cartes cadeaux et ses ateliers en ligne, sans disposer d'aucune plateforme e-commerce.",
        approach: "Un site e-commerce sur-mesure avec vente de bouteilles, achat de cartes cadeaux et réservation d'ateliers en ligne.",
        result: "Site e-commerce livré et en production, aujourd'hui la plateforme de vente de l'atelier.",
        liveUrl: "https://atelier-route-du-rhum.com/"
    },
    {
        id: "02",
        title: "Greenlight District",
        category: "Web",
        coverUrl: "/images/projects/greenlight-district.webp",
        summary: "Site vitrine d'un magasin de sneakers et de streetwear à Compiègne.",
        context: "Un concept-store de sneakers et streetwear à Compiègne, existant uniquement en physique, sans vitrine pour présenter sa sélection en ligne.",
        approach: "Un site sur-mesure pensé comme une vitrine directe, avec une direction visuelle alignée sur l'univers streetwear de la marque.",
        result: "Site livré et en production, aujourd'hui la vitrine digitale du commerce.",
        liveUrl: "https://www.greenlightdistrict.fr/"
    },
    {
        id: "03",
        title: "CactusFits",
        category: "Web",
        coverUrl: "/images/projects/cactusfits.webp",
        summary: "Un fan site autour des sneakers de Travis Scott et des tenues pour les porter.",
        context: "Un projet personnel, fan site non officiel, né d'une envie : montrer comment porter les sneakers de Travis Scott.",
        approach: "Un site sur-mesure avec un catalogue par modèle, des filtres par année et par coloris, et un espace compte.",
        result: "Site en ligne, avec une identité visuelle sombre et immersive.",
        liveUrl: "https://cactusfits.vercel.app/",
        statusLabel: "Projet perso"
    },
    {
        id: "04",
        title: "Le Verger de Mathis",
        category: "Web",
        summary: "Un producteur de pommes qui souhaite proposer ses récoltes en ligne.",
        context: "Un producteur de pommes qui souhaite proposer ses récoltes directement en ligne.",
        approach: "Un site sur-mesure pour présenter et proposer les récoltes, actuellement à l'étude.",
        result: "Projet en discussion.",
        comingSoon: true,
        statusLabel: "À l'étude"
    }
];
