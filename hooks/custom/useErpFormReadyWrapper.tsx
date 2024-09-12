import useCallProcess from "@/middleware/dataHook/useCallProcess";
import useWidgetConfigSWR from "@/middleware/dataHook/useWidgetConfigSWR";
import { usePage } from "@/hooks/use-page";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useErpFormReadyWrapper({
  formConfig,
  setFormModalConfig,
}: {
  formConfig: {
    defaultValues?: any;
    isShowModal?: any;
    item?: any;
    processCode: string;
    processDVCode?: string;
    processMode?: string;
    listWidgetId?: string | number;
    processCodeInsert?: string;
    processCodeEdit?: string;
    processCodeGet: string;
    processCodeDelete?: string;
  };
  setFormModalConfig?: any;
}) {
  const pageContext: any = usePage();
  const hookForm = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: formConfig?.defaultValues,
  });
  const { callProcess, isProcessWorking } = useCallProcess();
  const {
    item = {},
    processCode = "",
    processMode = "insert",
    listWidgetId = "",
    processCodeGet,
  } = formConfig; //Энэ item-ийн path-ууд нь ориг Get-ээс ирсэн path-уудаас зөрдөг юм байна. Иймээс ориг get-ийг нь дуудаж item-ийг дахин авчрах нь зөв ажээ.

  const [metaConfigAll, metaConfigError, metaConfigMutate = {}] =
    useWidgetConfigSWR({
      metadatacode: processCode,
    });
  // console.log("🚀 ~ metaConfigAll:", metaConfigAll);

  const [getItem, setGetItem] = useState({});

  useEffect(() => {
    // if (processMode === "edit") {
    // async function fetchItem() {
    //     const result = await callProcess({
    //       command: processCodeGet,
    //       parameter: {
    //         id: item?.id,
    //       },
    //       silent: true,
    //     });
    //     console.log("result", result);
    //     setGetItem(result?.result);
    //   }
    //   fetchItem();
    // } else {
    //   setGetItem({});
    //   onReset();
    // }
  }, [formConfig]);

  useEffect(() => {
    // console.log("ББББЫЦУЦУЦУ Ц killer getItem", getItem);

    hookForm.reset(_.isEmpty(getItem) ? undefined : getItem);
  }, [getItem]);

  const onReset = () => {
    const fff: any = {};
    metaConfigAll?.readyFieldList.map((item: any) => {
      fff[_.toLower(item?.paramrealpath)] = "";
    });
    hookForm.reset({ ...fff, ...formConfig?.defaultValues });
    hookForm.clearErrors();

    // console.log("🚀 ~ fff:", fff);
  };

  const onFormSubmit = async (formResult: any) => {
    console.log("Success! Form data: ", formResult);

    // return null;

    const result = await callProcess({
      command: processCode,
      parameter: formResult,
    });
    // console.log("sssssssssss", result);

    //!хожим энд afterSubmit гэсэн function дотор эдгээрийг явуулах ёстой.
    //form-оо хаана.
    setFormModalConfig({ ...formConfig, isShowModal: false });
    //list-ээ refresh хийнэ. Нэмсэн, зассан item-аа шинэчилж оруулна.
    await pageContext?.kkk?.[listWidgetId]?.dataMutate();
    //form-оо цэвэрлэнэ.
    onReset();
  };

  const onFormError = (errors: any) => {
    console.log("Error! Form Validate", errors);
  };

  return [
    hookForm,
    formConfig?.defaultValues,
    onReset,
    onFormSubmit,
    onFormError,
    isProcessWorking,
    metaConfigAll?.readyFieldList,
    metaConfigAll?.result?.processname,
  ];
}
