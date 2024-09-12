import { values } from "lodash";
// import {BottomModal} from "../components/popUp/BottomModal";
import { notification } from "antd";
import axios from "axios";
import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import fetchJson from "@/lib/fetchJson";
import { jsonParse } from "@/util/jsonParse";
import { getRowItems, isEmpty, isObject, searchJsonValueGet } from "./helper";

export function changeLabelName(
  path: any,
  pathText: any,
  processExpression: any
) {
  processExpression[path + "_labelname"] = pathText;
}

export function hideButton(type: any, processExpression: any) {
  processExpression.saveBtn = "hide";
}

export const runprocessvalue = async (
  command: any,
  parameter: any,
  get?: any,
  item?: any,
  label?: any
) => {
  parameter = parameter.split("|");
  var json = "";
  var isEmptyJson = true;
  for (var a in parameter) {
    var q = parameter[a].split("@");
    var itemType = searchJsonValueGet(label, "paramrealpath", q[1]);
    if (!isEmpty(itemType) && itemType[0].lookuptype == "combo") {
      item[q[1]] = item[q[1] + "combo"].id;
      isEmptyJson = false;
    }
    if (!isNaN(parseFloat(q[0]))) {
      json = json + '"' + q[1] + '":"' + q[0] + '",';
      isEmptyJson = false;
    } else {
      var asd = eval("item." + q[0]);
      if (asd != undefined) {
        json = json + '"' + q[1] + '":"' + asd + '",';
        isEmptyJson = false;
      } else if (!isEmpty(parseFloat(q[0]))) {
        json = json + '"' + q[1] + '":"' + q[0] + '",';
        isEmptyJson = false;
      }
    }
  }
  if (!isEmptyJson) {
    let returnValue = "";
    var jsonp = "{" + json.substr(0, json.length - 1) + "}";
    const result: any = await fetchJson(
      `/api/get-process?processcode=${command}&parameters=${jsonp}`
    );
    if (result && get) {
      returnValue = result[get] ? result[get] : "";
    } else {
      returnValue = "";
    }
    return returnValue;
  } else {
    return "";
  }
};

export const fillgroupbydata = async (
  data: any,
  grouppath: any,
  parameter: any,
  type: any,
  item: any,
  attr: any,
  setFormDataInitData?: any
) => {
  let field: any = [];
  field.paramrealpath = grouppath;
  const listConfig = getRowItems(field, attr);

  let __dataElement = listConfig.reduce(function (map: any, item: any) {
    map[item.paramname] = item.defaultvalue;
    return map;
  }, {});

  parameter = parameter.split("|");
  values(data).forEach((row: any) => {
    let __dataElement2 = { ...__dataElement };
    for (var a in parameter) {
      var q = parameter[a].split("@");
      let q2 = q[1].split(".");

      if (!isNaN(parseFloat(q[0]))) {
        __dataElement2[q2[1]] = q[0];
      } else {
        try {
          var asd = eval("item." + q[0]);
        } catch (error) {}
        if (asd != undefined) {
          __dataElement2[q2[1]] = asd;
        } else if (!isEmpty(q[0])) {
          __dataElement2[q2[1]] = row[q[0]];
        }
      }
    }

    item[field.paramrealpath] = [
      ...(values(item[field.paramrealpath]) || []),
      __dataElement2,
    ];
  });
  if (setFormDataInitData) {
    setFormDataInitData(item);
  }
};

