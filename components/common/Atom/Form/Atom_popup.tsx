import FormMetaContext from "@/context/Meta/FormMetaContext";
import fetchJson from "@/lib/fetchJson";
import _, { isEmpty } from "lodash";
import { FC, useContext, useEffect, useState } from "react";
// import Select from "react-select";
import { twMerge } from "tailwind-merge";
import { fieldDisableEnable, fieldHideShow, getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";
import GenderAuto from "./genderAuto";
import { Empty, Select } from "antd";

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

  const [searchValue, setSearchValue] = useState<any>();
  const [resultList, setResultList] = useState<any>();
  const [state, setSetState] = useState<any>(
    localStorage.getItem("checkCustomer")
  );

  const metadataId = config.lookupmetadataid;

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

  const fetchData = async () => {
    let criteria = {
      name: [
        {
          operator: "like",
          operand: `%${searchValue}%`,
        },
      ],
    };

    const data = await fetchJson(
      `/api/get-data?metaid=${metadataId}&criteria=${JSON.stringify(criteria)}`
    );
    if (data.status == "success") {
      setResultList(data?.result);
    }
  };

  // console.log("config.lookupmetadataid :>> ", config.lookupmetadataid)dd
  useEffect(() => {
    // // getLookUpData(0, formDataInitData);
    // const itemParent =
    //   (localStorage.getItem("checkCustomer") &&
    //     JSON.parse(localStorage.getItem("checkCustomer") || "")) ||
    //   {};

    // if (itemParent) {
    //   setSetState(itemParent);
    // }

    fetchData();
  }, []);

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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  if (localStorage.getItem("checkCustomer") == "0") return <></>;

  // console.log(
  //   " statestatestatestate:>> ",
  //   localStorage.getItem("checkCustomer")
  // );
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

      <span className="relative">
        <>
          <div className="w-full ">
            <div className="relative px-2">
              <input
                className="rounded border-gray-400 text-[14px] focus:ring-0 kiosk "
                type="text"
                placeholder="Бүртгэлтэй гишүүн хайх"
                // value="val"
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <i className="fa-sharp fa-light fa-magnifying-glass  absolute text-base top-2 right-5 cursor-pointer text-[#585858]"></i>
            </div>
          </div>
        </>
        {searchValue?.length > 0 && (
          <div className="absolute top-10   bg-[#2e343f] max-h-[400px]  w-full rounded-2xl border  text-black mt-6 overflow-hidden z-[9999] scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full shadow  text-left">
            <ul className="z-20 px-2 ">
              {resultList?.length > 0 ? (
                <>
                  {resultList?.map((item: any, index: number) => {
                    return (
                      <li
                        className="bg-[#d9d9d94f] text-white cursor-pointer hover:text-blue-400 my-2 p-4 rounded-xl text-sm hover:"
                        key={item?.id || index}
                      >
                        <div className="flex flex-col">
                          <p>Овог: {item?.lastname}</p>
                          <p>Нэр: {item?.name}</p>
                          <p>Регистр: {item?.stateregnumber}</p>
                        </div>
                      </li>
                    );
                  })}
                </>
              ) : (
                <Empty description={"Хайлтын илэрц олдсонгүй"} />
              )}
            </ul>
          </div>
        )}
      </span>
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
