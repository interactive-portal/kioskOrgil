import * as CryptoJS from "crypto-js";
import _ from "lodash";

export function parseBoolInt(str) {
  if (str.length == null) {
    return str == true ? 1 : 0;
  } else {
    return str == "true" ? true : false;
  }
}
export function getFullUrl(req, fallback) {
  //server side request object(req)
  if (req) {
    return req.protocol + "://" + req.get("host") + req.originalUrl;
  } //making sure we are on the client side
  else if (!(typeof window === "undefined")) {
    return window.location.href;
  } else {
    return fallback;
  }
}

export function isEmpty(str) {
  return !str || 0 === str.length;
}

String.prototype.getNameMatch = function (regexp) {
  var matches = [];
  this.replace(regexp, function () {
    var arr = [].slice.call(arguments, 0);
    arr.splice(-2);
    var name = arr[1];
    if (name.indexOf("(") > -1) {
      name = name.substr(0, name.indexOf("("));
    }
    matches.push(name);
  });
  return matches.length ? matches : null;
};

export function checkDVCriteria(json) {
  if (!isEmpty(json)) {
    for (const key in json) {
      var obj = json[key];
      if (
        isEmpty(obj) ||
        (isEmpty(obj[0].operand) && obj[0].operator != "IS NULL")
      ) {
        delete json[key];
      }
    }
    return json;
  } else {
    return json;
  }
}

export function registerNumberToDate(str) {
  var x = 0;
  var y = 0;
  var z = 0;
  var today = new Date();
  var yy = today.getFullYear();
  var ages = 0;
  var odd = 0;
  var gender = "";

  x = str.substr(2, 2);
  y = str.substr(4, 2);
  z = str.substr(6, 2);

  // 01102210
  if (y > 20) {
    x = 2000 + parseInt(x);
    y = y - 20;
  } else x = 1900 + parseInt(x);
  ages = parseInt(yy) - parseInt(x);
  gender = parseInt(str.substr(8, 1)) % 2;
  if (!gender) gender = "2";
  else gender = "1";

  odd = parseInt(str.substr(8, 1)) % 2;
  var dateOfBirth = x + "-" + y + "-" + z;
  var year = parseInt(dateOfBirth.substr(0, 4));

  return { year, dateOfBirth, ages, gender };
}

export function getLocalStorageGet(string) {
  if (localStorage) {
    return localStorage.getItem(string);
  }
}

export function isUrlPath(string) {
  var res = string.match(
    /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  return res !== null;
}
export function strtotime(str, now) {
  //preg_replace('/data:([A-Za-z0-9_.\\/\-;:]+)base64,/s', '', $templateHTML);
  var i,
    match,
    s,
    strTmp = "",
    parse = "";
  strTmp = str.replace(/[A-Za-z]/g, "") + " " + str.replace(/[0-9-+]/g, "");
  strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, " "); // unecessary spaces
  strTmp = strTmp.replace(/[\t\r\n]/g, ""); // unecessary chars

  if (strTmp == "now") {
    return new Date().getTime();
  } else if (!isNaN((parse = Date.parse(strTmp)))) {
    return parse / 1000;
  } else if (now) {
    now = new Date(now);
  } else {
    now = new Date();
  }

  strTmp = strTmp.toLowerCase();

  var process = function (m) {
    var ago = m[2] && m[2] == "ago";
    var num = (num = m[0] == "last" ? -1 : 1) * (ago ? -1 : 1);

    switch (m[0]) {
      case "last":
      case "next":
        switch (m[1].substring(0, 3)) {
          case "year":
            now.setFullYear(now.getFullYear() + num);
            break;
          case "month":
            now.setMonth(now.getMonth() + num);
            break;
          case "week":
            now.setDate(now.getDate() + num * 7);
            break;
          case "day":
            now.setDate(now.getDate() + num);
            break;
          case "hourse":
            now.setHours(now.getHours() + num);
            break;
          case "min":
            now.setMinutes(now.getMinutes() + num);
            break;
          case "sec":
            now.setSeconds(now.getSeconds() + num);
            break;
          default:
            var day;
            if (typeof (day = [m[1].substring(0, 3)]) != "undefined") {
              var diff = day - now.getDay();
              if (diff == 0) {
                diff = 7 * num;
              } else if (diff > 0) {
                if (m[0] == "last") diff -= 7;
              } else {
                if (m[0] == "next") diff += 7;
              }

              now.setDate(now.getDate() + diff);
            }
        }

        break;

      default:
        if (/\d+/.test(m[0])) {
          num *= parseInt(m[0]);

          switch (m[1].substring(0, 3)) {
            case "yea":
              now.setFullYear(now.getFullYear() + num);
              break;
            case "mon":
              now.setMonth(now.getMonth() + num);
              break;
            case "wee":
              now.setDate(now.getDate() + num * 7);
              break;
            case "day":
              now.setDate(now.getDate() + num);
              break;
            case "hou":
              now.setHours(now.getHours() + num);
              break;
            case "min":
              now.setMinutes(now.getMinutes() + num);
              break;
            case "sec":
              now.setSeconds(now.getSeconds() + num);
              break;
          }
        } else {
          return false;
        }

        break;
    }

    return true;
  };

  var __is = {
    day: {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    },
    mon: {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    },
  };

  match = strTmp.match(
    /^(\d{2,4}-\d{2}-\d{2})(\s\d{1,2}:\d{1,2}(:\d{1,2})?)?$/
  );

  if (match != null) {
    if (!match[2]) {
      match[2] = "00:00:00";
    } else if (!match[3]) {
      match[2] += ":00";
    }

    s = match[1].split(/-/g);

    for (i in __is.mon) {
      if (__is.mon[i] == s[1] - 1) {
        s[1] = i;
      }
    }

    return strtotime(s[2] + " " + s[1] + " " + s[0] + " " + match[2]);
  }

  var regex =
    "([+-]?\\d+\\s" +
    "(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?" +
    "|sun.?|sunday|mon.?|monday|tue.?|tuesday|wed.?|wednesday" +
    "|thu.?|thursday|fri.?|friday|sat.?|saturday)" +
    "|(last|next)\\s" +
    "(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?" +
    "|sun.?|sunday|mon.?|monday|tue.?|tuesday|wed.?|wednesday" +
    "|thu.?|thursday|fri.?|friday|sat.?|saturday))" +
    "(\\sago)?";

  match = strTmp.match(new RegExp(regex, "g"));

  if (match == null) {
    return false;
  }

  for (i in match) {
    if (!process(match[i].split(" "))) {
      return false;
    }
  }

  return now;
}

