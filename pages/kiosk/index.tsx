import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <div
      // className="max-w-[1080px] h-screen 2xl:w-[1000px]  2xl:h-[1800px] overflow-hidden"
      className="max-w-[1080px] h-screen 2xl:w-[1000px]   overflow-hidden    "
      onClick={() => router.push("/kiosk/home")}
      style={{
        backgroundImage: "url(/images/home1.png)",
        // backgroundImage: "url(/images/layout.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex  items-stretch  justify-items-center text-center h-full  w-full">
        <div className="self-center space-y-24 justify-items-center mx-auto ">
          <img src="/images/logo.png" alt="" className=" px-16" />
          <div className="mt-20">
            <p className="md:text-[60px] xs:text-[30px]  text-white flex justify-center  uppercase items-center font-medium cursor-pointer hover:text-[#a68b5c]">
              Get start
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
