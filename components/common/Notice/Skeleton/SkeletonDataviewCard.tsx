import { FC } from "react";

type PropsType = {
  customClassName?: string;
  customStyle?: any;
  fillColor?: string;
  strokeColor?: string;
  col?: string;
  row?: string;
};

const SkeletonDataviewCard: FC<PropsType> = ({
  customStyle = "",
  customClassName = "",
  fillColor = "#f3f4f6",
  strokeColor = "#d1d1d1",
  col = "3",
  row = "5",
}) => {
  const total: number = Number(col) * Number(row);
  const itemList = [];
  for (let i = 0; i < total; i++) {
    itemList.push({});
  }

  return (
    <div className={`grid grid-cols-${col} gap-5`}>
      {itemList.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`border border-${strokeColor} bg-${fillColor} rounded-md p-4 h-36 max-w-sm w-full mx-auto`}
          >
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonDataviewCard;
