import _ from "lodash";
import { getDefaultValue } from "./helper";
// import { getDefaultValue } from "util/helper";

export const processTransform = async (params: any, userInfo: any) => {
  // console.log("new data", userInfo);
  // console.log("new params", params);
  try {
    let attrArr = _.values(params.meta_process_param_attr_link_mobile);
    let i = 0,
      // paramsAttr = _.orderBy(attrArr, ["ordernumber"]),
      paramsAttr = _.sortBy(attrArr, [
        function (o) {
          return Number(o.ordernumber);
        },
      ]),
      paramsLength = paramsAttr.length,
      header = [],
      __lookupParamConfig = {},
      __groupPath = {},
      details = [];

    params["meta_process_param_attr_link_mobile"] = paramsAttr;
    // console.log("meta_process_param_attr_link_mobile", paramsAttr);

    __groupPath = _.groupBy(paramsAttr, function (n) {
      return n.paramrealpath.toLowerCase();
    });

    let __dataElement: any = {};

    for (i; i < paramsLength; i++) {
      if (paramsAttr[i]["paramrealpath"].indexOf(".") < 0) {
        paramsAttr[i]["paramrealpath"] =
          paramsAttr[i]["paramrealpath"].toLowerCase();
        header.push(paramsAttr[i]);

        if (paramsAttr[i]["datatype"] == "group") {
          if (paramsAttr[i]["recordtype"] == "row") {
            __dataElement[paramsAttr[i]["paramrealpath"]] = {};
          } else {
            // console.log("meta_process_param_attr_link_mobile", paramsAttr);
            __dataElement[paramsAttr[i]["paramrealpath"]] = [];
          }
          if (paramsAttr[i]["recordtype"] == "row") {
            for (let ii = 0; ii < paramsLength; ii++) {
              if (
                paramsAttr[ii]["paramrealpath"].indexOf(
                  paramsAttr[i]["paramrealpath"]
                ) !== -1 &&
                paramsAttr[ii]["paramrealpath"].indexOf(".") !== -1
              ) {
                __dataElement[paramsAttr[i]["paramrealpath"]][
                  paramsAttr[ii]["paramname"]
                ] = getDefaultValue(
                  paramsAttr[ii]["defaultvalue"],
                  userInfo || ""
                );
              }
            }
          }
        } else {
          __dataElement[paramsAttr[i]["paramrealpath"].toLowerCase()] =
            getDefaultValue(paramsAttr[i]["defaultvalue"], userInfo || "");
        }
      } else {
        paramsAttr[i]["paramrealpath"] =
          paramsAttr[i]["paramrealpath"].toLowerCase();
        details.push(paramsAttr[i]);
      }
    }

    if (params.lookupparamconfig) {
      __lookupParamConfig = _.groupBy(
        _.values(params.lookupparamconfig),
        function (n) {
          return n.parampath.toLowerCase();
        }
      );
    }

    return {
      ...params,
      header,
      details,
      __dataElement,
      __lookupParamConfig,
      __groupPath,
    };
  } catch (err) {
    console.log("Aldaa: ", err);
  }
};
