import { isEmpty } from "lodash";
import { twMerge } from "tailwind-merge";
import AtomIcon from "./atomIcon";

export default function AtomInput({
  item,
  icon = "",
  button = "",
  value,
  placeholder = "",
  color = "sso",
  type = "text",
  checked = false,
  onChange = null,
  customStyle = {},
  customClassName = "",
  inputContainer = { customClassName: "" },
  iconContainer = { customClassName: "" },
  sample = false,
}: {
  item: string;
  icon?: string;
  button?: any;
  value?: any;
  placeholder: string;
  color?: string;
  type?: any;
  checked?: boolean;
  onChange?: any;
  customStyle?: object;
  customClassName?: string;
  inputContainer?: any;
  iconContainer?: any;
  sample?: boolean;
}) {
  const bg = `bg-${color}`;
  const border = `border-0`;
  const hover = ``;
  const text = ``;

  return (
    <div className={`relative ${customClassName} flex items-center h-9`}>
      <AtomIcon item={icon} customClassName={iconContainer?.customClassName} />
      <input
        type={type ? type : "text"}
        className={twMerge(
          "w-full focus:outline-none outline-none flex items-center py-2",
          isEmpty(icon) ? "pl-5" : "pl-6",
          inputContainer?.customClassName
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          onChange(e);
        }}
      />
    </div>
  );
}
