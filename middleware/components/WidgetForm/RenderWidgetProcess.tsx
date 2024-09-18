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
type PropsType = {
  listConfig: any;
  dialog?: any;
  setResult?: any;
  headerType?: any;
};

const { TabPane } = Tabs;

const RenderWidgetProcess: FC<PropsType> = ({
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

  // let { data, mutate, error } = useSWR(
  //   `/api/get-process?command=META_BUSINESS_PROCESS_LINK_BP_GET_004${parameters}`
  // );

  // console.log("----------new ------------", parameters);

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

    const data = await fetchJson(
      `/api/get-process?command=META_BUSINESS_PROCESS_LINK_BP_GET_004${parameters}`
    );

    processParamsvar = await processTransform(data.result, userData);
    formDataInitDatavar = data.getData
      ? await _.merge(processParamsvar.__dataElement, data.getData)
      : processParamsvar?.__dataElement;

    const expResult: any = await runExpression(
      "all",
      processExpression,
      processParamsvar,
      formDataInitDatavar
    );
    setProcessParams(processParamsvar);
    setFormDataInitDataState(expResult.data);
    setProcessExpression(expResult?.expression);
    setProcessConfigState(data);
  };

  const { header } = processParams || [];
  const groupByTabname = _.groupBy(header, function (n) {
    return n.tabname;
  });
  const renderTypeView = () => {
    return (
      <FormWrapper
        dialog={dialog}
        title={`${processConfigState?.result?.metadataname || ""}`}
        settings={listConfig?.otherattr}
        setResult={setResult}
      >
        <Header
          header={header}
          processParams={processParams}
          listConfigParse={listConfig}
          processConfig={processConfigState}
        />
        {header?.map((item: any, index: number) => {
          if (!item.tabname && item.datatype === "group") {
            return (
              <RenderField
                key={index}
                field={item}
                className="col-span-2 kiosk"
                attr={processParams.details}
                sectionConfig={listConfigParse}
                style=""
                rowIndex=""
                labelClassName=""
              />
            );
          }
        })}
        <div>
          {header?.map((item: any, index: number) => {
            // console.log("item", item);
            if (item.tabname) {
              let isContent = _.filter(
                groupByTabname[item.tabname],
                (item2) => {
                  return item2.isshow === "1";
                }
              );
              if (isContent.length) console.log("sss :>> ");
              return (
                // <TabPane tab={item.tabname} key={index}>
                <RenderField
                  key={index}
                  field={item}
                  className="kiosk"
                  attr={processParams.details}
                  sectionConfig={listConfigParse}
                />
                // </TabPane>
              );
            }
          })}
        </div>
      </FormWrapper>
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

export default RenderWidgetProcess;
