import FormMetaContext from "@/context/Meta/FormMetaContext";
import _ from "lodash";
import { FC, useContext, useState } from "react";
import useSWR from "swr";
import { fieldHideShow } from "@/util/helper";
import Atom_label from "./Atom_label";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import PopUpSearch from "./PopUpSearch";

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
  data = _.values(data?.result);

  // console.log("data :>> ", data);

  const handlerChangeSelectRadio = (e: any) => {
    handleChangeContext({
      name: config.paramrealpath,
      value: e.currentTarget.value,
    });
  };

  const [value, setValue] = useState(1);
  const [addMember, setAddMember] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    setAddMember(e.target.value);
    localStorage.setItem(config.paramrealpath, e.target.value);
    handleChangeContext({
      name: config.paramrealpath,
      value: e.target.value,
    });
  };

  return (
    <div
      className={` flex flex-col ${
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
      <div className="mt-2 flex flex-col ">
        <Radio.Group onChange={onChange} value={value}>
          {data &&
            data.map((item: any, index: any) => {
              let displayfield = item[config.displayfield.toLowerCase()];
              let valuefield = item[config.valuefield.toLowerCase()];
              return (
                <Radio value={valuefield} key={index}>
                  <span className="text-white text-xl font-bold">
                    {displayfield}{" "}
                  </span>
                </Radio>
              );
            })}
        </Radio.Group>
        {addMember == 1 ? (
          <>
            <PopUpSearch />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Atom_radio;
