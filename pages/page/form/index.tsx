import React, { useEffect, useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import _ from "lodash";
import { useForm, FormProvider } from "react-hook-form";
import Text from "@/components/project/riverclub/v1/bioinput/atom/text";
import Combo from "@/components/project/riverclub/v1/bioinput/atom/combo";
import Number from "@/components/project/riverclub/v1/bioinput/atom/number";
import Date from "@/components/project/riverclub/v1/bioinput/atom/date";
import Email from "@/components/project/riverclub/v1/bioinput/atom/email";

import axios from "axios";
import { Modal, Spin } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import convertDate from "@/components/project/riverclub/v1/bioinput/convertData";
import Layout from "../kioskLayout";
import OpenCamera from "./openCamera";
import { usePathname } from "next/navigation";
import { useSearchParam } from "react-use";
import { notification } from "antd";
import RenderWidgetProcess from "@/middleware/components/WidgetForm/RenderWidgetProcess";
import Title from "@/components/common/Title";
import FormMetaContext from "@/context/Meta/FormMetaContext";
import WidgetKiosk from "@/middleware/components/WidgetForm/widgetKiosk";

const Form = () => {
  const router = useRouter();
  const { t } = useTranslation("translate");
  const [processParam, setProcessParam] = useState<any>();
  const [formResult, setFormResult] = useState();
  const [birthday, setBirthday] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [productId, setProductId] = useState(router.query.i);

  const methods: any = useForm({
    defaultValues: {
      cityId: "11",
    },
  });
  const i = router.query;

  const onSubmit = async (data: any) => {
    setProcessParam(data); // Ensure data is correctly set here
    setLoading(true);

    try {
      const res = await axios.post("/api/post-process", {
        processcode: "fitKioskCreateContractUpdate_DV_001",
        parameters: processParam,
      });

      if (res.data?.status === "success") {
        setLoading(false);
        router.push({
          pathname: "/page/sell",
          query: {
            i: router.query?.i,
            c: res?.data?.result?.id,
          },
        });

        notification.success({
          message: "Бүртгэл амжилттай хийгдлээ",
        });
      } else {
        notification.error({
          message:
            res?.data?.text || "Хэрэглэгчийн мэдээлэл бүртгэхэд алдаа гарлаа",
        });
      }
    } catch (error) {
      console.error("Error in saved function", error);
      notification.error({
        message: "Сүлжээний алдаа гарлаа",
      });
    } finally {
      setLoading(false);
    }

    setOpenLogin(true);
  };

  const settings = {
    widgetnemgooReady: {
      labelPosition: "top",
      submitButtonName: "Хадгалах",
      submitButtonWrapperClass: "w-full flex ",
      submitButtonClass: "bg-[#A68B5C] ",
      formTitleWrapperClass: "hidden ",
    },
  };
  const settings2 = {
    widgetnemgooReady: {
      labelPosition: "top",
      submitButtonName: "Гишүүн нэмэх",
      submitButtonWrapperClass: "w-full flex ",
      submitButtonClass: "bg-[#A68B5C] ",
      formTitleWrapperClass: "hidden ",
    },
  };

  useEffect(() => {
    let birthdays: any;

    if (methods.watch()?.pPositionName?.length === 10) {
      birthdays = convertDate(methods.watch()?.pPositionName);
      setBirthday(birthdays?.date);
    }
    setProductId(router.query.i as string);
  }, [methods.watch()]);

  const checkIfSignedIn = async () => {
    try {
      const response = await axios.get("/api/check-sign-in-status");
      if (response.data?.isSignedIn) {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error("Error checking sign-in status", error);
    }
  };

  useEffect(() => {
    // checkIfSignedIn();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Spin fullscreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <Title title="АНКЕТ"></Title>
      <BlockDiv className="py-2 text-[32px] text-white">
        <WidgetKiosk
          listConfig={{
            metadataid: "1726115747829573",
            otherattr: settings,
          }}
        />
      </BlockDiv>
    </Layout>
  );
};

export default Form;
