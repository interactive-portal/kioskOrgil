import { useMemo } from "react";
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { jsonParse, toBoolean } from "./helper";
import pupa from "pupa";
import dayjs from "@/util/dayjslocale";
import { formatMoney } from "accounting";

// /devcloud/16342674214531?id={itemid}?{profilephoto}
// Inputs = {
// dffd:"dfsdfds"
// itemid: "48484848"
// profilephoto: "dfdfdfdf/sfesrewr.png"
// }

// /devcloud/16342674214531?id=48484848?dfdfdfdf/sfesrewr.png

export function preparePositionAllArray(list, positionConfig) {
  const result = _.map(list, (item) => {
    const myItem = _.isArray(item)
      ? preparePositionAllArray(item, positionConfig)
      : item;

    return preparePositions(myItem, positionConfig);
  });

  return result;
}

//readyDatasrc бэлтгэх функц
//datasrc дээр position-уудыг нь шууд нэмж өгье.
export function preparePositions(item, positionConfig) {
  let standardPositionMap = [
    { 0: "id" },
    { 1: "title" },
    { 2: "mainimage" },
    { 3: "description" },
    { 4: "mainnumber" },
    { 5: "createddate" },
    { 6: "modifieddate" },
    { 7: "isfeatured" },
    { 8: "isactive" },
    { 9: "more" },
    { 10: "button" },
    { 11: "code" },
    { 20: "parentid" },
    { 21: "metaid" },
    { 22: "body" },
    { 23: "price2" },
    { 24: "imagelist" },
    { 25: "block1classname" },
    { 26: "block1style" },
    { 27: "block2classname" },
    { 28: "block3style" },
    { 29: "slug" },
    { 30: "clob" },
    { 31: "speclist" },
    { 32: "speclist2" },
    { 33: "columnnamelist" },
    { 34: "rating" },
    { 35: "ordernumber" },
    { 40: "subtitle" },
    { 41: "category" },
    { 42: "taglist" },
    { 43: "owner" },
    { 44: "owner2" },
    { 45: "link" },
    { 46: "link2" },
    { 47: "subnumber" },
    { 48: "tooltip" },
    { 49: "icon" },
    { 50: "icon2" },
    { 51: "status" },
    { 52: "wallpaper" },
    { 53: "groupname" },
    { 54: "placeholder" },
    { 55: "companyname" },
    { 56: "brandname" },
    { 57: "thumblarge" },
    { 58: "thumbmedium" },
    { 59: "thumbsmall" },
    { 70: "onclick" },
    { 71: "onchange" },
    { 72: "onhover" },
    { 80: "countList" },
    { 81: "commentcount" },
    { 82: "likeCount" },
    { 83: "count" },
    { 85: "modal" },
    { 86: "issolved" },
    { 87: "createdusername" },
  ];

  //дээдэхийг доодох шиг объект болгох ёстой.
  // {
  //   position0: {
  //     positionname: "position0",
  //     fieldpath: "id",
  //   },
  //   position1: {
  //     positionname: "position1",
  //     fieldpath: "title",
  //   },
  //   position2: {
  //     positionname: "position2",
  //     fieldpath: "mainimage",
  //   },
  //   position3: {
  //     positionname: "position3",
  //     fieldpath: "description",
  //   },
  //   position4: {
  //     positionname: "position4",
  //     fieldpath: "mainnumber",
  //   },
  // };

  let standardWidgetPositionMap = {};
  _.keys(standardPositionMap).map((key, index) => {
    const object = standardPositionMap[index];
    const myKey = _.keys(object)[0];
    const myValue = object[myKey];

    standardWidgetPositionMap = {
      ...standardWidgetPositionMap,
      [`position${myKey}`]: {
        positionname: `position${myKey}`,
        fieldpath: myValue,
      },
    };
  });

  const myPositionConfig = {
    ...standardWidgetPositionMap, //стандарт байрлалуудыг нэмж өгөв.
    ...positionConfig, //widgetNemgoo-оос ирсэн position-ууд
  };
  // console.log("🚀 ~ preparePositions ~ myPositionConfig", myPositionConfig);

  let newItem = { ...item };
  _.values(myPositionConfig).map((itemPosition, index) => {
    // if (item[_.toLower(itemPosition.fieldpath)] !== undefined) {
    if (item[itemPosition.fieldpath] !== undefined) {
      //цаанаас true, false гэсэн утга бас ирдэг. Иймээс оршин байгаа эсэхийг л шалгана.
      const positionnemgooReady = replaceTemplateV2(
        itemPosition.positionnemgooReady,
        item
      );

      newItem[itemPosition.positionname] = {
        // value: item[_.toLower(itemPosition.fieldpath)],
        // classname: item[_.toLower(`${itemPosition.fieldpath}-classname`)],
        value: item[itemPosition.fieldpath],
        classname: item[`${itemPosition.fieldpath}-classname`],
        positionnemgoo: positionnemgooReady,
        positionnemgooReady: positionnemgooReady,
        rawConfig: {
          ...itemPosition,
        },
        pathname: itemPosition.fieldpath,
      };
    }
  });
  // console.log("🚀 ~ preparePositions ~ newItem", newItem);

  // if (item.title === "Тансаг") {
  //   console.log("myPositionConfig", myPositionConfig);
  //   console.log("item", item);
  // }

  //filter-д ирдэг утгууд нь filternemgoo-той байдаг. cozyFilterList_c009 гэсэн процесст ирдэг утгууд юм. Cozy-ийн Filter-т ашиглав.
  if (newItem?.filternemgoo) {
    newItem.filternemgooReady = jsonParse(newItem.filternemgoo);
  }

  //filter-ийн value-д ирдэг утгууд нь valuernemgoo-той байдаг. cozyFilterList_c009 гэсэн процесст ирдэг утгууд юм. Cozy-ийн Filter-т ашиглав.
  if (newItem?.valuenemgoo) {
    newItem.valuenemgoorReady = jsonParse(newItem.valuenemgoo);
  }

  //value_rows дотор байгаа зүйлсийг Array болгоод ordernumber-аар sort-лов.
  if (newItem?.value_rows) {
    newItem.rowsReady = _.orderBy(
      _.values(newItem?.value_rows),
      "ordernumber"
    ).map((item, index) => {
      return preparePositions(item);
    });
  }

  return newItem;
}

