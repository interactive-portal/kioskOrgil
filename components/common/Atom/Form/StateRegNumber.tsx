import FormMetaContext from "@/context/Meta/FormMetaContext";
import { FC, useContext, useState } from "react";
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

const StateRegNumber: FC<PropsType> = ({
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

  const itemParent =
    (localStorage.getItem("product") &&
      JSON.parse(localStorage.getItem("product") || "")) ||
    {};
  const [error, setError] = useState<any>();

  const handlerChange = (e: any) => {
    handleChangeContext({
      name: config.paramrealpath,
      value: itemParent?.id,
      rowIndex,
    });
  };

  const handlerKey = (e: any) => {
    var key = e.key;
    var regex =
      /^[АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмноөпрстуүфхцчшщъыьэюя][АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмноөпрстуүфхцчшщъыьэюя][0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[0-9]{2}$/;
    // console.log("regexValue :>> ", regexValue);

    if (config?.paramrealpath == "stateRegNumber") {
      if (!regex.test(key)) {
        setError("Регистрээ зөв оруулна уу латин үсгээр  Жич :АБ12121212");
        e.preventDefault();
      } else {
        setError("");
      }
    }
  };
  console.log("error :>> ", error);
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
      data-Type={config?.datatype}
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
              }   ${validData[config.paramname] ? ` border-red-500 border` : ``}
              ${config?.labelname == "" && "w-full"}
              `
            )}
            style={{ ...style }}
            pattern="/^[АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмноөпрстуүфхцчшщъыьэюя][АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмноөпрстуүфхцчшщъыьэюя][0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[0-9]{2}$/u"
            placeholder={config?.placeholdername}
            data-path={config.paramrealpath}
            // value={itemParent?.id}
            onKeyPress={(e) => handlerKey(e)}
            // disabled={fieldDisableEnable(config, processExpression)}
            onChange={handlerChange}
          />
        </div>
      )}
      {config.isEmpty && <span>{config.errorText}</span>}
    </div>
  );
};

export default StateRegNumber;
