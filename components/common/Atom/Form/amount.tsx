import FormMetaContext from "@/context/Meta/FormMetaContext";
import { FC, useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fieldHideShow, getAtomValue, numberWithCommas } from "@/util/helper";
import Atom_label from "./Atom_label";
type PropsType = {
  config: any;
  className?: any;
  labelClassName?: any;
  style?: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const Amount: FC<PropsType> = ({
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

  let [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const itemParent =
      (localStorage.getItem("price") &&
        JSON.parse(localStorage.getItem("price") || "")) ||
      {};

    if (itemParent) {
      setUserData(itemParent);

      handleChangeContext({
        name: config.paramrealpath,
        value: itemParent?.saleprice,
        rowIndex,
      }); // Set user data
    }
  }, []);

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
              }
              ${config?.labelname == "" && "w-full"}
              `
            )}
            style={{ ...style }}
            placeholder={config?.placeholdername}
            data-path={config.paramrealpath}
            value={numberWithCommas(userData?.saleprice)}
            // defaultValue={userData?.saleprice}
            // disabled={fieldDisableEnable(config, processExpression)}
            // onChange={handlerChange}
          />
        </div>
      )}
      {config.isEmpty && <span>{config.errorText}</span>}
    </div>
  );
};

export default Amount;