export const getprocessparam = async (
  command: any,
  parameter: any,
  item: any,
  label: any
) => {
  parameter = parameter.split("|");
  var json = "";
  for (var a in parameter) {
    if (parameter[a].toLowerCase() == "allpath") {
      json = item;
      break;
    } else {
      var q = parameter[a].split("@");
      if (!isNaN(parseFloat(q[0]))) {
        json = json + '"' + q[1] + '":"' + q[0] + '",';
      } else {
        try {
          var asd = eval("item." + q[0]);
        } catch (error) {}
        if (asd != undefined) {
          json = json + '"' + q[1] + '":"' + asd + '",';
        } else if (!isEmpty(q[0])) {
          json = json + '"' + q[1] + '":"' + q[0] + '",';
        }
      }
    }
  }

  let returnValue = "",
    jsonp = "";

  if (!isObject(json)) {
    jsonp = "{" + json.substr(0, json.length - 1) + "}";
  } else {
    jsonp = json;
  }

  const { data } = await axios.post(`/api/post-process`, {
    processcode: command,
    parameters: isObject(jsonp) ? jsonp : jsonParse(jsonp),
  });
  // console.log("expression main", data);
  // console.log("expression main", command);
  // console.log("expression main", data);
  if (data.status === "success") {
    returnValue = data.result;
  } else {
    notification.warning({
      message: "Амжилтгүй боллоо",
      description: parseHtml(decode(data.text)),
      duration: 5,
    });
    returnValue = "";
  }
  return returnValue;
};

// export function fillGroupByDv(
// 	metaDataCode: any,
// 	processRowsPath: any,
// 	criteria: any,
// 	map: any,
// 	type: any,
// ) {
// 	console.log(metaDataCode, processRowsPath, criteria, map, type);
// }
// $scope.fillGroupByDv = function (metaDataCode, processRowsPath, criteria, map, type) {
//   //type append or Empty
//   $rootScope.ShowLoader();
//   var masterData = JSON.parse(localStorage.getItem('masterData' + metaDataCode));
//   var result = "";
//   var rowsIndex = -1;
//   if ((isEmpty(masterData) || isEmpty(masterData[1])) && isNaN(metaDataCode)) {
//       var res = serverjQuery.requestFull("PL_MDVIEW_004", { "systemmetagroupid": "1544082958292969", "ignorePermission": "1", "metaDataCode": metaDataCode });
//       if (!isEmpty(res)) {
//           var metaid = res[1];
//           if (!isEmpty(metaid) && !isEmpty(metaid[0].id)) {
//               var metaDataId = metaid[0].id;
//               //ServerDataFunctions.getFunctionMetaDataId(metaDataCode).then(function (metaDataId) {
//               try {
//                   var criteriaRows = {};
//                   var inputParamsArr = criteria.split('|');
//                   var mappingParamsArr = map.split('|');
//                   var mappingParamsData = [];
//                   if (!isEmpty(inputParamsArr)) {
//                       for (var i = 0; i < inputParamsArr.length; i++) {
//                           var fieldPathArr = inputParamsArr[i].split('@');
//                           var fieldPath = fieldPathArr[0];
//                           var inputPath = fieldPathArr[1];
//                           var fieldValue = '';

//                           var rowsdataCheck = eval('$rootScope.ItemDtlData.' + fieldPath.toLowerCase());

