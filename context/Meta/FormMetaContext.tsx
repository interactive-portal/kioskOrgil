import { createContext, Dispatch, FC, useEffect, useState } from "react";
// import { MetaReducer } from './MetaReducer';
// import ACTIONS from './MetaActions';
import { validateForm } from "@/util/helper";
import { notification } from "antd";
import axios from "axios";
import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import fetchJson from "@/lib/fetchJson";
import _ from "lodash";
import Router from "next/router";
import ChangeEventInput from "@/util/ChangeEventInput";
// import { runExpressionEndAfter } from "@/util/expression";

type PropsContextType = {
  formDataInitData?: any;
  setFormDataData?: any;
  setFormExternalData?: any;
  processConfig?: any;
  handleChangeContext?: any;
  handleClickContext?: any;
  handleSubmitContext?: any;
  validData?: any;
  lookUpData?: any;
  handleLookUpData?: any;
  processExpression?: any;
  loadingForm?: any;
  setLoadingForm?: any;
};

const FormMetaContext = createContext<PropsContextType>({});

type PropsType = {
  children?: any;
  formInitData?: any;
  formExpression?: any;
  processConfig?: any;
};

export const FormMetaContextProvider: FC<PropsType> = ({
  children,
  formInitData,
  formExpression,
  processConfig,
}) => {
  const [formDataInitData, setFormDataInitData] = useState(formInitData);
  const [processExpression, setProcessExpression] = useState(formExpression);
  const [validData, setValidData] = useState({});
  const [lookUpData, setLookUpData] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [checkContext, setCheckContext] = useState(false);
  const [product, setProduct] = useState<any>();
  const [price, setPrice] = useState<any>();

  useEffect(() => {
    const itemParent =
      localStorage.getItem("product") &&
      JSON.parse(localStorage.getItem("product") || "");

    const prodPrice =
      localStorage.getItem("price") &&
      JSON.parse(localStorage.getItem("price") || "");

    if (itemParent) {
      setProduct(itemParent);
    }
    if (prodPrice) {
      setPrice(prodPrice);
    }

    if (formInitData) setFormDataInitData(formInitData);
    if (checkContext) setFormDataInitData(checkContext);
  }, [formInitData, checkContext]);

  /**
   * Expression events
   * @param payload
   */

  const handleChangeContext = (payload: any) => {
    const { name, value, rowIndex } = payload;
    let formDataInitDataClone = { ...formDataInitData };
    let processExpressionClone = { ...processExpression };

    if (name.split(".").length == 2) {
      let nameArr = name.split(".");

      if (processConfig["__groupPath"][nameArr[0]][0]["recordtype"] === "row") {
        formDataInitDataClone[nameArr[0]] = {
          ...formDataInitDataClone[nameArr[0]],
          [nameArr[1]]: value,
        };
      } else {
        formDataInitDataClone[nameArr[0]][rowIndex] = {
          ...formDataInitDataClone[nameArr[0]][rowIndex],
          [nameArr[1]]: value,
        };
      }
    } else {
      formDataInitDataClone[name] = value;
    }

    ChangeEventInput(
      name,
      formDataInitDataClone,
      processConfig,
      processExpressionClone,
      setProcessExpression,
      setFormExternalData
    );

    setFormDataInitData(formDataInitDataClone);

    // if (value) {
    //   setValidData((prevState) => ({
    //     ...prevState,
    //     [name]: false,
    //   }));
    // }
  };

  const handleClickContext = (payload: any) => {
    const { name, value, rowIndex } = payload;
    /**
     * State clone to variables
     */
    let formDataInitDataClone = { ...formDataInitData },
      processExpressionClone = { ...processExpression };

    // console.log(setFormDataInitData.toString());
    ChangeEventInput(
      name,
      formDataInitDataClone,
      processConfig,
      processExpressionClone,
      setProcessExpression,
      setFormExternalData
    );

    setFormDataInitData(formDataInitDataClone);
  };

  const handleSubmitContext = async (
    e: any,
    isCustomMsg: any,
    mergedFormData?: any
  ) => {
    e.preventDefault();
    setLoadingForm(true);

    let defaulData = {
      contractTypeId: price?.contracttypeid,
      durationTypeId: price?.durationtypeid,
      itemId: price?.itemid,
      price: price?.saleprice,
      amount: price?.saleprice,
      endDate: localStorage.getItem("enddate"),
    };
    let formdata = mergedFormData ? mergedFormData : formDataInitData;
    if (processConfig.metadatacode == "kioskContractMainDV") {
      formdata = {
        ...formDataInitData,
        ...defaulData,
      };
    }

    const valid = validateForm(formdata, processConfig);

    console.log(`formDataInitData save:: `, formdata);

    if (valid) {
      setValidData(valid);
    }

    if (!Object.keys(valid).length) {
      let resExp = "";

      // console.log(`formDataInitData save:: `, formdata);

      const { data } = await axios.post(`/api/post-process`, {
        processcode: processConfig.metadatacode,
        parameters: formdata,
      });

      if (data.status === "success") {
        // if (processConfig.metadatacode.toLowerCase() === "clcreateuser_001") {
        //   notification.success({ message: "Амжилттай бүртгэгдлээ" });
        //   Router.push("/");
        // } else if (!isCustomMsg) {
        //   notification.success({ message: "Амжилттай хадгалагдлаа" });
        // }

        console.log("object :>> ", data);

        setLoadingForm(false);
      } else {
        console.log("object :>> ", data);
        notification.warning({
          message: "Алдаа гарлаа!",
          description: parseHtml(decode(data)),
        });
        setLoadingForm(false);
      }
      return data;
    } else {
      notification.warning({
        message: "Заавал бөглөх талбаруудыг бөглөнө үү!",
        description: Object.keys(valid).join(", "),
      });
      setLoadingForm(false);
    }
    return false;
  };

  const handleLookUpData = async (payload: any) => {
    let data = await fetchJson(
      `/api/get-data?metaid=${
        payload.lookupmetadataid
      }&pagingwithoutaggregate=1&criteria=${JSON.stringify(payload.criteria)}`
    );
    delete data.aggregatecolumns;
    delete data.paging;
    data = _.values(data);
    setLookUpData((prevState) => ({
      ...prevState,
      [payload.paramrealpath]: data,
    }));
    return data;
  };

  const setFormDataData = async (payload: any) => {
    setFormDataInitData(payload);
  };

  const setFormExternalData = async (payload: any) => {
    setCheckContext(payload);
  };

  const contextValues = {
    formDataInitData,
    setFormDataData,
    setFormExternalData,
    processConfig,
    handleChangeContext,
    handleClickContext,
    handleSubmitContext,
    validData,
    lookUpData,
    handleLookUpData,
    processExpression,
    loadingForm,
    setLoadingForm,
  };

  return (
    <FormMetaContext.Provider value={contextValues}>
      {children}
    </FormMetaContext.Provider>
  );
};

export default FormMetaContext;

// function ChangeEventInput(
//   name: any,
//   formDataInitDataClone: any,
//   processConfig: any,
//   processExpressionClone: any,
//   setProcessExpression: Dispatch<any>,
//   setFormExternalData: (payload: any) => Promise<void>
// ) {
//   throw new Error("Function not implemented.");
// }
