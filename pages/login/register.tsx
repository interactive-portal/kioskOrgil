import React, { useState, FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import CloudBanner1 from "@/components/login/banner";
import Link from "next/link";
import RenderAtom from "@/components/common/Atom/RenderAtom";
// import CommunitySingupModal from "@/components/project/community/pages/community-user-field/CommunitySignupModal";
// import CommunitySingupModal from "@/components/Login/SignUp";
type PropsType = {
  type?: "login" | "register";
  setType?: any;
};

const Register: FC<PropsType> = ({ type, setType }) => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const navigateTo = (to: string) => {
    router.push("/" + to);
  };
  useEffect(() => {
    if (router.query) return;
    setData(router.query);
  }, [router.query]);

  const { t } = useTranslation("common");
  const [showpass, setShowPass] = useState(false);
  const [ischeck, setIscheck] = useState(false);
  const [activeTab, setActiveTab] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
  };
  const settings = {
    widgetnemgooReady: {
      labelPosition: "top",
      submitButtonName: "Бүртгүүлэх",
      submitButtonWrapperClass: "w-full flex ",
      submitButtonClass: "grow ",
      formTitleWrapperClass: "hidden ",
    },
  };

  return (
    <>
      <div className="bg-gray-100 w-screen h-screen flex flex-row">
        <div className="flex-1 w-0 hidden sm:block flex-col overflow-hidden">
          <CloudBanner1 />
        </div>
        <div className="shrink-0 w-full md:w-1/4 overflow-y-auto  scrollbar-thumb-citizen scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-citizen-dark scrollbar-thumb-rounded-full">
          <div className="w-full  flex flex-col items-center bg-white relative px-[30px] h-full justify-center ">
            <img
              src="/logo.png"
              className="w-auto h-auto block mx-auto mb-10"
            />
            <div className="w-full text-start flex flex-col items-center">
              <div className="w-full text-start ">
                <div>
                  <div className="py-2 space-y-4 w-full">
                    <div className="flex gap-2 justify-items-start p-0">
                      <div
                        className="mr-1 ml-4 pb-1 cursor-pointer text-center font-bold text-[16px]
						text-[#699BF7] border-b-2 border-[#699BF7]"
                      >
                        Хувь хүн
                      </div>
                      <div
                        className="mr-1 ml-4 pb-1 cursor-pointer text-center font-bold text-[16px]
						text-[#67748E] hover:text-[#699BF7] border-b-2 border-transparent hover:border-[#699BF7]"
                        onClick={() =>
                          router.push(
                            `https://cloudnew.veritech.mn/content/register`
                          )
                        }
                      >
                        Байгууллага
                      </div>
                    </div>
                    <div>
                      {/* <CommunitySingupModal
                        viewTitle={false}
                        afterSignup={() => router.push("/login")}
                      /> */}
                    </div>
                    {/* <Tabs>
                      <Tab
                        component={
                          <div className="citizenRegister">
                            <RenderWidgetProcess
                              dialog={false}
                              listConfig={{
                                metadataid: "16716201284229",
                                otherattr: settings,
                              }}
                              // 1641266492517411
                            />
                          </div>
                        }
                      >
                        Хувь хүн
                      </Tab>
                      <Tab
                        component={
                          <div className="citizenRegister">
                            <RenderWidgetProcess
                              listConfig={{
                                metadataid: "16716201284229",
                                otherattr: settings,
                              }}
                            />
                          </div>
                        }
                      >
                        Байгууллага
                      </Tab>
                    </Tabs> */}
                    {/* {
								<RenderWidgetProcess
									dialog={true}
									listConfig={{ metadataid: "1650443355719672" }} // 1641266492517411
								/>
							} */}
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full flex justify-center gap-4 px-[50px] pb-6">
              <span>Бүртгэлтэй юу? </span>
              <Link
                href="/login"
                as="/login"
                className="hover:text-blue-900 text-xl font-bold cursor:pointer text-[#699BF7] border-b border-[#699BF7]"
              >
                Нэвтрэх
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

// ?response_type=code&redirect_uri=customer.veritech.mn
