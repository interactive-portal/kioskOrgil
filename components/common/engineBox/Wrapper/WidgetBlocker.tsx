import _ from "lodash";

import { Empty } from "antd";

import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetButton from "@/components/common/engineBox/Wrapper/WidgetButton";
import WidgetSearch from "@/components/common/engineBox/Wrapper/WidgetSearch";
import WidgetTitle from "@/components/common/engineBox/Wrapper/WidgetTitle";

export default function WidgetBlocker({
  widgetnemgooReady,
  gridJsonConfig,
  onReadyDatasrcSearch,
  readyDatasrc,
  headerData,
  nemgooDatasrc,
  isDataLoading,
  children,
}: {
  widgetnemgooReady: any;
  gridJsonConfig: any;
  onReadyDatasrcSearch?: any;
  readyDatasrc: any;
  headerData: any;
  nemgooDatasrc: any;
  isDataLoading: boolean;
  children: any;
}) {
  const emptyNemgoo = widgetnemgooReady?.empty;
  // if (!_.isEmpty(emptyNemgoo)) {
  //   console.log("🚀 ~ emptyNemgoo:", emptyNemgoo);
  // }
  const skeletonNemgoo = widgetnemgooReady?.skeleton;

  return (
    <BlockDiv
      customClassName={
        widgetnemgooReady?.design?.className ||
        widgetnemgooReady?.className ||
        ""
      }
      customStyle={widgetnemgooReady?.design?.style || widgetnemgooReady?.style}
      divNumber="divouterblock"
    >
      <BlockDiv
        customClassName={
          widgetnemgooReady?.design?.divinsideblock?.className || ""
        }
        customStyle={widgetnemgooReady?.design?.divinsideblock?.style || {}}
        divNumber="divinsideblock"
      >
        <WidgetTitle
          titleObject={widgetnemgooReady?.title}
          gridJsonConfig={gridJsonConfig}
          customDivNumber="WidgetTitle"
        />
        <WidgetTitle
          titleObject={widgetnemgooReady?.subtitle}
          gridJsonConfig={gridJsonConfig}
          customDivNumber="WidgetSubTitle"
        />
        <WidgetTitle
          titleObject={widgetnemgooReady?.description}
          customDivNumber="WidgetDescription"
        />
        <WidgetButton buttonObject={widgetnemgooReady?.button} />

        <WidgetSearch
          searchObject={widgetnemgooReady?.search}
          onReadyDatasrcSearch={onReadyDatasrcSearch}
        />

        {/* Loading */}
        {!_.isEmpty(skeletonNemgoo) && isDataLoading && (
          <BlockDiv
            customClassName={
              widgetnemgooReady?.design?.EmptyContainer?.className
            }
            divNumber="SkeletonContainer"
          >
            loader
          </BlockDiv>
        )}

        {/* Empty */}
        {!_.isEmpty(emptyNemgoo) && //empty
        _.isEmpty(readyDatasrc[0]) && // Хоосон
        _.isEmpty(headerData) && // Хоосон
        _.isEmpty(nemgooDatasrc) &&
        // false &&
        !isDataLoading ? ( // дата ачаалсан байж болохгүй.
          <BlockDiv
            customClassName={
              widgetnemgooReady?.design?.EmptyContainer?.className
            }
            divNumber="EmptyContainer"
          >
            <Empty
              className="opacity-50 py-10"
              description="Хоосон байна."
              image="https://res.cloudinary.com/dzih5nqhg/image/upload/v1670570586/Help/empty-box_nphqjb.png"
              {...emptyNemgoo}
            />
          </BlockDiv>
        ) : (
          children
        )}
      </BlockDiv>
    </BlockDiv>
  );
}
