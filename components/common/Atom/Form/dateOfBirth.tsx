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

const DateOfBirth: FC<PropsType> = ({
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

  const itemParent: any = localStorage.getItem("dateOfBirth");

  // useEffect(() => {
  //   if (itemParent) {
  //     setUserData(itemParent);
  //   }
  // }, []);

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
    </div>
  );
};

export default DateOfBirth;