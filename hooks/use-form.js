import { useContext } from "react";
import HookFormContext from "@/context/HookFormContext";

export const useHookForm = () => useContext(HookFormContext);
