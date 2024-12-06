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
import { useRouter } from "next/router";

type PropsType = {
  config?: any;
  rowIndex?: any;
  className?: any;
  labelClassName?: any;
  style?: any;
  sectionConfig?: any;
};

const PopUpSearch: FC<PropsType> = ({
  rowIndex,
  labelClassName,
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
  const config: any = {
    columnaggregate: "",
    processgetparampath: "",
    mandatorycriteria: "",
    labelname: "Гишүүн",
    separatortype: "",
    isshowmultiple: "",
    isshowdelete: "",
    isshowadd: "",
    issave: "",
    isrefresh: "0",
    sidebarname: "",
    isfreeze: "0",
    stylecriteria: "",
    isbutton: "",
    groupingname: "",
    paramrealpathid: "",
    columnwidth: "300px",
    visiblecriteria: "",
    valuecriteria: "",
    enablecriteria: "",
    validationcriteria: "",
    featurenum: "",
    tabname: "",
    fractionrange: "",
    getprocessmetadataid: "",
    globecode: "",
    id: "1733283208220260",
    processmetadataid: "1726115747829573",
    groupmetadataid: "",
    parammetadataid: "",
    isshow: "1",
    isrequired: "0",
    minvalue: "",
    maxvalue: "",
    defaultvalue: "",
    recordtype: "",
    choosetype: "single",
    displayfield: "name",
    lookupmetadataid: "1543807989239385",
    lookuptype: "popup",
    patternid: "",
    valuefield: "id",
    parampath: "customerId",
    parentid: "",
    isinput: "1",
    paramname: "customerId",
    paramrealpath: "customerid",
    expressionstring: "",
    isuserconfig: "0",
    fileextension: "",
    themepositionno: "",
    dtltheme: "",
    datatype: "long",
    lookupkeymetadataid: "",
    ordernumber: "13",
    pagingconfig: "",
    isfirstrow: "",
    iconname: "",
  };
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<any>();
  const [resultList, setResultList] = useState<any>();

  const metadataId = config.lookupmetadataid;

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

  useEffect(() => {
    fetchData();
  }, [searchValue]);

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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div
      className={`selectBox  ${
        sectionConfig?.widgetnemgooReady?.labelPosition == "top"
          ? `flex flex-col`
          : ``
      } ${
        config.isshow == "0"
          ? "hidden"
          : fieldHideShow(config, processExpression) && "hidden"
      }`}
    >
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
                    console.log("item :>> ", item);
                    return (
                      <li
                        onClick={(e: any) =>
                          (window.location.href = `/page/form?crm=${item?.id}&price=${router?.query?.price}&contractid=${router?.query?.contractid}`)
                        }
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
export default PopUpSearch;

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