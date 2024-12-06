import React, { FC, useContext, useState } from "react";
import FormMetaContext from "@/context/Meta/FormMetaContext";
import { LoadingOutlined } from "@ant-design/icons";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { Modal } from "antd";
import Terms from "./terms";
import WidgetKiosk from "./widgetKiosk";

type PropsType = {
  handleSubmit?: any;
  settings?: any;
  children?: any;
  dialog?: any;
  setResult?: any;
  title?: string;
  formConfig?: string;
};

const KioskFormWrapper: FC<PropsType> = ({
  children,
  title,
  dialog,
  settings,
  setResult,
  formConfig,
}) => {
  const {
    handleSubmitContext,
    processConfig,
    processExpression,
    loadingForm,
    resultForm,
    addMember,
  } = useContext(FormMetaContext);
  const customSettings = settings?.widgetnemgoo;
  const customOptions = settings?.widgetnemgooReady;
  const [termsValue, setTermsValue] = useState(false);
  const [modalTerms, setModalTerms] = useState<any>();

  const handleSubmitTerms = async (e: any) => {
    // e.preventDefault();
    setModalTerms(true);
  };

  const onChangeTerms = (e: any) => {
    setTermsValue(true);
    setModalTerms(false);
  };

  const onCloseTerms = (e: any) => {
    setTermsValue(false);
    setModalTerms(false);
  };

  // console.log("addMember :>> ", addMember);
  return (
    <>
      {addMember == true ? (
        <>
          <>Гишүүн нэмэх</>
          <WidgetKiosk
            listConfig={{
              metadataid: "17256874307141",
              otherattr: settings,
            }}
          />
        </>
      ) : (
        <div
          className={`processRender  ${
            dialog ? `px-3` : `pt-1 p-4 my-1.5`
          }  oform`}
        >
          <form onSubmit={handleSubmitContext}>
            <div className={`mt-4 grid gap-4 ${customSettings?.layout} `}>
              {children}
            </div>
            <div
              className="box-footer flex py-6 w-full  gap-2 px-8  cursor-pointer "
              onClick={handleSubmitTerms}
            >
              <span
                className={` w-10 h-10 border rounded border-white  inline  ${
                  termsValue == true ? "bg-[#A68B5C]" : ""
                }`}
              ></span>
              {/* <div className="w-10 h10 rounded border border-[#67748E] inline-block"></div> */}
              <span className="text-white text-[20px] pt-2">
                Би үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрч байна.
              </span>
            </div>
            {processConfig?.actiontype !== "view" &&
              processExpression?.saveBtn !== "hide" && (
                <div className="flex justify-end w-full mt-4 px-6 rounded-full">
                  <button
                    type="submit"
                    // disabled={loadingForm}
                    disabled={termsValue == false ? true : false}
                    style={{
                      backgroundColor: loadingForm ? "#A68B5C" : "",
                    }}
                    className={`focus:outline-none w-full sm:w-auto  cursor-pointer bg-[#A68B5C] transition duration-150 ease-in-out defaultBtn hover:bg-opacity-70 rounded-full text-white px-8 py-4  ${
                      customOptions?.submitButtonClass
                    } ${termsValue == false ? "bg-opacity-50" : "ddd"}`}
                  >
                    {loadingForm && <LoadingOutlined />}{" "}
                    {loadingForm
                      ? `Хадгалж байна`
                      : `${customOptions?.submitButtonName || "Хадгалах"}`}
                  </button>
                </div>
              )}
            <Modal
              footer={false}
              destroyOnClose={true}
              width={990}
              visible={modalTerms}
              onCancel={() => setModalTerms(!modalTerms)}
            >
              <div className="box p-2">
                <div className="box-header flex pb-4 justify-between">
                  <div className="flex flex-row w-full bg-transparent relative items-center gap-1">
                    <div className="flex flex-col">
                      <RenderAtom
                        item={{ value: "Үйлчилгээний нөхцөл" }}
                        renderType="text"
                        customClassName={
                          "text-[#3C3C3C] leading-6 md:leading-8 font-bold text-[18px]"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="box-body flex flex-col pb-4 justify-between ">
                  <div className="max-h-[450px] w-full overflow-hidden overflow-y-auto">
                    <div className="scrollbar-[#007EB1] scroll-body scrollbar-thumb-[#007EB1] scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-citizen-dark scrollbar-thumb-rounded-full shadow">
                      <Terms />
                    </div>
                  </div>
                </div>
                <div className="box-footer flex flex-col justify-between py-3">
                  <div className="flex flex-row w-full bg-transparent relative items-center sm:gap-8 gap-3 justify-end">
                    <div
                      onClick={onCloseTerms}
                      className="group w-[150px] h-[40px] rounded-full border border-gray-200   hover:bg-opacity-50 py-2  text-black cursor-pointer "
                    >
                      <div className="rounded-full flex h-full w-full items-center justify-center bg-[#ffffff]  hover:text-blue-400">
                        Цуцлах
                      </div>
                    </div>
                    <div
                      onClick={onChangeTerms}
                      className="group w-[150px] h-[40px] rounded-full "
                    >
                      <div className="rounded-full flex h-full w-full items-center justify-center bg-[#a68b5c] hover:bg-opacity-50">
                        <RenderAtom
                          item={{ value: "Зөвшөөрөх" }}
                          renderType="button"
                          customClassName={
                            "text-[14px] font-normal group-hover:bg-gradient-to-b group-hover:from-[#002961] group-hover:to-[#00A7DC] group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text text-white"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </form>
        </div>
      )}
    </>
  );
};

export default KioskFormWrapper;