// widget debug функц
export function runWidgetDebug(widgetnemgooReady, config, readyDatasrc) {
  if (widgetnemgooReady?.debug) {
    const myConsole = widgetnemgooReady.debug?.console || {};

    if (
      !toBoolean(myConsole?.data) &&
      !toBoolean(myConsole?.config) &&
      !toBoolean(myConsole?.nemgoo)
    )
      return null;

    const consoleCssHeader = "font-weight: bold";
    const consoleCssData = "background: #093145; color: #ffffff";
    const consoleCssConfig = "background: #107896; color: #f5f5f5";
    const consoleCssNemgoo = "background: #829356; color: #ffffff";

    // console.log("debug myConsole", myConsole);
    const consoleHeader = _.filter([
      config.id,
      config.widgetcode,
      config.metadatacode,
    ]).join(" | ");

    // console.log(
    //   `\n Debug ======  %c ${consoleHeader}  ==============`,
    //   consoleCssHeader
    // );

    console.log(
      `\n\n Debug ======  %c ${consoleHeader}  ==============`,
      consoleCssHeader
    );

    if (toBoolean(myConsole?.data)) {
      console.log(`%c DATA   `, consoleCssData, readyDatasrc);
    }
    if (toBoolean(myConsole?.config)) {
      console.log(`%c CONFIG `, consoleCssConfig, config);
    }
    if (toBoolean(myConsole?.nemgoo)) {
      console.log(`%c NEMGOO `, consoleCssNemgoo, widgetnemgooReady);
    }

    console.log("\n");
  }
  return null;
}
export function prepareWidgetDefaultClasses(
  widgetnemgooReady,
  widgetAllaround
) {
  const divouterblockClassName = `${
    toBoolean(widgetnemgooReady?.isDefaultTheme)
      ? widgetAllaround?.divouterblock?.className
        ? widgetAllaround?.divouterblock?.className
        : "w-full h-full overflow-hidden rounded-md"
      : ""
  } ${
    widgetnemgooReady?.design?.className || widgetnemgooReady?.className || ""
  }`;

  const divouterblockStyle = {
    ...(widgetnemgooReady?.design?.style || widgetnemgooReady?.style),
    ...widgetAllaround?.divouterblock?.style,
  };

  const divinsideblockClassName = `${
    toBoolean(widgetnemgooReady?.isDefaultTheme)
      ? widgetAllaround?.divinsideblock?.className
        ? widgetAllaround?.divinsideblock?.className
        : "w-full h-full bg-white p-4 shadow-md overflow-hidden rounded-md"
      : ""
  }`;

  const divinsideblockStyle = {
    ...(widgetnemgooReady?.design?.style || widgetnemgooReady?.style),
    ...widgetAllaround?.divinsideblock?.style,
  };

  return {
    divouterblockClassName,
    divouterblockStyle,
    divinsideblockClassName,
    divinsideblockStyle,
  };
}

