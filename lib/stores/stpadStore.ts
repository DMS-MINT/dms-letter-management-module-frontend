import { create } from "zustand";

interface STPadState {
	isConnected: boolean;
	isLoading: boolean;
	setIsConnected: (isConnected: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
}

export const useSTPadStore = create<STPadState>((set) => ({
	isConnected: false,
	isLoading: true,
	setIsConnected: (isConnected) => set({ isConnected }),
	setIsLoading: (isLoading) => set({ isLoading }),
}));
