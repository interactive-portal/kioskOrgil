import { FC } from "react";
import RenderField from "@/middleware/components/WidgetForm/RenderField";

type PropsType = {
  column: any;
  rowIndex?: any;
  inputclassName?: any;
};

const RowsItem: FC<PropsType> = ({ column, rowIndex, inputclassName }) => {
  return (
    <>
      {column.map((item: any, index: number) => (
        <RenderField
          field={item}
          key={item?.id || index}
          rowIndex={rowIndex}
          className={inputclassName}
        />
      ))}
    </>
  );
};

export default RowsItem;
