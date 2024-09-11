import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper";

import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import useSWR from "swr";
import _ from "lodash";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useRouter } from "next/router";
import RenderAtom from "@/components/common/Atom/RenderAtom";

const AboutUs = () => {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { options } = widgetnemgooReady;
  const router = useRouter();

  const colors = [
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
  ];

  let { data: readyData } = useSWR(`
  /api/get-process?command=fitKioskTrainerList_DV_004&parameters=${JSON.stringify(
    {
      id: "1",
    }
  )}
  `);

  if (_.isEmpty(readyData?.result?.fitkioskclassdv)) {
    return;
  }

  const dataReady = options?.viewCount
    ? readyData?.result?.fitkioskclassdv.slice(0, options?.viewCount)
    : readyData?.result?.fitkioskclassdv;

  return (
    <>
      <div className="flex items-center px-[40px] py-6 gap-x-4">
        <p className="uppercase text-[30px] font-bold min-w-[160px]">
          Багш нар
        </p>
        <p className="text-[18px] font-[400]">
          Спиннинг бол тэсвэр хатуужил, хурд. зүрх судасны үйл ажиллагааг
          сайжруулж өндөр хэмжээний калори шатаах эрч хүчтэй кардио дасгал юм.
        </p>
      </div>
      {dataReady?.map((obj: any, ind: number) => {
        return (
          <div className="flex flex-col gap-y-" key={ind}>
            <div className="grid grid-cols-12 w-full py-4 px-10">
              <p className="text-[22px] font-bold col-span-2 uppercase">
                {obj?.name}
              </p>
              <p className="col-span-10 uppercase text-[16px]">
                {obj?.description}
              </p>
            </div>
            <div className="px-10">
              <Swiper slidesPerView={4.5} spaceBetween={20}>
                {!_.isEmpty(obj?.fitkiosktrainerdv) &&
                  obj?.fitkiosktrainerdv.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={index} className="">
                        <div
                          className={`flex flex-col rounded-lg bg-[${colors[index]}]`}
                          style={{
                            background: colors[index],
                          }}
                        >
                          <RenderAtom
                            item={
                              item?.picture ||
                              "storage/uploads/metavalue/photo_original/photo_15843279694444230.jpg"
                            }
                            renderType="image"
                            customClassName={
                              "h-[200px] w-full rounded-t-lg object-cover"
                            }
                          />
                          {/* <img
                            src={`http://riverclub.veritech.mn:85/${
                              item?.picture ||
                              "storage/uploads/metavalue/photo_original/photo_15843279694444230.jpg"
                            }`}
                            className="h-[200px] w-full rounded-t-lg object-cover"
                          /> */}
                          <div className="px-4 py-6">
                            <p className="text-[20px]">{item?.trainername}</p>
                            <p className="text-[10px]">{item?.description}</p>
                            <div className="mt-4 flex flex-col gap-y-4">
                              {!_.isEmpty(item?.fitkiosktrainerclass_dv) &&
                                item?.fitkiosktrainerclass_dv?.map(
                                  (obj1: any, index: number) => {
                                    return (
                                      <div
                                        className="border-t border-black"
                                        key={index}
                                      >
                                        <p className="uppercase text-black text-[20px] font-bold">
                                          {obj1?.classname}
                                        </p>
                                        <p className="text-[12px] text-black">
                                          {obj1?.description}
                                        </p>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        );
      })}
      {options?.button && (
        <div className="px-[25px] mt-4">
          <button
            className="bg-black text-white text-[14px] px-6 py-4 rounded-[6px] uppercase"
            style={{
              boxShadow: "4px 4px 4px 0px #00000040",
            }}
            onClick={() =>
              router.push({
                pathname: "/aboutus",
              })
            }
          >
            {options?.button}
          </button>
        </div>
      )}
    </>
  );
};

export default AboutUs;
