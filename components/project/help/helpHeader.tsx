import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { Modal, Popover } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { useToggle } from "react-use";
import MegaHelpMenu from "@/components/custom/menu/MegaHelpMenu";
import HelpTopMenu from "@/components/custom/menu/helpTopMenu";
import HelpSearch from "./helpSearch";

type PropsType = {
  data?: any;
  options?: any;
  mutate?: any;
};

const HelpHeader: FC<PropsType> = ({ data, options, mutate }) => {
  const [loginModalShow, setLoginModalShow] = useToggle(false);
  const [signupModalShow, setSignupModalShow] = useToggle(false);
  const { data: session, status }: any = useSession();
  const URL = process.env.url;
  const logo = "/logo.png";
  const { widgetnemgooReady } = options || {};

  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handlerTypeEvent = (item: boolean) => {
    setIsModalVisible(item);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [sideBar, setsideBar] = useState();

  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [product, setProduct] = useState(false);
  const [deliverables, setDeliverables] = useState(false);

  const useProfile = (
    <div className="relative z-[1000]">
      <ul>
        <li className="hover:text-blue-400">
          <Link href="/profileAbout" className="text-black">
            <i className="far fa-user text-sm w-6 "></i>
            <span className="cursor-pointer pl-1 ">Миний профайл</span>
          </Link>
        </li>
        <li className="hover:text-blue-400">
          <i className="far fa-sign-out-alt  text-sm w-6"></i>
          <button className="cursor-pointer " onClick={() => signOut()}>
            <span className="cursor-pointer pl-1 ">Гарах</span>
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <div className=" w-full fixed z-[999] " style={{ background: "#fff" }}>
        <div
          className=" w-full mx-auto  md:px-10 xs:px-2 h-[90px]  py-4"
          style={{ background: "#fff" }}
        >
          <div
            className={`justify-between h-14 flex items-center ${
              widgetnemgooReady?.insideDiv?.className || ""
            }`}
          >
            <div className="h-full flex items-center py-2">
              <img
                src={widgetnemgooReady?.siteLogo || logo}
                className="flex items-center pl-0 h-full cursor-pointer"
                // width={220}
                onClick={() => router.push("/")}
                // link={`/`} //${router.query?.detect[0]} алдаа шалгах
              />
              <div className=" py-1 justify-between flex items-center mx-auto md:px-10 xs:px-2">
                <div className="h-full flex items-center gap-4">
                  <MegaHelpMenu
                    color={widgetnemgooReady?.HeaderTitle?.className}
                    menuItem={data || []}
                  />
                  <HelpTopMenu Menu={widgetnemgooReady?.Menu} />
                  {/* top menu */}
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center  gap-10 md:w-2/5 justify-between    ">
              <HelpSearch />
              <div className="hidden xl:flex items-center">
                <div className="ml-6 relative">
                  <div className="flex  gap-3 items-center relative">
                    {!session && (
                      <>
                        <span
                          className="hover:text-blue-900 text-base font-bold cursor-pointer text-[#585858] flex gap-3 justify-items-center items-center"
                          onClick={() => router.push(`/login`)}
                        >
                          {/* //https://customer.veritech.mn/login?domain=help&iscustomer=1&redirect_uri=http://localhost:3000/ */}
                          Нэвтрэх
                          <img
                            alt="profile-pic"
                            src="/awatar.png"
                            className="w-10 h-10 rounded-md"
                          />
                        </span>
                      </>
                    )}
                    {session && (
                      <>
                        <Popover content={useProfile} placement="bottom">
                          <div className="flex items-center cursor-pointer gap-4 ">
                            <div className="text-right pr-1 text-[#585858] font-medium">
                              <span className="p-0 m-0 inline-block te">
                                {session?.username}
                              </span>
                              <br />
                              <RenderAtom
                                item={{
                                  value:
                                    session?.readyProfile?.profile
                                      ?.positionname,
                                }}
                                renderType="text"
                                customClassName={`capitalize font-semibold text-sm `}
                              />
                            </div>
                            <RenderAtom
                              item={{
                                value: session?.profileImg || "/awatar.png",
                              }}
                              renderType="image"
                              customClassName={
                                "w-10 h-10 border rounded-full object-cover mr-4"
                              }
                            />
                          </div>
                        </Popover>
                      </>
                    )}
                    {/* <AtomAvatar customClassName="border ml-2 border-gray-300 rounded-full object-cover w-11 h-11 p-1 border-solid" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t relative"></div>
      </div>
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        login
      </Modal>
      {/* Login Modal */}

      <nav className="bg-white shadow xl:block hidden"></nav>
      <nav>
        <div className="py-4 px-6 w-full flex md:hidden justify-between items-center bg-white fixed top-0 z-40">
          <div className="w-24">
            {/* <AtomImage
              item={widgetnemgooReady?.siteLogo || logo}
              customClassName="flex items-center pl-0 h-full"
              link={`/`}
            /> */}
          </div>
          <div className="flex items-center">
            <div
              id="menu"
              className="text-gray-800"
              onClick={() => setShow(!show)}
            >
              {show ? (
                ""
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1={4} y1={6} x2={20} y2={6} />
                  <line x1={4} y1={12} x2={20} y2={12} />
                  <line x1={4} y1={18} x2={20} y2={18} />
                </svg>
              )}
            </div>
          </div>
        </div>
        {/*Mobile responsive sidebar*/}
        <div
          className={
            show
              ? "w-full md:hidden h-full fixed z-40  transform  translate-x-0 "
              : "   w-full xl:hidden h-full fixed z-40  transform -translate-x-full"
          }
        >
          <div
            className="bg-gray-800 opacity-50 w-full h-full"
            onClick={() => setShow(!show)}
          />
          <div className="w-64 h-full fixed overflow-y-auto z-40 top-0 bg-white shadow flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
            <div className="px-6">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="mt-6 flex w-full items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {/* <AtomImage
                        item={widgetnemgooReady?.siteLogo || logo}
                        customClassName="h-[30px] mr-5"
                        link={`/`}
                      /> */}
                    </div>
                    <div
                      id="cross"
                      className="text-gray-800"
                      onClick={() => setShow(!show)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  <div className="relative w-full">{/* <HelpSearch /> */}</div>
                </div>
                <div className="py-1 justify-between items-center mx-2">
                  <div className="items-center gap-4">
                    <MegaHelpMenu
                      color={widgetnemgooReady?.HeaderTitle?.className}
                      menuItem={data || []}
                    />
                    <HelpTopMenu Menu={widgetnemgooReady?.Menu} />
                  </div>
                </div>

                <div className="w-full pt-4">
                  <div className="border-t border-gray-300">
                    <div className="w-full flex items-center justify-between pt-1">
                      <div className="flex items-center">
                        <img
                          alt="profile-pic"
                          src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
                          className="w-8 h-8 rounded-md"
                        />
                        <p className=" text-gray-800 text-base leading-4 ml-2">
                          Jane Doe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Code block ends */}
    </>
  );
};
export default HelpHeader;
