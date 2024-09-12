import { Slider } from "antd";
import FormMetaContext from "@/context/Meta/FormMetaContext";
import _ from "lodash";
import { FC, useContext } from "react";
import useSWR from "swr";
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

const Atom_range_slider: FC<PropsType> = ({
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
    processConfig,
    validData,
  } = useContext(FormMetaContext);

  let { data } = useSWR(`/api/get-data?metaid=${config.lookupmetadataid}`);
  if (!data) return <div>Loading...</div>;
  delete data.aggregatecolumns;
  delete data.paging;
  data = _.values(data);
  let dataLength = data.length;

  const obj: any = {};
  for (let i = 0; i < data.length; i++) {
    const displayfield = config.displayfield.toLowerCase();
    const valuefield = config.valuefield.toLowerCase();
    obj[data[i][valuefield]] = data[i][displayfield];
  }
  const handlerChange = (e: any) => {
    const { paramrealpath } = config;
    handleChangeContext({
      name: paramrealpath,
      value: e,
      rowIndex,
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
        className=""
        isrequired={config.isrequired}
        styles=""
        sectionConfig=""
      />
      <Slider
        marks={obj}
        // dots={true}
        range={false}
        value={getAtomValue(config, formDataInitData, processConfig, rowIndex)}
        max={dataLength}
        onChange={handlerChange}
        className={twMerge(` ${className}`)}
      />
    </div>
  );
};

export default Atom_range_slider;
