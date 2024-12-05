// components/WelcomeTitle.tsx
import React from "react";
import ContractItem from "./contractItem";

interface TitleProps {
  data: any;
}

const ontractItem: React.FC<TitleProps> = ({ data }) => {
  // console.log("object :>> ", data);
  // if (!data)
  //   return (
  //     <>
  //       {" "}
  //       <div className="flex flex-col">no data</div>
  //     </>
  //   );
  return (
    <div className="flex flex-col mt-6">
      {data?.map((item: any, index: any) => (
        <>
          <ContractItem data={item} key={index} />
        </>
      ))}
    </div>
  );
};

export default ontractItem;
