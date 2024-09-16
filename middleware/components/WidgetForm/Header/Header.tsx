import { FC } from "react";
import RenderField from "@/middleware/components/WidgetForm/RenderField";
import DataLoader from "@/components/dataLoader";
import Skeleton from "@/components/common/Skeleton/Skeleton";

type PropsType = {
  processConfig: any;
  header: any;
  listConfigParse: any;
  processParams: any;
};

const Header: FC<PropsType> = ({
  processConfig,
  header,
  listConfigParse,
  processParams,
}) => {
  const settings = {
    widgetnemgooReady: {
      labelPosition: "top",
    },
  };
  // console.log("Dddddddddddddf   header", processConfig);
  // console.log("Dddddddddddddf   header", header);
  // console.log("Dddddddddddddf   processParams", processParams);

  if (!header)
    return (
      <>
        <Skeleton type="loading" />
      </>
    );
  return processConfig ? (
    <div className={`grid gap-8 grid-cols-2 px-6`}>
      {header?.map((item: any, index: number) => {
        if (!item.tabname && item.datatype !== "group") {
          // console.log("🚀 ~ {header?.map ~ item", item);
          return (
            <RenderField
              key={item?.id || index}
              field={item}
              className="kiosk"
              attr={processParams.details}
              sectionConfig={listConfigParse.otherattr}
            />
          );
        }
      })}
    </div>
  ) : (
    <></>
  );
};

export default Header;
