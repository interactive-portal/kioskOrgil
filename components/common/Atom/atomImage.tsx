import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import { useContext } from "react";
import { twMergeUtil } from "@/components/common/engineBox/util/atomHelper";
import { processCloudinaryImage } from "@/components/common/engineBox/util/imageHelper";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useState, useEffect } from "react";

export default function AtomImageV2({
  item,
  theme,
  customClassName = "",
  customStyle,
  cloudinaryParam,
  alt,
  onClick = null,
  showSample = false,
  customDivNumber = "DivImage",
  divNamePrefix = "",
  id,
}: {
  item: any;
  theme?: any;
  customClassName?: string;
  customStyle?: any;
  alt?: string;
  cloudinaryParam?: string; //w_200,h_150,c_scale
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
  id?: string;
}) {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const cloudContext = useCloud();

  const value = String(
    !showSample
      ? item?.value
      : "https://www.cars-data.com/pictures/mercedes/mercedes-benz-g-class_4266_24.jpg"
  );
  const valueClassName = item?.className || "";

  if (_.isEmpty(value)) return null;

  //storage гэсэн замтай ирвэл өмнө нь домэйнийг залгаж өгөх ёстой.
  // const ddd = process.env?.[`NEXT_PUBLIC_METAHOST_${metaNameV2}_IMAGEROOTURL`];

  const [videoSrc, setImgSrc] = useState<any>();

  const checkFile = async (item: any) => {
    // console.log(item);
    const data = await fetch(`/api/get-file?param=${item}`, {
      cache: "force-cache",
    });
    if (data?.ok) {
      setImgSrc(data.url);
      // console.log(data.url);
    } else {
    }
  };

  useEffect(() => {
    checkFile(value);
  }, [videoSrc]);

  const imageRootUrl =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://riverclub.veritech.mn/";

  // const imageRootUrl =
  //   process.env?.[`NEXT_PUBLIC_METAHOST_${metaNameV2}_IMAGEROOTURL`] || "";

  const imgSrc = _.startsWith(value, "storage/") ? `${videoSrc}` : value;

  const imgSrcReady = processCloudinaryImage(
    imgSrc,
    `fl_progressive${!_.isEmpty(cloudinaryParam) ? `,${cloudinaryParam}` : ""}` //w_200,h_150,c_scale гэх мэтээр өгч болно.
  );

  const divNumber = `${divNamePrefix}${customDivNumber}`;

  return (
    <img
      id={id}
      src={imgSrcReady}
      loading="lazy"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = "/noimage.png";
      }}
      className={twMergeUtil(
        theme,
        "w-full h-auto",
        customClassName,
        widgetnemgooReady?.design?.[divNumber]?.className ||
          widgetnemgooReady?.[divNumber]?.className ||
          "",
        valueClassName
      )}
      style={{
        ...widgetnemgooReady?.design?.[divNumber]?.style,
        ...customStyle,
      }}
      alt={alt || imgSrc}
      role="img"
      onClick={onClick}
      div-name={divNumber}
    />
  );
}
// function useState<T>(): [any, any] {
//   throw new Error("Function not implemented.");
// }

// function useEffect(arg0: () => void, arg1: any[]) {
//   throw new Error("Function not implemented.");
// }
