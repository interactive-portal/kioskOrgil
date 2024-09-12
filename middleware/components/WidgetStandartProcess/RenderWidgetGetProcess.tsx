import RenderNotice from "@/components/common/Notice/RenderNotice";
import { WidgetUniversalWrapper } from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import useWidgetConfigSWR from "@/middleware/dataHook/useWidgetConfigSWR";
import useWidgetGetProcessSWR from "@/middleware/dataHook/useWidgetGetProcessSWR";
import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toBoolean } from "@/util/helper";
import { prepareC009GetProcessData } from "@/util/widgetHelper";

type PropsType = {
  listConfig: any;
};

const RenderWidgetGetProcess: FC<PropsType> = ({ listConfig }) => {
  if (_.isEmpty(listConfig)) return null;

  const cloudContext = useCloud();
  const router = useRouter();

  /* ----------------------- consts ----------------------- */
  const widgetnemgooReady = listConfig.widgetnemgooReady;
  const ghost =
    toBoolean(widgetnemgooReady?.ghost || "0") ||
    toBoolean(cloudContext?.cloudURL?.query?.silent || "0");
  const [virtualWidgetnemgooReady, setVirtualWidgetnemgooReady] =
    useState(widgetnemgooReady);

  /* --------------------- data useSWR -------------------- */
  let [dataSrc, headerData, dataError, dataMutate] =
    useWidgetGetProcessSWR(listConfig);

  // console.log("🚀 ~ dataSrc:", dataSrc);
  /* -------------------- config useSWR ------------------- */
  // const [metaConfigAll, metaConfigError, metaConfigMutate = {}] =
  //   useWidgetConfigSWR({
  //     metadataid: listConfig.metadataid,
  //     metadatacode: listConfig.metadatacode,
  //     widgetnemgooReady: virtualWidgetnemgooReady,
  //   });

  if (dataError) return <div>Meta дата дуудаж чадсангүй. Алдаа өгч байна.</div>;

  // if (metaConfigError)
  //   return (
  //     <div>Get процессийн Meta тохиргоо дуудаж чадсангүй. Алдаа өгч байна.</div>
  //   );

  //! Энийг яаралтай устгана. breadcrumb гэх мэт ашигласан ганц нэг газраа яаралтай засна.
  /* ----- 009 гэсэн кодтой процессын тусгай ажиллагаа ---- */
  const metadatacode = listConfig?.metadatacode;
  dataSrc = prepareC009GetProcessData(metadatacode, dataSrc);
  //! end

  const configReady = {
    ...listConfig,
    // metaConfigAll,
    widgetnemgooReady: widgetnemgooReady,
    bpsectiondtl: _.values(listConfig.bpsectiondtl),
  };

  return (
    <WidgetUniversalWrapper
      setVirtualWidgetnemgooReady={setVirtualWidgetnemgooReady}
      headerData={headerData}
      config={configReady}
      widgetnemgooReady={widgetnemgooReady}
      datasrc={dataSrc}
      dataMutate={dataMutate}
    />
  );
};

export default RenderWidgetGetProcess;
