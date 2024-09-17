import FormMetaContext from "@/context/Meta/FormMetaContext";
import { FC, useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fieldHideShow, getAtomValue, numberWithCommas } from "@/util/helper";
import { DatePicker } from "antd";
import Atom_label from "./Atom_label";
import moment from "moment";
type PropsType = {
  config: any;
  className?: any;
  labelClassName?: any;
  style?: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const EndDate: FC<PropsType> = ({
  config,
  className,
  labelClassName,
  style,
  rowIndex,
  sectionConfig,
}) => {
  const {
    processExpression,
    formDataInitData,
    handleChangeContext,
    validData,
    processConfig,
  } = useContext(FormMetaContext);

  const itemParent: any = localStorage.getItem("enddate");

  // useEffect(() => {
  //   if (itemParent) {
  //     setUserData(itemParent);
  //   }
  // }, []);

  let [userData, setUserData] = useState<any>();

  console.log("item :>> ", userData);

  return (
    <div
      className={`${
        sectionConfig?.widgetnemgooReady?.labelPosition == "top"
          ? `flex flex-col w-full`
          : `grid grid-cols-2 gap-4`
      } ${
        config.isshow == "0"
          ? "hidden"
          : fieldHideShow(config, processExpression) && "hidden"
      }`}
    >
      <Atom_label
        labelName={config.labelname}
        isrequired={config.isrequired}
        className={`${labelClassName}`}
        labelFor={config.paramrealpath}
        styles=""
        sectionConfig={sectionConfig}
      />

      <input
        type="text"
        readOnly
        className="rounded border-gray-400  focus:ring-0 kiosk false "
        value={itemParent || ""}
      />

      {/* <DatePicker
        name={config.paramrealpath}
        id={config.paramrealpath}
        // placeholder="Огноо сонгох"
        placeholder={config?.placeholdername || "Огноо сонгох"}
        // defaultValue={moment().format("YYYY-MM-DD")}
        // moment(
        //   getAtomValue(
        //     config,
        //     formDataInitData,
        //     processConfig,
        //     rowIndex,
        //   ),
        // ) ||
        // className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black  ant-input-lg rounded-none"
        className={twMerge(
          `rounded  border-gray-400 ${className}   ${
            validData[config.paramname] ? ` border-red-500 border` : ``
          }`
        )}
        showToday={true}
        // onChange={handlerChangeSelectDate}
        // style={{ ...style, width: "165px", height: 42 }}
        style={{ ...style, height: 40 }}
      /> */}
    </div>
  );
};

export default EndDate;
