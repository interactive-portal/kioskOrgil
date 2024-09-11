import { useState, FC } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

type PropsType = {
  data?: any;
  showType?: any;
  onClick?: any;
  index?: any;
};

const HelpMegaMenuPopover: FC<PropsType> = ({
  data,
  showType,
  onClick,
  index,
}) => {
  const [show, setShow] = useState(false);
  const router: any = useRouter();
  return (
    <div className="">
      <li
        className="cursor-pointer relative text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-2 flex items-center z-50"
        // onClick={() => {
        //   setShow(!show);
        // }}

        onMouseEnter={() => setShow(showType == undefined && true)}
        onMouseLeave={() => setShow(false)}
      >
        <span
          className=" font-normal whitespace-nowrap hover:text-blue-300 text-black w-full"
          onClick={() =>
            router.push({
              pathname: `/${router.query?.detect[0]}/category`,
              query: {
                fparentid: data?.id,
              },
            })
          }
        >
          {data?.itemname || data?.name}
        </span>
        {data?.children.length !== 0 && show && (
          <SubPopover setShow={setShow} data={data?.children} />
        )}
      </li>
    </div>
  );
};

export default HelpMegaMenuPopover;

const SubPopover = ({ data = [], setShow }: any) => {
  // console.log("SubPopover", data);
  const router = useRouter();

  return (
    <>
      <div
        className="transform translate-x-0 transition duration-700 absolute top-0 -left-3 border bg-white rounded shadow-xl z-30 overflow-y-auto"
        // style={{ width: "700px" }}
        onMouseEnter={() => setShow(true)}
        // onMouseLeave={() => setShow(false)}
      >
        {isEmpty(data) && <EmptyStore />}

        <div className="p-3 " style={{ columnCount: 3 }}>
          {data?.map((item: any, index: number) => {
            // console.log(item?.children);
            return (
              <div
                key={item?.id || index}
                className="cursor-pointer hover:text-blue-300 p-1"
                // onMouseEnter={() => setShow(true)}
                // onMouseLeave={() => setShow(false)}
              >
                {/* <i className={`fal fa-${item.icon} mr-2`} /> */}
                <span className="font-semibold w-full">
                  {item.itemname || item?.name}
                </span>
                {item?.children.map((item: any, index: number) => {
                  return (
                    <HelpMegaMenuPopover
                      data={item}
                      key={item?.id || index}
                      showType={false}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const EmptyStore = () => {
  return (
    <div className="flex items-center justify-center w-full h-full" id="scroll">
      <div className="flex flex-col items-center justify-center px-10 py-7 border rounded-lg border-dashed border-gray-300">
        <div className="mb-2">
          <i className="far fa-person-dolly-empty text-2xl text-gray-500" />
        </div>
        <div className="text-gray-700">Хоосон байна</div>
      </div>
    </div>
  );
};
<style>
  {`
  #scroll {
    -webkit-scrollbar {
      width:2px !important;
    }
  }
`}
</style>;