//                           if (!isEmpty(rowsdataCheck)) {
//                               fieldValue = rowsdataCheck;
//                           } else {
//                               fieldValue = fieldPath;
//                           }
//                           criteriaRows[inputPath] = { 0: { 'operator': '=', 'operand': fieldValue } };
//                       }
//                   }
//                   if (type == "empty") {
//                       if (isEmpty(eval('$rootScope.ItemDtlData.' + processRowsPath))) {
//                           eval('$rootScope.ItemDtlData.' + processRowsPath + '=[]');
//                       }
//                       else {
//                           var rowsData = eval('$rootScope.ItemDtlData.' + processRowsPath);
//                           var newRowsData = {};
//                           angular.forEach(Object.keys(rowsData), function (key) {
//                               if (isNaN(key)) {
//                                   newRowsData[key] = rowsData[item];
//                               }
//                           });
//                           eval('$rootScope.ItemDtlData.' + processRowsPath + "=" + newRowsData);
//                       }
//                   }
//                   else {
//                       var rowsData = eval('$rootScope.ItemDtlData.' + processRowsPath);
//                       angular.forEach(Object.keys(rowsData), function (key) {
//                           if (!isNaN(key)) {
//                               rowsIndex = key;
//                           }
//                       });
//                   }
//                   for (var j = 0; j < mappingParamsArr.length; j++) {
//                       var mappingPathArr = mappingParamsArr[j].split('@');
//                       var dataviewPath = mappingPathArr[0].toLowerCase();
//                       var processPath = mappingPathArr[1].toLowerCase();
//                       var realpath = processPath.replaceAll(processRowsPath.toLowerCase() + ".", "")
//                       mappingParamsData.push({ dataviewPath: dataviewPath.toLowerCase(), processPath: realpath });
//                   }
//               }
//               catch (ex) { }
//               var getJson = {};
//               getJson.ignorePermission = '1';
//               getJson.criteria = criteriaRows;
//               getJson.systemmetagroupid = metaDataId;
//               result = serverjQuery.requestFull("PL_MDVIEW_004", getJson);
//           }
//       }
//   }
//   else if (!isNaN(metaDataCode) && !isEmpty(masterData)) {
//       // var metaid = metaDataCode serverjQuery.requestFull("PL_MDVIEW_004", { "systemmetagroupid": "1544082958292969", "ignorePermission": "1", "metaDataCode": metaDataCode })[1];
//       //if (!isEmpty(metaid) && !isEmpty(metaid[0].id)) {
//       var metaDataId = metaDataCode; //metaid[0].id;
//       //ServerDataFunctions.getFunctionMetaDataId(metaDataCode).then(function (metaDataId) {
//       try {
//           var criteriaRows = {};
//           var inputParamsArr = criteria.split('|');
//           var mappingParamsArr = map.split('|');
//           var mappingParamsData = [];
//           if (!isEmpty(inputParamsArr)) {
//               for (var i = 0; i < inputParamsArr.length; i++) {
//                   var fieldPathArr = inputParamsArr[i].split('@');
//                   var fieldPath = fieldPathArr[0];
//                   var inputPath = fieldPathArr[1];
//                   var fieldValue = '';

//                   var rowsdataCheck = eval('$rootScope.ItemDtlData.' + fieldPath.toLowerCase());

//                   if (!isEmpty(rowsdataCheck)) {
//                       fieldValue = rowsdataCheck;
//                   } else {
//                       fieldValue = fieldPath;
//                   }
//                   criteriaRows[inputPath] = { 0: { 'operator': '=', 'operand': fieldValue } };
//               }
//           }
//           if (type == "empty") {
//               if (isEmpty(eval('$rootScope.ItemDtlData.' + processRowsPath))) {
//                   eval('$rootScope.ItemDtlData.' + processRowsPath + '=[]');
//               }
//               else {
//                   var rowsData = eval('$rootScope.ItemDtlData.' + processRowsPath);
//                   var newRowsData = {};
//                   angular.forEach(Object.keys(rowsData), function (key) {
//                       if (isNaN(key)) {
//                           newRowsData[key] = rowsData[item];
//                       }
//                   });
//                   eval('$rootScope.ItemDtlData.' + processRowsPath + "=" + newRowsData);
//               }
//           }
//           else {
//               var rowsData = eval('$rootScope.ItemDtlData.' + processRowsPath);
//               angular.forEach(Object.keys(rowsData), function (key) {
//                   if (!isNaN(key)) {
//                       rowsIndex = key;
//                   }
//               });
//           }
//           for (var j = 0; j < mappingParamsArr.length; j++) {
//               var mappingPathArr = mappingParamsArr[j].split('@');
//               var dataviewPath = mappingPathArr[0].toLowerCase();
//               var processPath = mappingPathArr[1].toLowerCase();
//               var realpath = processPath.replaceAll(processRowsPath.toLowerCase() + ".", "")
//               mappingParamsData.push({ dataviewPath: dataviewPath.toLowerCase(), processPath: realpath });
//           }
//       }
//       catch (ex) { }
//       var getJson = {};
//       getJson.ignorePermission = '1';
//       getJson.criteria = criteriaRows;
//       getJson.systemmetagroupid = metaDataId;
//       result = serverjQuery.requestFull("PL_MDVIEW_004", getJson);
//       //}
//   }
//   else if (!isNaN(metaDataCode) && !isEmpty(masterData)) {
//       var criteria = checkDVCriteria(criteria);
//       var returnVlaue = [];
//       angular.forEach(masterData[1], function (item) {
//           var keys = Object.keys(criteria);
//           var checked = true;
//           angular.forEach(keys, function (cri) {
//               var value = eval('criteria.' + cri + '[0].operand');
//               if (value != "%%" && !isEmpty(value)) {
//                   if (item[cri] == value && checked) {
//                       checked = true;
//                   }
//                   else {
//                       checked = false;
//                   }
//               }
//               else {
//                   checked = true;
//               }
//           })
//           if (checked) {
//               returnVlaue.push(item);
//           }
//       })
//       result = []
//       result[0] = "success";
//       result[1] = returnVlaue;
//   }

