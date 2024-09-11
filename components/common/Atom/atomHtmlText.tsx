import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import { isEmpty } from "lodash";

export default function AtomHtmlText({
  item,
  customStyle,
  customClassName = "",
  truncateRow = 0,
  id,
}: {
  item: any;
  customStyle?: any;
  customClassName?: string;
  truncateRow?: number;
  id?: string;
}) {
  const data = decode(item.value).replaceAll(
    "storage/uploads",
    "https://cloudnew.veritech.mn/app/storage/uploads"
  );

  const rr = data.replaceAll(
    "https://cloudnew.veritech.mn/app/https://cloudnew.veritech.mn/app/",
    "https://cloudnew.veritech.mn/app/"
  );

  if (isEmpty(item)) return null;

  return (
    <span id={id} className={`htmltext ${customClassName}`}>
      {parseHtml(rr)}
    </span>
  );
}
