import dynamic from "next/dynamic";
import { useMemo } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function Percent({
  item,
  type = "1",
  customClassName = "",
  className = "",
  customStyle,
  ...customProps
}: {
  item?: any;
  type?: "1" | "2";
  customClassName?: string;
  className?: string;
  customStyle?: any;
}) {
  const nemgoo = item?.nemgoo || {};
  const percentNemgoo = nemgoo?.percent || {
    type: type,
  };

  const RenderComponent = useMemo(
    () =>
      dynamic(() =>
        import(
          `@/components/common/Notice/Percent/Percent${percentNemgoo?.type}`
        ).catch((err) => {
          return () => <></>;
        })
      ),
    []
  );

  const percentProps = {
    item: item?.item,
    ...customProps,
    ...(percentNemgoo?.props || {}),
  };

  return (
    <BlockDiv
      className={`w-full h-auto ${customClassName} ${className}`}
      style={customStyle}
    >
      <RenderComponent {...percentProps} />
    </BlockDiv>
  );
}
