import { isEmpty } from "lodash";
import AtomLink from "./atomLink";

export default function AtomIcon({
  item,
  link,
  checked = false,
  color = "citizen",
  hoverSolid = true,
  customClassName = "",
  customStyle,
  onClick,
}: {
  item: any;
  link?: string;
  checked?: boolean;
  color?: string;
  hoverSolid?: boolean;
  customClassName?: string;
  customStyle?: any;
  onClick?: any;
}) {
  if (isEmpty(item)) return null;

  const myIcon: any = item?.["value"];

  //storage гэсэн замтай ирвэл өмнө нь домэйнийг залгаж өгөх ёстой.
  // if (myIcon?.startsWith("storage/")) {
  //   return (
  //     <img
  //       src={`https://dev.veritech.mn/${myIcon}`}
  //       alt="icon"
  //       width="16"
  //       height="14"
  //       className="absolute left-0 top-2 z-10"
  //     />
  //   );
  // } else {
  return (
    <AtomLink item={link}>
      <i
        className={`${myIcon} ${customClassName} ${
          checked && `text-${color}`
        } hover:text-${color} `}
        style={{ ...customStyle }}
        onClick={onClick}
      />
    </AtomLink>
  );
  // }
}
