import { create } from "zustand";
import { Frecuencia } from "../../core/domain/Frecuencia";
import { FrecuenciaService } from "../../core/infrastructure/FrecuenciaService";

interface FrecuenciaState {
    frecuencias: Frecuencia[];
    loading: boolean;
    error: string | null;
    fetchFrecuenciasByOrigen: (origen: string) => Promise<void>;
    fetchFrecuenciasByDestino: (destino: string) => Promise<void>;
}

export const useFrecuenciaStore = create<FrecuenciaState>((set) => ({
    frecuencias: [],
    loading: false,
    error: null,
    fetchFrecuenciasByOrigen: async (origen: string) => {
        set({ loading: true, error: null });
        try {
            const frecuencias = await FrecuenciaService.getByOrigen(origen);
            set({ frecuencias, loading: false });
        } catch (error: any) {
            set({ error: error.message ?? "Error al cargar frecuencias", loading: false });
        }
    },
    fetchFrecuenciasByDestino: async (destino: string) => {
        set({ loading: true, error: null });
        try {
            const frecuencias = await FrecuenciaService.getByDestino(destino);
            set({ frecuencias, loading: false });
        } catch (error: any) {
            set({ error: error.message ?? "Error al cargar frecuencias", loading: false });
        }
    },
}));
