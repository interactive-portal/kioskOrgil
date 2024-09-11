import { FC, useContext } from "react";
import _ from "lodash";
import Link from "next/link";
import RenderAtom from "@/components/common/Atom/RenderAtom";

type PropsType = {
  data?: any;
  options?: any;
};

const LandingPageFooter: FC<PropsType> = ({ data, options }) => {
  const readyDatasrc = data;
  const otherSettings = options?.widgetnemgooReady?.otherSettings;
  const readyData =
    window.innerWidth < 600 ? readyDatasrc.slice(0, 1) : readyDatasrc;

  // console.log("readyData :>> ", readyData);
  return (
    <footer className="relative bg-[#282828] px-0 lg:px-10">
      <div className={`py-16 ${otherSettings?.theme}`}>
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8  z-10 relative">
          {readyData?.map((item: any, index: number) => {
            const footerTitle = () => {
              if (_.isEmpty(item?.title)) {
                return <img src={item?.logo} className="h-16 p-2 text-white" />;
              }
              return (
                <RenderAtom
                  item={item?.position1 || { value: item?.title }}
                  renderType="title"
                  customClassName="text-lg text-white font-bold pt-6 pb-6 px-3"
                />
              );
            };

            return (
              <div className={` item-col ${index}`} key={item?.id || index}>
                {footerTitle()}
                <RenderAtom
                  item={{ value: item?.description }}
                  renderType="title"
                  customClassName=" text-white p-3 mt-3 text-[14px] font-normal text-opacity-80  "
                />
                {item?.link?.map((item1: any, i: number) => {
                  return (
                    <div key={i} className="my-2">
                      <Link
                        href={item1?.url}
                        className="text-white text-[14px]  text-opacity-80 p-3 "
                      >
                        {item1?.name}
                      </Link>
                    </div>
                  );
                })}
                <div className="flex jusitfy-between  gap-6 xs:hidden">
                  {item?.applink?.map((item2: any, index: number) => {
                    return (
                      <div key={item2?.id || index} className="my-1">
                        <Link href={item2?.url}>
                          <img
                            src={item2?.imgpath}
                            alt={item2?.name}
                            className="w-full cursor-pointer"
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="flex jusitfy-between  gap-8 mt-8 xs:hidden lg:flex">
                  {item?.social?.map((item3: any, index: number) => {
                    return (
                      <div
                        key={item3?.id || index}
                        className="w-10 h-10 bg-blue-800 text-center pt-2  rounded-full cursor-pointer hover:opacity-80"
                      >
                        <Link href={item3?.url} className="text-white">
                          <i
                            className={`fa-brands fa-${item3?.name} text-white `}
                          ></i>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {otherSettings?.bg1 && (
        <img
          src={otherSettings?.bg1}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
      )}
      {otherSettings?.bg2 && (
        <img
          src={otherSettings?.bg2}
          className="absolute  object-right right-0 bottom-0 hidden md:block transition ease-in-out delay-150 "
        />
      )}
    </footer>
  );
};
export default LandingPageFooter;
