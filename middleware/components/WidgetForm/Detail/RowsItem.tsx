import { FC } from "react";
import RenderField from "@/middleware/components/WidgetForm/RenderField";
import { fieldHideShow } from "@/util/helper";

type PropsType = {
  column: any;
  rowIndex?: any;
  processExpression?: any;
  onDelete?: any;
};

const RowsItem: FC<PropsType> = ({
  column,
  rowIndex,
  onDelete,
  processExpression,
}) => {
  return (
    <tr className="border-t border-gray-300" key={rowIndex}>
      {column.map((item: any, index: number) => {
        return (
          <td
            key={item?.id || index}
            className={`border overflow-hidden border-gray-300 ${
              item["datatype"] == "group" ? "text-center" : ""
            } ${
              item.isshow == "0"
                ? "hidden"
                : fieldHideShow(item, processExpression) && "hidden"
            }`}
          >
            <RenderField
              field={item}
              labelClassName="hidden"
              className="border-none"
              style={{ borderRadius: 0, border: "none" }}
              key={item?.id || index}
              rowIndex={rowIndex}
              sectionConfig={{ otherattr: { labelPosition: "top" } }}
            />
          </td>
        );
      })}

      <td
        key={new Date().getTime()}
        className={`border border-gray-300 text-center`}
      >
        <button
          onClick={(e) => onDelete(e, rowIndex)}
          title={`Мөр устгах`}
          className="btn text-sm bg-red-500 focus:outline-none text-white dark:text-gray-400 border border-gray-300 dark:border-gray-500 py-1 px-2 rounded hover:bg-red-600 transition duration-150 ease-in-out"
        >
          <i className="fa fa-trash" style={{ fontSize: 12 }}></i>
        </button>
      </td>
    </tr>
  );
};

export default RowsItem;
