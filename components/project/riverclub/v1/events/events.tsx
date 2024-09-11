import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext } from "react";

const Events = () => {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { options } = widgetnemgooReady;
  const router = useRouter();
  const readyData = options?.viewCount
    ? readyDatasrc.slice(0, options?.viewCount)
    : readyDatasrc;

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
  return (
    <>
      <div className="flex items-center px-[40px] py-6 gap-x-4">
        <p className="uppercase text-[30px] font-bold">Удахгүй болох...</p>
        <p className="text-[18px] font-[400]">
          Та клубээс зарлагдаж буй уралдаан, сорилтуудад оролцож өөрийгөө
          сориорой
        </p>
      </div>
      <div className="flex flex-col gap-y-4 mx-10">
        {readyData.map((item: any, index: number) => {
          let left = true;
          if (index % 2) {
            left = true;
          } else {
            left = false;
          }
          return (
            <div
              className={` bg-[${colors[index]}] flex rounded-xl ${
                left && "flex-row-reverse"
              } gap-x-5 `}
              style={{
                background: colors[index],
              }}
              key={index}
            >
              <div
                className={`${
                  left ? "text-left" : "text-right"
                }  flex flex-col gap-y-4 justify-center`}
              >
                <p className="text-[20px] uppercase font-medium">
                  {item?.title}
                </p>
                <p className="text-[16px] uppercase line-clamp-3">
                  {item.description}
                </p>
                <p className="text-[16px] uppercase">
                  {moment(item?.startdate).format("YYYY-MM-DD")} -{" "}
                  {moment(item?.endate).format("YYYY-MM-DD")}
                </p>
                {/* <p className="text-[16px] uppercase">Tax : free</p> */}
              </div>
              <RenderAtom
                item={item?.photo}
                renderType="image"
                customClassName={"w-[237px] h-[237px] object-cover"}
              />
              {/* <img
                src={`http://riverclub.veritech.mn:85/${item?.photo}`}
                className="w-[237px] h-[237px] object-cover"
              /> */}
              <div
                className={`${
                  left ? "pl-5" : "pr-5"
                } h-full flex flex-col items-start mt-4 text-[20px] font-medium min-w-[73px]`}
              >
                <p>{moment(item?.startdate).format("MM.DD")}</p>
                <p>{moment(item?.endate).format("MM.DD")}</p>
              </div>
            </div>
          );
        })}
        {options?.button && (
          <div>
            <button
              className="bg-black text-white text-[14px] px-6 py-4 rounded-[6px] uppercase"
              style={{
                boxShadow: "4px 4px 4px 0px #00000040",
              }}
              onClick={() =>
                router.push({
                  pathname: "/events",
                })
              }
            >
              {options?.button}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Events;
