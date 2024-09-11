import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper";

import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import useSwiperRef from "@/components/common/Atom/useSwiperRef";
import BlockDiv from "@/components/common/Block/BlockDiv";

const HelpBanner = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const pagination: any = {
    clickable: true,
    type: "bullets",
    renderBullet: (index: number, className: any) => {
      return `<span index-number="${index}" class="${className}  cursor-pointer bg-white/50 bottom-4 text-white mx-2 w-5 h-2 inline-block  rounded-sm "style=z-index:100;> </span>`;
    },
  };
  const [nextEl, nextElRef]: any = useSwiperRef();
  const [prevEl, prevElRef]: any = useSwiperRef();
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={pagination}
        navigation={{
          prevEl,
          nextEl,
        }}
        className="relative flex items-center justify-center"
        spaceBetween={10}
        centeredSlides={false}
        slidesPerView={1}
      >
        {readyDatasrc.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <BlockDiv
              customClassName="relative w-full lg:h-[500px] xs:h-[400px] bg-no-repeat bg-cover lg:pt-0 xs:pt-0 lg:px-0 xs:px-4"
              customStyle={{ backgroundImage: `url('${item?.mainimage}')` }}
              divNumber="LandingPageDiv"
            >
              <BlockDiv
                customClassName="max-w-lpcontainer lg:px-10 px-0 mx-auto flex my-auto items-center justify-between lg:mt-0 xs:mt-0 h-full"
                divNumber={"LandingPageBannerDiv"}
              >
                <BlockDiv
                  customClassName="flex flex-col justify-evenly lg:h-[70%] xs:h-[100%] lg:w-3/5 xs:4/5 pb-20"
                  divNumber={"LandingPageDiv100"}
                >
                  <RenderAtom
                    item={item?.position1}
                    renderType="title"
                    customClassName={`  ${
                      item?.textColor || "text-white"
                    } text-[46px] font-bold lg:w-[80%] xs:w-full leading-[58px]`}
                    customProps={{
                      truncateRow: 2,
                    }}
                    customStyle={{
                      color: item?.textColor || "white",
                    }}
                  />
                  <RenderAtom
                    item={item?.position3}
                    renderType="text"
                    customClassName={`text-lg w-full text-ellipsis  ${
                      item?.textColor || "text-white"
                    }`}
                    customProps={{
                      truncateRows: 2,
                    }}
                    customStyle={{
                      color: item?.textColor || "white",
                    }}
                  />
                  <RenderAtom
                    item={item?.position10}
                    renderType="button"
                    customClassName={`
                      bg-white text-[#585858] font-medium text-[18px] py-[10px] px-[25px] pl-[30px] mt-[40px] w-[178px] rounded-[30px] flex-row-reverse hover:opacity-70`}
                    customDivNumber="LandingPageDivButton"
                    customStyle={item?.buttonStyle}
                    customProps={{
                      icon: "fa-solid fa-arrow-right ml-3 fa-sm relative top-[2px]",
                    }}
                  />
                </BlockDiv>
                {/* <div>
            <RenderAtom
            item={{value:"https://res.cloudinary.com/dzih5nqhg/image/upload/v1657156384/Zoho%20landing/image_44235_yzfgnp.png"}}
            renderType="image"
            customClassName={'h-[500px] w-auto'}
            />
          </div> */}
              </BlockDiv>
            </BlockDiv>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .swiper-pagination-bullet-active {
              opacity:1 !important;
              background:#ffffff !important;
          }
          .swiper-pagination-bullet {
              opacity:0.4;
              background:white;
			  border-radius:50%;
			  width:10px;
			  height:10px
          }
          .swiper-pagination {
              position: absolute;
              bottom: 10px;
              z-index: 5000;
              margin: 0 auto;
              left: 50%;
              transform: translateX(-50px);
          }
          .swiper-slide {
              width: unset;
          }
        `}
      </style>
    </div>
  );
};
export default HelpBanner;
