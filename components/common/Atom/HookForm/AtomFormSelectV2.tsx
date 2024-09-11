import _ from "lodash";
import { Select } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

const AtomFormSelectV2 = ({
  item,
  input = {},
  validation = {},
  fieldName,
  hookForm,
}: {
  item: any;
  input?: any;
  validation?: any;
  fieldName: string;
  hookForm: any;
}) => {
  if (_.isEmpty(hookForm?.control)) return null;

  const myDataList = item?.rowsReady || [];
  // console.log("🚀 ~ myDataList", myDataList);
  // console.log("ӨӨӨӨӨӨРРРР ~ myDataList", myDataList);

  return (
    <>
      <Controller
        control={hookForm?.control}
        name={fieldName}
        rules={validation}
        render={({ field }) => {
          return (
            <Select
              {...field}
              className="w-full z-10"
              allowClear
              placeholder="Сонгоно уу.."
            >
              {myDataList.map((item: any, index: number) => {
                return (
                  <Option
                    key={item?.position0?.value || index}
                    value={item?.position0?.value || item?.id}
                  >
                    {item?.position1?.value || item?.title || "Тодорхойгүй"}
                  </Option>
                );
              })}
            </Select>
          );
        }}
      />
    </>
  );
};

export default AtomFormSelectV2;
