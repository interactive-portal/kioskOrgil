import _ from "lodash";
import { Controller } from "react-hook-form";

import { twMerge } from "tailwind-merge";
import { useCloudEngine } from "@/components/common/engineBox/hooks/useCloudEngine";
import { twMergeUtil } from "@/components/common/engineBox/util/atomHelper";

const AtomFormCheckButtonV2 = ({
  fieldName,
  defaultValue,
  hookForm,
  title,
  active = { className: "", style: {} },
  normal = { className: "", style: {} },
  className,
  style,
}: {
  fieldName: string;
  defaultValue?: any;
  hookForm: any;
  title?: string;
  active?: any;
  normal?: any;
  className?: string;
  style?: any;
}) => {
  if (_.isEmpty(hookForm?.control)) return null;
  const cloudContext = useCloudEngine();
  const globalThemeNemgoo = cloudContext?.masterPageNemgooConfig?.theme;

  const myActive = {
    className: twMergeUtil(
      globalThemeNemgoo,
      `bg-{colorPrimary} text-white ${active.className || ""}`
    ),
    style: active?.style,
  };

  const myNormal = {
    className: twMerge(
      `border border-gray-300 hover:border-gray-300/[.6] ${
        normal?.className || ""
      }`
    ),
    style: normal?.style,
  };

  return (
    <Controller
      control={hookForm?.control}
      name={fieldName}
      render={({ field }) => {
        const myValue = defaultValue;
        const isActive = field.value === myValue;
        return (
          <button
            className={`w-full rounded-lg cursor-pointer h-[43px] ${className} ${
              isActive ? myActive?.className : myNormal?.className
            }`}
            style={style}
            onClick={() => {
              field.onChange(myValue);
            }}
          >
            {title}
          </button>
        );
      }}
    />
  );
};

export default AtomFormCheckButtonV2;
