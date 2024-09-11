import _ from "lodash";
import { FC } from "react";
import useSWR from "swr";
import RenderField from "@/middleware/components/WidgetForm/RenderField";
import RenderSections from "@/middleware/components/renderSections";
import { jsonParse } from "@/util/helper";

type PropsType = {
  listConfig?: any;
  processSection?: any;
};

const RenderWidgetProcessField: FC<PropsType> = ({
  listConfig,
  processSection,
}) => {
  console.log(
    "RenderWidgetProcessField",
    listConfig,
    "processSection",
    processSection
  );
  const parameters = `&parameters=${JSON.stringify({
    filtermetadataid: processSection.metadataid,
    filterdomain: "help",
  })}`;
  const { data } = useSWR(
    `/api/get-process?processcode=layoutHdr_004_cozy${parameters}`
  );
  const listConfigParse = {
    ...listConfig,
    otherattr: jsonParse(listConfig?.otherattr),
  };

  // console.log("layoutlayoutlayoutlayout", listConfig);
  if (data) {
    if (!listConfig) {
      const otherattr = jsonParse(data["otherattr"]);
      const layout = otherattr?.layout || [];

      return (
        <RenderSections
          mergedLayout={layout}
          processSection={processSection}
          rawWidgetList={data.meta_bp_layout_section}
        />
      );
    }

    const sectionGroupByCode = _.groupBy(
      _.values(data.meta_bp_layout_param),
      function (n) {
        return n.sectioncode;
      }
    );

    let attr = _.values(processSection.meta_process_param_attr_link_mobile);

    return (
      <div className="shadow-sm bg-white rounded-lg p-5 h-full w-full">
        {listConfig.title && (
          <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 pb-3">
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {listConfig.title}
            </p>
          </div>
        )}
        <div
          className={`grid grid-cols-${listConfig.columncount || 0} gap-4 mt-4`}
        >
          {sectionGroupByCode[listConfig["code"]].map(
            (item: any, index: number) => {
              let fieldRow = _.find(attr, {
                paramrealpath: item["paramrealpath"].toLowerCase(),
              });
              if (fieldRow) {
                return (
                  <RenderField
                    field={fieldRow}
                    attr={attr}
                    key={item?.id || index}
                    sectionConfig={listConfigParse}
                  />
                );
              }
            }
          )}
        </div>
      </div>
    );
  }

  return <></>;
};

export default RenderWidgetProcessField;
