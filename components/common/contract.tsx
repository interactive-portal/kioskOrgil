// components/WelcomeTitle.tsx
import React from "react";
import ContractItem from "./contractItem";

interface TitleProps {
  data: any;
}

const ontractItem: React.FC<TitleProps> = ({ data }) => {
  return (
    <div className="flex flex-col">
      {data?.map((item: any, index: any) => (
        <>
          <ContractItem data={item} key={index} />
        </>
      ))}
    </div>
  );
};

export default ontractItem;
