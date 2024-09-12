// components/WelcomeTitle.tsx
import React from "react";

interface TitleProps {
  title: any;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="text-[#A68B5C] pagetitle text-center uppercase md:mb-16 ">
      {title}
    </div>
  );
};

export default Title;
