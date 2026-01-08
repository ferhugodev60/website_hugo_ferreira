export interface ProjectTrack {
    id: string;
    title: string;
    category: "Web" | "Design" | "Audio";
    stack: string[];
    bpm: number;
    previewUrl: string;
    description: string;
}