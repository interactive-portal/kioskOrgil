import FormMetaContext from "@/context/Meta/FormMetaContext";
import { FC, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  fieldHideShow,
  getAtomValue,
  registerNumberToDate,
} from "@/util/helper";
import Atom_label from "./Atom_label";
import { useRouter } from "next/router";
type PropsType = {
  config: any;
  className?: any;
  labelClassName?: any;
  style?: any;
  rowIndex?: any;
  sectionConfig?: any;
};

const ContractId: FC<PropsType> = ({
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

  const router = useRouter();

  let getVal = router?.query?.conId || localStorage.getItem("conId");

  const [error, setError] = useState<any>();
  const [dval, setDval] = useState<any>(localStorage.getItem("conId"));

  console.log("getVal :>> ", router?.query?.conId);
  const handlerChange = (e: any) => {
    setDval(e.currentTarget.value);
  };

  // console.log("error :>> ", error);

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
        labelName={config.labelname}
        labelFor={config.paramname}
        isrequired={config.isrequired}
        styles=""
        className={`${labelClassName}`}
        sectionConfig={sectionConfig}
      />

      <div className="relative">
        {config.iconname && (
          <span
            className={`far ${config.iconname} absolute w-6 h-5 text-[14px] text-center top-[7px] pl-3`}
          ></span>
        )}
        <div className="flex flex-col relative">
          <input
            type="text"
            id={config.paramname}
            name={config.paramname}
            readOnly
            className={twMerge(
              ` rounded border-gray-400 text-[14px] focus:ring-0  ${className}  ${
                config.iconname && "pl-10"
              }   ${
                validData[config.paramrealpath] ? ` border-red-500 border` : ``
              }
              ${config?.labelname == "" && "w-full"}
              `
            )}
            style={{ ...style }}
            placeholder={config?.placeholdername}
            data-path={config.paramrealpath}
            value={dval}
            // onChange={handlerChange}
          />
          {error && (
            <span className="text-red-400 absolute text-sm  -bottom-6 left-5">
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractId;
