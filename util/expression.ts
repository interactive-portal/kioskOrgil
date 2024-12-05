import * as ExpressionFuntions from "./ExpressionFunctions";
import { notification } from "antd";
import * as Helper from "./helper";
import fetchJson from "lib/fetchJson";
const { isEmpty, isObject, mergeJsonObjs, getSaveExprission, objectToArray } =
  Helper;

const {
  hideButton,
  changeLabelName,
  runprocessvalue,
  getprocessparam,
  fillgroupbydata,
  showKpi,
  fillGroupByDv,
  getauthlogin,
  getKpiTemplate,
} = ExpressionFuntions;

export let ass2: any;
export const waitEval = (ev: any) => {
  return new Promise((resolve, reject) => {
    eval(ev);
    // new Function("resolve", ev)(resolve);
  });
};
export const setFieldValueAll = (ev: any) => {
  return new Promise((resolve, reject) => {
    eval(ev);
    // ajiluulah
  });
};
export const passwordStrength = (path, options) => {
  return "options";
};
export const showTooltip = (ev: any) => {
  return new Promise((resolve, reject) => {
    eval(ev);
    // new Function("resolve", ev)(resolve);
  });
};

// export var experssionFunctions:any={};
export const runExpression = async (
  type: string,
  processExpression: any,
  config: any,
  formDataInitData: any
) => {
  if (type == "all") {
    // experssionFunctions={};
    // experssionFunctions.type={};
    // console.log("type", type);
    // console.log("processExpression", processExpression);
    // console.log("config", config);
    // console.log("formDataInitData", formDataInitData);
    try {
      var varfnc: any = expressionConvert(
        JSON.stringify(processExpression),
        config.varfncexpressionstring,
        "formDataInitData.",
        JSON.stringify(formDataInitData),
        "config.meta_process_param_attr_link_mobile"
      );

      // var object = eval("formDataInitData." + elemName);?
      let varfncf: any;
      eval(
        "varfncf=async function(processExpression,config,formDataInitData){" +
          varfnc +
          " return formDataInitData;}"
      );
      await varfncf(processExpression, config, formDataInitData);

      var load: any = expressionConvert(
        JSON.stringify(processExpression),
        config.loadexpressionstring,
        "formDataInitData.",
        JSON.stringify(formDataInitData),
        "config.meta_process_param_attr_link_mobile"
      );
      load = convertFunctionToExpression(load, config.varfncexpressionstring);
      let loadf: any;
      eval(
        "loadf=async function(processExpression,config,formDataInitData){" +
          load +
          " return formDataInitData;}"
      );

      await loadf(processExpression, config, formDataInitData);

      var event: any = expressionConvert(
        JSON.stringify(processExpression),
        config.eventexpressionstring,
        "formDataInitData.",
        JSON.stringify(formDataInitData),
        "config.meta_process_param_attr_link_mobile"
      );
      event = convertFunctionToExpression(event, config.varfncexpressionstring);
      let eventf: any;
      eval(
        "eventf=async function(processExpression,config,formDataInitData){" +
          event +
          " return formDataInitData;}"
      );

      await eventf(processExpression, config, formDataInitData);
      // console.log("varfnc processExpression", processExpression);
      return { expression: processExpression, data: formDataInitData };

      console.log("varfnc fist", varfnc);
    } catch (error) {
      // console.log("error-----", error);
      return false;
    }
  }
};

export const expressionConvert = (
  processExpression: any,
  strfunctions: any,
  dataField: any,
  json: any,
  LabelValueName: any
) => {
  strfunctions = getFullExpressionArrayConvert(
    strfunctions
      .toString()
      .replace(/\t/g, "")
      .replaceAll("&quot;", '"')
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
  );
  // var fun = convertToCalcFunctions(strfunctions.toLowerCase());
  var fun = convertToCalcFunctions(strfunctions);
  fun = ExpressionRunprocessConvert(fun, "formDataInitData.", LabelValueName);
  let convertFunctionStr = convertFunctionAsync(fun);
  var lastStr = removeCommentsExpression(convertFunctionStr);
  lastStr = checkvariable(lastStr, json, "value");
  lastStr = checkvariable(lastStr, processExpression, "expression");
  var GGG = convertToChangeEvent(lastStr);
  GGG = convertToControl(GGG);
  var exper = convertToMessege(GGG);
  exper = convertEvents(exper, "processExpression.");
  exper = convertHideShow(exper, "processExpression.");

  var widthEvent = exper
    .replaceAll("parseint", "parseInt")
    .replaceAll("getfullyear", "getFullYear")
    .replaceAll("thisclickbutton('save')", "$scope.SaveBtn()")
    .replaceAll("close(this)", "$scope.backbutton()")
    .replaceAll("hideprocessdialog()", "")
    .replaceAll("[", dataField)
    .replaceAll(".trigger(", "function(")
    .replaceAll(".run()", "function()")
    .replaceAll("subkpi.save()", "value.subkpifunction=function()")
    .replaceAll("]", "")
    .replaceAll(".val()", "")
    .replaceAll(";;", ";");
  widthEvent = widthEvent
    .replaceAll("new date(", "new Date(")
    .replaceAll("toisostring(", "toISOString(");
  widthEvent = widthEvent
    .replaceAll("setlocal(", "localStorage.setItem(")
    .replaceAll("getlocal(", "localStorage.getItem(");
  // console.log("widthEvent", widthEvent);
  return widthEvent;
};

