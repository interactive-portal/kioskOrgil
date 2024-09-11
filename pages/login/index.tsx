import CloudLoginPage from "@/components/login/cloudLoginPage";
import Banner from "@/components/login/banner";
import { decrypt } from "util/helper";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <div className=" w-screen h-screen flex flex-row">
        <div className="flex-1 w-0  sm:block flex-col overflow-hidden">
          <Banner />
        </div>
        <div className="shrink-0 w-full md:w-1/4 overflow-y-auto  scrollbar-thumb-citizen scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-citizen-dark scrollbar-thumb-rounded-full ">
          <div className="w-full  flex flex-col items-center bg-white relative px-[30px] h-full justify-center">
            <CloudLoginPage />
          </div>
        </div>
      </div>
    </>
  );
}
