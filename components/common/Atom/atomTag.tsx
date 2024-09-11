import { isEmpty } from "lodash";

export default function AtomTag({
  item,
  type = "primary",
  position = "top-3 right-3",
  color = "sso",
  link,
  customStyle,
  customClassName = "",
  truncateRow = 0,
  zeroShow = true,
}: {
  item: string;
  type?:
    | "primary"
    | "primary-white"
    | "gray"
    | "blank"
    | "dashed"
    | "dotted"
    | "text"
    | "link";
  position?: string;
  color?: string;
  link?: string;
  customStyle?: any;
  customClassName?: string;
  truncateRow?: number;
  zeroShow?: boolean;
}) {
  if (isEmpty(item)) return null;
  if (!zeroShow && item === "0") return null;

  let bg = `bg-${color}`;
  let border = `border-0 rounded-full`;
  let hover = ``;
  let text = ``;
  let padding = `px-2 py-0.5`;

  switch (type) {
    case "primary":
      bg = `bg-${color}`;
      border = `border-0 rounded-full`;
      text = `text-white`;
      hover = `hover:bg-${color}-dark`;
      break;
    case "primary-white":
      bg = `bg-white`;
      border = `border-0`;
      text = `text-${color}`;
      hover = `hover:bg-${color} hover:text-white`;
      break;
    case "gray":
      bg = `bg-white`;
      border = `border border-gray-300 rounded-md`;
      text = `text-gray-500 text-xs`;
      padding = `px-1.5 py-0.5`;
      // hover = `hover:bg-${color} hover:text-white`;
      break;
    case "blank":
      bg = `bg-transparent`;
      border = `border border-solid`;
      hover = `hover:text-${color} hover:border-${color}`;
      break;
    case "dashed":
      bg = `bg-transparent`;
      border = `border border-dashed`;
      hover = `hover:text-${color} hover:border-${color}`;
      break;
    case "dotted":
      bg = `bg-transparent`;
      border = `border border-dotted`;
      hover = `hover:text-${color} hover:border-${color}`;
      break;
    case "text":
      bg = `bg-transparent`;
      border = `border-0`;
      hover = `hover:bg-gray-100`;
      break;
    case "link":
      bg = `bg-transparent`;
      border = `border-0`;
      break;
    default:
      break;
  }

  const tagClassName = `${text} ${border} ${padding} ${bg} ${hover} ${position}`;

  return (
    <div
      // className={`absolute bg-${color} ${position} px-2 py-1 rounded-full  ${
      //   !customClassName.includes("text-") && "text-xs text-white"
      // }  ${customClassName}`}
      className={`absolute ${tagClassName} ${customClassName}`}
      style={{
        ...customStyle,
      }}
    >
      {/* <span className={`line-clamp-${truncateRow}`}>{item}</span> */}
    </div>
  );
}
