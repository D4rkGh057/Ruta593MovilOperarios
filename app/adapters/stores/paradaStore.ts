import { create } from "zustand";
import { Parada } from "../../core/domain/Parada";
import { ParadaService } from "../../core/infrastructure/ParadaService";

interface ParadaState {
    paradas: Parada[];
    loading: boolean;
    error: string | null;
    fetchParadas: () => Promise<void>;
}

export const useParadaStore = create<ParadaState>((set) => ({
    paradas: [],
    loading: false,
    error: null,
    fetchParadas: async () => {
        set({ loading: true, error: null });
        try {
            const paradas = await ParadaService.getAllParadas();
            set({ paradas, loading: false });
        } catch (error: any) {
            set({ error: error.message ?? "Error al cargar paradas", loading: false });
        }
    },
}));
