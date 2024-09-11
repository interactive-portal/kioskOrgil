import _ from "lodash";
import dayjs from "@/util/dayjslocale";
import { replaceTemplateV2 } from "@/util/widgetHelper";

export function prepareApiStandard(object, standard) {
  const readyStandard = {
    STANDARD_TODAY: dayjs().format("YYYY-MM-DD"), // "2021-10-01",
    STANDARD_YESTERDAY: dayjs().subtract(1, "day").format("YYYY-MM-DD"), // "2021-10-01",
    STANDARD_NOW: dayjs().format("YYYY-MM-DD HH:mm:ss"), // "2021-10-01 15:45:49",
    STANDARD_CUSTOMERID: standard?.customerid || "",
    STANDARD_CRMUSERID: standard?.crmuserid || "",
    STANDARD_CUSTUSERID: standard?.custuserid || "",
    STANDARD_CUSTOMERDEPARTMENID: standard?.departmentid || "",
    STANDARD_CUSTOMERCOMPANYDEPARTMENID: standard?.companydepartmentid || "",
    STANDARD_PAGEDEPARTMENID: standard?.pagedepartmentid || "",
    // URLQUERY_id: standard?.urlqueryid || "",
    // URLQUERY_filtercategoryid: standard?.urlqueryfiltercategoryid || "",
  };

  // urlqueryfiltercategoryid → URLQUERY_filtercategoryid
  _.keys(standard).map((item) => {
    // if (_.startsWith(item, "urlquery")) {
    //   console.log(
    //     "prepareApiStandard",
    //     item,
    //     "URLQUERY_" + _.trimStart(item, "urlquery"),
    //     standard?.[item]
    //   );
    // }

    readyStandard["URLQUERY_" + _.trimStart(item, "urlquery")] =
      standard?.[item];
  });

  const response = replaceTemplateV2(
    object,
    readyStandard,
    { transformTo: "" } //Эцсийн энэ шатанд байхгүй {customfilterid} гэх мэтийг null утгаар дүүргэж өгнө.
  );

  return response;
}

// {STANDARD_TODAY}
// {STANDARD_YESTERDAY}
// {STANDARD_DEPARTMENID}
// {STANDARD_CUSTOMERID}
// гэх мэт
