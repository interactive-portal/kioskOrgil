import { FC } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";

type PropsType = {
  item?: any;
  customClassName?: string;
  customStyle?: any;
};
export const WarningNotice: FC<PropsType> = ({
  item,
  customClassName,
  customStyle,
}) => {
  return (
    <BlockDiv
      customClassName={`py-2 px-3 text-gray-700 bg-yellow-50 rounded-sm border-yellow-100 border flex flex-row items-center ${customClassName}`}
      customStyle={customStyle}
    >
      <i className="far fa-exclamation mr-2 text-yellow-700"></i>
      Анхаар!
    </BlockDiv>
  );
};

export default WarningNotice;
