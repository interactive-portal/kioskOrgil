import { useRouter } from "next/router";

const RegisterLayout = ({ children, coverImagePath, title }: any) => {
  const router = useRouter();
  return (
    <div
      className="w-screen max-w-[1080px] h-screen flex flex-col relative"
      style={{
        backgroundImage: "url(/images/home1.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-stretch justify-items-center text-center h-full  w-full flex-col">
        <div
          className="w-full md:h-[450px] xs:h-[200px] relative text-center uppercase  flex items-center justify-center md:text-[130px] xs:text-[60px] text-white "
          style={{
            backgroundImage: `url(${coverImagePath})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {title}
        </div>

        <div className="self-center justify-items-center mx-auto h-[78%] mt-10 overflow-hidden w-full ">
          <div className="h-full items-center flex ">
            <div className="mx-auto flex-none min-w-full px-4  overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-[98%] lg:supports-scrollbars:pr-2  kioskcontent">
              {children}
            </div>
          </div>
        </div>
        <div className=" absolute bottom-4 self-end w-full">
          <div className="w-full flex justify-between px-16">
            <button
              className=" flex text-white uppercase text-[24px] md:text-[48px] hover:text-opacity-75"
              onClick={() => router.push("/kiosk")}
            >
              home
            </button>
            <button
              className="  text-white uppercase text-[24px] md:text-[48px] hover:text-opacity-75"
              onClick={() => router.back()}
            >
              back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLayout;
