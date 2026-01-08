import { create } from 'zustand';

interface AudioState {
    isPlaying: boolean;
    currentTrackId: string | null;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean; // Ajouté
    analyser: AnalyserNode | null;

    // Actions
    setAnalyser: (analyser: AnalyserNode) => void;
    togglePlay: () => void;
    playTrack: (trackId: string) => void;
    setProgress: (time: number, duration: number) => void;
    setVolume: (val: number) => void;
    toggleMute: () => void;
    seek: (time: number) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
    isPlaying: false,
    currentTrackId: null,
    currentTime: 0,
    duration: 0,
    volume: 0.5,
    isMuted: false, // Initialisation
    analyser: null,

    setAnalyser: (analyser) => set({ analyser }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    playTrack: (id) => set({ currentTrackId: id, isPlaying: true }),
    setProgress: (time, duration) => set({ currentTime: time, duration }),

    // Si on change le volume manuellement, on enlève le mute
    setVolume: (val) => set({ volume: val, isMuted: val === 0 }),

    // Action pour basculer le mute
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    seek: (time) => set({ currentTime: time }),
}));