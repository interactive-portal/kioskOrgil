import { useContext } from "react";
import PageContext from "context/PageContext";

export const usePage = () => useContext(PageContext);