export function prepareDefaults(widgetnemgooReady, router) {
  const defaultNemgoo = widgetnemgooReady?.listConfig?.default;

  if (_.isEmpty(defaultNemgoo)) return null;

  // defaultNemgoo = {
  //   urlpath: "filtercategoryid",
  //   value: "1515",
  //   from: "", //url
  // }; маягийн объект байгаа.

  /* -------------- url-аас query-аа олж авна ------------- */
  const myQuery = _.omit(
    router.query,
    "detect" // энэ нөхөр router.query дотор явдгийг устгах хэрэгтэй.
  );

  const { urlpath = "", from = "", multi = "0" } = defaultNemgoo;

  const value =
    from !== "url"
      ? myQuery[urlpath] || defaultNemgoo?.value
      : _.last(_.split(router?.asPath, "/")); //одоогоор url-ийн сүүлийн path-ийг авчихъя. /profile/about гэж байвал сүүлийн about авна гэсэн үг.

  return {
    value,
    urlpath,
    from,
    multi: toBoolean(multi),
  };
}

export function prepareDefaultReady(widgetnemgooReady, router) {
  const defaultNemgoo = widgetnemgooReady?.listConfig?.default;
  if (_.isEmpty(defaultNemgoo)) return null;

  // defaultNemgoo = {
  //   urlpath: "price",
  //   value: "1515",
  // }; маягийн объект байгаа.

  /* -------------- url-аас query-аа олж авна ------------- */
  const myQuery = _.omit(
    router.query,
    "detect" // энэ нөхөр router.query дотор явдгийг устгах хэрэгтэй.
  );

  // const dsfsdf = {
  //   ["sale—low"]: "37",
  //   ["sale—high"]: "100",
  //   ["price—low"]: "100",
  //   ["price—high"]: "500050",
  // };

  //Одоо шалгах ажиллагаа явагдана.
  const myDefaultPathNemgoo = defaultNemgoo?.urlpath;

  let result = [];
  _.mapKeys(myQuery, (value, key) => {
    if (`${myDefaultPathNemgoo}—low` == key) {
      result.push({
        value: value,
        urlpath: defaultNemgoo?.urlpath,
        urlReady: `${myDefaultPathNemgoo}—low`,
        topath: defaultNemgoo?.topath,
      });
    }

    if (`${myDefaultPathNemgoo}—high` == key)
      result.push({
        value: value,
        urlpath: defaultNemgoo?.urlpath,
        urlReady: `${myDefaultPathNemgoo}—high`,
        topath: defaultNemgoo?.topath,
      });

    if (myDefaultPathNemgoo == key)
      result.push({
        value: value,
        urlpath: defaultNemgoo?.urlpath,
        urlReady: myDefaultPathNemgoo,
        topath: defaultNemgoo?.topath,
      });
  });

  return result;
}

export function prepareC009GetProcessData(processCode, rawData) {
  const c009 = processCode.slice(processCode.length - 4);

  if (c009 !== "c009") return rawData;
  if (_.isEmpty(rawData)) return rawData;

  // c009 гэдэг нь тусгай функц юм. Гэхдээ Dataview-тэй адил энгийн дата буцаах ёстой боловч өөр бүтэцтэй ирж абйгаа тул энд боловсруулж энгийн DV-тэй адил болгож байгаа юм.

  const readyData = _.values(rawData[0]?.c009);
  return readyData;
}

export function getSlugItem(hostObject, n = 0) {
  const slug = hostObject?.pageSlug;
  const slugItem = _.split(slug, "/");

  return slugItem[n] || "";
}

export function prepareDefaultValueForFilter(query, columnName) {
  const columnList = [
    `dvc${columnName}`,
    `dvc${columnName}~min`,
    `dvc${columnName}~max`,
  ];

  let defaultValues = {};

  _.forEach(columnList, (column) => {
    if (query[column]) {
      defaultValues[column] = query[column];
    }
  });

  return defaultValues;
}

export function twMergeUtil(config, ...args) {
  const result = useMemo(() => {
    const cooler = replaceTemplateV2(args.join(" "), config);
    return twMerge(cooler);
  }, [config, args]);

  return result;
}

