import { FC } from "react";

type PropsType = {
  customClassName?: string;
  customStyle?: any;
  fillColor?: string;
  strokeColor?: string;
};

const SkeletonSimple: FC<PropsType> = ({
  customStyle = "",
  customClassName = "",
  fillColor = "#f3f4f6",
  strokeColor = "#d1d1d1",
}) => {
  return (
    <>
      <div className="w-full">
        <div className="animate-pulse">
          <div
            className="h-2 rounded"
            style={{ backgroundColor: fillColor }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonSimple;
