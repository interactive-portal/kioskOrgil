import { useRouter } from "next/router";

const CameraLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div
      className="w-full 2xl:w-[1000px]  2xl:h-[1600px]  h-screen flex flex-col relative justify-center items-center overflow-hidden"
      style={{
        backgroundImage: "url(/images/home1.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // fontFamily: "AG",
      }}
    >
      <div className="w-full py-10 flex items-center justify-center uppercase">
        <img src="/images/logo.png" alt="home" />
      </div>
      <div className="flex w-full justify-center items-start uppercase h-full text-center">
        <div>{children}</div>
      </div>
      <div>
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
    </div>
  );
};

export default CameraLayout;
