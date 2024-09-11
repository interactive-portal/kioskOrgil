import { useCloud } from "hooks/use-cloud";
import { prepareQueryCriteriaV2 } from "@/components/common/engineBox/util/urlHelper";
import _ from "lodash";
import { toBoolean } from "@/util/helper";
import { replaceTemplateV2 } from "./widgetHelper";

/* ------------------------------------------------------ */
/*                        CRITERIA                        */
/* ------------------------------------------------------ */
export function prepareCriteriaWidget(criteriaNemgoo, metadataid) {
  const cloudContext = useCloud();

  /* ------------------- criteria бэлдэх ------------------ */
  //URL-аас ирж байгаа бүх query-г авах эсэх. ignoreUrlQuery гээгүй бол авахаар хийгдсэн байгаа.
  const urlQueryAll = !toBoolean(criteriaNemgoo?.ignoreUrlQuery || false)
    ? cloudContext.cloudURL.query
    : {};

  //fromurl гэсэн тохиргооны дагуу авах query. ERP-аас ирнэ.
  const fromUrlQuery = criteriaNemgoo?.fromurl || {};

  //ERP-аас цаанаас өгсөн Query-үүд
  const defaultQuery = criteriaNemgoo?.defaultQuery || {};

  //* сүүлд нэмэгдсэн departmentId хэрвээ page-ийн тохиргоо дотор ирсэн байвал бүх meta Dataview-д тэрийг шууд хүчээр нэмнэ.
  //* filterDepartmentId: "{departmentId}" гэсэн байдалтай байх ёстой.
  const defaultDepartmentId = {
    filterDepartmentId: _.isEmpty(cloudContext?.thisPageConfig?.departmentid)
      ? undefined
      : cloudContext?.thisPageConfig?.departmentid,
  };

  const queryReady = replaceTemplateV2(
    {
      ...defaultQuery,
      ...urlQueryAll,
      ...fromUrlQuery,
      ...defaultDepartmentId,
    },
    cloudContext.cloudURL.query
    // { transformTo: "" }
  );

  const myDebug = prepareDebug(metadataid);

  return JSON.stringify(prepareQueryCriteriaV2(queryReady, myDebug));
}

export function prepareCriteriaProcess(criteria) {
  const cloudContext = useCloud();
  // /* ------------------- criteria бэлдэх ------------------ */

  let queryFromUrl = {};
  if (!toBoolean(criteria?.ignoreUrlQuery || false)) {
    // rawCriteria = prepareRawUrlQueryToCriteria(router.query);
    queryFromUrl = { ...cloudContext.cloudURL.query };
  }

  if (criteria?.fromurl) {
    queryFromUrl = {
      ...queryFromUrl,
      ...replaceTemplateV2(
        criteria?.fromurl || {},
        cloudContext.cloudURL.query
      ),
    };
  }

  let myCriteria = JSON.stringify(
    replaceTemplateV2(
      {
        ...(criteria?.defaultQuery || {}),
        ...queryFromUrl,
      },
      cloudContext.cloudURL.query
    )
  );

  return myCriteria;
}

/* ------------------------------------------------------ */
/*                         PAGING                         */
/* ------------------------------------------------------ */
export function preparePaging(criteria) {
  const cloudContext = useCloud();

  const offset = replaceTemplateV2(criteria?.paging?.offset, {
    offset: cloudContext.cloudURL?.listOption?.paging?.offset,
  });

  const pageSize = replaceTemplateV2(criteria?.paging?.pagesize, {
    pagesize: cloudContext.cloudURL?.listOption?.paging?.pagesize,
  });

  const sortColumnNames = replaceTemplateV2(criteria?.paging?.sortcolumnnames, {
    pagesize: cloudContext.cloudURL?.listOption?.sorting?.sortcolumnnames,
  });

  const sortType = replaceTemplateV2(criteria?.paging?.sorttype, {
    pagesize: cloudContext.cloudURL?.listOption?.sorting?.sorttype,
  });

  return JSON.stringify({
    offset: offset,
    pageSize: pageSize,
    sortColumnNames: {
      [sortColumnNames]: {
        sortType,
      },
    },
  });
}

