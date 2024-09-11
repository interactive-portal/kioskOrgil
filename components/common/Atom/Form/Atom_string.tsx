import FormMetaContext from "context/Meta/FormMetaContext";
import { FC, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { fieldHideShow, getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";
type PropsType = {
  config: any;
  className?: any;
  labelClassName?: any;
  style?: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const Atom_string: FC<PropsType> = ({
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
  // const { t } = useTranslation("translation");
  const handlerChange = (e: any) => {
    handleChangeContext({
      name: config.paramrealpath,
      value: e.currentTarget.value,
      rowIndex,
    });
  };

  const handlerBlur = (e: any) => {};
  if (config?.columnwidth) style = { ...style }; // width: parseInt(config?.columnwidth, 10)
  return (
    <div
      className={`${
        sectionConfig?.widgetnemgooReady?.labelPosition == "top"
          ? `flex flex-col`
          : ` ${
              config?.labelname == ""
                ? "flex flex-col w-full"
                : "grid grid-flow-row-dense grid-cols-2 gap-4"
            } `
      } ${
        config.isshow == "0"
          ? "hidden"
          : fieldHideShow(config, processExpression) && "hidden"
      }`}
    >
      <Atom_label
        // labelName={t(config.labelname)}
        labelName={config.labelname}
        labelFor={config.paramname}
        isrequired={config.isrequired}
        styles=""
        className={`${labelClassName}`}
        sectionConfig={sectionConfig}
      />
      {processConfig?.actiontype === "view" ? (
        <div className="self-center">
          {getAtomValue(config, formDataInitData, processConfig, rowIndex)}
        </div>
      ) : (
        <div className="relative">
          {config.iconname && (
            <span
              className={`far ${config.iconname} absolute w-6 h-5 text-[14px] text-center top-[7px] pl-3`}
            ></span>
          )}
          <input
            type="text"
            id={config.paramname}
            name={config.paramname}
            className={twMerge(
              ` rounded border-gray-400 text-[14px] focus:ring-0  ${className}  ${
                config.iconname && "pl-10"
              } ( focus:border-black${
                validData[config.paramname] ? ` border-red-500` : ``
              }
              ${config?.labelname == "" && "w-full"}
              `
            )}
            style={{ ...style }}
            placeholder={config?.placeholdername}
            data-path={config.paramrealpath}
            value={getAtomValue(
              config,
              formDataInitData,
              processConfig,
              rowIndex
            )}
            // disabled={fieldDisableEnable(config, processExpression)}
            onChange={handlerChange}
            onBlur={(e) => handlerBlur(e)}
          />
          {/* <span className="text-red-400 pl-1  absolute -left-4  z-40">
						{config.isrequired == "1" && "*"}
					</span> */}
        </div>
      )}
      {config.isEmpty && <span>{config.errorText}</span>}
    </div>
  );
};

export default Atom_string;
