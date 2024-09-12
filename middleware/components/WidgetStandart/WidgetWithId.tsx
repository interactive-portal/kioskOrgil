import { usePage } from "@/hooks/use-page";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SectionWidgetChoose from "@/middleware/components/sectionWidgetChoose";

export default function WidgetWithId({
  widgetId,
  readyItem,
  widgetnemgooReady,
}: {
  widgetId: any;
  readyItem?: any;
  widgetnemgooReady?: any;
}) {
  const pageContext: any = usePage();
  const router = useRouter();
  const [myWidgetConfig, setMyWidgetConfig]: any = useState({});
  // console.log("🚀 ~ myWidgetConfig:", myWidgetConfig);

  useEffect(() => {
    setMyWidgetConfig(_.find(pageContext.ddd, { id: widgetId }));
  }, [router, pageContext.ddd]);

  // if (_.isEmpty(pageContext.ddd)) return null;
  if (_.isEmpty(myWidgetConfig)) return null;

  const listConfig = {
    ...myWidgetConfig,
    readyItem,
    widgetnemgooReady: {
      ...myWidgetConfig?.widgetnemgooReady,
      ...widgetnemgooReady,
      isShow: "1",
    },
  };

  // console.log("🚀 ~ listConfig:", listConfig);

  return <SectionWidgetChoose listConfig={listConfig} />;
}
