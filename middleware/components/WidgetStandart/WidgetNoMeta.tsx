import _ from "lodash";
import { useRouter } from "next/router";
import { toBoolean } from "util/helper";

import { useEffect, useState } from "react";
import useCallExternalAPI from "@/middleware/dataHook/useCallExternalAPI";
import useCallListMetaverse from "@/middleware/dataHook/useCallListMetaverse";
import { prepareRawUrlQueryToCriteria } from "@/components/common/engineBox/util/urlHelper";
import { WidgetUniversalWrapper } from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const WidgetNoMeta = ({ listConfig }: { listConfig: any }) => {
  // if (_.isEmpty(listConfig)) return null;
  // console.log("killer", listConfig);

  const widgetnemgooReady = listConfig.widgetnemgooReady;
  const ghost = toBoolean(widgetnemgooReady?.ghost || "0");
  const isLoading = widgetnemgooReady?.isLoading || null;
  const router = useRouter();

  let rawCriteria = "";
  if (!toBoolean(widgetnemgooReady?.ignorecriteria || false)) {
    rawCriteria = prepareRawUrlQueryToCriteria(router.query);
  }

  // externalAPI
  const [dataSrcExternalApi] = useCallExternalAPI({
    externalApiNemgoo: widgetnemgooReady?.externalApi,
  });

  // metaverse
  const {
    dataSrcMetaverse,
    pagingMetaverse,
    detailMetaverse,
    errorAPI,
    mutateAPI,
  } = useCallListMetaverse({
    metaverseNemgoo: widgetnemgooReady?.metaverse,
  });

  // console.log("🚀 ~ WidgetNoMeta ~ dataSrcMetaverse:", dataSrcMetaverse);
  // const dataSrcMetaverse: any = [];

  const datasrc = !_.isEmpty(dataSrcExternalApi)
    ? dataSrcExternalApi
    : !_.isEmpty(dataSrcMetaverse)
    ? dataSrcMetaverse
    : widgetnemgooReady?.data || [];

  // console.log("🚀 ~ WidgetNoMeta ~ datasrc haha:", datasrc);

  /* ------------------------------------------------------ */
  /*                          NEXT                          */
  /* ------------------------------------------------------ */
  const metaConfig = {
    gridJsonConfig: {},
    pathConfig: [],
  };

  const configReady = {
    ...listConfig,
    metaConfig,
    widgetnemgooReady: widgetnemgooReady,
    bpsectiondtl: _.values(listConfig.bpsectiondtl),
  };
  // console.log("🚀 ~ configReady", configReady);

  return (
    <>
      <WidgetUniversalWrapper
        config={configReady}
        widgetnemgooReady={widgetnemgooReady}
        datasrc={datasrc}
        dataMutate={mutateAPI}
      />
    </>
  );
};

export default WidgetNoMeta;
