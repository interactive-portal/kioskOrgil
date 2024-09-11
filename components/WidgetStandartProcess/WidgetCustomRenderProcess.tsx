import _ from "lodash";
import { useRouter } from "next/router";
import { FC } from "react";

// import DebugWidget from "@/components/cloud/Custom/Default/DebugWidget";
// import { WidgetUniversalWrapper } from "@/engineBox/Wrapper/WidgetUniversalWrapper";
import { useCloud } from "hooks/use-cloud";
import { jsonParse, toBoolean } from "util/helper";
import { replaceTemplateV2 } from "util/widgetHelper";
import WidgetUniversalWrapper from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

type PropsType = {
  listConfig: any;
  processData?: any;
  formDataInit?: any;
  formConfig?: any;
};

const WidgetCustomRenderProcess: FC<PropsType> = ({
  listConfig,
  processData,
  formDataInit,
  formConfig,
}) => {
  const cloudContext = useCloud();

  if (_.isEmpty(listConfig)) return null;

  const widgetnemgooReady = listConfig.widgetnemgooReady;
  // const death = toBoolean(widgetnemgooReady?.death || "0");

  const router = useRouter();

  let rawCriteria = "";
  let metaConfig = {};

  const { criteria } = widgetnemgooReady;

  // if (death) return null; //death гэсэн widget-ийг дүрслэхгүй.

  // console.log("XXXXX XXX", listConfig);
  let queryFromUrl = {};
  if (!toBoolean(criteria?.ignoreUrlQuery || false)) {
    // rawCriteria = prepareRawUrlQueryToCriteria(router.query);
    queryFromUrl = { ...cloudContext.cloudURL.query };
  }

  rawCriteria = `&parameters=${JSON.stringify(
    replaceTemplateV2(
      {
        ...(criteria?.defaultQuery || {}),
        ...queryFromUrl,
      },
      cloudContext.cloudURL.query
    )
  )}`;

  const data: any = []; //array болгох хэрэгтэй. Бүх widget-үүд Array авах бүтэцтэй.

  metaConfig = {
    ...processData,
    gridJsonConfig: jsonParse(
      processData?.meta_group_grid_options_mobile?.jsonconfig,
      true
    ),
    pathConfig: _.values(
      processData?.meta_group_grid_options_mobile?.meta_group_config_mobile
    ),
    // pathConfig: _.values(metaConfigAll?.meta_group_config_mobile),
  };
  //   console.log("metaConfigdata", metaConfig);
  const killerObj = {
    ...listConfig,
    metaConfig,
    formDataInit,
    formConfig,
    widgetnemgooReady: widgetnemgooReady,
    bpsectiondtl: _.values(listConfig.bpsectiondtl),
  };
  // console.log("killerObj data", data);

  //   if (router?.query?.layout === "raw") {
  //     return (
  //       <DebugWidget
  //         listConfig={listConfig}
  //         config={killerObj}
  //         widgetnemgooReady={killerObj.widgetnemgooReady}
  //         datasrc={data}
  //       />
  //     );
  //   }

  return <>custom render</>;
};

export default WidgetCustomRenderProcess;
// svn checkout http://172.169.88.77:8080/svn/reactjsWidgetProd
