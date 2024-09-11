import { FC } from "react";
import { Rate } from "antd";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type PropsType = {
  item: any;
  index?: number;
};

const Horizantal: FC<PropsType> = ({ item, index }) => {
  const router = useRouter();
  // console.log(item);
  return (
    <motion.div
      key={index}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      style={{
        boxShadow: "5x 10px black",
      }}
      className="col-span-1 w-full cursor-pointer shadow-[5px_5px_5px] shadow-black/20 h-auto rounded-l-lg"
      onClick={() => router.push(item?.position7?.positionnemgoo?.url)}
    >
      <div
        className={`bg-[${item?.position7?.value || "#EE6763"}] h-[270px] `}
        style={{
          background: item?.position7?.value || "#EE6763",
        }}
      >
        <div className=" h-[120px] relative">
          <img
            src={item?.logo}
            className="absolute top-4 right-5 w-auto h-[26px] object-cover"
          />
          <i
            className={`${item?.bookicon} text-white absolute -top-[65px] -left-4 opacity-5 text-[150px] z-5`}
          />
          {/* <img
            src="https://res.cloudinary.com/dzih5nqhg/image/upload/v1682926988/Icon_wtk9fr.png"
            className="absolute -top-4 -left-4 opacity-5 w-[150px] h-[150px]"
          /> */}
        </div>
        <div className="px-5">
          <div className="h-[75px] flex justify-end flex-col">
            <RenderAtom
              item={item?.position1 || { value: "гарчиг оруулах" }}
              renderType="text"
              customClassName="font-bold text-white text-[20px] "
              customStyle={{ lineHeight: "24px" }}
            />
          </div>

          <div className="h-[3px] w-[40px] bg-white my-2"></div>
          <RenderAtom
            item={item?.position40 || { value: "Ангилал оруулна уу" }}
            renderType="text"
            customClassName="text-white font-medium text-[14px]"
            customProps={{
              truncateRow: 3,
            }}
            customDivNumber={"BlogTitle"}
          />
        </div>
      </div>
      <div className="p-[15px] h-[75px] bg-white">
        <div className="flex items-center mb-[5px]">
          <Rate value={Number(item?.stars)} className="mr-[5px]" disabled />
          <p className="text-[14px] text-[#A0A0A0]">
            ({item?.stars}) <span>{item?.cnt}</span>
          </p>
        </div>
        {item?.bookprice && (
          <div className="">
            <RenderAtom
              item={{ value: item?.bookprice + "₮" }}
              renderType="currency"
              customClassName="text-[16px] text-[#585858] font-semibold leading-[18px] font-roboto"
            />
            {/* <p className="text-[16px] text-[#585858] font-semibold leading-[18px] font-roboto">
              {item?.bookprice}₮
              <span className="text-[#A0A0A0] line-through ml-1 font-normal text-[14px]">
                {" "}
                40,000₮
              </span>
            </p> */}
          </div>
        )}
      </div>
      <style>
        {`
			.ant-rate-star{
				margin-right:0px !important
			}
      .ant-rate {
        font-size:16px;
      }
		`}
      </style>
    </motion.div>
  );
};

export default Horizantal;
