import { create } from 'zustand';

interface UIState {
    selectedProjectId: string | null;
    isModalOpen: boolean;
    openModal: (id: string) => void;
    closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    selectedProjectId: null,
    isModalOpen: false,
    openModal: (id) => set({ selectedProjectId: id, isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false, selectedProjectId: null }),
}));