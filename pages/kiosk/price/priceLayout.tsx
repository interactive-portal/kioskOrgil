import { useRouter } from "next/router";

const PriceLayout = ({ children, coverImagePath, title }: any) => {
  const router = useRouter();
  return (
    <div
      className="w-full 2xl:w-[1000px]  2xl:h-[1800px] h-screen flex flex-col relative justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `url(/images/home1.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "AG",
      }}
    >
      <div className="w-full py-10 flex items-center justify-center uppercase">
        <img src="/images/logo.png" alt="home" />
      </div>
      {/* <div
        className="w-full  relative text-center uppercase  flex items-center justify-center text-[130px] text-white "
        style={{
          backgroundImage: `url(${coverImagePath})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {title}
      </div> */}
      <div>
        <div className="w-full px-10">{children}</div>
      </div>
      <button
        className="absolute bottom-10 left-10 text-white uppercase text-[48px]"
        onClick={() => router.push("/kiosk")}
      >
        home
      </button>
      <button
        className="absolute bottom-10 right-10 text-white uppercase text-[48px]"
        onClick={() => router.back()}
      >
        back
      </button>
    </div>
  );
};

export default PriceLayout;
