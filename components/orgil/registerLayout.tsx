import { useRouter } from "next/router";
import Image from "next/image";

const RegisterLayout = ({ children, dataSrc }: any) => {
  const router = useRouter();

  const ddd = process.env.NEXT_PUBLIC_IMAGE_URL || "http://172.169.200.57:85/";
  return (
    <div
      className="w-screen  h-screen flex flex-col relative"
      style={{
        backgroundImage: "url(/images/home1.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-stretch justify-items-center text-center h-full  w-full">
        <div
          className="text-center uppercase self-start flex h-[380px] justify-items-center items-center   md:text-[130px] xs:text-[60px]  w-full text-white "
          style={{
            backgroundImage: `url(${ddd + dataSrc?.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <span className="text-center w-full"> {dataSrc?.title}</span>
        </div>
        <div className="self-center justify-items-center mx-auto  overflow-hidden w-full mb-20">
          <div className="h-full items-center flex ">
            <div className="mx-auto flex-none min-w-full px-10  overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-[98%] lg:supports-scrollbars:pr-2  kioskcontent py-10">
              {children}
            </div>
          </div>
        </div>
        <div className=" absolute bottom-4 self-end w-full z-40">
          <div className="w-full flex justify-between px-16">
            <button
              className=" flex text-white uppercase text-[24px] md:text-[48px] hover:text-opacity-75"
              onClick={() => router.push("/")}
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
