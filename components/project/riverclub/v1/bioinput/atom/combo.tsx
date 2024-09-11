import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import _ from "lodash";
import { useFormContext, Controller } from "react-hook-form";
import useSWR from "swr";

type PropsType = {
  obj?: any;
  criteria?: any;
};

const Combo: FC<PropsType> = ({ obj, criteria }) => {
  const {
    register,
    formState: { errors, defaultValues },
    setValue,
    control,
    getValues,
  } = useFormContext();

  const errorMessage = errors["EMAIL"];

  const [formValue, setformValue] = useState(getValues());

  let {
    data: readyData,
    error,
    mutate,
  } = useSWR(`
	/api/get-data?metaid=${obj?.lookupId}&criteria=${JSON.stringify(criteria)}
	`);

  useEffect(() => {
    mutate();
  }, [formValue]);

  const options = _.values(readyData?.result);
  const [selectIndex, setSelectIndex] = useState(0);

  const defaultvalue = options?.filter(
    (item) => item?.id == defaultValues?.[`${obj?.pathname}`]
  );

  const [values, setValues] = useState(defaultvalue?.[0]?.[obj?.name]);

  const onchange = (e: any) => {
    // setSelectIndex(e.nativeEvent.target.selectedIndex);
    setValue(obj?.pathname, e);
    setformValue(getValues());
    const value = options?.filter((item) => item?.id == e);
    setValues(value?.[0]?.[obj?.name]);
  };

  return (
    <div className="flex flex-col ">
      <label className="text-[16px] text-start font-medium  text-[#2A2A2A] mb-[8px]">
        {obj?.labelname} <span className="text-red-500">*</span>
      </label>
      <Controller
        control={control}
        name={`${obj?.pathname}`}
        render={({ field }) => (
          <Select
            onChange={onchange}
            className="text-[16px] h-[60px] text-start"
            placeholder={obj?.labelname}
            value={obj?.name == "cityname" ? values || "Улаанбаатар" : values}
            options={options?.map((item: any, index: number) => {
              return {
                value: item?.id,
                label: item?.[obj?.name],
              };
            })}
          />
          // <select
          //   className="border py-2 px-4 rounded-lg"
          //   style={{
          //     color: "inherit",
          //   }}
          //   onChange={(e) => onchange(e)}
          // >
          //   {options?.map((item: any, index: number) => {
          //     return (
          //       <option key={index} value={item?.id}>
          //         {item?.[obj?.name]}
          //       </option>
          //     );
          //   })}
          // </select>
        )}
      />
      {/* <Select
        onChange={handleChange}
        options={options?.map((item: any, index: number) => {
          return {
            value: item?.id,
            label: item?.[obj?.name],
          };
        })}
      /> */}
      {/* <p className="text-red-500 text-[14px] leading-4 ">
        {errorMessage?.message || ""}
      </p> */}
      <style>
        {`
          .ant-select-selector {
            padding:8px 16px;
            border:1px solid black !important;
          }
        `}
      </style>
    </div>
  );
};

export default Combo;
