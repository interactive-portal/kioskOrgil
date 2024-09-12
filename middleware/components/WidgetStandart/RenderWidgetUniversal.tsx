import { WidgetUniversalWrapper } from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderNotice from "@/components/common/Notice/RenderNotice";
import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import useWidgetDataSWR from "@/middleware/dataHook/useWidgetDataSWR";
import { useRouter } from "next/router";
import { useState } from "react";
import { toBoolean } from "@/util/helper";
import useWidgetDataSWRInfinite from "@/middleware/dataHook/useWidgetDataSWRInfinite";
import useWidgetConfigSWR from "@/middleware/dataHook/useWidgetConfigSWR";

export default function RenderWidgetUniversal({
  listConfig,
}: {
  listConfig: any;
}) {
  /* ----------------------- consts ----------------------- */
  const widgetnemgooReady = listConfig.widgetnemgooReady;

  const skeletonNemgoo = widgetnemgooReady?.skeleton || {};
  const [virtualWidgetnemgooReady, setVirtualWidgetnemgooReady] =
    useState(widgetnemgooReady);
  const apiConfigNemgoo = widgetnemgooReady?.apiConfig; //"infinite": "1",

  /* --------------------- data useSWR -------------------- */
  const [dataSrc, dataError, dataMutate, paging, aggregatecolumns, infinite] =
    toBoolean(apiConfigNemgoo?.infinite || false)
      ? useWidgetDataSWRInfinite({
          metadataid: listConfig.metadataid,
          metadatacode: listConfig.metadatode,
          virtualWidgetnemgooReady,
        })
      : useWidgetDataSWR({
          metadataid: listConfig.metadataid,
          metadatacode: listConfig.metadatode,
          virtualWidgetnemgooReady,
        });

  /* -------------------- config useSWR ------------------- */

  // const [metaConfigAll, metaConfigError, metaConfigMutate = {}] =
  //   useWidgetConfigSWR({
  //     metadataid: listConfig.metadataid,
  //     metadatacode: listConfig.metadatacode,
  //     widgetnemgooReady: virtualWidgetnemgooReady,
  //   });
  // const [metaConfigAll, metaConfigError, metaConfigMutate = {}] = [{}, {}, {}];

  //datasrc
  // if (dataError) return <div>Meta дата дуудаж чадсангүй. Алдаа өгч байна.</div>;

  const configReady = {
    ...listConfig,
    widgetnemgooReady: widgetnemgooReady,
    bpsectiondtl: _.values(listConfig.bpsectiondtl),
  };

  return (
    <WidgetUniversalWrapper
      config={configReady}
      widgetnemgooReady={virtualWidgetnemgooReady}
      setVirtualWidgetnemgooReady={setVirtualWidgetnemgooReady}
      datasrc={dataSrc}
      headerData={null}
      dataMutate={dataMutate}
      paging={paging}
      aggregatecolumns={aggregatecolumns}
      infinite={infinite}
    />
  );
}
