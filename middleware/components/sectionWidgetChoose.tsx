import _ from "lodash";
import RenderWidgetUniversal from "./WidgetStandart/RenderWidgetUniversal";
import WidgetNoMeta from "./WidgetStandart/WidgetNoMeta";
import RenderWidgetGetProcess from "./WidgetStandartProcess/RenderWidgetGetProcess";

export default function SectionWidgetChoose({
  listConfig,
}: {
  listConfig: any;
}) {
  const widgetnemgooReady = listConfig.widgetnemgooReady;
  if (widgetnemgooReady?.isShow === "0") return null;

  const widgetConfigNemgoo = widgetnemgooReady?.widget;
  const myMetaTypeId = widgetConfigNemgoo?.metatypeid || listConfig.metatypeid;
  const myActionType = widgetConfigNemgoo?.actiontype || listConfig.actiontype;
  // console.log("myMetaTypeId :>> ", myMetaTypeId);

  var itemSection = _.omit(listConfig, ["otherattr", "widgetnemgoo"]);
  // return (
  //   <div className="h-96">
  //     <pre>{JSON.stringify(itemSection, null, 2)}</pre>
  //   </div>
  // );

  // return (
  //   <div
  //     className={`${itemSection.widgetnemgooReady?.className}`}
  //     data-wname={itemSection?.widgetcode}
  //   >
  //     <RenderWidgetUniversal listConfig={itemSection} />

  //   </div>
  // );
  // console.log("myMetaTypeId", myMetaTypeId);

  switch (myMetaTypeId) {
    case "200101010000016": //MetaGroup гэсэн төрөлтэй
      return (
        <div
          className={`${itemSection.widgetnemgooReady?.className}`}
          data-wname={itemSection?.widgetcode}
        >
          <RenderWidgetUniversal listConfig={itemSection} />
        </div>
      );
    case "200101010000011":
      return (
        <div
          className={`${itemSection.widgetnemgooReady?.className}`}
          data-wname={itemSection?.widgetcode}
        >
          <RenderWidgetGetProcess listConfig={listConfig} />
        </div>
      );
    default:
      return (
        <div
          className={`${itemSection.widgetnemgooReady?.className}`}
          data-wname={itemSection?.widgetcode}
        >
          <WidgetNoMeta listConfig={listConfig} />
        </div>
      );
  }
  //     default:
  //       //metatypeid байхгүй буюу Meta холбоогүй үед..
  //       return <WidgetNoMeta listConfig={listConfig} />; //belong Jargal
  //   }
}
