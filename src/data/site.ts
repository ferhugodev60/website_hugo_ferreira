/**
 * Informations du site à un seul endroit.
 * Les champs à `null` ne sont pas affichés : les renseigner avant la mise en ligne.
 */
export const site = {
    name: "Hugo Ferreira",
    url: "https://hugo-ferreira.fr",

    /** Vidéo de présentation (ex. "/videos/presentation.mp4"). Un encadré « Vidéo à venir » s'affiche tant que c'est null. */
    video: {
        src: "/videos/presentation.mp4" as string | null,
        poster: "/videos/presentation-poster.webp" as string | null,
        title: "Vos clients vous cherchent sur Google : voici les 3 étapes pour que ce soit vous qu'ils choisissent",
    },

    legal: {
        address: null as string | null,
        email: null as string | null,
        phone: null as string | null,
        /** À ajouter après l'immatriculation (janvier 2027). */
        siret: null as string | null,
        host: null as { name: string; address: string; phone: string } | null,
    },
};
