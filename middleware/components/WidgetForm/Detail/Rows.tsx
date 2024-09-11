import { FC, useState, useMemo, useContext } from "react";
import { fieldHideShow } from "@/util/helper";
import _ from "lodash";
import RowsItem from "./RowsItem";
import FormMetaContext from "context/Meta/FormMetaContext";

type PropsType = {
  pathConfig: any;
  config: any;
};

const Rows: FC<PropsType> = ({ pathConfig, config }) => {
  const {
    processExpression,
    formDataInitData,
    setFormDataData,
    processConfig,
  } = useContext(FormMetaContext);

  console.log("processExpression", processExpression);
  console.log("config", config);
  console.log("formDataInitData", formDataInitData);

  let readyColumn = _.orderBy(
    _.filter(pathConfig, (item) => {
      return item?.paramrealpath.split(".").length === 2;
    }) || [],
    ["ordernumber"]
  );

  let dtlList: any = _.values(formDataInitData[config["paramrealpath"]]) || [];
  const [dtlListState, setDtlListState] = useState(dtlList);

  let __dataElement = useMemo(
    () =>
      pathConfig.reduce(function (map: any, item: any) {
        map[item.paramname] = item?.defaultvalue;
        return map;
      }, {}),
    []
  );

  const deleteRowClick = (e: any, index: any) => {
    e.preventDefault();
    let prepareRow = [
      ...(_.values(formDataInitData[config["paramrealpath"]]) || []),
    ];
    prepareRow.splice(index, 1);
    setDtlListState(prepareRow);
    formDataInitData[config["paramrealpath"]] = prepareRow;
    setFormDataData(formDataInitData);
  };

  const addRowClick = (e: any) => {
    e.preventDefault();
    formDataInitData[config["paramrealpath"]] = [
      ...(_.values(formDataInitData[config["paramrealpath"]]) || []),
      __dataElement,
    ];
    setDtlListState(formDataInitData[config["paramrealpath"]]);
    setFormDataData(formDataInitData);
  };

  return (
    <div
      className={` w-full overflow-y-auto newRows  scrollbar-thumb-citizen scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-citizen-dark scrollbar-thumb-rounded-full    ${
        config.isshow == "0"
          ? "hidden"
          : fieldHideShow(config, processExpression) && "hidden"
      } `}
    >
      {/* <KpiForm pathConfig="data" config="data" inputclassName="any" /> */}
      <div
        className={`xl:w-full border-b border-gray-300 dark:border-gray-700 mb-5 ${
          config.tabname ? "hiden" : ""
        } ${config?._sectionClassName}`}
      >
        <div className="">
          <p className="text-lg text-gray-800 dark:text-gray-100">
            {config.labelname}
          </p>
        </div>
      </div>
      {processConfig.actiontype !== "view" && (
        <div>
          <button
            onClick={addRowClick}
            className="mx-2 ml-0 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-5 py-1 text-sm"
          >
            Бичлэг нэмэх
          </button>
        </div>
      )}
      <div className="mt-2 w-full overflow-y-auto overflow-x-auto  scrollbar-thumb-citizen scrollbar-track-gray-200 scrollbar-thin">
        <table className="w-full whitespace-nowrap border-collapse bg-white rounded border border-gray-300 mb-1.5">
          <thead>
            <tr className="w-full text-sm leading-none text-gray-500 h-12">
              {readyColumn.map((item: any, index: number) => {
                return (
                  <th
                    key={item?.id || index}
                    className={`border-l border-gray-300 px-4 whitespace-no-wrap font-normal text-gray-900 bg-gray-100 ${
                      item.isshow == "0" ? "hidden" : ""
                    }`}
                  >
                    {item?.labelname}
                  </th>
                );
              })}
              <th
                key={new Date().getTime()}
                className={`border-l border-gray-300 px-4 whitespace-no-wrap font-normal text-gray-900 bg-gray-100`}
              ></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {dtlList.map((item: any, index: number) => {
              return (
                <RowsItem
                  column={readyColumn}
                  rowIndex={index}
                  key={item?.id || index}
                  processExpression={processExpression}
                  onDelete={deleteRowClick}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rows;
