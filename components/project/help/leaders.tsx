import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const Leaders = () => {
  const { widgetnemgooReady, readyDatasrc } = useContext(WidgetWrapperContext);
  const testData = [
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Манлайлагч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
  ];

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
              widgetnemgooReady?.description ||
              "Хэрэглэгч та бизнесийн олон төрлийн үйлчилгээг дижитал хэлбэрээр хялбар авах боломжтой бөгөөд цахим шилжилт хийсэн бизнесүүдийн үйлчилгээний сангаас сонголтоо хийн үйлчлүүлнэ үү.",
          }}
          renderType="text"
          customClassName={
            "text-[#67748E] text-base font-normal leading-6 max-w-[920px] text-center"
          }
        />
      </div>
      <div className="grid grid-cols-3 gap-5 w-full px-[140px]">
        <div className="col-span-1">
          <div
            className=" bg-white rounded-[20px] flex flex-col gap-[20px] items-center pt-[20px]"
            style={{
              boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="bg-[#699BF726]  w-max mx-auto rounded-[22px] text-center px-[20px] min-h-[40px]">
              <RenderAtom
                item={{ value: "Манлайлагч" }}
                renderType="text"
                customClassName={
                  "text-[24px] font-bold text-white  text-[#699BF7]"
                }
              />
              {/* {obj?.rate} */}
            </div>
            <RenderAtom
              item={{
                value:
                  "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
              }}
              renderType="image"
              customClassName={"h-[150px] rounded-full w-[150px]"}
            />
            <div className="text-center">
              <RenderAtom
                item={{ value: "Б. Энхзул" }}
                renderType="title"
                customClassName={"text-[26px] text-[#585858] font-medium"}
              />
              <RenderAtom
                item={{ value: "Менежер" }}
                renderType="title"
                customClassName={"text-[16px] text-[#67748E] font-medium"}
              />
            </div>
            <div className="bg-transparent w-full rounded-b-[20px] bg-opacity-20 text-center leading-6 py-[12px]">
              <RenderAtom
                item={{ value: "500" }}
                renderType="text"
                customClassName={"text-[30px] text-[#699BF7] font-bold"}
              />
              <p className="text-[16px] font-medium text-[#699BF7]">санал</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 ">
          <table className="w-full border-none">
            <thead>
              <tr className="border-b">
                <th className="text-start">Ерөнхий</th>
                <th>Байр</th>
                <th>Санал</th>
              </tr>
            </thead>
            <tbody className="border-none">
              {testData
                ?.slice(1, testData?.length)
                ?.map((obj: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="flex items-center gap-[20px]">
                        <RenderAtom
                          item={{
                            value:
                              "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
                          }}
                          renderType="image"
                          customClassName={"h-[70px] rounded-full w-[70px]"}
                        />
                        <div>
                          <RenderAtom
                            item={{ value: obj?.name }}
                            renderType="text"
                            customClassName={
                              "text-[24px] text-[#585858] font-medium p-0"
                            }
                          />
                          <RenderAtom
                            item={{ value: obj?.position }}
                            renderType="text"
                            customClassName={
                              "text-[16px] text-[#67748E] font-medium p-0"
                            }
                          />
                        </div>
                      </td>
                      <td className="text-[#585858] font-bold text-[20px] text-center">
                        {index + 2}
                      </td>
                      <td className="text-[#585858] font-bold text-[20px] text-center">
                        {obj?.count}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <style>
        {`
          table thead th {
            color:#67748E;
            padding:10px 0px;
            font-weight:400;
            text-align:center;
          }

          table tbody tr td {
            border-style: none;
            padding:20px 0px;
            border-bottom: 1px solid #E1E1E1;
          }
          table th:nth-child(even) {
            text-align:center;
          }
          `}
      </style>
    </div>
  );
};

export default Leaders;
{
  /* <div className="col-span-2 w-full flex items-center">
<div className="bg-white max-h-[70px] rounded-[10px] flex w-full relative">
  <div className="px-[20px] py-[12px] text-center">
    <p className=" text-[#585858] text-[20px] font-medium">
      <span className="text-[26px] font-bold">{1}</span>
      т
    </p>
  </div>
  <RenderAtom
    item={
      {
        value:
          "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
      }
    }
    renderType="image"
    customClassName={
      "h-[90px] rounded-full w-[90px] relative -top-[10px] border-4 border-white"
    }
  />
  <div className=" px-[20px] leading-6 py-[12px]">
    <RenderAtom
      item={{ value: obj?.name }}
      renderType="text"
      customClassName={
        "text-[24px] text-[#585858] font-medium p-0"
      }
    />
    <RenderAtom
      item={{ value: obj?.position }}
      renderType="text"
      customClassName={
        "text-[16px] text-[#67748E] font-medium p-0"
      }
    />
  </div>
  <div
    className={`absolute right-0 top-0 h-full rounded-r-[10px] px-[20px] text-center py-[12px] leading-6`}
    style={{
      background: cardColor[index],
    }}
  >
    <RenderAtom
      item={obj?.position5 || { value: obj?.count }}
      renderType="text"
      customClassName={"text-[30px] text-white font-black"}
    />
    <p className="text-[16px] font-medium text-white">санал</p>
  </div>
</div>
</div> */
}
