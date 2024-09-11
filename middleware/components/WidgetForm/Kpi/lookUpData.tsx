import React, { FC, useState } from "react";
// import RenderField from "@/middleware/components/WidgetForm/RenderField";
import _ from "lodash";
import { Radio, Checkbox } from "antd";
import useSWR from "swr";

type PropsType = {
  type: any;
  config?: any;
};

const LookUpData: FC<PropsType> = ({ type, config }) => {
  const { lookupmetadataid, lookupcriteria, showtype, templatedtlid } = config;
  const [metaId, setMetaId] = useState<any>(lookupmetadataid);

  const valuefield = lookupcriteria.split("=");
  let criteria = {
    [valuefield[0]]: [
      {
        operator: "=",
        operand: valuefield[1],
      },
    ],
  };
  const { data: LoopdataSrc, error } = useSWR(
    `/api/get-data?metaid=${metaId}&criteria=${JSON.stringify(criteria)}`
  );
  delete LoopdataSrc?.aggregatecolumns;
  delete LoopdataSrc?.paging;
  const dataSrc = _.values(LoopdataSrc);

  const comboDataTransform = (data: any) => {
    return data.map((item: any, key: any) => {
      // let displayfield = item[config.displayfield.toLowerCase()];
      // let valuefield = item[config.valuefield.toLowerCase()];
      return { label: item.name, value: item.id };
    });
  };
  switch (type) {
    case "radio":
      return (
        <div className="mt-2 ">
          <Radio.Group name="radiogroup" defaultValue={1}>
            {dataSrc.map((item: any, index: any) => {
              return (
                <Radio value={item.id} key={index}>
                  {item.name}
                </Radio>
              );
            })}
          </Radio.Group>
          <style>
            {`
							.ant-checkbox-inner{
								border-radius: 0px
							}
						`}
          </style>
        </div>
      );
    case "multicheck":
      const options = comboDataTransform(dataSrc);
      return (
        <div className="mt-2 ">
          <Checkbox.Group options={options} />
        </div>
      );

    default:
      return type;
  }
};

export default LookUpData;