export function replaceTemplateV2(
  originalObject = {},
  dataObject = {},
  option = {}
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

export function prepareQueryString(myParams) {
  //myParams гэсэн объектийг queryString болгож хувиргана.

  const filteredParams = _.pickBy(myParams, _.identity);
  const formattedParamsArray = _.map(
    filteredParams,
    (value, key) => `${key}=${value}`
  );
  const queryString = _.join(formattedParamsArray, "&");

  return queryString;
}

export function extractInternalProcess(processDVCode) {
  // insert _001
  // edit _002
  // get _004
  // delete _005

  const processCodeInsert = `${processDVCode}_001`;
  const processCodeEdit = `${processDVCode}_002`;
  const processCodeGet = `${processDVCode}_004`;
  const processCodeDelete = `${processDVCode}_005`;

  return {
    processCodeInsert,
    processCodeEdit,
    processCodeGet,
    processCodeDelete,
  };
}

export function convertPathTypeToFieldType(pathDataType) {
  const pathToFieldTypeMap = {
    string: "input", //input
    long: "inputnumber", //input password
    date: "date",
    boolean: "checkbox",
    combo: "select",
    button: "button",
    group: "list",
    file: "image",
    description_auto: "text",
    text_editor: "textEditor",
  };

  return pathToFieldTypeMap?.[pathDataType] || "text";
}

export function convertPathTypeToFieldTypeV2(pathDataType) {
  const pathToFieldTypeMap = {
    text: "input", //input
    // long: "inputnumber", //input password
    // date: "date",
    // boolean: "checkbox",
    combo: "select",
    popup: "select",
    radio: "radio",
    // button: "button",
    // group: "list",
    // file: "image",
    // description_auto: "text",
    text_editor: "editor",
  };

  return pathToFieldTypeMap?.[pathDataType] || "text";
}

export const convertKeysToLowercase = (arr) => {
  const convertedArr = _.map(arr, (obj) => {
    const convertedObj = _.mapKeys(obj, (value, key) => {
      return _.toLower(key);
    });
    return convertedObj;
  });

  return convertedArr;
};

export function parentidToChildrenV2(
  readyDatasrc,
  idField,
  parentIdField,
  parentId = null
) {
  console.log("🚀 ~ Killer readyDatasrc:", readyDatasrc);
  const filteredItems = _.filter(
    readyDatasrc,
    (item) => item[parentIdField] == parentId
  );
  console.log("Filtered Items:", filteredItems); // Log filteredItems for debugging

  return _.map(filteredItems, (item) => ({
    ...item,
    children: parentidToChildrenV2(
      readyDatasrc,
      idField,
      parentIdField,
      item[idField]
    ),
  }));
}

export const buildHierarchy = (data, fieldNames) => {
  const { uidField, labelField, parentUidField } = fieldNames;

  const map = new Map();
  const root = { [uidField]: "", [labelField]: "Root", children: [] };

  data.forEach((item) => {
    map.set(item[uidField], { ...item, children: [] });
  });

  data.forEach((item) => {
    if (item[parentUidField] === "") {
      root.children.push(map.get(item[uidField]));
    } else {
      const parent = map.get(item[parentUidField]);
      if (parent) {
        parent.children.push(map.get(item[uidField]));
      }
    }
  });

  return root;
};

export function convertToNestedStructure(flatArray, fieldNames) {
  const { uidField, labelField, parentUidField } = fieldNames;

  const buildHierarchy = (data) => {
    const map = new Map();
    const root = { [uidField]: "", [labelField]: "Root", children: [] };

    data.forEach((item) => {
      map.set(item[uidField], { ...item, children: [] });
    });

    data.forEach((item) => {
      if (item[parentUidField] === "") {
        root.children.push(map.get(item[uidField]));
      } else {
        const parent = map.get(item[parentUidField]);
        if (parent) {
          parent.children.push(map.get(item[uidField]));
        }
      }
    });

    return root;
  };

  return buildHierarchy(flatArray);
}

export const convertToNestedStructure123 = (flatArray) => {
  const nestedStructure = {};

  const getChildren = (parentId) =>
    _.filter(flatArray, { parentUid: parentId });

  const buildTree = (parentId) => {
    const children = getChildren(parentId);
    if (_.isEmpty(children)) {
      return null;
    }

    const tree = children.map((item) => {
      return {
        ...item,
        children: buildTree(item.uid),
      };
    });

    return tree;
  };

  // Assuming the top-level parent has an empty string parentUid
  nestedStructure.children = buildTree("");

  return nestedStructure;
};

export function convertToNested55(arr, parentUid = "") {
  const result = [];
  arr.forEach((item) => {
    if (item.parentUid == parentUid) {
      const newItem = { ...item, children: convertToNested55(arr, item.uid) };
      result.push(newItem);
    }
  });
  return result;
}

export function buildNestedStructure55(
  children,
  uidField = "uid",
  parentUidField = "parentUid",
  parentUidValue = ""
) {
  const nestedChildren = children
    .filter((item) =>
      parentUidValue === ""
        ? !item[parentUidField]
        : item[parentUidField] === parentUidValue
    )
    .map((item) => ({
      ...item,
      children: buildNestedStructure55(
        children,
        uidField,
        parentUidField,
        item[uidField]
      ),
    }));

  return nestedChildren;
}

export function setNodeOpenStatus(data, targetUid, uidFieldName) {
  function findNodeAndSetOpenStatus(node, targetUid, uidFieldName) {
    if (node[uidFieldName] === targetUid) {
      node.isOpen = true;
      return true;
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const found = findNodeAndSetOpenStatus(child, targetUid, uidFieldName);
        if (found) {
          node.isOpen = true;
          return true;
        } else {
          child.isOpen = false; // Set isOpen=false for non-matching children
        }
      }
    }

    return false;
  }

  // Set isOpen=false for all nodes initially
  function setAllNodesClosed(nodes) {
    for (const node of nodes) {
      node.isOpen = false;
      if (node.children && node.children.length > 0) {
        setAllNodesClosed(node.children);
      }
    }
  }

  setAllNodesClosed(data);

  // Find and set isOpen=true for the specified uid
  for (const node of data) {
    findNodeAndSetOpenStatus(node, targetUid, uidFieldName);
  }

  return data;
}

