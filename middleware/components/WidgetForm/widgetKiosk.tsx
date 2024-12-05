import { runExpression } from "@/util/expression";
import { Tabs } from "antd";
import axios from "axios";
import { FormMetaContextProvider as MetaStore } from "@/context/Meta/FormMetaContext";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import fetchJson, { jsonParse } from "@/util/helper";
import { processTransform } from "@/util/processTransform";
import WidgetCustomRenderProcess from "@/components/WidgetStandartProcess/WidgetCustomRenderProcess";
import FormWrapper from "./FormWrapper";
import Header from "./Header/Header";
import RenderField from "./RenderField";
import useSWR from "swr";
import KioskFormWrapper from "./KioskFormWrapper";
import Skeleton from "@/components/common/Skeleton/Skeleton";
type PropsType = {
  listConfig: any;
  dialog?: any;
  setResult?: any;
  headerType?: any;
};

const { TabPane } = Tabs;

const WidgetKiosk: FC<PropsType> = ({
  listConfig,
  dialog,
  setResult,
  headerType,
}) => {
  // const { userData } = useUser();
  const { data: session } = useSession();
  const userData: any = session;
  const widgetnemgooReady = listConfig.widgetnemgooReady;
  const [formDataInitDataState, setFormDataInitDataState] = useState<any>();
  const [processExpression, setProcessExpression] = useState<any>({});
  const [processConfigState, setProcessConfigState] = useState<any>();
  const [processParams, setProcessParams] = useState<any>({ header: [] });

  const parameters = `&parameters=${JSON.stringify({
    id: listConfig?.metadataid,
  })}`;

  const listConfigParse = {
    ...listConfig,
    otherattr: jsonParse(listConfig?.otherattr),
  };

  useEffect(() => {
    if (!_.isEmpty(userData) || _.isNull(userData))
      runExpressionAsync(userData);
  }, [userData]);

  const runExpressionAsync = async (userData: any) => {
    let processParamsvar: any = {},
      formDataInitDatavar: any = {};

    const { result: data, getData } = await fetchJson(
      `/api/get-process-config?command=META_BUSINESS_PROCESS_LINK_BP_GET_004${parameters}`
    );
    processParamsvar = await processTransform(data.result, userData);
    localStorage.setItem("memberData", getData);
    formDataInitDatavar = getData
      ? await _.merge(processParamsvar.__dataElement, getData)
      : processParamsvar?.__dataElement;

    const expResult: any = await runExpression(
      "all",
      processExpression,
      processParamsvar,
      formDataInitDatavar
    );

    // console.log("expResult :>> ", expResult);
    setProcessParams(processParamsvar);
    setFormDataInitDataState(expResult.data);
    setProcessExpression(expResult?.expression);
    setProcessConfigState(data);
  };

  const { header } = processParams || [];
  // console.log("header :>> ", processParams);

  if (!processParams)
    return (
      <>
        <Skeleton type="loading" />
      </>
    );

  const renderTypeView = () => {
    return (
      <KioskFormWrapper
        dialog={dialog}
        title={`${processConfigState?.result?.metadataname || ""}`}
        settings={listConfig?.otherattr}
        formConfig={processConfigState}
        setResult={setResult}
      >
        <Header
          header={header}
          processParams={processParams}
          listConfigParse={listConfig}
          processConfig={processConfigState}
        />
      </KioskFormWrapper>
    );
  };

  return (
    <MetaStore
      formInitData={formDataInitDataState || {}}
      formExpression={processExpression || {}}
      processConfig={processParams}
    >
      {renderTypeView()}
    </MetaStore>
  );
};

export default WidgetKiosk;
