import _ from "lodash";

export default function prepareUrlInternal(
  router,
  urlObject,
  hostObject,
  keepQuery
) {
  // console.log("hahaha🚀 ~ hostObject:", hostObject);
  // console.log("hahaha🚀 ~ urlObject:", urlObject);

  const { path = "", pathname, query = {} } = urlObject;

  let myPath = "";
  let mPath = path ? path : pathname;
  let myQuery = keepQuery
    ? _.omit(
        router?.query,
        "detect" // энэ нөхөр router.query дотор явдгийг устгах хэрэгтэй.
      )
    : {};

  const domainType = hostObject?.domainType;

  //Энэ кодыг цаашдаа сайжруулах ёстой.
  if (_.isEmpty(mPath)) {
    switch (domainType) {
      case "DEFAULT":
        myPath = "/" + hostObject?.pageSlug || "";
        break;
      case "SUB":
        myPath = "/" + hostObject?.pageSlug || "";
        break;
      case "LOCAL":
        myPath =
          "/" + hostObject?.pageDomain + "/" + hostObject?.pageSlug || "";
        break;
      default:
        break;
    }

    myQuery = { ...myQuery, ...query }; //ERP-аас ирсэн query-тэйгээ нэгтгэж бэлдэнэ.
  } else {
    if (path.startsWith("/")) {
      switch (domainType) {
        case "DEFAULT":
          myPath = mPath;
          break;
        case "SUB":
          myPath = "/" + mPath;
          break;
        case "LOCAL":
          myPath = "/" + hostObject?.pageDomain + mPath;
          break;
        default:
          break;
      }

      // myQuery = { ...query }; //Query-г хоосолно. Шинэ цэс рүү үсэрч байна.
      myQuery = { ...myQuery, ...query }; //ERP-аас ирсэн query-тэйгээ нэгтгэж бэлдэнэ.
    } else {
      //Энд сүүлийн slug-ийг өөрчилдөг код оруулна.

      // myQuery = { ...query }; //Query-г хоосолно. Шинэ цэс рүү үсэрч байна.
      myQuery = { ...myQuery, ...query }; //ERP-аас ирсэн query-тэйгээ нэгтгэж бэлдэнэ.
    }
  }

  // console.log("hostObject", hostObject);
  // console.log("myQuery :>> ", myQuery);
  // console.log("router :>> ", router);

  const queryReady = _.pickBy(myQuery, _.identity); //undefined гэсэн утга байвал устгана.

  return {
    pathname: mPath,
    query: queryReady,
    // query: new URLSearchParams(queryReady).toString(),
  };
}

/* ------------------------------------------------------ */
/*                // FROM LIB/URLFUNCTIONS                */
/* ------------------------------------------------------ */

/* ------------------------------------------------------ */
/*                      PREPAREQUERY                      */
/* ------------------------------------------------------ */
export const prepareQuery = (query) => {
  // let  myQuery = { ...query };
  let myQuery = { ..._.omit(query, ["detect"]) }; //detect гэсэн буруу parameter орж ирээд metaData-г ERP-аас алдаа буцааж байна.
  delete myQuery.pagesize;
  delete myQuery.offset;
  delete myQuery.sortcolumnnames;
  delete myQuery.sorttype;
  delete myQuery.viewtype;

  return myQuery;
};

/* ------------------------------------------------------ */
/*                      PREPAREPAGING                     */
/* ------------------------------------------------------ */
export const preparePaging = (query, listShortConfig) => {
  return {
    pagesize:
      query?.pagesize || listShortConfig?.listOption?.paging?.pagesize || "16",
    offset: query?.offset || listShortConfig?.listOption?.paging?.offset || "1",
  };
};

export const prepareSorting = (query, listShortConfig) => {
  // sortcolumnnames=createddate
  // sorttype=desc

  return {
    sortcolumnnames:
      query?.sortcolumnnames ||
      listShortConfig?.listOption?.paging?.sortcolumnnames ||
      "createddate",
    sorttype:
      query?.sorttype ||
      listShortConfig?.listOption?.paging?.sorttype ||
      "desc",
  };
};

/* ------------------------------------------------------ */
/*                     PREPAREVIEWTYPE                    */
/* ------------------------------------------------------ */
export const prepareViewtype = (query, listShortConfig) => {
  return {
    viewtype:
      query?.viewtype || listShortConfig?.listOption?.viewtype?.viewtype || "2",
    mainimagedisplay:
      listShortConfig?.listOption?.viewtype?.mainimagedisplay || "contain",
  };
};

