import { useState, FC } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import MegaHelpPopover from "./megaHelpPopover";

type PropsType = {
  data?: any;
  showType?: any;
  onClick?: any;
  customClass?: any;
  setOpen?: any;
};

const MegaSub: FC<PropsType> = ({
  data,
  showType,
  onClick,
  customClass,
  setOpen,
}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  return (
    <div
      className="transform translate-x-0 transition duration-700 h-full lg:max-h-[480px] xs:max-h-full scroll overflow-y-auto p-[20px] bg-white rounded-r-xl"
      // style={{ width: "700px" }}
      // onMouseEnter={() => setShow(true)}
      // onMouseLeave={() => setShow(false)}
    >
      {/* {isEmpty(data) && <EmptyStore />} */}
      <div className="lg:columns-3 lg:block xs:flex flex-col lg:gap-6 xs:gap-2 h-full lg:max-h-[480px] xs:max-h-full">
        {data?.children?.map((item: any, index: string) => {
          return (
            <div
              key={item?.id || index}
              className="cursor-pointer  lg:mb-[20px] xs:mb-3 inline-block w-full"
              // onMouseEnter={() => setShow(true)}
              // onMouseLeave={() => setShow(false)}
            >
              {item.icon && <i className={`${item.icon} mr-2`} />}
              <span
                className="font-bold my-[10px]  hover:text-[#699BF7] lg:text-[16px] xs:text-[12px] text-[#3C3C3C]"
                onClick={() => {
                  router.push({
                    pathname: `/lessons/content`,
                    query: {
                      lparentid: item?.id,
                      filterid: item?.id,
                    },
                  });
                  setOpen;
                }}
              >
                {item.itemname || item?.name}
              </span>
              {item?.children.map((item: any, index: number) => {
                return (
                  <MegaHelpPopover
                    data={item}
                    key={item?.id || index}
                    showType={false}
                    redirect={true}
                    customClass="py-2 leading-[16px] font-normal text-wrap hover:text-[#699BF7] "
                    menuChild={data}
                    setOpen={setOpen}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <style>
        {`
        .scroll::-webkit-scrollbar {
          width:5px;
          background:white;
        }
        .scroll::-webkit-scrollbar-thumb {
          background:#E0E0E0;
          border-radius:10px;
        }
      `}
      </style>
    </div>
  );
};

export default MegaSub;

const EmptyStore = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center px-10 py-7 border rounded-lg border-dashed border-gray-300">
        <div className="mb-2">
          <i className="far fa-person-dolly-empty text-2xl text-gray-500" />
        </div>
        <div className="text-gray-700">Хоосон байна</div>
      </div>
    </div>
  );
};
