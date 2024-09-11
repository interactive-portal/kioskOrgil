import _ from "lodash";
import RenderSection from "./renderSection";
import { twMerge } from "tailwind-merge";

const RenderSections = ({
  mergedLayout = [],
  rawWidgetList,
  customClassName = "",
  customStyle,
  processSection,
  sectionNemgoo,
}: {
  mergedLayout: [];
  rawWidgetList?: any;
  customClassName?: string;
  customStyle?: any;
  processSection?: any;
  sectionNemgoo?: any;
}) => {
  //  const twMerge: (...classLists: import("./tw-join").ClassNameValue[]) => string;

  return (
    <div
      className={
        _.isEmpty(customClassName)
          ? "grid grid-cols-12 w-full gap-x-6"
          : customClassName
      }
      style={sectionNemgoo?.style}
    >
      {sectionNemgoo?.SectionInside ? (
        <div
          className={twMerge(
            `w-full ${sectionNemgoo?.SectionInside?.className}`
          )}
          style={sectionNemgoo?.SectionInside?.style}
        >
          <RenderSectionList
            mergedLayout={mergedLayout}
            rawWidgetList={rawWidgetList}
            processSection={processSection}
          />
        </div>
      ) : (
        <RenderSectionList
          mergedLayout={mergedLayout}
          rawWidgetList={rawWidgetList}
          processSection={processSection}
        />
      )}
    </div>
  );
};

export default RenderSections;

/* ------------------------------------------------------ */
/*                       SECTIONBODY                      */
/* ------------------------------------------------------ */

const RenderSectionList = ({
  mergedLayout,
  rawWidgetList,
  processSection,
}: {
  mergedLayout: [];
  rawWidgetList?: any;
  processSection?: any;
}) => {
  return (
    <>
      {mergedLayout.map((item: any, index: number) => {
        const sectionCode = _.split(item.sectionCode, "section")[1];
        const sectionList = _.filter(rawWidgetList, {
          code: sectionCode,
        });

        if (item.children) {
          return (
            <RenderSections
              key={item?.id || index}
              mergedLayout={item?.children}
              customClassName={item?.className}
              customStyle={item?.style}
              rawWidgetList={rawWidgetList}
              processSection={processSection}
              sectionNemgoo={item}
            />
          );
        } else {
          return (
            <RenderSection
              key={item?.id || index}
              sectionnemgoo={item}
              sectionCode={sectionCode}
              sectionList={sectionList}
              processSection={processSection}
            />
          );
        }
      })}
    </>
  );
};
