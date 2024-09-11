import _ from "lodash";
import pupa from "pupa";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export function getColorTailwind(value: string) {
  return _.startsWith(value, "#") ? `[${value}]` : value;
}

export function toBoolean(x: any) {
  try {
    return !!JSON.parse(`${x}`.toLowerCase());
  } catch (e) {
    return !!x;
  }
}

export function twMergeUtil(config: any, ...args: any) {
  const result = useMemo(() => {
    const cooler = replaceTemplateV2(args.join(" "), config);
    return twMerge(cooler);
  }, [config, args]);

  return result;
}

export function replaceTemplateV2(
  originalObject = {},
  dataObject = {},
  option: any = {}
) {
  const optionReady = {
    transformTo: undefined, //undefined, //"", //null, undefined
    ...option,
    ignoreMissing: true, //Энийг хөдөлгөж болохгүй. Алдаа өгдөг болчихно.
  };

  const originalObjectReady = JSON.stringify(originalObject);
  const result = pupa(originalObjectReady, dataObject, {
    ignoreMissing: optionReady?.ignoreMissing,
    transform: (data) => {
      return data?.value || option?.transformTo;
    },
  });

  return JSON.parse(result);
}
