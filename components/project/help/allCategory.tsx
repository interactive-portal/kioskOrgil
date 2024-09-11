import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import { useRouter } from "next/router";

const AllCategory = () => {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { cardColors } = widgetnemgooReady?.options;
  const router = useRouter();

  return (
    <div>
      <div className="">
        <RenderAtom
          item={{ value: widgetnemgooReady?.title || "Бүх ангилал" }}
          renderType="title"
          customClassName={"text-[38px] font-medium text-[#585858] text-center"}
        />
      </div>
      <div className="max-w-[920px] mx-auto text-center w-full pb-[50px]">
        <RenderAtom
          item={{
            value:
              widgetnemgooReady?.subtitle ||
              "Хэрэглэгч та бизнесийн олон төрлийн үйлчилгээг дижитал хэлбэрээр хялбар авах боломжтой бөгөөд цахим шилжилт хийсэн бизнесүүдийн үйлчилгээний сангаас сонголтоо хийн үйлчлүүлнэ үү.",
          }}
          renderType="text"
          customClassName={
            "text-[#67748E] text-base font-normal leading-6 max-w-[920px] text-center"
          }
        />
      </div>
      <div className="grid grid-cols-4 gap-5">
        {readyDatasrc?.map((obj: any, index: number) => {
          return (
            <div
              className={`bg-[${cardColors[index]}] rounded-lg hover:bg-[#AC2E9926] p-5 cursor-pointer animate`}
              style={{
                background: cardColors[index],
                animationDelay: index * 0.1 + "s",
              }}
              onClick={() =>
                router.push({
                  pathname: "/category",
                  query: {
                    fparentid: obj?.id,
                  },
                })
              }
            >
              <RenderAtom
                item={obj?.position1 || { value: "Дизайн & Бүтээлч" }}
                renderType="title"
                customClassName={
                  "text-[18px] leading-[28px] text-[#585858] leading-7 min-h-[52px]"
                }
              />
              <RenderAtom
                item={{ value: `${obj?.position3?.value} мэдлэг` }}
                renderType="text"
                customClassName={"text-[#67748E] text-lg"}
              />
            </div>
          );
        })}
      </div>
      <style>
        {`
			.animate {
				opacity: 0;
              transform: translateY(-10px);
              animation: up 0.2s forwards;
              border:3px solid transparent;
			}

			@keyframes up {
				from {
				  opacity: 0;
				  transform: translateY(-10px);
				}
				to {
				  opacity: 1;
				  transform: translateY(0);
				}
			  }
			`}
      </style>
    </div>
  );
};

export default AllCategory;
