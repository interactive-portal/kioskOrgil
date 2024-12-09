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
import Router, { useRouter } from "next/router";
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
  resultForm?: any;
  addMember?: any;
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
  const [resultForm, setResultForm] = useState<any>();
  const [addMember, setMember] = useState(false);
  const [price, setPrice] = useState<any>();

  const router = useRouter();

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

    let ddata: any = localStorage.getItem("memberData") || {};
    let prrr: any = localStorage.getItem("price");
    let formLocalDatasss: any = ddata ? JSON.parse(ddata) : {};
    let pp: any = prrr ? JSON.parse(prrr) : {};

    console.log("formLocalDatasss :>> ", ddata);

    let defaulData = {
      contractTypeId: price?.contracttypeid,
      contracttypeid: price?.contracttypeid,
      itemId: price?.itemid,
      itemid: price?.itemid,
      price: price?.saleprice,
      amount: price?.saleprice,
      endDate: localStorage.getItem("enddate"),
      enddate: localStorage.getItem("enddate"),
      dateOfBirth: localStorage.getItem("dateOfBirth"),
      dateofbirth: localStorage.getItem("dateOfBirth"),
      birthdate: localStorage.getItem("dateOfBirth"),
      phonenumber: formDataInitData.phonenumber || formLocalDatasss.phonenumber,
      image: localStorage.getItem("imgStr"),
      gender: localStorage.getItem("gender"),
      customerid: localStorage.getItem("cmrid"),
      contractid: router.query.conId || localStorage.getItem("conId"),
      firstname: formDataInitData.firstname || formLocalDatasss.firstname,
      stateregnumber:
        formDataInitData.stateregnumber || formLocalDatasss.stateregnumber,
      lastname: formDataInitData.lastname || formLocalDatasss.lastname,
      firstemail: formDataInitData.firstemail || formLocalDatasss.firstemail,
    };

    let formdata = mergedFormData ? mergedFormData : formDataInitData;

    if (
      processConfig.metadatacode == "kioskContractMainDV" ||
      processConfig.metadatacode == "kioskContractMainDV_2"
    ) {
      formdata = {
        ...formDataInitData,
        ...defaulData,
      };
    }
    console.log(`formDataInitData save:: `, formdata);

    const valid = validateForm(formdata, processConfig);

    if (valid) {
      setValidData(valid);
    }

    if (!Object.keys(valid).length) {
      let resExp = "";

      const { data } = await axios.post(`/api/post-process`, {
        processcode: processConfig.metadatacode,
        parameters: formdata,
      });

      if (data.status === "success") {
        notification.success({ message: "Амжилттай бүртгэгдлээ" });

        let datsssssa = await fetchJson(
          `/api/get-process?command=fitKioskCountContractCustomer_GET_004&parameters=${JSON.stringify(
            {
              id: data.result.id,
            }
          )}`
        );
        console.log("prrr :>> ", datsssssa);
        // if (pp.maxqty > 0) {
        //   window.location.href = `/page/form/addMember?conId=${data.result.id}member=`;

        // }
        if (datsssssa.status === "success") {
          if (datsssssa.result.cnt > 0) {
            window.location.href = `/page/form/addMember?conId=${data.result.id}member=${datsssssa.result.cnt}`;
          }
        }

        localStorage.setItem("conId", data.result.id);
        setLoadingForm(false);

        // window.location.href = `/page/form/addMember?conId=${data.result.id}`;
      } else {
        setResultForm(data);
        notification.warning({
          message: "Алдаа гарлаа!",
          description: parseHtml(decode(data)),
        });
        setLoadingForm(false);
      }
      return data;
    } else {
      setResultForm(valid);
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
    resultForm,
    addMember,
    setLoadingForm,
  };

  return (
    <FormMetaContext.Provider value={contextValues}>
      {children}
    </FormMetaContext.Provider>
  );
};

export default FormMetaContext;
