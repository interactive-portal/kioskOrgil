import { useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Rate } from "antd";
import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

const pageTitle = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
    Title,
  } = useContext(WidgetWrapperContext);

  const router = useRouter();
  const pageType = widgetnemgooReady?.listconfig?.pageType;
  const { pathname } = widgetnemgooReady;

  const renderType = () => {
    if (pageType == "single") {
      return <></>;
    } else {
      return (
        <BlockDiv
          customClassName={`flex max-h-[200px]`}
          divNumber="divGridNumber"
        >
          <BlockDiv customClassName="md:col-span-1 flex flex-col justify-between h-full col-span-12">
            <p className="text-white flex text-center sm:text-xs xs:text-[8px] md:text-base">
              <span className="opacity-80 hover:text-white cursor-pointer">
                Нүүр{" "}
              </span>
              {readyDatasrc?.map((item: any, index: number) => {
                return (
                  <>
                    <p
                      className="ml-1 cursor-pointer hover:text-white"
                      key={item?.id || index}
                      onClick={() => {
                        if (index > 0) {
                          router.push(
                            {
                              pathname: pathname || "/lessons/content",
                              query: {
                                filterid: item?.id,
                                lparentid: router.query?.lparentid,
                              },
                            },
                            undefined,
                            {
                              shallow: false,
                            }
                          );
                        } else {
                          router.push({
                            pathname: "/category",
                            query: {
                              fparentid: item?.id,
                            },
                          });
                        }
                      }}
                    >
                      {item?.name && <span className="opacity-80">/ </span>}
                      <span className="opacity-80 hover:opacity-100">
                        {item?.name}
                      </span>
                    </p>
                  </>
                );
              })}
            </p>
            <RenderAtom
              item={
                readyDatasrc[readyDatasrc?.length - 1]?.position1 || {
                  value: "Контентийн гарчиг",
                }
              }
              renderType="title"
              customClassName={
                "text-lg text-white md:pt-4 sm:text-base xs:text-sm md:text-2xl max-w-[]"
              }
            />{" "}
            {/* <RenderAtom
              item={{
                value:
                  parseHtml(decode(readyDatasrc[0]?.position3?.value)) ||
                  "Контентийн тайлбар",
              }}
              renderType="text"
              customProps={{
                truncateRow: 4,
              }}
              customClassName={
                "md:w-1/2 w-full text-white md:text-[16px] text-[12px] line-clamp-3"
              }
              customStyle={{
                color: "white !important",
              }}
            /> */}
            <div className="flex items-center">
              <Rate
                allowHalf
                defaultValue={Number(readyDatasrc[0]?.starval) || 4}
                disabled
                className="text-sm py-4"
                style={{ color: "#FFBB00" }}
              />
              <span className="text-white pl-2">
                {" "}
                {readyDatasrc[0]?.starval} / {readyDatasrc[0]?.viewcount}
              </span>
            </div>
            <span className=" mb-0 text-white opacity-80 flex xs:text-xs md:text-sm">
              {readyDatasrc[0]?.lastmodify}
            </span>
          </BlockDiv>
          <BlockDiv
            customClassName="md:col-span-1 md:flex md:flex-row-reverse md:h-[130px] col-span-12 h-[50px] sm:self-center xs:self-center md:self-end ml-auto"
            divNumber={"pageTitleDivRight"}
          >
            <RenderAtom
              item={{ value: readyDatasrc[1]?.picture }}
              renderType="image"
              customClassName={
                "md:w-[130px] h-full md:rounded-[20px] w-[50px] rounded[10px]"
              }
            />
            <BlockDiv customClassName="flex flex-col items-end justify-end mr-4 mb-4">
              <RenderAtom
                item={{ value: readyDatasrc[1]?.fullname }}
                renderType="title"
                customClassName={"sm:text-base xs:text-sm md:text-2xl"}
                customStyle={{
                  width: "auto",
                }}
              />
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
      );
    }
  };

  return (
    <>
      <BlockDiv customClassName="w-full h-full" divNumber="div10">
        {renderType()}
      </BlockDiv>
    </>
  );
};
export default pageTitle;
