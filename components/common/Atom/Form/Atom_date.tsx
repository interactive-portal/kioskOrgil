import { DatePicker } from "antd";
import FormMetaContext from "@/context/Meta/FormMetaContext";
import moment from "moment";
import "moment/locale/mn";
import { FC, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fieldDisableEnable, fieldHideShow, getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";
import EndDate from "./endDate";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DateOfBirth from "./dateOfBirth";

dayjs.extend(customParseFormat);

type PropsType = {
  config: any;
  className: any;
  labelClassName: any;
  style: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const Atom_date: FC<PropsType> = ({
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
    processConfig,
    validData,
  } = useContext(FormMetaContext);

  // console.log("date", validData);
  // console.log("config.paramname", config);

  const dateFormat = "YYYY-MM-DD";
  let nowDate = moment().format("YYYY-MM-DD");

  if (config?.columnwidth)
    style = { ...style, width: parseInt(config?.columnwidth, 10) };

  const itemParent =
    (localStorage.getItem("price") &&
      JSON.parse(localStorage.getItem("price") || "")) ||
    {};
  const [duration, setDuration] = useState(parseFloat(itemParent.durationtype));

  if (config.paramrealpath == "enddate")
    return (
      <EndDate
        config={config}
        sectionConfig={sectionConfig}
        className={className}
        rowIndex={rowIndex}
      />
    );

  if (
    config.paramrealpath == "dateofbirth" ||
    config.paramrealpath == "birthdate"
  )
    return (
      <DateOfBirth
        config={config}
        sectionConfig={sectionConfig}
        className={className}
        rowIndex={rowIndex}
      />
    );

  const handlerChangeSelectDate = (e: any, dateString: any) => {
    const { paramrealpath } = config;
    let d = new Date(dateString);

    d.setMonth(d.getMonth() + duration);
    if (paramrealpath == "startDate" || paramrealpath == "startdate") {
      localStorage?.setItem("enddate", d.toLocaleDateString("fr-CA"));
    }

    handleChangeContext({
      name: paramrealpath,
      value: dateString,
      rowIndex,
    });
  };

  return (
    <>
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
        {processConfig.actiontype === "view" ? (
          <>
            {moment(
              getAtomValue(config, formDataInitData, processConfig, rowIndex)
            ).format("YYYY-MM-DD")}
          </>
        ) : (
          <DatePicker
            name={config.paramrealpath}
            id={config.paramrealpath}
            // placeholder="Огноо сонгох"
            placeholder={config?.placeholdername || "Огноо сонгох"}
            // defaultValue={dayjs(nowDate, dateFormat)}
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
                validData[config.paramrealpath] ? ` border-red-500 border` : ``
              }`
            )}
            showToday={true}
            onChange={handlerChangeSelectDate}
            // style={{ ...style, width: "165px", height: 42 }}
            style={{ ...style, height: 40 }}
            disabled={fieldDisableEnable(config, processExpression)}
          />
        )}
      </div>
    </>
  );
};

export default Atom_date;