function getFullExpressionArrayConvert(str: any) {
  const a: any = str.match(/\[(.*?)\(\)/g);
  if (!isEmpty(a)) {
    Object.keys(a).forEach((key) => {
      var notLower = a[key];
      //a[key] = a[key].toLowerCase();
      str = str.replaceAll(notLower, a[key]);
      var sa = a[key].match(/\]\.(.*?)\(\)/g);
      if (!isEmpty(sa)) {
        var functionName = sa[0]
          .replace("]", "")
          .replace("(", "")
          .replace(")", "")
          .replace(".", "");
        var relVariable = a[key].match(/\[(.*?)\]/g);
        for (let index in relVariable) {
          if (
            relVariable[index].match(/,/g) !== undefined &&
            relVariable[index].match(/,/g) !== null &&
            relVariable[index].match(/,/g).length > 0
          ) {
            var change = relVariable[index]
              .replace("[", "")
              .replace("]", "")
              .replace(";", "")
              .split(",");
            var ass = change.map(function (v: any) {
              var vs =
                "[" +
                v
                  .replace("." + functionName, "")
                  .replace("(", "")
                  .replace(")", "")
                  .trim() +
                "=]'" +
                functionName +
                "';";
              return vs;
            });
            str = str.replace(
              relVariable[index] + "" + sa[0].replace("]", ""),
              ass.toString().replace(/,/g, "")
            );
          }
        }
      }
    });
    str.replace();
  }
  return str;
}

// Calc
function convertToCalcFunctions(str: any) {
  // console.log(str, "str");
  let sums = str.match(/sum\(\[(.*?)\]\)/g);
  if (!isEmpty(sums)) {
    sums.forEach((data: any) => {
      var repVal = data.replaceAll("[", '"').replaceAll("]", '"');
      str = str.replaceAll(data, repVal);
    });
  }
  if (!isEmpty(sums)) {
    var avg = str.match(/avg\(\[(.*?)\]\)/g);
    avg.forEach((data: any) => {
      var repVal = data.replaceAll("[", '"').replaceAll("]", '"');
      str = str.replaceAll(data, repVal);
    });
  }
  return str;
}

// Expressions Run Processes
function ExpressionRunprocessConvert(str: any, value: any, atterlinks: any) {
  var runs = str.match(/runProcessValue(.*?)\)/g);
  if (
    str.match(/runProcessValue(.*?)\)/g) !== undefined &&
    runs !== null &&
    runs.length > 0
  ) {
    for (var s in runs) {
      var old = runs[s];
      var newVal = runs[s]
        .replace("runProcessValue", "runprocessvalue")
        .replace(
          ")",
          "," + value.substr(0, value.length - 1) + "," + atterlinks + ")"
        );
      str = str.replace(old, newVal.toString());
    }
  }

  var getpram = str.match(/getProcessParam(.*?)\)/g);
  if (
    str.match(/getProcessParam(.*?)\)/g) !== undefined &&
    getpram !== null &&
    getpram.length > 0
  ) {
    for (var s2 in getpram) {
      var old2 = getpram[s2];
      var newVal2 = getpram[s2]
        .replace("getProcessParam", "await getprocessparam")
        .replace(
          ")",
          "," + value.substr(0, value.length - 1) + "," + atterlinks + ")"
        );
      str = str.replace(old2, newVal2.toString());
    }
  }

  var getpram = str.match(/getAuthLogin(.*?)\)/g);

  if (
    str.match(/getAuthLogin(.*?)\)/g) !== undefined &&
    getpram !== null &&
    getpram.length > 0
  ) {
    for (var s2 in getpram) {
      var old2 = getpram[s2];
      var newVal2 = getpram[s2]
        .replace("getAuthLogin", "getauthlogin")
        .replace(
          ")",
          "," +
            value.substr(0, value.length - 1) +
            "," +
            atterlinks +
            "," +
            "setFormDataInitData" +
            ")"
        );
      str = str.replace(old2, newVal2.toString());
    }
  }

  var getpram = str.match(/hideButton(.*?)\)/g);
  if (
    str.match(/hideButton(.*?)\)/g) !== undefined &&
    getpram !== null &&
    getpram.length > 0
  ) {
    for (var s2 in getpram) {
      var old2 = getpram[s2];
      var newVal2 = getpram[s2].replace(")", "," + "processExpression" + ")");
      str = str.replace(old2, newVal2.toString());
    }
  }

  var getpram = str.match(/changeLabelName(.*?)\)/g);
  if (
    str.match(/changeLabelName(.*?)\)/g) !== undefined &&
    getpram !== null &&
    getpram.length > 0
  ) {
    for (var s2 in getpram) {
      var old2 = getpram[s2];
      var newVal2 = getpram[s2].replace(")", "," + "processExpression" + ")");
      str = str.replace(old2, newVal2.toString());
    }
  }

  var getpram = str.match(/fillGroupByData(.*?)\)/g);
  if (
    str.match(/fillGroupByData(.*?)\)/g) !== undefined &&
    getpram !== null &&
    getpram.length > 0
  ) {
    for (var s2 in getpram) {
      var old2 = getpram[s2];
      var newVal2 = getpram[s2]
        .replace("fillGroupByData", "fillgroupbydata")
        .replace(
          ")",
          "," +
            value.substr(0, value.length - 1) +
            "," +
            atterlinks +
            "," +
            'typeof setFormDataInitData !== "undefined" ? setFormDataInitData : ""' +
            ")"
        );
      str = str.replace(old2, newVal2.toString());
    }
  }

  var getpram = str.match(/repeatFunction(.*?)\)/g);
  if (
    str.match(/repeatFunction(.*?)\)/g) !== undefined &&
    getpram !== null &&
    getpram.length > 0
  ) {
    for (var s2 in getpram) {
      var old2 = getpram[s2];
      var newVal2 = getpram[s2]
        .replace("repeatFunction", "repeatfunction")
        .replace(
          ")",
          "," +
            value.substr(0, value.length - 1) +
            "," +
            atterlinks +
            ",config" +
            ",processExpression" +
            ")"
        );
      str = str.replace(old2, newVal2.toString());
    }
  }

  return str;
}
// Expressions Kpi
function kpiExpressionConvert(arraName: any, str: any, convertExp: any) {
  var functionName = "function=function()";
  str = getFullExpressionArrayConvert(
    str
      .toString()
      .replaceAll("&quot;", '"')
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
  );
  var newstr = removeCommentsExpression(str);
  newstr = checkvariable(newstr, convertExp, "");
  newstr = convertToMessege(newstr);
  return newstr
    .replaceAll("[", arraName)
    .replaceAll(".kpichange()", functionName)
    .replaceAll("]", "");
}

