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
    checkIfSignedIn();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Spin fullscreen />
      </Layout>
    );
  }

  const steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  return (
    <Layout>
      <Title title="АНКЕТ"></Title>

      <BlockDiv className="py-2 text-[32px] text-white">
        {/* <RenderWidgetProcess
          dialog={false}
          // setResult={setFormResult}
          listConfig={{
            metadataid: "1726115747829573",
            otherattr: settings,
          }}
        /> */}
        {/* <RenderWidgetProcess
          dialog={false}
          listConfig={{
            metadataid: "17256874307141",
            otherattr: settings2,
          }}
        /> */}

        {/* <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-10 w-full h-screen  px-[150px] justify-center items-center">
              {formInput?.map((obj: any, index: number) => {
                let newObj = { ...obj, labelname: t(obj?.labelname) };
                let criteria;
                if (obj.criteriaPath) {
                  criteria = {
                    [obj?.criteriaPath]: [
                      {
                        operator: "=",
                        operand: methods.watch()[obj?.criteriaPath] || "",
                      },
                    ],
                  };
                }

                const value = methods.watch();
                let birthdays: any;
                if (value?.positionName?.length === 10) {
                  console.log("CONVERTING DATE OF BIRTH");
                  birthdays = convertDate(value?.positionName);
                }
                switch (obj?.type) {
                  case "text":
                    return <Text key={index} obj={newObj} />;
                  case "combo":
                    return (
                      <Combo criteria={criteria} key={index} obj={newObj} />
                    );
                  case "number":
                    return <Number key={index} obj={newObj} />;
                  case "date":
                    return <Date key={index} obj={newObj} />;
                  case "dateRegister":
                    if (foreign !== "") {
                      return <Date key={index} obj={newObj} />;
                    } else {
                      return (
                        <div className="flex flex-col">
                          <label className="text-[16px] font-medium  text-[#2A2A2A] mb-[8px]">
                            {t(obj?.labelname)}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            disabled={true}
                            className="mt-[8px] px-[14px] py-[17px] text-[16px] rounded-lg focus-visible:outline-none focus-visible:border-none"
                            value={birthday}
                          />
                        </div>
                      );
                    }
                  case "email":
                    return <Email key={index} obj={newObj} />;
                  default:
                    return null;
                }
              })}
            </div>
            {
              <div className="flex flex-col items-center justify-center gap-y-4 cursor-pointer">
                <button
                  className="bg-[#D9D9D9] text-[#525050] text-[36px] uppercase leading-[34px] py-[20px] rounded-[59px] min-w-[528px] mt-[50px]"
                  style={{
                    boxShadow: "4px 4px 4px 0px #00000040",
                  }}
                  type="submit"
                  // onClick={(e) => saved(e)}
                  // onClick={() => onSubmit}
                >
                  {t("царай таниулах")}
                </button>
                <img
                  src="/images/Face_id_white.png"
                  className="w-[150px] h-[150px] mt-4"
                />
              </div>
            }
          </form>
        </FormProvider> */}
      </BlockDiv>
      {/* <Modal
            width={1080}
            footer={false}
            title={false}
            open={openLogin}
            onCancel={() => setOpenLogin(!openLogin)}
            destroyOnClose
          >
            <OpenCamera
              setProcessParam={setProcessParam}
              processParam={processParam}
              birthday={birthday}
              setLoading={setLoading}
            />
          </Modal> */}
      {/* </> */}
      {/* )} */}
    </Layout>
  );
};

export default Form;

const formInput = [
  {
    labelname: "он, сар",
    pathname: "contractDate",
    type: "date",
    isRequired: 1,
  },
  {
    labelname: "ОВОГ",
    pathname: "pLastName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "НЭР",
    pathname: "pCustomerName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "РЕГИСТР",
    pathname: "pPositionName",
    type: "text",
    isRequired: 1,
  },

  {
    labelname: "ТӨРСӨН ОГНОО",
    pathname: "pDateOfBirth",
    type: "dateRegister",
    isRequired: 1,
  },
  {
    labelname: "хүйс",
    pathname: "pGender",
    type: "combo",
    isRequired: 1,
    lookupId: "1448432578544",
  },
  {
    labelname: "ХОТ",
    pathname: "pCityId",
    type: "combo",
    lookupId: "1448415981113",
    name: "cityname",
    isRequired: 0,
  },
  {
    labelname: "ДҮҮРЭГ",
    pathname: "pDistrictId",
    type: "combo",
    lookupId: "144436175673444",
    criteriaPath: "cityId",
    name: "name",
    isRequired: 0,
  },
  {
    labelname: "ХОРОО",
    pathname: "pStreetId",
    type: "combo",
    lookupId: "1448415981268",
    criteriaPath: "districtId",
    name: "streetname",
    isRequired: 0,
  },
  {
    labelname: "УТАС",
    pathname: "cPhoneNumber",
    type: "number",
    isRequired: 0,
  },
  {
    labelname: "email",
    pathname: "pEmail",
    type: "email",
    isRequired: 0,
  },
  {
    labelname: "Хичээлэх спорт",
    pathname: "itemId",
    type: "text",
    // isRequired: 1,
    defaultValue: "1565659459594",
  },
  {
    labelname: "Карт эхлэх огноо",
    pathname: "startDate",
    type: "date",
    isRequired: 1,
  },
  {
    labelname: "Үйлчилгээ дуусах огноо",
    pathname: "endDate",
    type: "date",
    isRequired: 1,
  },
  {
    labelname: "Төлөх дүн",
    pathname: "amount",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "Сар",
    pathname: "durationTypeId",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "Гэрээний дүн",
    pathname: "price",
    type: "text",
    // isRequired: 1,
    defaultValue: "99000",
  },

  {
    labelname: "Төлөх дүн гэрээ",
    pathname: "contractTotalAmount",
    type: "text",
    // isRequired: 1,
    defaultValue: "99000",
  },

  {
    labelname: "Дуусах хугацаа тооцоолох",
    pathname: "month",
    type: "text",
    isRequired: 1,
    defaultValue: "2024-08-13",
  },
  // {
  //   labelname: "image",
  //   pathname: "pImage",
  //   type: "text",
  //   isRequired: 0,
  // },
  // {
  //   labelname: "bvalue",
  //   pathname: "bValue",
  //   type: "text",
  //   isRequired: 1,
  // },
  {
    labelname: "Үйлчлүүлэгчийн бүлэг",
    pathname: "cCustomerGroupId",
    type: "text",
    // isRequired: 1,
    defaultValue: "1592909489389",
  },
  {
    labelname: "Насанд хүрсэн эсэх",
    pathname: "cIsAdult",
    type: "text",
    isRequired: 1,
    defaultValue: "1",
  },
  {
    labelname: "Гадаад иргэн эсэх",
    pathname: "cCitizen",
    type: "text",
    isRequired: 1,
    defaultValue: "1",
  },
];
