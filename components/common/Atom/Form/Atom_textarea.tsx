import FormMetaContext from "context/Meta/FormMetaContext";
import { FC, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { fieldHideShow, getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";
type PropsType = {
  config: any;
  className: any;
  labelClassName: any;
  style: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const Atom_textarea: FC<PropsType> = ({
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

  const handlerChange = (e: any) => {
    handleChangeContext({
      name: config.paramrealpath,
      value: e.currentTarget.value,
      rowIndex,
    });
  };

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
        labelFor={config.paramrealpath}
        isrequired={config.isrequired}
        styles=""
        className={`${labelClassName}`}
        sectionConfig={sectionConfig}
      />
      {processConfig.actiontype === "view" ? (
        <div className="self-center">
          {getAtomValue(config, formDataInitData, processConfig, rowIndex)}
        </div>
      ) : (
        <textarea
          id={config.paramrealpath}
          name={config.paramrealpath}
          className={twMerge(
            ` rounded border-gray-400 focus:ring-0 font-roboto text-[14px] focus:border-black ${className} ${
              validData[config.paramrealpath] ? ` border-red-500` : ``
            }`
          )}
          style={{
            ...style,
            minHeight: 70,
            width: parseInt(config.columnwidth, 10),
          }}
          placeholder={config?.placeholdername}
          onChange={handlerChange}
          // disabled={fieldDisableEnable(config, processExpression)}
        >
          {/* {getAtomValue(config, formDataInitData, processConfig, rowIndex)} */}
        </textarea>
      )}
      {config.isEmpty && <span>{config.errorText}</span>}
    </div>
  );
};

export default Atom_textarea;
