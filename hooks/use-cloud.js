import { useContext } from "react";
import CloudContext from "@/components/common/engineBox/Context/CloudContext";

export const useCloud = () => useContext(CloudContext);
