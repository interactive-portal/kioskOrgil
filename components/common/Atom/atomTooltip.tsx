import { Tooltip } from "antd";
import _ from "lodash";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function AtomTooltipV2({
  item = {},
  children,
}: {
  item?: any;
  children: any;
}) {
  if (_.isEmpty(item)) return children;

  return (
    <Tooltip
      title={
        _.isPlainObject(item)
          ? item?.text || item?.title || ""
          : _.isString(item)
          ? item
          : ""
      }
      className={item?.className || item?.customClassName}
      style={item?.style || item?.customStyle}
      arrow={false}
      placement={item?.placement || "top"}
    >
      <BlockDiv className="" divNumber="tooltipSpan">
        {/* Cozy дээр Сагс товчны justify-between ажиллахгүй байгаа тул w-full болон block өгч болохгүй юм байна. Ер нь span-аар хучиж болохгүй. */}
        {children}
      </BlockDiv>
    </Tooltip>
  );
}
