import FormMetaContext from "context/Meta/FormMetaContext";
import _ from "lodash";
import { FC, useContext } from "react";
import useSWR from "swr";
import { fieldHideShow } from "@/util/helper";
import Atom_label from "./Atom_label";
type PropsType = {
  config?: any;
  sectionConfig?: any;
  className?: any;
  style?: any;
  rowIndex?: any;
  labelClassName?: any;
};

const Atom_radio: FC<PropsType> = ({
  config,
  sectionConfig,
  labelClassName,
  className,
  style,
  rowIndex,
}) => {
  const { processExpression, formDataInitData, handleChangeContext } =
    useContext(FormMetaContext);

  let result: any;
  let { data } = useSWR(`/api/get-data?metaid=${config.lookupmetadataid}`);

  // if (!data) return <div>Loading...</div>;
  delete data.aggregatecolumns;
  delete data.paging;
  data = _.values(data);

  const handlerChangeSelectRadio = (e: any) => {
    handleChangeContext({
      name: config.paramrealpath,
      value: e.currentTarget.value,
    });
  };

  return (
    <div
      className={`${
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
        styles=""
        sectionConfig={sectionConfig}
        className={`${labelClassName}`}
      />
      <div className="mt-2 ">
        {data &&
          data.map((item: any, index: any) => {
            let displayfield = item[config.displayfield.toLowerCase()];
            let valuefield = item[config.valuefield.toLowerCase()];
            return (
              <div className="flex items-center mt-2" key={item?.id || index}>
                <div className="bg-white dark:bg-gray-100 rounded-full w-5 h-5 flex shrink-0 justify-center items-center relative">
                  <input
                    type="radio"
                    id={config.paramrealpath + "_" + valuefield}
                    name={config.paramrealpath}
                    onChange={handlerChangeSelectRadio}
                    value={valuefield}
                    className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                  />
                  <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" />
                </div>
                {/* <p className="mx-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100">{displayfield}</p> */}
                <Atom_label
                  labelName={displayfield}
                  labelFor={config.paramrealpath + "_" + valuefield}
                  isrequired={config.isrequired}
                  styles={{ marginBottom: 0, marginLeft: 10 }}
                  sectionConfig={sectionConfig}
                  className={`${labelClassName}`}
                  isHideSeperator={true}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Atom_radio;
