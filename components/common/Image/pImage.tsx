import React, { FC } from "react";
import Image from "next/image";

type PropsType = {
  src?: any;
  width?: any;
  quality?: number;
  height?: number;
  className?: any;
};

const pImage: FC<PropsType> = ({ src, width, quality, className }) => {
  return (
    <Image
      //   loader={myLoader}
      src={src}
      alt="Picture of the author"
      width={width}
      height={500}
      className={className}
    />
  );
};
export default pImage;
