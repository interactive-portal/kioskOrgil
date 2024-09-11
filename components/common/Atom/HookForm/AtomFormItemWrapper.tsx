import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Controller, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function AtomFormItemWrapper({
  renderType = "input",
  item,
  onChange = () => {},
  customClassName = "",
  customStyle = {},
  customDivNumber = "DivFormInput",
  divNamePrefix = "",
  placeholder = "",
  sample = false,
  input = {},
  label = {},
  validation = {},
  fieldName,
  defaultValue = "",
  watch,
  hookForm,
  customProps = {},
  children,
}: {
  renderType:
    | "input"
    | "textarea"
    | "editor"
    | "datepicker"
    | "checkbutton"
    | "select"
    | "hidden";
  item?: any;
  onChange?: any;
  customStyle?: object;
  customClassName?: string;
  customDivNumber?: string;
  divNamePrefix?: string;
  placeholder?: string;
  sample?: boolean;
  input?: any;
  label?: any;
  validation?: any;
  fieldName: string;
  defaultValue?: any;
  watch?: any;
  hookForm?: any;
  customProps?: any;
  children?: any;
}) {
  if (!hookForm?.control) return null;

  const parentFieldValue = useWatch({
    name: watch?.parentFieldName || "",
    control: hookForm?.control,
  });

  useEffect(() => {
    if (watch?.parentFieldName) {
      hookForm?.setValue(fieldName, parentFieldValue);
    }
  }, [parentFieldValue]);

  //hidden бол ганцааранг нь тусгай буцаана. Title энээ тэрээ хэрэггүй.
  if (renderType === "hidden") {
    return (
      <input
        type="hidden"
        defaultValue={defaultValue}
        {...hookForm?.register(fieldName)}
      />
    );
  }

  const fieldTypeList: any = {
    input: "AtomFormInputV2",
    select: "AtomFormSelectV2",
    // check: "AtomFormCheckV2",
    // radio: "AtomFormRadioV2",
    checkbutton: "AtomFormCheckButtonV2",
    textarea: "AtomFormTextAreaV2",
    editor: "AtomFormEditorV2",
    datepicker: "AtomFormDatepickerV2",
  };

  const RenderComponent: any = useMemo(
    () =>
      dynamic(() =>
        import(
          `@/components/common/Atom/HookForm/${
            fieldTypeList?.[renderType] || "AtomFormInputV2"
          }`
        ).catch((err) => {
          return () => (
            <>Form Input Component олдсонгүй - {fieldTypeList?.[renderType]}</>
          );
        })
      ),
    []
  );

  const componentProps: any = {
    item,
    input: {
      ...input,
      className: twMerge(
        `z-10 w-full text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF1564] focus:border-[#FF1564] py-1 px-2 ${input?.className}`
      ),
    },
    placeholder: placeholder,
    validation: {
      ...validation,
      required: {
        value: false,
        message: "Заавал бөглөх ёстой.",
        ...validation.required,
      },
      messageBlock: {
        className: "text-rose-400",
        style: {},
        ...validation.messageBlock,
      },
    },
    fieldName,
    defaultValue,
    hookForm,
    ...customProps,
  };

  return (
    <BlockDiv
      customClassName={`my-3 flex flex-col gap-y-1 ${customClassName}`}
      customStyle={customStyle}
      divNumber={`FieldBlock${fieldName}`}
    >
      {/* label title */}
      <RenderAtom
        item={{ value: label?.title || "" }}
        renderType="text"
        customClassName={`block text-sm font-normal pl-2 ${label?.className}`}
        customStyle={label?.style}
        customProps={label?.props}
      />
      <BlockDiv customClassName="relative">
        {/* input element */}
        {/* {children || <RenderComponent {...componentProps} />} */}
        {children || (
          <Controller
            control={hookForm?.control}
            name={componentProps?.fieldName}
            defaultValue={componentProps?.defaultValue}
            rules={componentProps?.validation}
            render={({ field, fieldState, formState }) => {
              const error = fieldState.error;
              // console.log("XXXXXXXXXXXXXXXXXX error", error);
              return (
                <>
                  <RenderComponent field={field} {...componentProps} />
                  {error && (
                    <>
                      <RenderAtom
                        item={{ value: error?.message }}
                        renderType="text"
                        customClassName="text-pink-500"
                      />
                    </>
                  )}
                </>
              );
            }}
          />
        )}
      </BlockDiv>
    </BlockDiv>
  );
}