//   //ServerData.getDataViewData(metaDataId, "", "", "", "", criteriaRows).then(function (result) {
//   if (!isEmpty(result) && !isEmpty(result[1])) {
//       try {
//           $scope.DvAggregateColumns = result[1].aggregatecolumns;
//           $scope.DvPaging = result[1].paging;
//           delete result[1].aggregatecolumns;
//           delete result[1].paging;
//           var data = result[1];
//           var rowsValue = "";
//           if ($rootScope.ItemDtlData[processRowsPath]) {
//               rowsValue = $rootScope.ItemDtlData[processRowsPath];
//           }
//           var ddd = {};
//           angular.forEach(Object.keys(rowsValue), function (key) {
//               if (typeof rowsValue[key] == 'function' || !isEmpty(rowsValue[key]) && isEmpty(rowsValue[key].parentitemid)) {
//                   ddd[key] = rowsValue[key];
//               }
//           })
//           $rootScope.ItemDtlData[processRowsPath] = ddd;
//           var rowsData = eval('$rootScope.ItemDtlData.' + processRowsPath);
//           angular.forEach(Object.keys(rowsData), function (key) {
//               if (!isNaN(key)) {
//                   rowsIndex = key;
//               }
//           });
//           angular.forEach(data, function (item, index) {
//               angular.forEach(mappingParamsData, function (map) {
//                   item[map.processPath] = item[map.dataviewPath];
//               })
//               if (type == "empty") {
//                   eval('$rootScope.ItemDtlData.' + processRowsPath + "[" + index + "]=" + JSON.stringify(item));
//               }
//               else {
//                   rowsIndex++;
//                   item.realindex = rowsIndex
//                   var rowsValue = $rootScope.ItemDtlData[processRowsPath];

//                   var checkedValue = false;
//                   var newIndex = 0;
//                   angular.forEach(rowsValue, function (row) {
//                       if (!isEmpty(row) && !isEmpty(row.parentitemid) && row.parentitemid == item.parentitemid && row.itemid == item.itemid) {
//                           row = item
//                           checkedValue = true;
//                       }
//                   })
//                   if (!checkedValue) {
//                       eval('$rootScope.ItemDtlData.' + processRowsPath + "[" + rowsIndex + "]=" + JSON.stringify(item));
//                   }

//               }
//           })
//       }
//       catch (ex) { }
//       $ionicLoading.hide();
//   }
//   else {
//       $ionicLoading.hide();
//   }
//   //}, function (err) { });
//   //}, function (er) {});

// }

