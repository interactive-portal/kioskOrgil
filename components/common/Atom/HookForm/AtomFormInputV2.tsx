import { twMerge } from "tailwind-merge";

export default function AtomFormInputV2({
  input = {},
  validation = {},
  fieldName,
  placeholder,
  defaultValue,
  hookForm,
  field,
}: {
  input?: any;
  validation?: any;
  fieldName: string;
  placeholder: string;
  defaultValue?: any;
  hookForm: any;
  field: any;
}) {
  return (
    <input
      type={input?.type || "text"}
      // defaultValue={defaultValue}
      className={twMerge(
        ` ${input?.className || ""} ${
          hookForm?.errors?.[fieldName]
            ? input?.error?.className || "border-pink-500"
            : ""
        }`
      )}
      {...hookForm?.register(fieldName, { ...validation })}
      placeholder={placeholder}
      {...field}
    />
  );
}
