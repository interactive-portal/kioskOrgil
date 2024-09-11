import dynamic from "next/dynamic";
import { useMemo } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function Loading({
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
  const loading = nemgoo?.loading || {
    type: type,
  };

  const RenderComponent = useMemo(
    () =>
      dynamic(() =>
        import(
          `@/components/common/Notice/Loading/Loading${loading?.type}`
        ).catch((err) => {
          return () => <></>;
        })
      ),
    []
  );

  const loadingProps = {
    item: item?.item,
    ...customProps,
    ...(loading?.props || {}),
  };

  return (
    <BlockDiv
      className={`w-16 h-16 ${customClassName} ${className}`}
      style={customStyle}
    >
      <RenderComponent {...loadingProps} />
    </BlockDiv>
  );
}
