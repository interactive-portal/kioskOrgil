import { useMemo } from "react";
import _ from "lodash";

import dynamic from "next/dynamic";
import FooterDefault from "@/components/common/default/footerDefault";
import useWidgetData from "@/components/common/engineBox/util/useWidgetData";

type FooterProps = {
  options?: any;
};

export default function Footer({ options }: FooterProps) {
  //   console.log("Footer :>> ", options);
  const {
    readyMergedPageConfig,
    masterPageNemgooConfig,
    meta_bp_layout_section,
  } = options;
  const footerWidget = _.find(meta_bp_layout_section, { code: "footer" }) || "";
  if (_.isEmpty(footerWidget)) {
    return <FooterDefault />;
  }

  let optionsWidget = _.omit(footerWidget, [
    "layoutnemgoo",
    "otherattr",
    "layouthdr",
    "rdebugconfig",
    "borderstyle",
    "rdebugdata",
    "rdebugshowposition",
  ]);

  const RenderFooter: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/${footerWidget.componentpath.toLowerCase()}/${
              footerWidget.widgetcode
            }`
          ),
        {
          loading: () => <span>loader</span>,
        }
      ),

    []
  );
  const [dataSrc, error] = useWidgetData(optionsWidget);

  return (
    <>
      {/* {JSON.stringify(footerWidget.componentpath)} */}
      {/* <span className="max-w-[760px] pb-16 "></span> */}
      <RenderFooter data={dataSrc} options={optionsWidget} />
    </>
  );
}
