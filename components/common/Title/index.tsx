// components/WelcomeTitle.tsx
import React from "react";

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="text-[#A68B5C] pagetitle text-center uppercase md:my-20 ">
      {title}
    </div>
  );
};

export default Title;
