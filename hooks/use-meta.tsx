import { useContext } from "react";
import MetaContext from "context/Meta/MetaContext";
import ACTIONS from "context/Meta/MetaActions";

export const useMeta = () => useContext(MetaContext);
export const useMetaAction = ACTIONS;
