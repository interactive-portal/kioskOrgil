import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { twMergeUtil } from "@/components/common/engineBox/util/atomHelper";
import { processCloudinaryImage } from "@/components/common/engineBox/util/imageHelper";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import ReactPlayer from "react-player";

export default function atomVideo({
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

  const value = String(!showSample ? item?.value : "");
  const valueClassName = item?.className || "";

  if (_.isEmpty(value)) return null;

  const imageRootUrl =
    process.env.IMAGEROOTURL || "https://cloudnew.veritech.mn/app/";

  const [videoSrc, setImgSrc] = useState<any>();

  const checkFile = async (item: any) => {
    const data = await fetch(`/api/get-file?param=${item}`, {
      cache: "force-cache",
    });
    // console.log("data", data);
    setImgSrc(data.url);
  };

  useEffect(() => {
    checkFile(value);
  }, [videoSrc]);

  // const imageRootUrl =
  //   process.env?.[`NEXT_PUBLIC_METAHOST_${metaNameV2}_IMAGEROOTURL`] || "";

  const imgSrc = _.startsWith(value, "storage/")
    ? `${imageRootUrl}${value}`
    : value;

  const imgSrcReady = processCloudinaryImage(
    imgSrc,
    `fl_progressive${!_.isEmpty(cloudinaryParam) ? `,${cloudinaryParam}` : ""}` //w_200,h_150,c_scale гэх мэтээр өгч болно.
  );

  const divNumber = `${divNamePrefix}${customDivNumber}`;

  return (
    <>
      <ReactPlayer url={videoSrc} controls />
    </>
  );
}