/* ------------------------------------------------------ */
/*              PREPARERAWURLQUERYTOCRITERIA              */
/* ------------------------------------------------------ */
export const prepareRawUrlQueryToCriteria = (query, debug) => {
  // console.log("query", query);

  let myQuery = {};
  let productCriteriaOperand = "1=1";
  Object.keys(query).map((item, index) => {
    const key = item;
    const value = query[item];

    switch (true) {
      case key === "title":
        //%like% гэсэн форматаар хайх ёстой.
        break;
      case key.charAt(0) === "*":
        //*-оор эхэлсэн тусгай талбар гэсэн үг
        const encodedValue = JSON.parse(atob(value || "") || "{}");
        // myQuery = { [key.substring(1)]: encodedValue, ...myQuery };

        if (productCriteriaOperand === "0=0") {
          productCriteriaOperand = `ii.item_id in (select book_id from kpi where(kpi.indicator_id=${encodedValue.indicatorId} and (Kpi.value = to_char(${encodedValue.value})  )))`;
        } else {
          productCriteriaOperand += `and ii.item_id in (select book_id from kpi where(kpi.indicator_id=${encodedValue.indicatorId} and (Kpi.value = to_char(${encodedValue.value})  )))`;
        }
        break;
      default:
        myQuery = { [key]: value, ...myQuery };
        break;
    }
  });

  // console.log("myQuery", myQuery);
  const myProductCriteria = [
    {
      operator: "!=",
      operand: productCriteriaOperand,
      // operand: "0=0",
      // operand:
      // "ii.item_id in (select book_id from kpi where(kpi.indicator_id=16102833423851 and (Kpi.value = to_char(16102833423931)  ))) and ii.item_id in (select book_id from kpi where(kpi.indicator_id=16102833255371 and (Kpi.value = to_char(16102833255421)  )))",
    },
  ];
  // console.log("myProductCriteria", myProductCriteria);

  const tempRawCriteria =
    {
      criteria: myProductCriteria,
      ...myQuery,
    } || {};

  if (debug) {
    console.log("tempRawCriteria", tempRawCriteria);
  }

  return `&criteria=${JSON.stringify(tempRawCriteria)}`;
};

/* ------------------------------------------------------ */
/*                 PREPAREQUERYCRITERIAV2                 */
/* ------------------------------------------------------ */
export const prepareQueryCriteriaV2 = (queryReady, debug) => {
  let myCriteria = {};
  //"II.ITEM_ID IN ( SELECT SRC_RECORD_ID AS ITEM_ID FROM DB_IM_ITEM_KPI_MART WHERE C10000011 IN (164688572710110) AND C10000012 IN (164688580244810))" - Энийг гаргаж авах ёстой.
  let cozyProductCriteriaList = []; //C10000011 IN (164688572710110) AND C10000012 IN (164688580244810) - Энийг гаргаж авна.

  // queryReady гэдэг нь
  // filtercategoryid: "164647289005310";
  // silent: "true";
  // Брэнд: "Haier";
  // dvcC10000011: "165031109925110";

  _.keys(queryReady).map((item, index) => {
    const value = queryReady[item];
    // item - filtercategoryid
    // value - "164647289005310"

    switch (true) {
      case item === "title":
        //%like% гэсэн форматаар хайх ёстой.
        break;

      //cozy Product Criteria
      case item.startsWith("dvc"):
        // dvcC10000011: "165031109925110";
        const field = item.substring(3); //C10000011: "165031109925110";
        cozyProductCriteriaList.push(`${field} IN (${value})`);
        break;

      case ["silent", "debug", "Брэнд"].includes(item): //ignore these fields
        break;

      default:
        myCriteria[item] = [
          {
            operator: "=",
            operand: value,
          },
        ];
        break;
    }
  });

  if (debug) {
    // console.log("Last Ready myQuery", myCriteria);
    // console.log("cozyProductCriteriaList", cozyProductCriteriaList);
  }

  //cozy Product Criteria
  const subCriteriaWhereString = _.join(cozyProductCriteriaList, " AND ");
  const criteriaCriteriaField = {
    criteria: [
      {
        operator: "=",
        operand: _.isEmpty(cozyProductCriteriaList)
          ? "1=1"
          : `II.ITEM_ID IN ( SELECT SRC_RECORD_ID AS ITEM_ID FROM DB_IM_ITEM_KPI_MART WHERE ${subCriteriaWhereString})`,
      },
    ],
  };

  const tempRawCriteria = {
    ...myCriteria,
    ...criteriaCriteriaField,
  };

  if (debug) {
    // console.log("tempRawCriteria", tempRawCriteria);
  }

  return tempRawCriteria;
};
