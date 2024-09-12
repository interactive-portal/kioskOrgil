import * as ExpressionFuntions from "./expressionFunctions";
import * as Expression from "@/util/expression";
import {
  expressionConvert,
  removeCommentsExpression,
  convertFunctionToExpression,
} from "@/util/expression";
import { functionNameReplace, isEmpty, isObject } from "./helper";

const {
  hideButton,
  runprocessvalue,
  getprocessparam,
  getauthlogin,
  fillgroupbydata,
} = ExpressionFuntions;
const { repeatfunction } = Expression;

const ChangeEventInput = (
  item: any, // field config
  formDataInitData: any, // formDataInitData
  config: any, // bp config
  processExpression: any,
  mainContext: any,
  setFormDataInitData: any
) => {
  if (!isEmpty(item) && !isEmpty(item)) {
    var pathArr = item.split(".");
    if (
      pathArr.length > 1 &&
      !isObject(eval("processExpression." + pathArr[0]))
    ) {
      eval("processExpression." + pathArr[0] + "={}");
    }
    if (
      pathArr.length > 1 &&
      eval("typeof processExpression." + item + "function != undefined") &&
      eval("typeof processExpression." + item + 'function != "undefined"')
    ) {
      var paramrealpathArray = item.split(".");
      var functionString = eval(
        "processExpression." + item + "function.toString()"
      );
      // var functionString2 = eval("processExpression.getSalePrice.toString()");
      // debugger;
      functionString = removeCommentsExpression(functionString);
      functionString = functionNameReplace(functionString);
      functionString = functionString
        .replace("function(){", "function DrillDownFunction(){")
        .replaceAll(
          pathArr[0] + ".",
          pathArr[0] + "[" + item.rowsIndex + "]" + "."
        );
      functionString =
        functionString.substr(0, functionString.lastIndexOf("}")) +
        "mainContext(processExpression);} ";

      functionString = convertFunctionToExpression(
        functionString,
        config.varfncexpressionstring
      );
      eval(functionString + "; DrillDownFunction();");
    } else if (
      eval("typeof processExpression." + item + "function != undefined") &&
      eval("typeof processExpression." + item + 'function != "undefined"')
    ) {
      var paramrealpathArray = item.split(".");
      var functionString = eval(
        "processExpression." + item + "function.toString()"
      );
      functionString = removeCommentsExpression(functionString);
      functionString = functionNameReplace(functionString);
      functionString =
        functionString.substr(0, functionString.lastIndexOf("}")) +
        "mainContext(processExpression);} ";
      if (functionString.includes("runprocessvalue")) {
        functionString = functionString.replace(
          "function(){",
          "async function DrillDownFunction(){"
        );
        functionString = functionString.replaceAll(
          "runprocessvalue",
          "await runprocessvalue"
        );
      }
      if (functionString.includes("getprocessparam")) {
        functionString = functionString.replace(
          "function(){",
          "async function DrillDownFunction(){"
        );
        functionString = functionString.replaceAll(
          "getprocessparam",
          "await getprocessparam"
        );
      } else {
        functionString = functionString.replace(
          "function(){",
          "function DrillDownFunction(){"
        );
      }

      var varfnc: any = expressionConvert(
        JSON.stringify(processExpression),
        config.varfncexpressionstring,
        "formDataInitData.",
        JSON.stringify(formDataInitData),
        "config.meta_process_param_attr_link_mobile"
      );

      eval(varfnc + functionString + "; DrillDownFunction();");
    }
  }
};

export default ChangeEventInput;
