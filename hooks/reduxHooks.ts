import type { AppDispatch, AppStore, RootState } from "@/lib/redux";
import { useDispatch, useSelector, useStore } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
