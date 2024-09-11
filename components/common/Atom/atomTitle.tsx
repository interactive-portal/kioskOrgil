import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import _ from "lodash";
import { inherit } from "tailwindcss/colors";
import BlockDiv from "@/components/common/Block/BlockDiv";
// import BlockDiv from "@/Block/BlockDiv";

export default function AtomTitle({
  item,
  color = "cozy",
  theme,
  customClassName = "",
  customStyle,
  truncateRow = 0,
  onClick = null,
  showSample = false,
  customDivNumber = "DivTitle",
  divNamePrefix = "",
  debug = false,
  id,
}: {
  item: any;
  color?: string;
  theme?: any;
  customClassName?: string;
  customStyle?: any;
  truncateRow?: number;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
  debug?: boolean;
  id?: string;
}) {
  const value = String(showSample ? "Sample Title" : item?.value || "");

  if (debug) {
    console.log("AtomTitleV2 value", { value, item });
  }

  const valueClassName = item?.className || "";

  //main хэсэг эхэлж байна.
  if (_.isEmpty(value)) return null;

  return (
    <BlockDiv
      customClassName={`text-lg font-bold ${customClassName} ${valueClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}${customDivNumber}`}
      type="div"
      onClick={onClick}
      id={id}
    >
      <span className={`line-clamp-${truncateRow}`} style={{ cursor: inherit }}>
        {parseHtml(decode(value))}
      </span>
    </BlockDiv>
  );
}
