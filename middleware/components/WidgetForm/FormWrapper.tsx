import React, { FC, useContext } from "react";
import FormMetaContext from "@/context/Meta/FormMetaContext";
import { LoadingOutlined } from "@ant-design/icons";

type PropsType = {
  handleSubmit?: any;
  settings?: any;
  children?: any;
  dialog?: any;
  title?: string;
};

const FormWrapper: FC<PropsType> = ({ children, title, dialog, settings }) => {
  const { handleSubmitContext, processConfig, processExpression, loadingForm } =
    useContext(FormMetaContext);
  const customSettings = settings?.widgetnemgoo;
  const customOptions = settings?.widgetnemgooReady;

  return (
    <div
      className={`processRender  ${dialog ? `px-3` : `pt-1 p-4 my-1.5`}  oform`}
    >
      <form onSubmit={handleSubmitContext}>
        {!dialog && (
          <div
            className={`first-line:xl:w-full border-b border-gray-300 dark:border-gray-700 pb-3  ${customOptions?.formTitleWrapperClass}`}
          >
            <div className="">
              <p className="text-lg text-gray-800 dark:text-gray-100">
                {title}
              </p>
            </div>
          </div>
        )}
        <div className={`mt-4 grid gap-4 ${customSettings?.layout} `}>
          {children}
        </div>
        {processConfig?.actiontype !== "view" &&
          processExpression?.saveBtn !== "hide" && (
            <div className="flex justify-end w-full mt-4">
              <button
                type="submit"
                disabled={loadingForm}
                style={{
                  backgroundColor: loadingForm ? "#8d9eff" : "",
                }}
                className={`focus:outline-none w-full sm:w-auto  cursor-pointer bg-[#699BF7] transition duration-150 ease-in-out defaultBtn hover:bg-blue-700 rounded-lg text-white px-8 py-3 text-sm ${customOptions?.submitButtonClass}`}
              >
                {loadingForm && <LoadingOutlined />}{" "}
                {loadingForm
                  ? `Хадгалж байна`
                  : `${customOptions?.submitButtonName || "Хадгалах"}`}
              </button>
            </div>
          )}
      </form>
    </div>
  );
};

export const FormSectionWrapper: FC<PropsType> = ({ children }) => {
  const {
    handleSubmitContext,
    processConfig,
    processExpression,
    formDataInitData,
    setFormDataData,
  } = useContext(FormMetaContext);

  return (
    <div className="processRender ">
      <form onSubmit={handleSubmitContext}>
        <div>{children}</div>
        {processConfig?.actiontype !== "view" && (
          <div className="flex justify-end mb-3">
            <button
              type="submit"
              className="focus:outline-none w-full sm:w-auto bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded-lg text-white px-8 py-3 text-sm mt-3"
            >
              Хадгалах
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormWrapper;
