import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import useSWR from "swr";
import { jsonParse } from "@/util/helper";
import usePrepareStandard from "./usePrepareStandard";
import { decode } from "html-entities";
import toBoolean from "@/lib/booleanFunction";
import {
  convertPathTypeToFieldType,
  prepareQueryString,
} from "@/util/widgetHelper";

const useWidgetConfigSWR = ({
  metadataid,
  metadatacode,
  widgetnemgooReady,
}: {
  metadataid?: string;
  metadatacode?: string;
  widgetnemgooReady?: any;
}) => {
  const cloudContext = useCloud();
  const { standard } = usePrepareStandard();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;

  const myParams = {
    command: "GET_BP_INFO_REACT",
    parameter: JSON.stringify({ filtermetadatacode: metadatacode }),
    moreRequest: "",
    standard: JSON.stringify(standard),
    debug: "0",
    customProps: "",
    metaNameV2: metaNameV2,
  };

  const { data, error, mutate } = useSWR(
    `/api/get-process?${prepareQueryString(myParams)}`
  );

  let dataReady = data;
  if (data) {
    dataReady = {
      ...data,
      themeConfig: {},
      gridJsonConfig: jsonParse(
        data?.meta_group_grid_options_mobile?.jsonconfig,
        true
      ),
      pathConfig: _.values(data?.meta_group_config_mobile),

      fieldListRaw: _.chain(data?.result?.meta_process_param_attr_link_mobile)
        .values()
        .filter((item) => item?.isshow === "1")
        .sortBy((item) => Number(item?.ordernumber))
        .value(),

      readyFieldList: _.chain(data?.result?.meta_process_param_attr_link_mobile)
        .values()
        .filter((item) => item?.isshow === "1")
        .sortBy((item) => Number(item?.ordernumber))
        .map((item) => {
          const myItem: any = _.pick(item, [
            "id",
            "datatype",
            "labelname",
            "paramrealpath",
          ]);
          myItem.fieldNemgooReady = jsonParse(decode(item?.jsonconfig));
          myItem.fieldTypeReady = convertPathTypeToFieldType(item?.datatype);
          myItem.isrequired = toBoolean(item?.isrequired);

          if (!_.isEmpty(item?.lookuptype)) {
            myItem.lookup = {
              // lookupkeymetadataid: item?.lookupkeymetadataid,
              lookupmetadataid: item?.lookupmetadataid,
              lookupmetadatacode: item?.lookupmetadatacode,
              lookupmetadataname: item?.lookupmetadataname,
              lookuptype: convertPathTypeToFieldType(item?.lookuptype),
              displayfield: item?.displayfield,
              valuefield: item?.valuefield,
              choosetype: item?.choosetype,
            };
          }

          return myItem;
        })
        .value(),
    };
  }

  return [dataReady, error, mutate];
};

export default useWidgetConfigSWR;
