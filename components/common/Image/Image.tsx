import React, { FC } from "react";
import Image from "next/image";

type PropsType = {
  src: any;
  width: any;
  quality: number;
  className: any;
};

const pImage: FC<PropsType> = ({ src, width, quality, className }) => {
  // const myLoader = ({ src, width, quality }) => {
  //     return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  //   }
  return (
    <Image
      //   loader={myLoader}
      src={src}
      alt="Picture of the author"
      // width={500}
      // height={500}
      className={className}
    />
  );
};
export default pImage;