export const removeCommentsExpression = (str: any) => {
  var newstr = str.replace(/\/\*(.|\n|\r)*?\*\//g, "");
  return newstr;
};
function checkvariable(str: any, json: any, type: string) {
  var oldstr = str;
  var headerVariable = "";
  var subVariable = "";
  var v = str.match(/\[(.*?)\]/g);
  if (!isEmpty(v)) {
    v.forEach((itemBig: any) => {
      var item = itemBig;
      str = str.replaceAll(itemBig, item);
      if (item.split(".").length > 1) {
        item = item.split(".");
        for (var qe = item.length - 1; qe > 0; qe--) {
          var newvariable = "";
          if (type == "expression") {
            newvariable =
              "processExpression." +
              item.slice(0, qe).toString().replace(/,/g, ".").replace("[", "") +
              "]={};";
          } else if (type == "value") {
            newvariable =
              "[" +
              item.slice(0, qe).toString().replace(/,/g, ".").replace("[", "") +
              "]={};";
          }
          var checkPath = "[" + item[qe - 1].replace("[", "") + "]={};";
          var jsonCheck = checkJsonPath(
            JSON.parse(json),
            newvariable.replace("[", "").replace("]={};", "")
          );
          if (jsonCheck) {
            jsonCheck = json.includes(
              checkPath.replace("[", "").replace("]={};", "") + '":{'
            );
            if (!jsonCheck) {
              jsonCheck = json.includes(
                checkPath.replace("[", "").replace("]={};", "") + '":[{'
              );
            }
          }
          var funcCheck = oldstr.includes(newvariable);

          if (funcCheck === false && jsonCheck === false) {
            oldstr = newvariable + oldstr;
            if (qe === 0) {
              headerVariable = headerVariable + newvariable;
            } else {
              subVariable = subVariable + newvariable;
            }
          }
        }
      }
    });
  }
  var subVariableArray = subVariable.split(";");
  subVariableArray.sort((a, b): any => {
    if (a && b) return a.split(".").length - b.split(".").length;
  });
  var newVariables = subVariableArray.toString().replace(/,/g, ";");
  return headerVariable + newVariables + str;
}

// function checkvariable(str: any, json: any, type: string) {
//   var oldstr = str;
//   var headerVariable = "";
//   var subVariable = "";
//   var v = str.match(/\[(.*?)\]/g);
//   if (!isEmpty(v)) {
//     v.forEach((itemBig: any) => {
//       // var item = itemBig.toLowerCase();
//       var item = itemBig;
//       str = str.replaceAll(itemBig, item);
//       // if (item.split(".").length > 1) {
//       //   item = item.split(".");
//       //   for (var qe = item.length - 1; qe > 0; qe--) {
//       //     var newvariable = "";
//       //     if (type == "expression") {
//       //       newvariable =
//       //         "processExpression." +
//       //         item.slice(0, qe).toString().replace(/,/g, ".").replace("[", "") +
//       //         "]={};";
//       //     } else if (type == "value") {
//       //       newvariable =
//       //         "[" +
//       //         item.slice(0, qe).toString().replace(/,/g, ".").replace("[", "") +
//       //         "]={};";
//       //     }
//       //     var checkPath = "[" + item[qe - 1].replace("[", "") + "]={};";
//       //     var jsonCheck = checkJsonPath(
//       //       JSON.parse(json),
//       //       newvariable.replace("[", "").replace("]={};", "")
//       //       // newvariable.replace("[", "").replace("]={};", "").toLowerCase()
//       //     );
//       //     if (jsonCheck) {
//       //       jsonCheck = json.includes(
//       //         checkPath.replace("[", "").replace("]={};", "") +
//       //           // checkPath.replace("[", "").replace("]={};", "").toLowerCase() +
//       //           '":{'
//       //       );
//       //       if (!jsonCheck) {
//       //         jsonCheck = json.includes(
//       //           checkPath.replace("[", "").replace("]={};", "") +
//       //             // checkPath.replace("[", "").replace("]={};", "").toLowerCase() +
//       //             '":[{'
//       //         );
//       //       }
//       //     }
//       //     var funcCheck = oldstr.includes(newvariable);

//       //     if (funcCheck === false && jsonCheck === false) {
//       //       oldstr = newvariable + oldstr;
//       //       if (qe === 0) {
//       //         headerVariable = headerVariable + newvariable;
//       //       } else {
//       //         subVariable = subVariable + newvariable;
//       //       }
//       //     }
//       //   }
//       // }
//     });
//   }
//   var subVariableArray = subVariable.split(";");
//   subVariableArray.sort((a, b): any => {
//     if (a && b) return a.split(".").length - b.split(".").length;
//   });
//   var newVariables = subVariableArray.toString().replace(/,/g, ";");
//   return headerVariable + newVariables + str;
// }
// function checkvariable(str: any, json: any, type: string) {
//   var oldstr = str;
//   var headerVariable = "";
//   var subVariable = "";
//   var v = str.match(/\[(.*?)\]/g);
//   if (!isEmpty(v)) {
//     v.forEach((item: any) => {
//       if (item.split(".").length > 1) {
//         item = item.split(".");
//         for (var qe = item.length - 1; qe > 0; qe--) {
//           var newvariable = "";
//           if (type == "expression") {
//             newvariable =
//               "processExpression." +
//               item.slice(0, qe).toString().replace(/,/g, ".").replace("[", "") +
//               "]={};";
//           } else if (type == "value") {
//             newvariable =
//               "[" +
//               item.slice(0, qe).toString().replace(/,/g, ".").replace("[", "") +
//               "]={};";
//           }
//           var checkPath = "[" + item[qe - 1].replace("[", "") + "]={};";
//           // var jsonCheck = json.includes(checkPath.replace("[", "").replace("]={};", "").toLowerCase());
//           // var jsonCheck = checkJsonPath(
//           //   JSON.parse(json),
//           //   newvariable.replace("[", "").replace("]={};", "").toLowerCase()
//           // );
//           // if (jsonCheck) {
//           //   jsonCheck = json.includes(
//           //     checkPath.replace("[", "").replace("]={};", "").toLowerCase() +
//           //       '":{'
//           //   );
//           // }
//           let jsonCheck = json.includes(
//             checkPath.replace("[", "").replace("]={};", "").toLowerCase() +
//               '":{'
//           );
//           var funcCheck = oldstr.includes(newvariable);

//           if (funcCheck === false && jsonCheck === false) {
//             oldstr = newvariable + oldstr;
//             if (qe === 0) {
//               headerVariable = headerVariable + newvariable;
//             } else {
//               subVariable = subVariable + newvariable;
//             }
//           }
//         }
//       }
//     });
//   }
//   var subVariableArray = subVariable.split(";");
//   subVariableArray.sort((a, b): any => {
//     if (a && b) return a.split(".").length - b.split(".").length;
//   });
//   var newVariables = subVariableArray.toString().replace(/,/g, ";");
//   // return headerVariable + newVariables + str;
//   return headerVariable + str;
// }
function checkvariableFunction(str: any, json: any) {
  var oldstr = str;
  var headerVariable = "";
  var subVariable = "";
  var v = str.match(/\[(.*?)\]/g);
  if (!isEmpty(v)) {
    v.forEach((item: any) => {
      if (item.split(".").length > 1) {
        item = item.split(".");
        for (var qe = item.length - 1; qe > 0; qe--) {
          var newvariable =
            "[" +
            item.slice(0, qe).toString().replace(/,/g, ".").replace("[", "") +
            "]={};";
          var checkPath = "[" + item[qe - 1].replace("[", "") + "]={};";
          // var jsonCheck = json.includes(checkPath.replace("[", "").replace("]={};", "").toLowerCase());
          var jsonCheck = checkJsonPath(
            json,
            newvariable.replace("[", "").replace("]={};", "").toLowerCase()
          );
          if (jsonCheck) {
            jsonCheck = json.includes(
              checkPath.replace("[", "").replace("]={};", "").toLowerCase() +
                '":{'
            );
          }
          var funcCheck = oldstr.includes(newvariable);

          if (funcCheck === false && jsonCheck === false) {
            oldstr = newvariable + oldstr;
            if (qe === 0) {
              headerVariable = headerVariable + newvariable;
            } else {
              subVariable = subVariable + newvariable;
            }
          }
        }
      }
    });
  }
  var subVariableArray = subVariable.split(";");
  subVariableArray.sort((a, b): any => {
    if (a && b) return a.split(".").length - b.split(".").length;
  });
  var newVariables = subVariableArray.toString().replace(/,/g, ";");
  return headerVariable + newVariables + str;
}
function checkJsonPath(obj: any, path: any) {
  var args = path.split(".");
  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}

function convertToMessege(str: any) {
  var a = str.match(/message(\(.*?)\)/g);
  for (let ind in a) {
    var b = a[ind].match(/(\((.*)+\))/g);
    var old = b[0];
    var newstr = b[0].replace("(", "").replace(")", "").split(",");
    var newstrnew = "alert(" + newstr[1].toString() + ")";
    str = str.replace("message" + old, newstrnew);
    // var newstrnew =
    //   "notification." +
    //   newstr[0].toString() +
    //   "({ message: " +
    //   newstr[1].toString() +
    //   " })";
    // '("' + newstr[0].toString() + '",' + newstr[1].toString() + ")";
    // str = str.replace("message" + old, newstrnew);
  }
  return str;
}

function convertToChangeEvent(strFn: any) {
  let str = strFn.match(/.change(\(.*?)\}/g);
  if (!isEmpty(str)) {
    str.forEach((event: any) => {
      let variables = event.match(/\[(.*?)\]/g);
      for (var ind in variables) {
        let variable = variables[ind];
        let old = variable;
        strFn = strFn.replace(old, variable);
      }
    });
  }
  return strFn;
}
function convertToControl(strFn: any) {
  var str = strFn.match(/.control(\(.*?)\)/g);
  var strLabel = strFn.match(/.label(\(.*?)\)/g);
  if (!isEmpty(str)) {
    str.forEach((event: any) => {
      strFn = strFn.replace(
        event,
        event.replace(".control(", "style=").replace(")", "")
      );
    });
  }
  if (!isEmpty(strLabel)) {
    strLabel.forEach((label: any) => {
      strFn = strFn.replace(
        label,
        label.replace(".label(", "stylelabel=").replace(")", "")
      );
    });
  }
  return strFn;
}

function convertEvents(str: any, functionName: string) {
  var event = str.match(
    /\[[\w.]+\].click\(\)|\[[\w.]+\].change\(\)|\[[\w.]+\].delete\(\)/g
  );
  event?.forEach((el: any) => {
    var eventName = el.replace("[", functionName);
    var funcName = eventName
      .replaceAll(".click()", "function=async function()")
      .replaceAll(".delete()", "function=async function()")
      .replaceAll(".change()", "function=async function()");
    str = str.replaceAll(el, funcName);
  });
  return str;
}

function convertHideShow(str: any, expression: string) {
  str = str
    .replaceAll("=]'show'", "].show()")
    .replaceAll("=]'hide'", "].hide()");
  str = str
    .replaceAll("=]'disable'", "].disable()")
    .replaceAll("=]'enable'", "].enable()");
  str = str
    .replaceAll("=]'required'", "].required()")
    .replaceAll("=]'nonrequired'", "].nonrequired()");

  var event = str.match(
    /\[[\w.]+\].hide\(\)|\[[\w.]+\].show\(\)|\[[\w.]+\].disable\(\)|\[[\w.]+\].enable\(\)|\[[\w.]+\].required\(\)|\[[\w.]+\].nonrequired\(\)/g
  );
  event?.forEach((el: any) => {
    var eventName = el.replace("[", expression);
    var funcName = eventName
      .replaceAll(".show()", 'hideShow="show"')
      .replaceAll(".hide()", 'hideShow="hide"')
      .replaceAll(".disable()", 'disable="disable"')
      .replaceAll(".enable()", 'disable="enable"')
      .replaceAll(".required()", "isrequired='1'")
      .replaceAll(".nonrequired()", "isrequired='0'");

    str = str.replaceAll(el, funcName);
  });
  return str;
}

function getFunctioninString(name: any, str: any) {
  var functionName = "function " + name;
  var functionNameAsync = "async function " + name;
  var indexAsync = str.indexOf(functionNameAsync);
  if (indexAsync != -1) {
    functionName = functionNameAsync;
  }
  var index = str.indexOf(functionName);
  var functionBody = "";
  if (index != -1) {
    index += functionName.length;
    functionBody = functionName;

    var charArray = str.split("");
    var isFoundOpenBracket = 0;
    var bracketCount = 0;
    for (let i = index; i < charArray.length; i++) {
      var char = charArray[i];
      functionBody += char;

      if (char == "{") {
        isFoundOpenBracket = 1;
        bracketCount += 1;
      } else if (char == "}") {
        bracketCount -= 1;
      }
      if (isFoundOpenBracket == 1 && bracketCount == 0) {
        break;
      }
    }
    return functionBody;
  }
  return null;
}

export const repeatfunction = (
  elemName: any,
  funcName: any,
  formDataInitData: any,
  attr: any,
  config: any,
  processExpression: any
) => {
  elemName = elemName.replace(/\[(.*?)\]/g, "");
  var funcStr = getFunctioninString(funcName, config.varfncexpressionstring);
  if (!isEmpty(funcStr)) {
    var varfnc: any = expressionConvert(
      "JSON.stringify(processExpression)",
      funcStr,
      "formDataInitData.",
      "JSON.stringify(formDataInitData)",
      "config.meta_process_param_attr_link_mobile"
    );
    var object = eval("formDataInitData." + elemName);

    if (
      eval(varfnc + " typeof " + funcName + '=="function"') &&
      !isEmpty(formDataInitData) &&
      eval("!isEmpty(formDataInitData." + elemName + ")")
    ) {
      var functionString = eval(varfnc + funcName + ".toString()");

      var outSideVariable: any = [];
      var object = eval("formDataInitData." + elemName);

      object.forEach(function (item: any, index: any) {
        if (
          !isObject(item) &&
          typeof item != "function" &&
          item != "hide" &&
          item != "disable" &&
          item != "enable" &&
          item != "show" &&
          item != "hideShow"
        ) {
          outSideVariable[index] = item;
        }
      });

      Object.keys(object).forEach(function (key: any, index: any) {
        var item = object[key];
        if (!isNaN(key) && isObject(item)) {
          var convertFn = functionString.replaceAll(
            elemName,
            elemName + "[" + index + "]"
          );
          // var convertFn = angular.copy(
          //   functionString
          //     .replaceAll(elemName + ".", "" + elemName + "[" + index + "].")
          //     .replaceAll("checkedtype", "checkedType")
          //     .replaceAll(
          //       "detailrowremove(element",
          //       "detailrowremove($rootScope.ItemDtlData." +
          //         elemName +
          //         "[" +
          //         index +
          //         "]," +
          //         index +
          //         ',"' +
          //         elemName +
          //         '"'
          //     )
          // );
          item = mergeJsonObjs(...outSideVariable, item);
          eval(
            "formDataInitData." +
              elemName +
              "[" +
              index +
              "]=" +
              JSON.stringify(item)
          );
          eval(convertFn + "; " + funcName + "();");
        }
      });
    }
  }
  return;
};

export const runExpressionEndAfter = async (
  config: any,
  type: any,
  formDataInitData: any,
  processExpression: any,
  setFormDataInitData: any
) => {
  var expressionStr = getSaveExprission(config["saveexpressionstring"], type);

  try {
    var event: any = expressionConvert(
      JSON.stringify(processExpression),
      expressionStr,
      "formDataInitData.",
      JSON.stringify(formDataInitData),
      "config.meta_process_param_attr_link_mobile"
    );

    let func: any;

    if (isEmpty(event)) {
      return true;
    } else {
      eval(
        "func= async function(expression,config,formDataInitData){" +
          event +
          " return true;}"
      );
      let end = await func(processExpression, config, formDataInitData);
      return end;
    }
  } catch (error) {
    console.log(`Error `, error);
  }
};

// export const fillGroupByDv = async function (
// 	metaDataCode: any,
// 	processRowsPath: any,
// 	criteria: any,
// 	map: any,
// 	type: any,
// ) {
// 	var criteriaRows: any = {};
// 	var inputParamsArr = criteria.split("@");
// 	var mappingParamsArr = map.split("|");
// 	var mappingParamsData = [];

// 	const globData = getprocessparam(
// 		metaDataCode,
// 		"templateId@templateId",
// 		"",
// 		"",
// 	);
// 	// getprocessparam
// 	console.log("fillGroupByDv globData v", globData);

// 	// if (!isEmpty(inputParamsArr)) {
// 	// 	for (var i = 0; i < inputParamsArr.length; i++) {
// 	// 		var fieldPathArr = inputParamsArr[i].split("@");
// 	// 		var fieldPath = fieldPathArr[0];
// 	// 		var inputPath = fieldPathArr[1];
// 	// 		var fieldValue = "";

// 	// 		var rowsdataCheck = "";

// 	// 		if (!isEmpty(rowsdataCheck)) {
// 	// 			fieldValue = rowsdataCheck;
// 	// 		} else {
// 	// 			fieldValue = fieldPath;
// 	// 		}
// 	// 		criteriaRows[inputPath] = {
// 	// 			0: { operator: "=", operand: fieldValue },
// 	// 		};
// 	// 	}
// 	// }

// 	// if (type == "empty") {
// 	// 	if (isEmpty(eval("globValue.data." + processRowsPath))) {
// 	// 		eval("globValue.data." + processRowsPath + "=[]");
// 	// 	} else {
// 	// 		var rowsData = eval("globValue.data." + processRowsPath);
// 	// 		var newRowsData: any = {};
// 	// 		Object.keys(rowsData).forEach(function (key: any) {
// 	// 			const item = rowsData[key];
// 	// 			if (isNaN(key)) {
// 	// 				newRowsData[key] = rowsData[item];
// 	// 			}
// 	// 		});
// 	// 		eval("globValue.data." + processRowsPath + "=" + newRowsData);
// 	// 	}
// 	// }
// 	// for (var j = 0; j < mappingParamsArr.length; j++) {
// 	// 	var mappingPathArr = mappingParamsArr[j].split("@");
// 	// 	var dataviewPath = mappingPathArr[0].toLowerCase();
// 	// 	var processPath = mappingPathArr[1].toLowerCase();
// 	// 	var realpath = processPath.replaceAll(
// 	// 		processRowsPath.toLowerCase() + ".",
// 	// 		"",
// 	// 	);
// 	// 	mappingParamsData.push({
// 	// 		dataviewPath: dataviewPath.toLowerCase(),
// 	// 		processPath: realpath,
// 	// 	});
// 	// }
// 	// var getJson: any = {};
// 	// getJson.ignorePermission = "1";
// 	// getJson.criteria = criteriaRows;
// 	// getJson.systemmetagroupid = metaDataId;
// 	// result = await serverData("PL_MDVIEW_004", getJson);

// 	return "globData";
// };

export const getDetailRowCount = (childPath: any) => {
  // console.log("getDetailRowCount", childPath);
  // if (!isEmpty(globValue.data[childPath.toLowerCase()])) {
  //   let count = 0;
  //   let data = globValue.data[childPath.toLowerCase()];
  //   objectToArray(data).forEach((item: any, key: any) => {
  // 	if (typeof item == "object" && !isNaN(key)) {
  // 	  count++;
  // 	}
  //   });
  //   return count;
  // } else {
  //   return 0;
  // }
};

function convertFunctionAsync(str: any) {
  // var funcions = getFunctionsToString(str);
  var funtionNames = str.getNameMatch(/function[\s\n]+(\S+)[\s\n]*\(/gi);
  var returnVal = "";
  if (!isEmpty(funtionNames)) {
    for (const ind in funtionNames) {
      var func = getFunctioninString(funtionNames[ind], str);
      var convertedFunc = func
        ?.replace("function ", "processExpression.")
        .replace("(", "=async (formDataInitData")
        .replace(")", ")=>");
      str = str.replace(func, convertedFunc);
      str = str.replaceAll(
        funtionNames[ind] + "(",
        "await processExpression." + funtionNames[ind] + "("
      );
    }
  }
  return str;
}

export const convertFunctionToExpression = (str: any, varfnc: any) => {
  var funtionNames = str.getNameMatch(/(.*?)\(\)/gi);
  // console.log("varfunction funtionNames ", str);
  if (!isEmpty(funtionNames)) {
    for (const ind in funtionNames) {
      if (
        str.indexOf("await processExpression." + funtionNames[ind].trim()) ===
          -1 &&
        varfnc.indexOf("function " + funtionNames[ind].trim()) != -1
      ) {
        str = str.replaceAll(
          funtionNames[ind].trim() + "()",
          "await processExpression." +
            funtionNames[ind].trim() +
            "(formDataInitData)"
        );
      }
    }
  }

  // console.log("varfunction return ", str);
  return str;
};
export const kpiSetValue = (config: any, value: any) => {
  if (!isEmpty(value.templatedtlid)) {
    objectToArray(config.kpitemplate).forEach((template: any) => {
      if (!isEmpty(template.kpitemplateindicator)) {
        objectToArray(template.kpitemplateindicator).forEach(
          (indicator: any) => {
            if (
              !isEmpty(indicator.kpitemplatedtlfact) &&
              value.indicatorid == indicator.indicatorid
            ) {
              objectToArray(indicator.kpitemplatedtlfact).forEach(
                (fact: any) => {
                  if (fact.templatedtlid == value.templatedtlid) {
                    if (
                      !isEmpty(value[fact.parampath.toLowerCase()]) &&
                      isEmpty(fact.value)
                    ) {
                      fact.value = value[fact.parampath.toLowerCase()];
                    }
                    if (!isEmpty(value.id) && !isNaN(value.id)) {
                      fact.valueid = value.id;
                    }
                  }
                }
              );
            }
          }
        );
      }
    });
  }
};

/* aжиллуулах  */
/*const kpiSetValue = (config: any, value: any) => {
  if (!isEmpty(value.templatedtlid)) {
    objectToArray(config.kpitemplate).forEach((template: any) => {
      if (!isEmpty(template.kpitemplateindicator)) {
        objectToArray(template.kpitemplateindicator).forEach((indicator: any) => {
          if (
            !isEmpty(indicator.kpitemplatedtlfact) &&
            value.indicatorid == indicator.indicatorid
          ) {
            objectToArray(indicator.kpitemplatedtlfact).forEach((fact: any) => {
              if (fact.templatedtlid == value.templatedtlid) {
                if (!isEmpty(value[fact.parampath.toLowerCase()]) && isEmpty(fact.value)) {
                  fact.value = value[fact.parampath.toLowerCase()];
                }
                if (!isEmpty(value.id) && !isNaN(value.id)) {
                  fact.valueid = value.id;
                }
              }
            });
          }
        });
      }
    });
  }
};

export const createkpiConfig = (data: any, kpidmdtl: any, type: any) => {
  let KpiConfig = data;
  var copyConfig = kpidmdtl.kpiConfig;
  delete kpidmdtl.kpiConfig;
  if (!isEmpty(kpidmdtl)) {
    objectToArray(kpidmdtl).forEach((kpi: any) => {
      if (isObject(kpi)) {
        kpiSetValue(copyConfig, kpi);
      }
    });
  }
  kpidmdtl = {};
  kpidmdtl.kpiConfig = copyConfig;
  if (type == "2") {
    if (isEmpty(selectDataViewItemValue?.kpidmdtl)) {
      selectDataViewItemValue.kpidmdtl = {};
    }
    selectDataViewItemValue.kpidmdtl.kpiConfig = copyConfig;
  }
  try {
    objectToArray(copyConfig.kpitemplate).forEach((template: any) => {
      let kpitemplateindicatorArray: any = [];
      var defualtVal = "";
      var defualtValPath = "";
      template.kpitemplatefact.forEach((item: any) => {
        if (!isEmpty(item.defaultvalue)) {
          defualtVal = item.defaultvalue;
          defualtValPath = item.parampath;
        }
      });
      objectToArray(template.kpitemplateindicator).forEach((templates: any) => {
        // kpi set defualt values
        templates.ordernum = parseInt(templates.ordernum);
        if (templates.kpitemplatedtlfact) {
          objectToArray(templates.kpitemplatedtlfact).forEach((item: any) => {
            item.datatype = item.showtype;
            item.fieldpath = item.parampath;
            item.paramrealpath = item.parampath;
            if (!isEmpty(item.defaultvalue) || (!isEmpty(defualtVal) && !isEmpty(defualtValPath))) {
              if (!isEmpty(item.defaultvalue)) {
                defualtVal = item.defaultvalue;
              }
              if (defualtValPath == item.parampath && isEmpty(item.value)) {
                item.value = defualtVal;
              }
              //kpiSetDefualtValue(templates, item);
            }
          });
        }
        kpitemplateindicatorArray.push(templates);
      });
      template.kpitemplateindicator = kpitemplateindicatorArray;
      // kpi expertions run;
      if (!isEmpty(template.varfncexpressionstring)) {
        let varfn = expressionConvert(
          JSON.stringify({}),
          template.varfncexpressionstring,
          "globValue.data.",
          JSON.stringify(globValue.data),
          "config.attrLink",
          globValue.mainConfig,
        );
        // var str = kpiExpressionConvert(
        //   "$scope.kpiExpertions.",
        //   template.varfncexpressionstring.toLowerCase(),
        //   JSON.stringify($scope.kpiExpertions),
        // );
        // var expjson = getVariableinString(str);
        // if (!isEmpty(expjson.variable)) {
        //   eval.apply(null, [expjson.variable]);
        // }
        // eval(expjson.strVal);
      }
      if (!isEmpty(template.eventexpressionstring)) {
        // var str = kpiExpressionConvert(
        //   "$scope.kpiExpertions.",
        //   template.eventexpressionstring.toLowerCase(),
        //   JSON.stringify($scope.kpiExpertions),
        // );
        // var expjson = getVariableinString(str);
        // if (!isEmpty(expjson.variable)) {
        //   eval.apply(null, [expjson.variable]);
        // }
        // eval(expjson.strVal);
      }
      //if (!isEmpty(template.saveexpressionstring)) {
      //}
    });
  } catch (ex) {
    // $.alertConfig("KPI Expression");
  }
  if (type == "2") {
    ShowKpiModel({...data, type});
    // $rootScope.KpiConfig = data;
    // $scope.showModelRowsDtl("kpi");
  } else {
    //$rootScope.ItemDtlData.kpidmdtl.KpiConfig.kpitemplate = copyConfig.kpitemplate;
    globValue.KpiConfig = {...data, type};
    //$rootScope.ItemDtlData.kpidmdtl.KpiConfig = copyConfig;
  }
};

----------------HELPER FUNCTION-----------------------
function renderKpiJson(kpiconf: any) {
  var kpiarray: any = [];
  objectToArray(kpiconf.kpitemplate).forEach((template: any) => {
    objectToArray(template.kpitemplateindicator).forEach((indicator: any) => {
      var row: any = {};
      row.roottemplateid = kpiconf.id;
      row.dimensionid = indicator.dimensionid;
      row.indicatorid = indicator.indicatorid;
      if (!isEmpty(indicator.kpitemplatedtlfact)) {
        row.templatedtlid = indicator.kpitemplatedtlfact[0].templatedtlid;
        objectToArray(indicator.kpitemplatedtlfact).forEach((fact: any) => {
          if (fact.parampath) {
            if (fact.showtype == "check" && fact.isrequired == "1" && fact.defaultvalue == "0") {
              fact.defaultvalue = "";
            }
            row[fact.parampath] = fact.defaultvalue;
            if (!isEmpty(fact.valueid)) {
              row.id = fact.valueid;
            }
          }
        });
      }
      kpiarray.push(row);
    });
  });
  return kpiarray;
}

function checkKpiConfig(config: any, itemData: any) {
  var kpisConfig: any = [];
  config?.forEach(function (item: any) {
    if (item.paramname.toLowerCase() == "kpidmdtl") {
      kpisConfig.push(item);
    }
  });
  if (kpisConfig.length > 0) {
    kpisConfig?.forEach(function (item: any) {
      var path = item.paramrealpath.toLowerCase();
      var pathArray = path.split(".");
      if (pathArray.length > 1) {
        itemData = createKpiJson(path.substr(0, path.lastIndexOf(".")), itemData);
      } else {
        itemData = createKpiJson(null, itemData);
      }
    });
  }
  return itemData;
}

function createKpiJson(path: any, itemData: any) {
  if (isEmpty(path)) {
    if (!isEmpty(itemData.kpidmdtl) && !isEmpty(itemData.kpidmdtl.kpiConfig)) {
      var reqiured: any = {};
      reqiured = itemData.kpidmdtl;
      delete reqiured.config;
      itemData.kpidmdtl = renderKpiJson(itemData.kpidmdtl.kpiConfig);
      Object.keys(itemData.kpidmdtl)?.forEach(function (key)
 {
        reqiured[key] = itemData.kpidmdtl[key];
      });
      itemData.kpidmdtl = reqiured;
    }
  } else if (!isEmpty(itemData[path])) {
    itemData[path]?.forEach(function (value: any) {
      if (!isEmpty(value) && isObject(value)) {
        if (!isEmpty(value.kpidmdtl) && !isEmpty(value.kpidmdtl.kpiConfig)) {
          //var kpiarray = [];
          var kpicon = value.kpidmdtl.kpiConfig;
          value.kpidmdtl = renderKpiJson(value.kpidmdtl.kpiConfig);
          //angular?.forEach(kpicon.kpitemplate, function (template) {
          //    var row = {};
          //    row.roottemplateid = template.id;
          //    angular?.forEach(template.kpitemplateindicator, function (indicator) {
          //        row.dimensionid = indicator.dimensionid;
          //        row.indicatorid = indicator.indicatorid;
          //        row.templatedtld = indicator[0].templatedtlid;
          //        angular?.forEach(indicator.kpitemplatedtlfact, function (fact) {
          //            if (fact.parampath) {
          //                row[fact.parampath] = fact.value;
          //            }
          //        })
          //    })
          //    kpiarray.push(row);
          //})
        }
      }
    });
  }
  return itemData;
}

*/

export const createkpiConfig = (data: any, type: any) => {
  let KpiConfig = data;

  // console.log("kpi config", KpiConfig);
  // if (type == "2") {
  //   if (isEmpty(selectDataViewItemValue?.kpidmdtl)) {
  // 	selectDataViewItemValue.kpidmdtl = {};
  //   }
  //   selectDataViewItemValue.kpidmdtl.kpiConfig = copyConfig;
  // }
  // try {
  objectToArray(KpiConfig.kpitemplate).forEach((template: any) => {
    let kpitemplateindicatorArray: any = [];
    var defualtVal = "";
    var defualtValPath = "";

    // template?.kpitemplatefact?.forEach((item: any) => {
    // 	if (!isEmpty(item.defaultvalue)) {
    // 		defualtVal = item.defaultvalue;
    // 		defualtValPath = item.parampath;
    // 	}
    // });

    objectToArray(template.kpitemplateindicator).forEach((templates: any) => {
      // kpi set defualt values
      templates.ordernum = parseInt(templates.ordernum);
      if (templates?.kpitemplatedtlfact) {
        objectToArray(templates.kpitemplatedtlfact).forEach((item: any) => {
          item.datatype = item.showtype;
          item.fieldpath = item.parampath;
          item.paramrealpath = item.parampath;
          if (
            !isEmpty(item.defaultvalue) ||
            (!isEmpty(defualtVal) && !isEmpty(defualtValPath))
          ) {
            if (!isEmpty(item.defaultvalue)) {
              defualtVal = item.defaultvalue;
            }
            if (defualtValPath == item.parampath && isEmpty(item.value)) {
              item.value = defualtVal;
            }
            //kpiSetDefualtValue(templates, item);
          }
        });
      }
      kpitemplateindicatorArray.push(templates);
    });
    template.kpitemplateindicator = kpitemplateindicatorArray;
    // console.log("new item ", template);

    //if (!isEmpty(template.saveexpressionstring)) {
    //}
  });
  // } catch (ex) {
  // 	// $.alertConfig("KPI Expression");
  // }

  // if (type == "2") {
  //   ShowKpiModel({...data, type});
  //   // $rootScope.KpiConfig = data;
  //   // $scope.showModelRowsDtl("kpi");
  // } else {
  //   //$rootScope.ItemDtlData.kpidmdtl.KpiConfig.kpitemplate = copyConfig.kpitemplate;
  //   globValue.KpiConfig = {...data, type};
  //   //$rootScope.ItemDtlData.kpidmdtl.KpiConfig = copyConfig;
  // }
  // console.log("kpi config", KpiConfig.kpitemplate);
  return KpiConfig.kpitemplate;
};

function checkKpiConfig() {
  var kpisConfig: any = [];

  return true;
}

// mobKpiTemplateGetDV_004
