export interface ProjectTrack {
    id: string;
    title: string;
    artist: string;
    trackName: string;
    category: "Web" | "Design" | "Audio";
    stack: string[];
    coverUrl?: string;
    previewUrl: string;
    context: string;
    approach: string;
    result: string;
    liveUrl?: string;
    comingSoon?: boolean;
}