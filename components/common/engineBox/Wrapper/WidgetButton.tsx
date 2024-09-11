import _ from "lodash";
import { twMerge } from "tailwind-merge";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function WidgetButton({
  customClassName,
  buttonObject = {},
}: {
  customClassName?: string;
  buttonObject?: any;
}) {
  if (_.isEmpty(buttonObject?.title)) return null;

  const title = buttonObject?.title || "";

  const atomClassName = twMerge(
    buttonObject?.className || "",
    customClassName || ""
  );

  const atomStyle = buttonObject?.style || {};

  return (
    <RenderAtom
      item={{
        value: title,
        positionnemgoo: {
          atom: buttonObject?.atom,
        },
      }}
      renderType="button"
      customClassName={atomClassName}
      customStyle={atomStyle}
    />
  );
}