export function preparePagingInfinite(criteria) {
  const cloudContext = useCloud();

  const offset = replaceTemplateV2(criteria?.paging?.offset, {
    offset: cloudContext.cloudURL?.listOption?.paging?.offset,
  });

  const pageSize = replaceTemplateV2(criteria?.paging?.pagesize, {
    pagesize: cloudContext.cloudURL?.listOption?.paging?.pagesize,
  });

  const sortColumnNames = replaceTemplateV2(criteria?.paging?.sortcolumnnames, {
    pagesize: cloudContext.cloudURL?.listOption?.sorting?.sortcolumnnames,
  });

  const sortType = replaceTemplateV2(criteria?.paging?.sorttype, {
    pagesize: cloudContext.cloudURL?.listOption?.sorting?.sorttype,
  });

  return {
    offset: offset,
    pageSize: pageSize,
    sortColumnNames: {
      [sortColumnNames]: {
        sortType,
      },
    },
  };
}

/* ------------------------------------------------------ */
/*                          DEBUG                         */
/* ------------------------------------------------------ */
export function prepareDebug(metadataid) {
  // const debugList = ["1646967234234909"];
  const debugList = ["16626898528219"];
  return _.includes(debugList, metadataid);
}

export function prepareParametersV2(parameters) {
  if (_.isEmpty(parameters)) return {};

  // console.log("XXXXXXX parameters", parameters);

  const cloudContext = useCloud();

  // console.log("XSDSDSDSD", cloudContext.cloudURL?.listOption?.sorting);

  const tempSorting = {
    [cloudContext.cloudURL?.listOption?.sorting?.sortcolumnnames]: {
      sortType: cloudContext.cloudURL?.listOption?.sorting?.sorttype,
    },
  };
  // console.log("🚀 ~ prepareParametersV2 ~ tempSorting:", tempSorting);

  const myPaging = {
    offset: replaceTemplateV2(parameters?.paging?.offset, {
      offset: cloudContext.cloudURL?.listOption?.paging?.offset,
    }),

    pageSize: replaceTemplateV2(parameters?.paging?.pagesize, {
      pagesize: cloudContext.cloudURL?.listOption?.paging?.pagesize,
    }),
    sortColumnNames: {
      ...(parameters?.paging?.sortColumnNames || tempSorting),
    },
  };

  const defaultDepartmentId = {
    filterDepartmentId: _.isEmpty(cloudContext?.thisPageConfig?.departmentid)
      ? undefined
      : cloudContext?.thisPageConfig?.departmentid,
  };

  const myCriteria = replaceTemplateV2(
    { ...defaultDepartmentId, ...parameters?.criteria },
    cloudContext.cloudURL.query
    // { transformTo: "" }
  );

  // return JSON.stringify(prepareQueryCriteriaV2(queryReady, myDebug));

  // -------------

  return { paging: myPaging, criteria: myCriteria };
}

export const removeEmptyOperand = (criteria) => {
  const updatedCriteria = _.omitBy(criteria, (items) => {
    return _.isEmpty(items[0].operand);
  });

  return updatedCriteria;
};

export const prepareCriteriaMultiValue = (criteria) => {
  if (_.isEmpty(criteria)) return null;

  // console.log("SSSSSSSSSSSSS criteria ", criteria);

  // Iterate over the keys in criteria object
  Object.keys(criteria).forEach((key) => {
    const operand = criteria[key][0].operand;
    if (_.startsWith(operand, "[") && _.endsWith(operand, "]")) {
      // Extract array elements and convert them to objects
      const values = operand
        .slice(1, -1) // Remove '[' at the start and ']' at the end
        .split(",") // Split the string by comma
        .map((item) => item.trim()) // Trim spaces around values
        .map((item) => ({
          operator: "=",
          operand: item,
        })); // Convert each item to an object with operator and operand properties
      // Replace the original operand value with the array of objects
      criteria[key] = values;
    }
  });

  return criteria;
};