export function transformFormResultToMetaverse(formResult) {
  const result = _.transform(
    formResult,
    (result, value, key) => {
      if (!_.endsWith(key, "_desc")) {
        if (value.includes("@@@")) {
          const [newValue, newDesc] = value.split("@@@");
          result[key] = newValue;
          result[`${key}_desc`] = newDesc;
          // result.idhaha = newDesc;
        } else {
          result[key] = value;
        }
      }
    },
    {}
  );

  return result;
}

export function toCozyDate(myDate) {
  return dayjs(myDate).fromNow();
}

export function toMotoDate(myDate) {
  return toCozyDate(myDate);
}

export function toCozyPrice(myPrice) {
  return formatMoney(myPrice, {
    precision: 0,
    thousand: ",",
    symbol: "төг",
    format: "%v %s",
  });
}

export function toMotoPrice(myPrice) {
  return toCozyPrice(myPrice);
}

export function toCozyKm(myKm) {
  return formatMoney(myKm, {
    precision: 0,
    thousand: ",",
    symbol: "км",
    format: "%v %s",
  });
}

export function toMotoKm(myKm) {
  return toCozyKm(myKm);
}

export function prepareUrlQueryMulti(newValue, nowValue) {
  // console.log("88888888888888", { newValue, nowValue });
  // if (!nowValue) nowValue = "[]";

  // Parse the nowValue string into a JavaScript array
  let parsedNowValue = jsonParse(nowValue || "[]");

  // Check if newValue exists in the array
  // const valueIndex = parsedNowValue.findIndex(
  //   (item) => item === _.toNumber(newValue)
  // );
  const valueIndex = _.findIndex(
    parsedNowValue,
    (item) => item === _.toNumber(newValue)
  );

  if (valueIndex !== -1) {
    // If newValue exists, remove it from the array
    parsedNowValue.splice(valueIndex, 1);
  } else {
    // If newValue doesn't exist, add it to the array
    parsedNowValue.push(_.toNumber(newValue));
  }

  // Stringify the updated array back to a JSON string
  let updatedNowValue = _.isEmpty(parsedNowValue)
    ? undefined
    : JSON.stringify(parsedNowValue);

  // Log the updated JSON string
  // console.log("ssssss", updatedNowValue);

  // Returns the updated JSON string
  return updatedNowValue;
}

export function checkInclude(myValue, ArrayValue) {
  // Parse the ArrayValue string to convert it into an actual array of numbers
  const parsedArrayValue = jsonParse(ArrayValue || "[]");

  // Check if myValue is included in the array
  const isIncluded = parsedArrayValue.includes(parseInt(myValue));

  return isIncluded;
}

//jagaa end
