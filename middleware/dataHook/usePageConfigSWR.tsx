import useSWR from "swr";

const usePageConfigSWR = (rootDomain?: any, widgetnemgooReady?: any) => {
  const metaName = widgetnemgooReady?.metaConfig?.host?.metaName || "metaProd";
  const domainConfig = rootDomain || "citizen";

  const parameters = `&parameters=${JSON.stringify({
    filterCriteria: domainConfig,
  })}`;

  const {
    data: themeconfig,
    error,
    mutate,
  } = useSWR(
    `/api/get-process?processcode=getDepartmentConfig_004${parameters}&metaName=${metaName}`
  );

  return { themeconfig, error, mutate };
};

export default usePageConfigSWR;
