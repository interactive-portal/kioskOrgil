import { DatePicker } from "antd";
import FormMetaContext from "context/Meta/FormMetaContext";
import moment from "moment";
import "moment/locale/mn";
import { FC, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { fieldDisableEnable, fieldHideShow } from "@/util/helper";
import Atom_label from "./Atom_label";
type PropsType = {
  config: any;
  className: any;
  labelClassName?: any;
  style?: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const Atom_datetime: FC<PropsType> = ({
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
  } = useContext(FormMetaContext);

  const handlerChangeSelectDate = (dateString: any) => {
    const { paramrealpath } = config;

    handleChangeContext({
      name: paramrealpath,
      value: moment(dateString).format("YYYY-MM-DD HH:mm") + ":00",
    });
  };

  return (
    <>
      <div
        className={`${
          sectionConfig?.widgetnemgooReady?.labelPosition == "top"
            ? `flex flex-col`
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
          styles=""
          sectionConfig={sectionConfig}
        />
        <div className="flex flex-col ">
          {processConfig.actiontype === "view" ? (
            <>
              {formDataInitData[config.paramrealpath] &&
                moment(formDataInitData[config.paramrealpath]).format(
                  "YYYY-MM-DD HH:mm"
                )}
            </>
          ) : (
            <DatePicker
              showTime={{ format: "HH:mm" }}
              name={config.paramrealpath}
              placeholder={config?.placeholdername}
              // defaultValue={
              //   formDataInitData[config.paramrealpath] &&
              //   moment(formDataInitData[config.paramrealpath]).format(
              //     "YYYY-MM-DD HH:mm"
              //   )
              // }
              className={twMerge(`rounded ${className}`)}
              showToday={true}
              onOk={handlerChangeSelectDate}
              style={{ ...style, width: "180px", height: 42 }}
              disabled={fieldDisableEnable(config, processExpression)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Atom_datetime;
