import _ from "lodash";
import { useToggle } from "react-use";

export default function AtomInputErrorTextV2({
  validation,
  errors,
  fieldName,
  customClassName = "",
  customStyle,
}: {
  validation: any;
  errors: any;
  fieldName: string;
  customClassName?: string;
  customStyle?: any;
}) {
  const myError = _.get(errors, fieldName);
  const [on, toggle] = useToggle(true);

  return (
    <span
      className={`block absolute inset-x-0 text-rose-400  duration-500 ${customClassName} ${
        validation?.messageBlock?.className
      } ${on ? "-bottom opacity-100" : "opacity-0"}`}
      style={customStyle}
    >
      {myError?.message}
    </span>
  );
}
