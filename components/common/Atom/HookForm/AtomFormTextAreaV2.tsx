import _ from "lodash";
import { twMerge } from "tailwind-merge";

const AtomFormTextAreaV2 = ({
  input = {},
  validation = {},
  fieldName,
  hookForm,
}: {
  input?: any;
  validation?: any;
  fieldName: string;
  hookForm: any;
}) => {
  if (_.isEmpty(hookForm?.control)) return null;

  return (
    <textarea
      type={input?.type || "text"}
      className={twMerge(
        `z-10 w-full rounded-lg border text-base py-1 px-2 font-roboto focus:outline-none focus:ring-1 focus:ring-cozy focus:border-cozy ${
          input?.className || ""
        } ${
          hookForm?.errors?.[fieldName]
            ? input?.error?.className || "border-pink-500"
            : ""
        }`
      )}
      {...hookForm?.register(fieldName, { ...validation })}
    />
  );
};

export default AtomFormTextAreaV2;