export const getauthlogin = async (
  str: any,
  path: any,
  process: any,
  parameter: any,
  item: any,
  attr: any,
  setFormDataInitData: any
) => {
  const authWindow = window.open(str, "myWindow", "width=550,height=550");
  if (authWindow) {
    parameter = parameter.split("|");
    var json = "";
    for (var a in parameter) {
      var q = parameter[a].split("@");
      if (!isNaN(parseFloat(q[0]))) {
        json = json + '"' + q[1] + '":"' + q[0] + '",';
      } else {
        try {
          var asd = eval("item." + q[0]);
        } catch (error) {}
        if (asd != undefined) {
          json = json + '"' + q[1] + '":"' + asd + '",';
        } else if (!isEmpty(q[0])) {
          json = json + '"' + q[1] + '":"' + q[0] + '",';
        }
      }
    }

    var popupTick = setInterval(async function () {
      if (authWindow.closed) {
        clearInterval(popupTick);
        // item["loanconfirm_glmt"] = { 21211: 332 };
        // setFormDataInitData(item);

        if (localStorage) {
          const checkPage: any = localStorage.getItem("authcallbacklink");
          const code: any = /\?state=(.+)\&scope=(.+)$/.exec(checkPage);
          const scope: any = /\&scope=(.+)$/.exec(checkPage);

          if (code && scope) {
            json = json.replace(':"scope"', ":" + '"' + scope[1] + '"');
            json = json.replace(':"state"', ":" + '"' + code[1] + '"');
            var jsonp = "{" + json.substr(0, json.length - 1) + "}";
            console.log(" second requist in munkherdene", json);
            if (path === "loanconfirm") {
              item["loanconfirm_glmt"] = true;
              item["scope"] = scope[1];
              item["state"] = code[1];
            } else {
              const { data } = await axios.post(`/api/post-process`, {
                processcode: process,
                parameters: { ...item, ...jsonParse(jsonp) },
              });
              console.log(" second requist in", data);
              item["loanrequest_res"] = data.status;
              if (data.status === "success") {
                if (path.indexOf("$") != -1) {
                  fillgroupbydata(
                    values(data.statements),
                    path.split("$")[0],
                    path.split("$")[1],
                    "empty",
                    item,
                    attr,
                    setFormDataInitData
                  );
                } else if (path === "loanrequest") {
                  item["loanrequest_glmt"] = data.status;
                } else if (data.balancell) {
                  item[path] = data.balancell[0].amount.value;
                }
                localStorage.removeItem("authcallbacklink");
              } else {
                notification.warning({
                  message: "Амжилтгүй боллоо",
                  description: parseHtml(decode(data.text)),
                  duration: 5,
                });
              }
            }
            setFormDataInitData(item);
          } else {
            console.log("no auth");
          }
        }
      }
    }, 1000);
  }
};

export const getKpiTemplate = async (templateId: any) => {
  const parameters = `&parameters=${JSON.stringify({
    id: templateId,
  })}`;

  const data: any = await fetchJson(
    `/api/get-process?processcode=mobKpiTemplateGetDV_004${parameters}`
  );

  for (let i = 0; i < Object.keys(data.kpitemplate).length; i++) {
    let template = data.kpitemplate[i];
    if (!isEmpty(template.kpitemplateindicator)) {
      for (
        let ik = 0;
        ik < Object.keys(template.kpitemplateindicator).length;
        ik++
      ) {
        let indicator = template.kpitemplateindicator[ik];
        if (!isEmpty(indicator?.kpitemplatedtlfact)) {
          for (
            let iks = 0;
            iks < Object.keys(indicator.kpitemplatedtlfact).length;
            iks++
          ) {
            let fact = indicator.kpitemplatedtlfact[iks];
            if (
              (fact.showtype == "radio" || fact.showtype == "combo") &&
              !isEmpty(fact.lookupmetadataid)
            ) {
              let getJson: any = {};
              if (!isEmpty(fact.lookupcriteria)) {
                let criteria = fact.lookupcriteria.split("=");
                getJson[criteria[0].toLowerCase()] = {
                  0: { operator: "=", operand: criteria[1] },
                };
              }
              // fact.data = await getLookUpData(fact.lookupmetadataid, getJson);
              delete fact.data.aggregatecolumns;
              delete fact.data.paging;
            }
          }
        }
      }
    }
  }

  return "data";
};
