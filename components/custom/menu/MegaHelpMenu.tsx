import { FC, useContext, useState, useEffect } from "react";
import _ from "lodash";
import { listToTree } from "util/helper";
import { Modal } from "antd";
import MegaHelpPopover from "./megaHelpPopover";
import MegaSub from "./megaSub";
import { useRouter } from "next/router";

type PropsType = {
  menuItem?: any;
  config?: any;
  color?: any;
  customClass?: any;
};

const MegaHelpMenu: FC<PropsType> = ({
  config,
  color,
  menuItem,
  customClass,
}) => {
  let router = useRouter();
  const [show, setShow] = useState(false);
  const tree = listToTree(menuItem, "parentid");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  // console.log("list menuItem", menuItem);
  // console.log("list main", tree);
  // console.log("treeReadyDatasrc :>> ", treeReadyDatasrc);

  const onClose = () => {
    setOpen(false);
  };

  router.events?.on("routeChangeStart", onClose);

  // console.log("tree", tree);

  return (
    <div className="flex flex-col w-full h-full sm:flex md:flex">
      <div className="relative">
        <div
          className={`w-32 ${
            color || "bg-blue-400"
          } text-white flex gap-4 my-2 py-1.5 px-4 hover:cursor-pointer rounded-full font-semibold`}
          div-name="HeaderTitle"
          style={{ color }}
          // onClick={(e) => {
          //   e.preventDefault(), setShow(!show);
          // }}
          onClick={showDrawer}
        >
          <i className="fa-solid fa-bars text-base"></i>
          <span className="text-base cursor:pointer right-auto text-[#fff]">
            Ангилал
          </span>
        </div>
      </div>
      <Modal
        // centered
        open={open}
        wrapClassName="right-auto left-[16%] -top-[83px]"
        className="bg-[#F3F4F6] p-0 rounded sm:top-0 sm:mx-1 sm-w-full md:top-1 md:mx-2 md:w-full lg:top-2 xs:top-6 lg:mx-3 xl:top-4 xl:ml-[18rem]"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer=""
        // style={{ top: 16, left: -95, padding: 0 }}
        width={1120}
      >
        <MegaMenuSub data={tree} setOpen={() => setOpen(false)} />
      </Modal>
      <style>
        {`
        .ant-modal-body {
         padding:0
        }
        // .ant-modal-wrap {
        //   right:auto !important;
        //   left:15% !important;
        //   top: -9% !important
        // }
        .ant-modal-content {
          padding: 0px !important
        }
        // .ant-modal-close-x {
        //   width: 10px;
        //   height: 10px;
        // }
        `}
      </style>
    </div>
  );
};

const MegaMenuSub = (data: any, setOpen: any) => {
  const [menuChild, setMenuChild] = useState<any>(data?.data[0] || {});
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div
        className="grid grid-cols-12 bg-[#F3F4F6] rounded-[10px] min-h-[380px]"
        style={
          {
            // gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
          }
        }
      >
        <div className="lg:col-span-3 xs:col-span-5 lg:max-h-[480px] xs:max-h-full py-2">
          <div
            className={`w-32 text-black flex gap-4 my-2 py-1 px-4 hover:cursor-pointer rounded-full font-semibold`}
          >
            <i className="fa-solid fa-bars text-base "></i>
            <span className=" text-base cursor:pointer right-auto text-[#000]">
              Ангилал
            </span>
          </div>
          <ul className="relative">
            {data.data.map((item: any, index: any) => {
              return (
                <MegaHelpPopover
                  setOpen={setOpen}
                  key={item?.id || index}
                  submenu={setMenuChild}
                  setActiveIndex={setActiveIndex}
                  activeIndex={activeIndex}
                  index={index}
                  data={item}
                  redirect={false}
                  customClass="py-2 px-4 font-bold leading-[18px]"
                  menuChild={menuChild}
                />
              );
            })}
          </ul>
        </div>
        <div
          className="lg:col-span-9 xs:col-span-7"
          style={
            {
              // gridColumn: "span 14 / span 14",
            }
          }
        >
          <MegaSub
            setOpen={setOpen}
            data={menuChild}
            showType={false}
            customClass="py-1 opacity-2"
          />
        </div>
      </div>
      {/* <div
        className=" inset-0 bg-green-200 bg-opacity-0 top-2 overflow-y-auto h-full w-full z-40"
        onClick={() => {
          setShow(false);
        }}></div>

      <div className="visible transition duration-700 opacity-100 h-[400px] bg-white  shadow-lg mt-2 py-1 absolute z-40">
        <ul className="relative">
          {data.map((item: any, index: any) => {
            return <MegaMenu1Popover key={item?.id || index} data={item} />;
          })}
        </ul>
      </div> */}
    </>
  );
};

export default MegaHelpMenu;
