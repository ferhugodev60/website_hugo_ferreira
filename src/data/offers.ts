export interface Offer {
    name: string;
    price: string;
    pitch: string;
    features: string[];
}

export const offers: Offer[] = [
    {
        name: "Site vitrine",
        price: "1 200 €",
        pitch: "Présenter votre activité et être contacté facilement.",
        features: [
            "1 à 5 pages sur-mesure",
            "Design adapté à votre activité",
            "Confortable sur téléphone",
            "Bases du référencement",
        ],
    },
    {
        name: "Vitrine + gestion du contenu",
        price: "1 790 €",
        pitch: "Mettre à jour vos actualités et vos pages vous-même.",
        features: [
            "Tout le site vitrine",
            "Espace pour modifier vos contenus",
            "Actualités et articles",
            "Référencement technique approfondi",
        ],
    },
    {
        name: "Réservation en ligne",
        price: "2 800 €",
        pitch: "Recevoir des réservations, même quand vous êtes fermé.",
        features: [
            "Tout le pack gestion du contenu",
            "Calendrier et disponibilités",
            "Emails de confirmation automatiques",
            "Espace de suivi des réservations",
        ],
    },
    {
        name: "Boutique en ligne",
        price: "3 290 €",
        pitch: "Vendre vos produits directement sur votre site.",
        features: [
            "Catalogue de produits",
            "Panier et paiement en ligne",
            "Gestion des commandes",
            "Espace pour modifier vos contenus",
        ],
    },
];
