import FormMetaContext from "@/context/Meta/FormMetaContext";
import fetchJson from "@/lib/fetchJson";
import _, { isEmpty } from "lodash";
import { FC, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import { fieldDisableEnable, fieldHideShow, getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";
import GenderAuto from "./genderAuto";

type PropsType = {
  config: any;
  rowIndex?: any;
  className?: any;
  labelClassName: any;
  style?: any;
  sectionConfig?: any;
};

const Atom_combo: FC<PropsType> = ({
  config,
  rowIndex,
  className,
  labelClassName,
  style,
  sectionConfig,
}) => {
  const [laoding, setLoading] = useState(false);
  const [options, setOptions] = useState<any>();
  const {
    processExpression,
    processConfig,
    formDataInitData,
    handleChangeContext,
    lookUpData,
    handleLookUpData,
    validData,
  } = useContext(FormMetaContext);

  const getLookUpData = async (i: any, item: any) => {
    // console.log("groupconfigparampath :>> ", config);
    let params = {};

    if (config?.groupconfigparampath) {
      params = config?.groupconfigparampath
        .toLowerCase()
        .split("|")
        .reduce(function (obj: any, str: any, index: any) {
          let strParts = str.split(":");
          let params = str.split(".");
          let param = params[0] || "";
          if (params.length >= 2) {
            param = params[1];
          }
          let field: any = "";
          if (params.length <= 1) {
            field = item[params[0]];
          } else {
            const dtlList = _.values(formDataInitData[params[0]]) || "";
            field = dtlList[i]?.[param];
          }
          obj[param] = field;
          return obj;
        }, {});
    }
    // console.log("formDataInitData :>> ", formDataInitData);
    if (config.paramrealpath == "districtId") {
      params = {
        cityId: formDataInitData["cityId"],
      };
    }
    if (config.paramrealpath == "streetId") {
      params = {
        districtId: formDataInitData["districtId"],
      };
    }

    const criteria = {
      ...params,
    };

    let paging = {
      offset: 1,
      pageSize: 100,
    };

    let data = await fetchJson(
      `/api/get-data?metaid=${
        config.lookupmetadataid
      }&pagingwithoutaggregate=1&criteria=${JSON.stringify(
        criteria
      )}&paging=${JSON.stringify(paging)}`
    );
    delete data.aggregatecolumns;
    delete data.paging;

    data = _.values(data.result);

    setOptions(comboDataTransform(data));

    return data;
  };

  useEffect(() => {
    if (options != undefined) return;
    getLookUpData(0, formDataInitData);
  }, [options]);

  const handlerFocus = async (e: any, index: any) => {
    setLoading(true);
    const res = await getLookUpData(index, formDataInitData);
    setOptions(comboDataTransform(res));
    setLoading(false);
  };

  const comboDataTransform = (data: any) => {
    return data.map((item: any, key: any) => {
      let displayfield = item[config.displayfield.toLowerCase()];
      let valuefield = item[config.valuefield.toLowerCase()];
      return { label: displayfield, value: valuefield };
    });
  };

  const handlerChange = (e: any) => {
    handleChangeContext({
      name: config.paramrealpath,
      value: e.value,
      rowIndex,
    });
  };

  const style1 = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: "rgba(156, 163, 175, 1)",
      boxShadow: "0 !important",
      cursort: "pointer",
      // border: validData[config?.paramname] ? `solid 1px red` : ``,
      border: "none",
      backgroundColor: "transparent",
      padding: 0,

      "&:hover": {
        // border: "0 !important",
      },
    }),
  };

  // if (config.paramname == "gender")
  //   return (
  //     <GenderAuto
  //       config={config}
  //       lookupData={options}
  //       sectionConfig={sectionConfig}
  //       className={className}
  //       rowIndex={rowIndex}
  //     />
  //   );

  return (
    <div
      className={`selectBox  ${
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

      <div className={`self-center w-full  `}>
        {processConfig.actiontype === "view" ? (
          <>
            {
              options?.filter(
                (option: any) =>
                  option["value"] ===
                  getAtomValue(
                    config,
                    formDataInitData,
                    processConfig,
                    rowIndex
                  )
              )?.[0]?.["label"]
            }
          </>
        ) : (
          <Select
            options={options}
            onChange={handlerChange}
            onFocus={(e) => handlerFocus(e, rowIndex)}
            isLoading={laoding}
            className={twMerge(
              `comboSelect ${className} ${
                validData[config?.paramname] ? ` border-red-500` : ``
              }`
            )}
            name={config.paramrealpath}
            data-attr={config.paramrealpath}
            styles={style1}
            value={options?.filter(
              (option: any) =>
                option["value"] ==
                getAtomValue(config, formDataInitData, processConfig, rowIndex)
            )}
            menuPortalTarget={document.body}
          />
        )}
      </div>
    </div>
  );
};
export default Atom_combo;

export const encodeCriteria = (criteria: any) => {
  if (isEmpty(criteria)) return [{}];

  let myCriteria: any = [];
  Object.entries(criteria).map(([key, value]) => {
    myCriteria.push({
      filterfield: key,
      operator: "=",
      value: value,
    });
  });

  return myCriteria;
};
