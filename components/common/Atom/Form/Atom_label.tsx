import _ from "lodash";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { isEmpty } from "@/util/helper";
type PropsType = {
  labelName?: string;
  labelFor?: string;
  isHideSeperator?: any;
  isrequired: string;
  styles: any;
  sectionConfig?: any;
  className: string;
};

const Atom_label: FC<PropsType> = ({
  labelName,
  isrequired,
  styles,
  labelFor,
  className,
  sectionConfig,
  isHideSeperator,
}) => {
  if (_.isEmpty(labelName)) return null;
  return (
    <>
      <label
        htmlFor={labelFor}
        className={twMerge(
          `olabel text-sm text-gray-900 dark:text-gray-100 ${className} ${
            sectionConfig?.widgetnemgooReady?.labelPosition == "top"
              ? `ml-3 mb-3   ${className} `
              : `text-right self-center`
          }`
        )}
        style={{ ...styles }}
      >
        {labelName}
        <span className="text-red-400 pl-1">{isrequired == "1" && "*"}</span>
        {isHideSeperator ||
        isEmpty(labelName) ||
        sectionConfig?.widgetnemgooReady?.labelPosition == "top"
          ? ""
          : ":"}
      </label>
    </>
  );
};

export default Atom_label;
