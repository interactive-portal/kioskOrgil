import _ from "lodash";
import RenderSections from "./renderSections";

const RenderBody = ({
  hostObject,
  readyMergedPageConfig,
  meta_bp_layout_section,
  mergedPageNemgoo,
  masterPageNemgooConfig,
  ouchError,
  pageHeadMeta,
}: {
  hostObject?: object;
  readyMergedPageConfig?: any;
  meta_bp_layout_section?: any;
  mergedPageNemgoo?: any;
  masterPageNemgooConfig?: any;
  layoutConfig?: any;
  ouchError?: any;
  pageHeadMeta?: any;
}) => {
  //   useCloudRender({
  //     readyMergedPageConfig,
  //     masterPageNemgooConfig,
  //     hostObject,
  //     pageHeadMeta,
  //   });

  if (ouchError) return "no data";

  const bodyDefault = masterPageNemgooConfig?.bodyDefault || {};
  const readyPagenemgoo = readyMergedPageConfig?.readyPagenemgoo;
  const widgetList = _.find(mergedPageNemgoo, { sectionCode: "body" });

  return (
    <main
      className={bodyDefault?.className || "main"}
      style={{
        minHeight: "1710px",
      }}
    >
      {/* {JSON.stringify(meta_bp_layout_section)} */}
      <RenderSections
        mergedLayout={widgetList?.children}
        rawWidgetList={meta_bp_layout_section}
        customClassName="h-full"
      />
    </main>
  );
};

export default RenderBody;