export function formatDate(val, row) {
  if (val == null) {
    return null;
  } else {
    var date = new Date(val);
    var ms = date.getMonth() + 1 + "";
    if (date.getMonth() + 1 < 10) ms = "0" + ms;

    var ds = date.getDate() + "";
    if (date.getDate() < 10) ds = "0" + ds;
    return date.getFullYear() + "-" + ms + "-" + ds;
  }
}

export function getFormatDateAndTime(date) {
  date = new Date(date);
  var ms = date.getMonth() + 1 + "";
  if (date.getMonth() + 1 < 10) ms = "0" + ms;

  var ds = date.getDate() + "";
  if (date.getDate() < 10) ds = "0" + ds;

  var hs = date.getHours() + "";
  if (date.getHours() < 10) hs = "0" + hs;

  var minutes = date.getMinutes() + "";
  if (date.getMinutes() < 10) minutes = "0" + minutes;

  var secs = date.getSeconds() + "";
  if (date.getSeconds() < 10) secs = "0" + secs;
  var str =
    date.getFullYear() +
    "-" +
    ms +
    "-" +
    ds +
    " " +
    hs +
    ":" +
    minutes +
    ":" +
    secs;

  return str;
}

export function getDaysInMonth(m, y) {
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

export function getDefaultValue(valueStr, userInfo) {
  const loginUserInfo = userInfo;

  var mat = valueStr.match(/\[(.*?)\]/g);
  var value = valueStr.replace(mat, "");

  if (value === "") {
    return null;
  }
  var copeDefualtValue = value;
  var lowerValue = value.trim().toLowerCase();

  if (lowerValue === "sysdate") {
    if (!isEmpty(mat)) {
      var month = mat[0]?.replace("[", "").replace("]", "");
      sysdate = strtotime(month, new Date());
      return formatDate(sysdate);
    } else {
      return formatDate(new Date());
    }
  } else if (lowerValue === "systime") {
    return getFormatDateAndTime(new Date()).substr(11, 8);
  } else if (lowerValue === "sysdatetime") {
    return getFormatDateAndTime(new Date());
  } else if (lowerValue === "sysyear") {
    return new Date().getFullYear();
  } else if (lowerValue === "sysmonth") {
    return new Date().getMonth() + 1;
  } else if (lowerValue === "sysday") {
    return new Date().getDay;
  } else if (lowerValue === "sysyearstart") {
    return formatDate(new Date().getFullYear() + "/01/01");
  } else if (lowerValue === "sysyearend") {
    return formatDate(new Date().getFullYear() + "/12/31");
  } else if (lowerValue === "sysmonthstart") {
    var thisMonth = new Date().getMonth() + 1;
    if (!isEmpty(mat)) {
      var month = mat[0].replace("[", "").replace("]", "");
      var sysdate = strtotime(
        month,
        formatDate(new Date().getFullYear() + "/" + thisMonth + "/" + "01")
      );
      return formatDate(sysdate);
    } else {
      return formatDate(
        new Date().getFullYear() + "/" + thisMonth + "/" + "01"
      );
    }
  } else if (lowerValue === "sysmonthend") {
    var thisMonth = new Date().getMonth() + 1;
    return formatDate(
      new Date().getFullYear() +
        "/" +
        thisMonth +
        "/" +
        getDaysInMonth(new Date().getFullYear(), thisMonth)
    );
  } else if (lowerValue === "sessionuserid") {
    return loginUserInfo.id;
  } else if (lowerValue === "sessionmembershipid") {
    return loginUserInfo.membershipid;
  } else if (lowerValue === "sessionemployeeid") {
    return loginUserInfo.employeeid;
  } else if (lowerValue === "sessioncustuserid") {
    return loginUserInfo.sessionCustUserId;
  } else if (lowerValue === "sessionphone") {
    return loginUserInfo.readyProfile.phone;
  } else if (lowerValue === "sessionpersonname") {
    return loginUserInfo.readyProfile.name;
  } else if (lowerValue === "sessionemail") {
    return loginUserInfo.readyProfile.email;
  } else if (lowerValue === "sessionpositionkeyid") {
    return 1;
  } else if (lowerValue === "sessiondepartmentid") {
    return loginUserInfo.departmentid;
  } else if (lowerValue === "sessioncustomerid") {
    return loginUserInfo?.crmuserid;
  } else {
    return copeDefualtValue;
  }
}

// export function getImageUrl(data, localImage, item) {
// 	var image = "";
// 	if (
// 		!isEmpty(data) &&
// 		data.lastIndexOf("♠") != -1 &&
// 		isBase64(data.substr(data.lastIndexOf("♠") + 1, data.length))
// 	) {
// 		var mimeType = data.substr(0, data.lastIndexOf("♠"));
// 		if (!isEmpty(item) && !isEmpty(item["filethumbnail"])) {
// 			mimeType = "filethumbnail";
// 		}
// 		switch (mimeType) {
// 			case "filethumbnail":
// 				image =
// 					"data:" +
// 					getToMimeType(
// 						item["filethumbnail"].substr(0, data.lastIndexOf("♠")),
// 					) +
// 					";base64," +
// 					item["filethumbnail"].substr(
// 						item["filethumbnail"].lastIndexOf("♠") + 1,
// 						item["filethumbnail"].length,
// 					);
// 				break;
// 			case "pdf":
// 				image = "img/icons/icon_pdf.png";
// 				break;
// 			case "xlsx":
// 				image = "img/icons/icon_excel.png";
// 				break;
// 			case "docx":
// 				image = "img/icons/icon_word.png";
// 				break;
// 			case "doc":
// 				image = "img/icons/icon_word.png";
// 				break;
// 			case "pptx":
// 				image = "img/icons/icon_ppt.png";
// 				break;
// 			case "mp4":
// 				image = "img/icons/icon_video.png";
// 				break;
// 			case "mp3":
// 				image = "img/icons/icon_mp3.png";
// 				break;
// 			default:
// 				image =
// 					"data:" +
// 					getToMimeType(mimeType) +
// 					";base64," +
// 					data.substr(data.lastIndexOf("♠") + 1, data.length);
// 		}
// 		return image;
// 	} else {
// 		if (!isEmpty(data)) {
// 			var mimeType = data.substr(data.lastIndexOf(".") + 1, data.length);
// 			if (!isEmpty(item) && !isEmpty(item["filethumbnail"])) {
// 				mimeType = "filethumbnail";
// 			}
// 			switch (mimeType) {
// 				case "filethumbnail":
// 					image = image = url.imageUrl + "" + item["filethumbnail"];
// 					break;
// 				case "pdf":
// 					image = "img/icons/icon_pdf.png";
// 					break;
// 				case "xlsx":
// 					image = "img/icons/icon_excel.png";
// 					break;
// 				case "docx":
// 					image = "img/icons/icon_word.png";
// 					break;
// 				case "doc":
// 					image = "img/icons/icon_word.png";
// 					break;
// 				case "pptx":
// 					image = "img/icons/icon_ppt.png";
// 					break;
// 				case "mp4":
// 					image = "img/icons/icon_video.png";
// 					break;
// 				case "mp3":
// 					image = "img/icons/icon_mp3.png";
// 					break;
// 				default:
// 					if (!isEmpty(url.javaUrl)) {
// 						let sessionId;
// 						getLocalStorage("loginUser", "").then(
// 							(res) => (sessionId = res.sessionid),
// 						);
// 						var dd = {
// 							sessionId: sessionId,
// 							command: "getPhysicalFile",
// 							parameters: { physicalPath: data },
// 						};
// 						return (image =
// 							url.javaUrl + "runGetFile?pJsonString=" + JSON.stringify(dd));
// 					} else {
// 						return url.imageUrl + "" + data;
// 					}
// 			}

// 			return image;
// 		}
// 		if (localImage) {
// 			return localImage;
// 		} else {
// 			return "";
// 		}
// 	}
// }

export function mergeJsonObjs(def, obj) {
  if (typeof obj == "undefined" || !isObject(obj)) {
    return def;
  } else if (typeof def == "undefined" || !isObject(def)) {
    return obj;
  }
  for (var i in obj) {
    if (obj[i] != null && isObject(obj[i])) {
      def[i] = mergeJsonObjs(def[i], obj[i]);
    } else {
      if (!isEmpty(obj[i])) {
        if (isObject(def[i])) {
          def[i] = mergeJsonObjs(def[i], obj[i]);
        } else {
          def[i] = obj[i];
        }
      }
    }
  }
  return def;
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function checkIsRequired(row, itempath, ItemData) {
  var pathValue = null;
  if (
    row.isrequired == "1" ||
    eval("ItemData." + row.paramrealpath.toLowerCase() + "isrequired") == "1"
  ) {
    eval("pathValue =" + itempath);
    if (row.datatype == "boolean" && (isEmpty(pathValue) || pathValue == "0")) {
      return false;
    } else if (
      isEmpty(pathValue) ||
      pathValue == "undefined" ||
      (typeof pathValue == "object" && Object.keys(pathValue).length == 0)
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function createJson(
  itempath,
  jsonpath,
  jsonRow,
  config,
  getrow,
  ItemData,
  row,
  json
) {
  try {
    if (jsonRow) {
      if (checkIsRequired(row, itempath, ItemData)) {
        var checkVar = jsonpath.substr(0, jsonpath.lastIndexOf("."));
        if (
          row.datatype == "time" &&
          eval(itempath.substr(0, itempath.lastIndexOf("."))) &&
          eval(itempath)
        ) {
          var timeValue = eval(itempath);
          if (!isEmpty(timeValue)) {
            if (timeValue.length == 5) {
              var ss = itempath + " = '1999-01-01 " + timeValue + ":00'";
              eval(ss);
            }
          }
        }
        if (
          row.datatype == "datetime" &&
          eval(itempath.substr(0, itempath.lastIndexOf("."))) &&
          eval(itempath)
        ) {
          var timeValue = eval(itempath);
          if (!isEmpty(timeValue)) {
            if (timeValue.length == 16) {
              var ss = itempath + " ='" + timeValue + ":00'";
              eval(ss);
            }
          }
        }
        //if ((row.datatype == "base64" || row.datatype == 'file') && eval(itempath.substr(0, itempath.lastIndexOf("."))) && eval(itempath)) {
        //    var filePath = eval(itempath);
        //    if (!isEmpty(filePath) && isObject(filePath)) {
        //        if (!isEmpty(filePath) && isObject(filePath)) {
        //            var ss = itempath + " ='" + filePath.basedata + "'"
        //            eval(ss)
        //        }
        //        //    if (timeValue.length == 16) {
        //        //        var ss = itempath + " ='" + timeValue + ":00'"
        //        //        eval(ss)
        //        //    }
        //    }
        //}
        try {
          if (
            row.datatype != "group" &&
            eval(
              "typeof " +
                itempath.substr(0, itempath.lastIndexOf(".")) +
                '!= "undefined"'
            ) &&
            eval("typeof " + itempath + '!= "undefined"') &&
            eval("typeof " + itempath + '!= "object"')
          ) {
            if (
              eval(checkVar.replace(checkVar.match(/\[(.*?)\]/g), "")) ==
              undefined
            ) {
              eval(checkVar.replace(checkVar.match(/\[(.*?)\]/g), "") + "={}");
            }
            if (eval(checkVar) == undefined) {
              eval(jsonpath.substr(0, jsonpath.lastIndexOf(".")) + "={}");
            }
            eval(
              "if(" +
                itempath +
                "){" +
                jsonpath +
                "=" +
                itempath +
                ".toString()}"
            );
          } else if (
            row.datatype != "group" &&
            eval(
              itempath.substr(0, itempath.lastIndexOf(".")).replace("[0]", "")
            ) != undefined &&
            eval(itempath.replace("[0]", "")) != undefined
          ) {
            if (
              eval(checkVar.replace(checkVar.match(/\[(.*?)\]/g), "")) ==
              undefined
            ) {
              eval(checkVar.replace(checkVar.match(/\[(.*?)\]/g), "") + "={}");
            }
            if (eval(checkVar) == undefined) {
              eval(jsonpath.substr(0, jsonpath.lastIndexOf(".")) + "={}");
            }
            eval(
              jsonpath.replace("[0]", "") + "=" + itempath.replace("[0]", "")
            );
          } else if (
            row.datatype == "group" &&
            eval(itempath.substr(0, itempath.lastIndexOf("."))) !== undefined
          ) {
            if (eval(itempath + "combo") !== undefined) {
              eval(jsonpath + "=" + itempath + "combo");
            } else if (itempath.split(".").length > 2) {
              eval(jsonpath + "=" + itempath);
            }
          }
        } catch (ex) {
          return json;
        }
      } else {
        json = "error";
      }
    }
    return json;
  } catch (ex) {
    return json;
  }
}

export function isObject(object) {
  if (
    object !== null &&
    typeof object === "object" &&
    Object.keys(object).length > 0
  ) {
    return true;
  } else {
    return false;
  }
}

export const getFieldTypes = (field) => {
  switch (field.datatype) {
    case "string":
      field.type = "text";
      break;
    case "long":
      field.type = "input";
      break;
    case "button":
      field.type = "button";
      break;
    case "group":
      field.type = "list";
      break;
    case "file":
      field.type = "image";
      break;
    case "description_auto":
      field.type = "text";
      break;
    case "text_editor":
      field.type = "textEditor";
      break;
    default:
      break;
  }
  return field;
};

export const boxShadow = () => {
  return {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  };
};

export const removeAggregate = (json) => {
  if (!isEmpty(json)) {
    delete json.aggregatecolumns;
    delete json.paging;
  }
  return json;
};

export const htmlDecode = (str) => {
  let html = decode(str, { level: "html5" });
  html = html.replace(
    /(<img[^]+?src=")(?!http|https:\/\/)(.*?)"/gi,
    "$1" + url.imageUrl + '$2"'
  );
  return html;
};

export const getRowItems = (field, array) => {
  let rows = [];
  array.forEach((element, index) => {
    const path = element.paramrealpath;
    var rowsfield = path.substr(0, path.lastIndexOf("."));
    if (rowsfield == field.paramrealpath) {
      rows.push(element);
    }
  });
  return rows;
};

export const dtlToSectionDtl = (field, array) => {
  let rows = [];
  array.forEach((element, index) => {
    const path = element.paramrealpath;
    var rowsfield = path.substr(0, path.lastIndexOf("."));
    if (rowsfield == field.paramrealpath && element.themepositionno) {
      rows.push({
        fieldpath: element.paramname,
        positionname: "position" + element.themepositionno,
        otherattr: "",
      });
    }
  });
  return rows;
};

export const objectToArray = (value) => {
  const valueArray = [];
  if (isEmpty(value) || Array.isArray(value)) {
    return value;
  } else {
    Object.keys(value).forEach((key) => {
      valueArray.push(value[key]);
    });
    return valueArray;
  }
};
//======================================== Json Search value ===========================
export const searchJsonValue = (jsObj, fieldrow, fieldValue) => {
  return Object.keys(jsObj)
    .filter(function (x) {
      if (!isEmpty(jsObj[x]) && !isEmpty(jsObj[x][fieldrow])) {
        return jsObj[x][fieldrow].toLowerCase() == fieldValue;
      }
    })
    ?.map(function (x) {
      return x;
    });
};
export const searchJsonValueGet = (jsObj, fieldrow, fieldValue) => {
  return jsObj.filter(function (jsObj) {
    return jsObj[fieldrow].toLowerCase() == fieldValue.toLowerCase();
  });
};
export const mergeWidget = (widget, config, mainConfig) => {
  widget.forEach((widgetItem, index) => {
    var checkPosition = false;
    config.forEach((item) => {
      if (widgetItem.position == item.themepositionno) {
        // item = _.merge(item, widgetItem);
        // item = {...item, ...widgetItem};
        item = Object.assign(item, widgetItem);
        checkPosition = true;
      }
    });
    config.sort(function (a, b) {
      return a.position - b.position;
    });
    if (!checkPosition && mainConfig.isDataView == "1") {
      config[index] = _.merge(widgetItem, config[index]);
    }
  });
  return config;
};

// export function replaceAll(str, find, replace) {
//   var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
//   return str.replace(new RegExp(escapedFind, "g"), replace);
// }
// String.prototype.replaceAll = function (str1, str2, ignore) {
//   return this.replace(
//     new RegExp(
//       str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
//       ignore ? "gi" : "g"
//     ),
//     typeof str2 === "string" ? str2.replace(/\$/g, "$$$$") : str2
//   );
// };

//======================================== PROCESS IUNPUT JSON CREATER ===========================
// kpi column name
export function renderKpiHeaderJson(kpiconf) {
  // console.log("% kpiconf", kpiconf);
  var kpiarray = [];
  // objectToArray(kpiconf).forEach((template) => {

  objectToArray(kpiconf.kpitemplatefact).forEach((indicator, i) => {
    var row = {};
    row.Header = indicator.labelname;
    row.accessor = indicator.parampath;

    kpiarray.push(row);
  });

  return kpiarray;
}
export function renderKpiJson(kpiconf) {
  // console.log("dddd kpiconf", kpiconf);
  var kpiarray = [];
  objectToArray(kpiconf.kpitemplateindicator).forEach((indicator, i) => {
    var row = {};
    row.key = i + 1;
    row.dimensionid = indicator.dimensionid;
    row.indicatorid = indicator.indicatorid;
    row.name = indicator.indicatorname;

    if (!isEmpty(indicator.kpitemplatedtlfact)) {
      row.templatedtlid = indicator.kpitemplatedtlfact[0].templatedtlid;
      objectToArray(indicator.kpitemplatedtlfact).forEach((fact) => {
        // console.log("dddd kpiconf", fact);
        row.showtype = fact.showtype;
        row.labelname = fact.labelname;
        row.parampath = fact.parampath;
        if (fact.lookupmetadataid) {
          row.lookupmetadataid = fact.lookupmetadataid;
          row.lookupcriteria = fact.lookupcriteria;
          row.ordernum = fact.ordernum;
        }
        if (fact.parampath) {
          if (
            fact.showtype == "check" &&
            fact.isrequired == "1" &&
            fact.defaultvalue == "0"
          ) {
            fact.defaultvalue = "";
          }
          row[fact.parampath] = fact.showtype;
          // "lookupmetadataid": "",
          // "lookupcriteria": "",
          // "aggregationgroup": "",
          // "aggregationsummary": "",
          // "defaultvalue": "",
          // "templateid": "16280445720211",
          // "parampath": "fact1",
          // "labelname": "Хариулт",
          // "ordernum": "1"
          if (!isEmpty(fact.valueid)) {
            row.id = fact.valueid;
          }
        }
      });
    }
    kpiarray.push(row);
  });
  return kpiarray;
}

function checkKpiConfig(config, itemData) {
  var kpisConfig = [];
  config.forEach(function (item) {
    if (item.paramname.toLowerCase() == "kpidmdtl") {
      kpisConfig.push(item);
    }
  });
  if (kpisConfig.length > 0) {
    kpisConfig.forEach(function (item) {
      var path = item.paramrealpath.toLowerCase();
      var pathArray = path.split(".");
      if (pathArray.length > 1) {
        itemData = createKpiJson(
          path.substr(0, path.lastIndexOf(".")),
          itemData
        );
      } else {
        itemData = createKpiJson(null, itemData);
      }
    });
  }
  return itemData;
}

function createKpiJson(path, itemData) {
  if (isEmpty(path)) {
    if (!isEmpty(itemData.kpidmdtl) && !isEmpty(itemData.kpidmdtl.kpiConfig)) {
      var reqiured = {};
      reqiured = itemData.kpidmdtl;
      delete reqiured.config;
      itemData.kpidmdtl = renderKpiJson(itemData.kpidmdtl.kpiConfig);
      Object.keys(itemData.kpidmdtl).forEach(function (key) {
        reqiured[key] = itemData.kpidmdtl[key];
      });
      itemData.kpidmdtl = reqiured;
    }
  } else if (!isEmpty(itemData[path])) {
    itemData[path].forEach(function (value) {
      if (!isEmpty(value) && isObject(value)) {
        if (!isEmpty(value.kpidmdtl) && !isEmpty(value.kpidmdtl.kpiConfig)) {
          //var kpiarray = [];
          var kpicon = value.kpidmdtl.kpiConfig;
          value.kpidmdtl = renderKpiJson(value.kpidmdtl.kpiConfig);
          //angular.forEach(kpicon.kpitemplate, function (template) {
          //    var row = {};
          //    row.roottemplateid = template.id;
          //    angular.forEach(template.kpitemplateindicator, function (indicator) {
          //        row.dimensionid = indicator.dimensionid;
          //        row.indicatorid = indicator.indicatorid;
          //        row.templatedtld = indicator[0].templatedtlid;
          //        angular.forEach(indicator.kpitemplatedtlfact, function (fact) {
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

function checkSendJsonData(json, groupNames) {
  if (!isEmpty(groupNames) && json.error != "true") {
    try {
      groupNames.forEach(function (group) {
        if (group.recordtype == "rows") {
          if (
            eval(
              "typeof json." +
                group.paramrealpath.toLowerCase() +
                "!= 'undefined'"
            ) &&
            eval("!isEmpty(json." + group.paramrealpath.toLowerCase() + ")")
          ) {
            var dtl = eval("json." + group.paramrealpath.toLowerCase());
            Object.keys(dtl).forEach(function (key) {
              if (isNaN(key)) {
                eval("delete dtl." + key);
              }
            });
          }
        }
      });
      return json;
    } catch (ex) {
      return json;
    }
  } else return json;
}

export function createProcessInputJson(config, getrow, ItemData, groupNames) {
  // debugger;
  var json = {};
  try {
    ItemData = checkKpiConfig(config, ItemData);
    config.forEach(function (row) {
      var path = row[getrow];
      item = path.split(".");
      var itempath = "ItemData";
      var jsonpath = "json";
      var jsonRow = true;
      var rowsLength = 0;
      var checkObject = false;
      item.forEach(function (val, index) {
        val = val.toLowerCase();
        if (item.length > 1 && index == 0) {
          var groupcheck = searchJsonValue(config, "paramrealpath", val);
          if (!isEmpty(groupcheck)) {
            if (config[groupcheck[0]].datatype == "group") {
              var configPath =
                config[groupcheck[0]].paramrealpath.toLowerCase();
              if (!isEmpty(ItemData[configPath])) {
                rowsLength = Object.keys(ItemData[configPath]).length;
                var dd = itempath + "." + configPath + "[0]";
                if (!isEmpty(dd) && eval("typeof " + dd + "== 'object'")) {
                  checkObject = true;
                  itempath = itempath + "." + configPath + "[0]";
                  jsonpath = jsonpath + "." + configPath + "[0]";
                } else {
                  checkObject = false;
                  itempath = itempath + "." + configPath;
                  jsonpath = jsonpath + "." + configPath;
                }
              } else {
                jsonRow = false;
              }
            }
          }
        } else {
          if (index == item.length - 1 && rowsLength > 0 && checkObject) {
            for (var i = 0; i < rowsLength; i++) {
              var iont = i;
              if (i !== 0) {
                iont = iont - 1;
                itempath = itempath.replace("[" + iont + "]", "[" + i + "]");
                jsonpath = jsonpath.replace("[" + iont + "]", "[" + i + "]");
              } else {
                itempath =
                  itempath.replace("[" + iont + "]", "[" + i + "]") + "." + val;
                jsonpath =
                  jsonpath.replace("[" + iont + "]", "[" + i + "]") + "." + val;
              }
              json = createJson(
                itempath,
                jsonpath,
                jsonRow,
                config,
                getrow,
                ItemData,
                row,
                json
              );
              if (json == "error") {
                throw new Error('{"required":"' + row.labelname + '"}');
                //return { 'error': 'true', 'msg': row.labelname + "талбарын утга хоосон байна" };
                //break;
              }
            }
          } else {
            itempath = itempath + "." + val;
            jsonpath = jsonpath + "." + val;
            json = createJson(
              itempath,
              jsonpath,
              jsonRow,
              config,
              getrow,
              ItemData,
              row,
              json
            );
            if (json == "error") {
              throw new Error('{"required":"' + row.labelname + '"}');
            }
          }
        }
      });
    });
  } catch (err) {
    if (isJsonString(err.message)) {
      json = {
        error: "true",
        msg: JSON.parse(err.message).required + " талбарын утга хоосон байна",
      };
    }
  }
  return checkSendJsonData(json, groupNames);
}

export function toBoolean(x) {
  try {
    return !!JSON.parse(`${x}`.toLowerCase());
  } catch (e) {
    return !!x;
  }
}

//jagaa start

export function positionToPath(obj) {
  let resultObj = {};
  obj?.map(async (item) => {
    return (resultObj[item["positionname"]] = item);
  });
  return resultObj;
}

export function jsonParse(json, isDecode) {
  try {
    // return JSON.parse(json);
    return JSON.parse(isDecode ? decode(json) : json);
  } catch (ex) {
    return {};
  }
}

export function otherAttrToObj(props, type) {
  // let status = '';
  let attr = jsonParse(otherattr);
  // Object.keys(attr).forEach(function (property) {
  //   if (property = type) {
  //     status = attr[property]
  //   }
  // });
  return attr.type;
}

export function renderPositionType(item, key, positionConfig) {
  try {
    let posOttrAttr = jsonParse(positionConfig[key]?.["otherattr"] || {});

    if (posOttrAttr.url) {
      if (posOttrAttr.url.type === "link")
        return (
          <Link href={posOttrAttr.url.action}>
            {item[_.toLower(positionConfig[key]["fieldpath"])]}
          </Link>
        );
    }

    return item[_.toLower(positionConfig[key]["fieldpath"])];
  } catch (ex) {
    // console.log(`${key} position render error!`);
    // console.log(ex);
  }
}

export function getItemObject(item, key, positionConfig) {
  const value = item[_.toLower(positionConfig[key]?.fieldpath)] || "";
  const positionnemgoo = jsonParse(positionConfig[key]?.positionnemgoo || "{}");
  return { value, positionnemgoo };
}

export function wordToImage(str) {
  var img = str.replace(/:wave:\s*/g, <img src={wavinghand} />);
  return img;
}

//https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
// parentid array into children
export function parentidToChildren(
  arr,
  idfield = "id",
  parentidfield = "parentid"
) {
  let tree = [],
    mappedArr = {},
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  arr?.map((item, index) => {
    mappedArr[item[idfield]] = { ...item, children: [], isLeaf: true };
  });

  // console.log("mappedArr", mappedArr);

  for (let x in mappedArr) {
    if (mappedArr.hasOwnProperty(x)) {
      mappedElem = mappedArr[x];
      // If the element is not at the root level, add it to its parent array of children.
      // console.log("mappedElem", mappedElem);
      if (
        mappedElem[parentidfield] &&
        mappedElem[parentidfield] !== "null" &&
        !_.isEmpty(mappedElem[parentidfield])
      ) {
        // console.log("RRRRRR", mappedElem[parentidfield]);
        // console.log("SSSS", mappedArr[mappedElem[parentidfield]]);
        // console.log("SSSS mappedElem", mappedElem);

        if (mappedArr[mappedElem[parentidfield]]) {
          mappedArr[mappedElem[parentidfield]]?.children.push(mappedElem);
          mappedArr[mappedElem[parentidfield]].isLeaf = false;
        }
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }

  return tree;
}

//https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
export function listToTree(data, options) {
  options = options || {};
  var ID_KEY = options.idKey || "id";
  var PARENT_KEY = options.parentKey || "parentid";
  var CHILDREN_KEY = options.childrenKey || "children";
  var tree = [],
    childrenOf = {};
  var item, id, parentId;

  for (var i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || 0;
    // every item may have children
    childrenOf[id] = childrenOf[id] || [];
    // init its children
    item[CHILDREN_KEY] = childrenOf[id];
    if (parentId != 0 && parentId !== "null") {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || [];
      // push it into its parent's children object
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

//Бүх node-оор гүйж isOpen гэсэн element-ийг хэрвээ хүүхдэд байвал бүх эцгүүдэд онооно. Бусад эцгүүдэд isOpen=false олгоно.
export function prepareIsOpen(
  readyDatasrc,
  selectedId,
  positionConfig,
  selectedIsOpen = false
) {
  let newDatasrc = [...readyDatasrc];
  let found = false;
  readyDatasrc?.map((item, index) => {
    const selected = selectedId == item.id;

    // console.log(
    //   "selectedId :>> ",
    //   selectedId + "dd==" + item.id + "boolean" + selected
    // );
    // console.log("item :>> ", readyDatasrc);

    if (selected) {
      newDatasrc[index].isOpen = true;
    }

    if (item?.children) {
      let sss = prepareIsOpen(
        item?.children,
        selectedId,
        positionConfig,
        selectedIsOpen
      );
      if (sss[1]) {
        newDatasrc[index].isOpen = true;
        found = true;
      }
    }
  });

  return [newDatasrc, found];
}

// https://github.com/b4dnewz/string-template гэсэн сан байгаа.
// string дотор {str} байвал уг str-ийг объект дахь утгаар солино.
// url.path зам дээр "/devcloud/16342674214531?id={itemid}" гэсэн string ирнэ.
export function replaceTemplate(oldObject, Inputs, customParameters) {
  if (isEmpty(oldObject) || !Object.keys(oldObject).length) return {};

  let oldObjectString = JSON.stringify(oldObject);
  let relVariable = oldObjectString.match(/\{[^\}]*\}/g);

  for (let index in relVariable) {
    for (var s in Inputs) {
      if (!isObject(Inputs[s])) {
        oldObjectString = oldObjectString.replace("{" + s + "}", Inputs[s]);
      }
    }
  }

  // let result =
  //   template(JSON.stringify(oldObject), Inputs, {
  //     pattern: "{%s}",
  //     ignoreErrors: true,
  //     ...customParameters,
  //   }) || "{}";

  let result = JSON.parse(oldObjectString);
  return result;
}

// /devcloud/16342674214531?id={itemid}?{profilephoto}
// Inputs = {
// dffd:"dfsdfds"
// itemid: "48484848"
// profilephoto: "dfdfdfdf/sfesrewr.png"
// }

// /devcloud/16342674214531?id=48484848?dfdfdfdf/sfesrewr.png

export function queryStringToJSON(queryString) {
  if (queryString.indexOf("?") > -1) {
    queryString = queryString.split("?")[1];
  }
  var pairs = queryString.split("&");
  var result = {};
  pairs.forEach(function (pair) {
    pair = pair.split("=");
    result[pair[0]] = decodeURIComponent(pair[1] || "");
  });
  return result;
}

//jagaa end

export function Iframe(data) {
  return (
    <div dangerouslySetInnerHTML={{ __html: data.iframe ? data.iframe : "" }} />
  );
}

export function validateForm(fdata, processConfig) {
  let attr = _.values(processConfig.meta_process_param_attr_link_mobile);
  let validateArr = {};
  let validateMsg = {};

  attr?.map((item, index) => {
    if (
      item["isrequired"] == "1" &&
      item["paramrealpath"].indexOf(".") === -1 &&
      !fdata[item["paramrealpath"]]
    ) {
      validateArr[item["paramrealpath"]] = true;
    }
  });

  return validateArr;
}

export const functionNameReplace = (functionString) => {
  functionString = functionString.replace("function () {", "function(){");
  functionString = functionString.replace("function() {", "function(){");
  functionString = functionString.replace("function (){", "function(){");
  return functionString;
};

export const fieldHideShow = (config, expression) => {
  // console.log("Others", config);
  // console.log("expression", expression);
  if (config.paramrealpath.includes(".")) {
    const splitPath = config.paramrealpath.split(".");
    return (
      expression[splitPath[0]] &&
      expression[splitPath[0]][splitPath[1] + "hideShow"] === "hide"
    );
  } else {
    return expression[config?.paramrealpath + "hideShow"] === "hide";
  }
};

export const fieldDisableEnable = (config, expression) => {
  if (!expression) return "";
  if (config.paramrealpath.includes(".")) {
    const splitPath = config.paramrealpath.split(".");
    return (
      expression[splitPath[0]] &&
      expression[splitPath[0]][splitPath[1] + "disable"] === "disable"
    );
  } else {
    return expression[config.paramrealpath + "disable"] === "disable";
  }
};

export const getAtomValue = (
  config,
  formDataInitData,
  processConfig,
  rowIndex
) => {
  try {
    var paramName = config.paramrealpath.trim().toLowerCase();
    // let atomValue = formDataInitData[paramName];
    const getGroup = config.paramrealpath.split(".");
    // if ((paramName = "crm_ref_customer_address_dv.customerid")) {
    //   console.log("getGroup getGroup ", getGroup);
    //   console.log("getGroup config ", config);

    let formLocalData = JSON.parse(localStorage.getItem("memberData"));

    let atomValue = formLocalData[paramName];

    // if (paramName == "email") {
    //   atomValue = formLocalData["firstemail"];
    // } else if (paramName == "phonenumber") {
    //   atomValue = formLocalData["firstphone"];
    // }

    // console.log("formDataInitData ssss:>> ", paramName);
    // console.log("formDataInitData ssss:>> ", formLocalData);

    if (getGroup.length == 2) {
      if (
        processConfig["__groupPath"][getGroup[0]][0]["recordtype"] === "rows"
      ) {
        // console.log(getGroup[0])
        let getGroup1 = getGroup[0].toLowerCase();
        let paramname = config.paramname.toLowerCase();
        // // console.log(formDataInitData[getGroup[0]]);
        // console.log("config", config);
        // console.log("paramname", paramname);

        atomValue = formDataInitData[getGroup[0]][rowIndex][paramname];
      } else {
        atomValue = formDataInitData[getGroup1][paramname];
      }
    }
    return atomValue || "";
  } catch (ex) {
    // console.log("getAtomValue " + ex);
  }
};

export const base64_decode = (data) => {
  // qr төлбөр төлөх
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += "";

  do {
    // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

    o1 = (bits >> 16) & 0xff;
    o2 = (bits >> 8) & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join("");

  return decodeURIComponent(escape(dec.replace(/\0+$/, "")));
};

export const decrypt = (message, key) => {
  var messageA = message.split(":");
  var KEY = CryptoJS.enc.Utf8.parse("PjEc~Q^D;4:*5v&D");
  var iv = CryptoJS.enc.Utf8.parse(base64_decode(messageA[1]));
  var decrypted = CryptoJS.AES.decrypt(messageA[0], KEY, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encrypt = (message, key) => {
  var IV1 = "V6!)fTn7]n^eBrfy";
  var KEY = "PjEc~Q^D;4:*5v&D";

  key = CryptoJS.enc.Utf8.parse(KEY); // Secret key
  var iv = CryptoJS.enc.Utf8.parse(IV1); //Vector iv
  var encrypt = CryptoJS.AES.encrypt(message, key, { iv: iv });
  return encrypt.toString() + ":" + base64.encode(IV1);

  // var messageA = message.split(":");
  // var KEY = CryptoJS.enc.Utf8.parse("PjEc~Q^D;4:*5v&D");
  // var iv = CryptoJS.enc.Utf8.parse(base64_decode(messageA[1]));
  // var decrypted = CryptoJS.AES.decrypt(messageA[0], KEY, { iv: iv });
  // return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encryptStr = (message) => {
  var ciphertext = CryptoJS.AES.encrypt(
    message,
    // base64_decode(message)
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  ).toString();

  return ciphertext;
};

export const getOperatingSystem = (window) => {
  let operatingSystem = "Not known";
  if (window.navigator.appVersion.indexOf("Win") !== -1) {
    operatingSystem = "Windows OS";
  }
  if (window.navigator.appVersion.indexOf("Mac") !== -1) {
    operatingSystem = "MacOS";
  }
  if (window.navigator.appVersion.indexOf("X11") !== -1) {
    operatingSystem = "UNIX OS";
  }
  if (window.navigator.appVersion.indexOf("Linux") !== -1) {
    operatingSystem = "Linux OS";
  }
  return operatingSystem;
};

export const getBrowser = (window) => {
  let currentBrowser = "Not known";
  if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
    currentBrowser = "Google Chrome";
  } else if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
    currentBrowser = "Mozilla Firefox";
  } else if (window.navigator.userAgent.indexOf("MSIE") !== -1) {
    currentBrowser = "Internet Exployer";
  } else if (window.navigator.userAgent.indexOf("Edge") !== -1) {
    currentBrowser = "Edge";
  } else if (window.navigator.userAgent.indexOf("Safari") !== -1) {
    currentBrowser = "Safari";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "Opera";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "YaBrowser";
  } else {
    console.log("Others");
  }
  return currentBrowser;
};

export function getSaveExprission(str, type) {
  var exprission = "";
  if (type == "startAfterSave") {
    str = str.toString().replaceAll("\r\n", "").replaceAll("\n", "");
    var subStrs = str.match("startAfterSave(.*)endAfterSave");
    if (!isEmpty(subStrs)) {
      exprission = subStrs[1];
    } else {
      exprission = "back";
    }
  } else {
    var Index = str.length;
    if (type == "endAfterSave") {
      if (!isEmpty(str.match("startAfterSave"))) {
        Index = str.match("startAfterSave");
      }
    }
    if (isObject(Index)) {
      Index = Index.index;
    }
    var subStrs = str.substr(0, Index).replace(type, "");
    exprission = subStrs;
  }
  return exprission;
}

export default async function fetchJson(...args) {
  try {
    const response = await fetch(...args);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();
    // console.log(`response`, data);

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}

export function hexToRgba(hex, alpha) {
  if (_.isEmpty(hex)) return null;

  // Check if hex color code starts with "#"
  if (hex[0] !== "#") {
    console.error("Hex color code must start with '#'.");
    return null;
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.error("One or more color channel values are not valid.");
    return null;
  }

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

export function numberWithCommas(number, fix) {
  var newval = parseFloat(Math.round(number * 100) / 100).toFixed(fix);

  return newval.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
