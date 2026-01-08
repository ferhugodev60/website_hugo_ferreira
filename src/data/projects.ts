import { ProjectTrack } from "@/types";

export const projects: ProjectTrack[] = [
    {
        id: "01",
        title: "Project Alpha",
        category: "Web",
        stack: ["Next.js", "Tailwind", "Framer"],
        bpm: 128,
        previewUrl: "/audio/alpha-preview.mp3",
        description: "Une plateforme immersive de gestion de samples."
    },
    {
        id: "02",
        title: "Sonic Design",
        category: "Audio",
        stack: ["Ableton", "MaxMSP", "React"],
        bpm: 95,
        previewUrl: "/audio/thank-god.mp3",
        description: "Exploration de la synthèse sonore granulaire via le web."
    },
    {
        id: "03",
        title: "Visual Mix",
        category: "Design",
        stack: ["Figma", "Three.js", "GLSL"],
        bpm: 140,
        previewUrl: "/audio/visual-preview.mp3",
        description: "Interface de mixage 3D pour performances live."
    }
];