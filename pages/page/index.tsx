import Image from "next/image";
// import localFont from "next/font/local";
import { useRouter } from "next/router";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Home() {
  const router = useRouter();
  return (
    // <div
    //   className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    // >
    <div
      // className="max-w-[1080px] h-screen 2xl:w-[1000px]  2xl:h-[1800px] overflow-hidden"
      className="h-screen  overflow-hidden    "
      style={{
        backgroundImage: "url(/images/home1.png)",
        // backgroundImage: "url(/images/layout.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex  items-stretch  justify-items-center text-center h-full  w-full">
        <div className="self-center space-y-24 justify-items-center mx-auto ">
          <Image
            aria-hidden
            src="/images/logo.png"
            alt="Globe icon"
            width={750}
            height={84}
          />
          <div className="mt-20" onClick={() => router.push("/page/home")}>
            <p className="md:text-[60px] xs:text-[30px]  text-white flex justify-center  uppercase items-center font-medium cursor-pointer hover:text-[#a68b5c]">
              Get start
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
