import React from "react";
import { useRouter } from "next/router";

interface ButtonListProps {
  pageName: string;
  path: string;
  bgColor: string;
  textColor: string;
}

const ButtonList: React.FC<ButtonListProps> = ({
  pageName,
  path,
  bgColor,
  textColor,
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    localStorage.clear();
    router.push(path);
  };

  return (
    <div
      className="rounded-full md:text-[64px] xs:text-[30px] md:py-5  cursor-pointer obtn xs:w-full px-10  xs:py-4 "
      // style={{ backgroundColor: bgColor, color: textColor }}
      onClick={() => handleNavigation(path)}
    >
      {pageName}
    </div>
  );
};

export default ButtonList;
