export interface Project {
    id: string;
    title: string;
    category: "Web" | "Design";
    coverUrl?: string;
    /** Résumé court affiché sur la carte du projet. */
    summary: string;
    context: string;
    approach: string;
    result: string;
    liveUrl?: string;
    comingSoon?: boolean;
    /** Étiquette affichée à côté du titre (ex. « Projet perso », « À l'étude »). */
    statusLabel?: string;
}