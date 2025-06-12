import { create } from "zustand";
import { Bus } from "../../core/domain/Bus";
import { BusService } from "../../core/infrastructure/BusService";

interface BusState {
    buses: Bus[];
    loading: boolean;
    error: string | null;
    fetchBuses: () => Promise<void>;
}

export const useBusStore = create<BusState>((set) => ({
    buses: [],
    loading: false,
    error: null,
    fetchBuses: async () => {
        set({ loading: true, error: null });
        try {
            // Implementa el método correcto en BusService para obtener todos los buses
            const buses = await BusService.getAllBuses();
            set({ buses, loading: false });
        } catch (error: any) {
            set({ error: error.message ?? "Error al cargar buses", loading: false });
        }
    },
}));
