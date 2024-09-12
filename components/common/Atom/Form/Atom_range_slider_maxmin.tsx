import { Slider } from "antd";
import FormMetaContext from "@/context/Meta/FormMetaContext";
import { FC, useContext, useState } from "react";
import NumberFormat from "react-number-format";
import { twMerge } from "tailwind-merge";
import { fieldDisableEnable, fieldHideShow, getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";
type PropsType = {
  config: any;
  className?: any;
  labelClassName?: any;
  style?: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const Atom_range_slider_maxmin: FC<PropsType> = ({
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
  const handlerChange = (e: any) => {
    const { paramrealpath } = config;
    handleChangeContext({
      name: paramrealpath,
      value: e,
      rowIndex,
    });
    setInputValue(e);
  };
  const [inputValue, setInputValue] = useState<any>();
  return (
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
        labelFor={config.paramname}
        isrequired={config.isrequired}
        styles=""
        className={`${labelClassName}`}
        sectionConfig={sectionConfig}
      />

      <Slider
        value={getAtomValue(config, formDataInitData, processConfig, rowIndex)}
        min={parseInt(config.minvalue, 10)}
        max={parseInt(config.maxvalue, 10)}
        step={parseInt(config.minvalue, 10)}
        // tooltipopen={true}
        onChange={handlerChange}
        className={twMerge(`  ${className}`)}
      />
      <>Atom_range_slider_maxmin</>
    </div>
  );
};

export default Atom_range_slider_maxmin;
