import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import Image from "next/image";

const Banner4 = () => {
  const { config, readyDatasrc, widgetnemgooReady } =
    useContext(WidgetWrapperContext);

  const item = readyDatasrc[0];
  return (
    <>
      <div className="overflow-y-hidden w-full">
        <BlockDiv
          customClassName=" flex justify-center items-center md:justify-start w-full lg:h-[650px] bg-cover md:h-[300px] object-cover relative md:py-10 lg:py-0 md:px-4 lg:px-0"
          // customStyle={{ backgroundImage: `url('${item?.mainimage}')` }}
          divNumber="LandingBannerDiv"
        >
          <Image
            src={item?.mainimage}
            fill
            // height={260}
            style={{ objectFit: "cover" }}
            className={`${widgetnemgooReady?.imageClassName}`}
            alt="cover"
          />

          <div className="max-w-lpcontainer flex md:flex-col-reverse mx-auto h-full w-full relative z-10">
            <div className=" flex flex-col w-[630px] h-full lg:pt-[70px] xs:pt-14 lg:py-0 xs:py-14 justify-between lg:mb-14 xs:mb-0 xs:px-4">
              <RenderAtom
                item={item?.position1}
                renderType="title"
                customClassName={
                  "text-[46px] font-semibold whitespace-normal leading-[52px]"
                }
                customStyle={{ color: "white" }}
                customProps={{
                  truncateRows: 2,
                }}
              />
              <RenderAtom
                item={item?.position3}
                renderType="text"
                customClassName={"text-white text-[18px] line-clamp-2"}
              />
              {item?.position10 && (
                <RenderAtom
                  item={item?.position10}
                  renderType="button"
                  customClassName={
                    "bg-white text-[#585858] px-4 rounded-[30px] font-roboto font-medium text-lg w-[178px] flex-row-reverse"
                  }
                  customProps={{
                    icon: "fa-solid fa-arrow-right ml-3 fa-sm relative top-[2px]",
                  }}
                />
              )}
            </div>
          </div>
        </BlockDiv>
      </div>
      <style>
        {`
        .backgroundImage {
          height: auto !important
        }
        `}
      </style>
    </>
  );
};

export default Banner4;
