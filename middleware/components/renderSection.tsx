import _ from "lodash";
import { FC } from "react";

import { twMerge } from "tailwind-merge";
import { jsonParse } from "@/util/helper";
import SectionWidgetChoose from "./sectionWidgetChoose";

// import Jaak from "@/components//cloud/Project/Cozy/jaak";

type PropsType = {
  sectionnemgoo: any;
  sectionCode?: string;
  sectionList?: any;
  processSection?: any;
};

const RenderSection: FC<PropsType> = ({
  sectionnemgoo,
  sectionCode,
  sectionList = [],
  processSection,
}) => {
  if (_.isEmpty(sectionList)) return null;

  // const temp = sectionList.length > 1 && { gridGap: "2%" };
  // const itemClassName = sectionnemgoo?.className || "";

  const dataAttrs = {
    "data-sectioncode": sectionCode,
    sectioncode: sectionCode,
    widgetname: _.isEmpty(sectionList)
      ? "Process render section"
      : sectionList[0]["widgetcode"],
  };
  const gridClass = sectionnemgoo?.gridClass || "";

  const temp = sectionList.length > 1 && {
    gridGap: gridClass ? "none" : "none",
  };
  const itemClassName = sectionnemgoo?.className || "";
  const itemBgUrl = sectionList[0]?.widgetnemgooReady?.sectionBg || "";
  const bgHide =
    sectionList[0]?.widgetnemgooReady?.sectionBg?.sectionBgHide || false;

  return (
    <div
      {...dataAttrs}
      className={`${itemClassName} sectionAnimate ${
        itemBgUrl ? "relative" : ""
      } ${sectionList.length > 1 ? gridClass || "" : ""} ${
        sectionnemgoo?.SectionInside?.className
      }  `}
      style={{ ...temp, ...sectionnemgoo?.style }}
    >
      {sectionList.map((sectionItem: any, index: number) => {
        return (
          <SectionWidgetChoose
            listConfig={sectionItem}
            key={sectionItem?.id || index}
          />
          // <span key={index} className="bg-red-400 my-6 mx-auto">
          //   widgetcode :{sectionItem.widgetcode}
          // </span>
        );
      })}
    </div>
  );
};

export default RenderSection;
