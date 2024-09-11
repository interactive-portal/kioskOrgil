import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";

type PropsType = {
  item?: any;
  icon?:
    | "IconTime"
    | "IconCircle"
    | "IconChips"
    | "IconDotsFade"
    | "IconDotsJump"
    | "IconSquare"
    | "IconSemiCircle"
    | "IconVolume"
    | "IconWave"
    | "IconBuffer"
    | "IconCheck"
    | "IconCross";
  customClassName?: string;
  className?: string;
  customStyle?: any;
  width?: string;
  height?: string;
  fillColor?: string;
  strokeColor?: string;
};
export const IsFallback: FC<PropsType> = ({
  item,
  icon = "IconCircle",
  customClassName,
  className,
  customStyle,
  width = "150",
  height = "150",
  fillColor = "#ffffff",
  strokeColor = "#d1d1d1",
  ...customProps
}) => {
  const nemgoo = item?.nemgoo || {};
  const fallback = nemgoo?.fallback || {
    type: icon || "IconCircle",
  };

  const RenderComponent = useMemo(
    () =>
      dynamic(() =>
        import(`@/components/common/Notice/Icons/${fallback?.type}`).catch(
          (err) => {
            return () => <></>;
          }
        )
      ),
    []
  );

  const fallbackProps = {
    item: item?.item,
    width: width,
    height: height,
    fillColor: fillColor,
    strokeColor: strokeColor,
    ...customProps,
    ...(fallback?.props || {}),
  };

  return (
    <BlockDiv
      className={`w-screen h-screen flex flex-col justify-center items-center p-3 ${customClassName} ${className}`}
      style={customStyle}
    >
      <RenderComponent {...fallbackProps} />
    </BlockDiv>
  );
};
export default IsFallback;
