import dynamic from "next/dynamic";
import { FC, useMemo } from "react";

type PropsType = {
  item?: any;
  type?:
    | "SkeletonDefault"
    | "SkeletonSimple"
    | "SkeletonDataviewCard"
    | "Modern"
    | "Fancy"
    | "Funny"
    | "Card";
  customClassName?: string;
  customStyle?: any;
  width?: any;
  height?: any;
  fillColor?: string;
  strokeColor?: string;
  col?: string;
  row?: string;
};
export const Skeleton: FC<PropsType> = ({
  item,
  type = "SkeletonDefault",
  customClassName,
  customStyle,
  width,
  height,
  fillColor,
  strokeColor,
  col = "3",
  row = "5",
  ...customProps
}) => {
  const nemgoo = item?.nemgoo || {};
  const skeleton = nemgoo?.skeleton || {
    type,
  };

  const RenderComponent = useMemo(
    () =>
      dynamic(() =>
        import(`@/components/common/Notice/Skeleton/${skeleton?.type}`).catch(
          (err) => {
            return () => <></>;
          }
        )
      ),
    []
  );

  const skeletonProps = {
    item: item?.item,
    width: width,
    height: height,
    fillColor: fillColor,
    strokeColor: strokeColor,
    col: col,
    row: row,
    ...customProps,
    ...(skeleton?.props || {}),
  };

  return <RenderComponent {...skeletonProps} />;
};
export default Skeleton;
