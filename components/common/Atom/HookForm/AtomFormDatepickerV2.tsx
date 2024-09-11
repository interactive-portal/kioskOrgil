import _ from "lodash";
import moment from "moment";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";

const AtomFormDatepickerV2 = ({
  validation = {},
  fieldName,
  hookForm,
}: {
  validation?: any;
  fieldName: string;
  hookForm: any;
}) => {
  if (_.isEmpty(hookForm?.control)) return null;

  return (
    <Controller
      control={hookForm?.control}
      name={fieldName}
      rules={validation}
      render={({ field }) => {
        const myValueProp = field.value ? { value: moment(field.value) } : {};
        return (
          <>
            date
            {/* <DatePicker
              className="w-full z-10 border-gray-300 hover:border-gray-300/[.6]"
              {...myValueProp}
              showToday
              allowClear
              placeholder="Өдрөө сонгоно уу"
              onChange={(date, dateString) => field.onChange(dateString)}
            /> */}
          </>
        );
      }}
    />
  );
};

export default AtomFormDatepickerV2;
