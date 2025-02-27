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

  // console.log("metadataId :>> ", metadataId);

  const fetchData = async () => {
    let criteria = {
      filterPath: [
        {
          operator: "=",
          operand: searchValue,
        },
      ],
    };

    // console.log("criteria :>> ", criteria);
    const data = await fetchJson(
      `/api/get-data?metaid=${metadataId}&criteria=${JSON.stringify(criteria)}`
    );
    if (data.status == "success") {
      console.log('data?.result :>> ', data?.result);
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

  const handleChange = (e: any, item: any) => {
    e.preventDefault();
    // const linkPath = item?.position3?.val
    localStorage?.setItem("cmrid", item?.id);
    handleChangeContext({
      name: config.paramrealpath,
      value: item.id,
      rowIndex,
    });
    // console.log(`selected item`, item);
    window.location.href = `${router.pathname}?crm=${item?.id}&price=${router?.query?.price}&contractid=${router?.query?.contractid}&isreg=1&conId=${router?.query?.conId}&member=${router?.query?.member}`;
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
      <span className="relative -top-2">
        <>
          <div className="w-full  ">
            <div className="relative px-2">
              <input
                className="rounded border-gray-400 text-[14px] focus:ring-0 kiosk "
                type="text"
                placeholder="Бүртгэлтэй гишүүн хайх "
                // value="val"
                onChange={(event) => setSearchValue(event.target.value)}
                
              />
              <i className="fa-sharp fa-light fa-magnifying-glass  absolute text-base top-2 right-5 cursor-pointer text-[#585858]"></i>
            </div>
          </div>
        </>
        {searchValue?.length > 0 && (
          <div className="absolute  top-10    w-[400px] rounded-2xl border bg-[#2e343f] text-black mt-10 overflow-hidden z-[9999]  shadow  text-left">
            <div className="relative rounded-xl overflow-auto ">
              <div className="overflow-y-scroll  h-[350px] relative max-w-sm mx-auto   shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5 scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full ">
                {resultList?.length > 0 ? (
                  <>
                    {resultList?.map((item: any, index: number) => {
                      // console.log("item :>> ", item);
                      return (
                        <li
                          onClick={(e) => handleChange(e, item)}
                          // onClick={(e: any) =>
                          //   (window.location.href = `/page/form?crm=${item?.id}&price=${router?.query?.price}&contractid=${router?.query?.contractid}`)
                          // }
                          className="bg-[#d9d9d94f] flex items-center gap-4  text-white cursor-pointer hover:text-blue-400 my-2 p-4 rounded-xl text-sm hover:"
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
              </div>
            </div>
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
