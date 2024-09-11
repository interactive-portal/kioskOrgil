import React, { FC } from "react";
// import RenderField from "@/middleware/components/WidgetForm/RenderField";
import _ from "lodash";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import {
  Atom_string,
  Atom_file,
  Atom_datetime,
} from "@/components/common/Atom/Form";
import LookUpData from "./lookUpData";
type PropsType = {
  type: any;
  options?: any;
};

const PrepareData: FC<PropsType> = ({ type, options }) => {
  let dataValue = type;

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  if (dataValue == "multicheck") {
    dataValue = `multicheck`;
  } else if (dataValue == "multi_file") {
    dataValue = `multi_file`;
  } else if (dataValue == "date") {
    dataValue = `date`;
  } else if (dataValue == "radio") {
    dataValue = `radio`;
  } else if (dataValue == "text") {
    dataValue = `text`;
  }

  const sectionconfig = {
    widgetnemgooReady: {
      labelPosition: "top",
      className: "hidden",
    },
  };
  const field = {
    paramrealpath: "param[kpiDmDtl.fact1][2][]",
  };

  const min = 1;
  const max = 100;
  const rand = min + Math.random();

  const swichContent = () => {
    const cellData = _.find(options, { showtype: dataValue });
    switch (dataValue) {
      case "text":
        console.log("cellDatacellData", cellData);
        const config = {
          paramrealpath: `param[kpiDmDtl.${cellData.parampath}][${cellData.key}][]`,
          placeholdername: cellData.labelname,
          isshow: 1,
        };
        return (
          <Atom_string
            config={config}
            className="w-full"
            // rowIndex={options}
            sectionConfig={sectionconfig}
            labelClassName="hidden "
          />
        );
      case "date":
        return (
          <Atom_datetime
            className="w-full"
            style=""
            rowIndex=""
            labelClassName="hidden"
            sectionConfig={sectionconfig}
            config={field}
          />
        );
      case "radio":
        return <LookUpData type={dataValue} config={cellData} />;
      case "multicheck":
        return <LookUpData type={dataValue} config={cellData} />;
      case "multi_file":
        return (
          <Atom_file
            config={field}
            // rowIndex={rowIndex}
            // style={style}
            className="fileattach"
            sectionConfig={sectionconfig}
            labelClassName="hidden"
          />
        );
      default:
        return dataValue;
    }
  };

  return <span className="leading-5">{swichContent()}</span>;
};

export default PrepareData;
