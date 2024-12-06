import FormMetaContext from "@/context/Meta/FormMetaContext";
import { FC, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";
import NumberFormat, { NumericFormat } from "react-number-format";
import Amount from "./amount";
import Price from "./price";
import ContractId from "./contractId";
type PropsType = {
  config: any;
  className: any;
  rowIndex?: any;
  style: any;
  labelClassName: any;
  sectionConfig?: any;
};

const Atom_long: FC<PropsType> = ({
  config,
  rowIndex,
  labelClassName,
  className,
  style,
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
    handleChangeContext({
      name: config.paramrealpath,
      value: e.value,
      rowIndex,
    });
  };
  if (config.paramrealpath == "contractid") {
    return (
      <>
        <ContractId
          config={config}
          sectionConfig={sectionConfig}
          className={className}
          rowIndex={rowIndex}
        />
      </>
    );
  }

  if (config?.columnwidth) style = { ...style }; //width: parseInt(config?.columnwidth, 10)

  if (config.paramname == "amount")
    return (
      <>
        <Amount
          config={config}
          sectionConfig={sectionConfig}
          className={className}
          rowIndex={rowIndex}
        />
      </>
    );
  if (config.paramname == "price")
    return (
      <>
        <Price
          config={config}
          sectionConfig={sectionConfig}
          className={className}
          rowIndex={rowIndex}
        />
      </>
    );

  return (
    <>
      <div
        className={`${
          sectionConfig?.widgetnemgooReady?.labelPosition == "top"
            ? `flex flex-col`
            : ` ${
                config?.labelname == ""
                  ? "flex flex-col "
                  : "grid grid-flow-row-dense grid-cols-2 gap-4"
              }`
        }

				`}
      >
        <Atom_label
          labelName={config.labelname}
          className={`${labelClassName}`}
          isrequired={config.isrequired}
          styles=""
          sectionConfig={sectionConfig}
        />

        <div className="relative">
          {config.iconname && (
            <span
              className={`far ${config.iconname} absolute w-6 h-5 text-[14px] text-center top-[7px] pl-3`}
            ></span>
          )}
          <NumericFormat
            thousandsGroupStyle="thousand"
            value={getAtomValue(
              config,
              formDataInitData,
              processConfig,
              rowIndex
            )}
            prefix=""
            decimalSeparator="."
            displayType={processConfig.actiontype === "view" ? "text" : "input"}
            type="text"
            thousandSeparator={false}
            allowNegative={true}
            name={config.paramrealpath}
            placeholder={config?.placeholdername}
            style={{ ...style }}
            data-path={config.paramrealpath}
            className={twMerge(
              ` rounded border-gray-400 focus:ring-0 focus:border-black text-left ${className} ${
                config.iconname && "pl-10"
              }
                 ${
                   validData[config.paramrealpath]
                     ? ` border-red-500 border`
                     : ``
                 }
			  ${config?.labelname == "" && "w-full"}
			  `
            )}
            onValueChange={handlerChange}
            fixedDecimalScale={false}
            // disabled={fieldDisableEnable(config, processExpression)}
          />

          {config.isEmpty && <span>{config.errorText}</span>}
        </div>
      </div>
    </>
  );
};

export default Atom_long;

// [isEdit] = 1;

// var docInfo = getProcessParam('PROC_BIDDER_USER_INFORMATION_IS_COMPLETE_GET_004', 'recordId@recordId');
// console.log(docInfo);
// console.log([bookTypeId].val());
// if (docInfo) {
//     if (docInfo.b0 == [bookTypeId].val() || docInfo.b1 == [bookTypeId].val() || docInfo.b2 == [bookTypeId].val() || docInfo.b3 == [bookTypeId].val()) {
//         message(info, 'Мэдээлэл оруулсан байна', 3);
//         [isEdit] = 0;
//     }
// }

// if ([isEdit].val() == 1) {
//     showKpi(1);
// } else {
//     showKpi(1, 'view');
// }
