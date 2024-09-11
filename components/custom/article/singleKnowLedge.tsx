import { useContext, useEffect, useState } from "react";
import Link from "next/link";
// import RenderMolecule from "@molecule/RenderMolecule";
import WidgetWithId from "middleware/components/WidgetStandart/WidgetWithId";
import useSWR from "swr";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Modal, Rate, notification } from "antd";
import { CKEditor } from "ckeditor4-react";
import { htmlDecode } from "@/util/helper";
// import useCallProcess from "@/middleware/components/dataHook/useCallProcess";
import SideBar from "./sidebar";
import { useCloud } from "hooks/use-cloud";
import fetchJson from "@/lib/fetchJson";
// import QRCode from "react-qr-code";

import { QRCode } from "react-qrcode-logo";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import HelpComment from "@/components/project/help/helpComment";
import FileViewType from "./fileViewType";
import DataLoader from "@/components/dataLoader";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";

const SingleKnowLedge = () => {
  const { readyDatasrc, widgetnemgooReady, dataMutate } =
    useContext(WidgetWrapperContext);
  const router = useRouter();
  const { data: session } = useSession();
  //   const { callProcess } = useCallProcess();
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState(readyDatasrc[0]?.name);
  const [getData, setGetData] = useState<any>(readyDatasrc[0]?.description);

  const [show, setShow] = useState(true);
  const [feautures, setFeautures] = useState(false);
  // const [titleData, setTitleData] = useState<any>();

  const [comment, setComment] = useState(true);
  const relatedknowledge = _.values(readyDatasrc[0]?.relatedknowledge);
  const parentItem = router.query?.lparentid;
  const [menu, setMenu] = useState(relatedknowledge.length == 0 ? false : true);
  const { pathname } = widgetnemgooReady;

  let parentid = router.query.lparentid;

  const cloudContext = useCloud();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;
  const myCriteria = {
    filterId: parentid || 166479296622331,
  };
  const criteria = JSON.stringify(myCriteria);

  const [srcTitle, setTitleData] = useState<any>([]);
  const [commentcount, setCommentCount] = useState<any>();

  const fetchDataHeader = async () => {
    const data = await fetchJson(
      `/api/get-data?metaid=1682912998334502&metaNameV2=${metaNameV2}&criteria=${criteria}`
    );
    if (data?.status == "success") {
      setTitleData(_.values(data?.result));
    }
  };

  const location = window.location.href;
  const copyUrl = () => {
    navigator.clipboard.writeText(location);
    notification.open({
      message: "Амжилттай хууллаа",
      description: "",
      duration: 5,
    });
  };

  useEffect(() => {
    if (_.isEmpty(srcTitle)) fetchDataHeader();
  }, []);

  console.log("srcTitle :>> ", readyDatasrc);

  const Submit = async () => {
    // const result = await callProcess({
    //   command: "createKnowledgeDV_001",
    //   parameter: {
    //     name: title,
    //     description: getData,
    //     typeId: readyDatasrc[0]?.typeid,
    //     // author: readyDatasrc[0]?.author,
    //     code: Number(readyDatasrc[0]?.id),
    //     orderNumber: readyDatasrc[0]?.ordernumber,
    //     parentId: readyDatasrc[0]?.parentid,
    //     categoryId: Number(readyDatasrc[0]?.code),
    //     wfmStatusId: "1683627268863682",
    //     relatedIndicatorId: readyDatasrc[0]?.id,
    //     relatedKnowledge: readyDatasrc[0]?.relatedknowledge
    //       ? _.values(readyDatasrc[0]?.relatedknowledge).map(
    //           (item: any, index: number) => {
    //             return {
    //               id: item?.id,
    //               icon: item?.icon,
    //               knowledgeName: item?.knowledgename,
    //               trgKnowledgeId: item?.trgknowledgeid,
    //               srcKnowledgeId: item?.srcknowledgeid,
    //               srcTableName: item?.srctablename,
    //               trgTableName: item?.trgtablename,
    //             };
    //           }
    //         )
    //       : [],
    //     kpiDynamicDtl:
    //       readyDatasrc[0]?.kpidynamicdtl &&
    //       _.values(readyDatasrc[0]?.kpidynamicdtl).map(
    //         (item: any, index: number) => {
    //           return {
    //             id: item?.id,
    //           };
    //         }
    //       ),
    //     kmTypeMap:
    //       readyDatasrc[0]?.kmtypemap &&
    //       _.values(readyDatasrc[0]?.kntypemap).map(
    //         (item: any, index: number) => {
    //           return {
    //             id: item?.id,
    //             indicatorId: item?.indicatorid,
    //             typeId: item?.typeid,
    //             valueType: item?.valuetype,
    //           };
    //         }
    //       ),
    //     kmCategoryMap:
    //       readyDatasrc[0]?.kmcategorymap &&
    //       _.values(readyDatasrc[0]?.kmcategorymap).map(
    //         (item: any, index: number) => {
    //           return {
    //             id: item?.id,
    //             categoryid: item?.categoryid,
    //             indicatorId: item?.indicatorId,
    //           };
    //         }
    //       ),
    //   },
    // });
    // if (result?.status == "success") {
    //   dataMutate();
    //   setOpenEdit(false);
    // }
  };

  const EmptyItem = () => {
    return (
      <div className="w-full text-center my-2">
        <p className="text-[#585858]">Хоосон байна</p>
      </div>
    );
  };

  const parent = localStorage.getItem("parent")
    ? localStorage.getItem("parent") &&
      JSON.parse(localStorage.getItem("parent") || "")
    : localStorage.getItem("item") &&
      JSON.parse(localStorage.getItem("item") || "");
  const item =
    localStorage.getItem("item") &&
    JSON.parse(localStorage.getItem("item") || "");
  const item1 =
    localStorage.getItem("item1") &&
    JSON.parse(localStorage.getItem("item1") || "");

  useEffect(() => {
    localStorage.clear();
  }, [parentid]);

  return (
    <>
      {/* pageTitle test */}
      <div className="w-full h-[300px] overflow-hidden ">
        <BlockDiv
          customClassName={` flex mx-auto py-10 lg:px-10 xs:px-4 bg-black/50 h-full relative`}
          // customStyle={{
          //   backgroundImage:
          //     "url(https://res.cloudinary.com/dzih5nqhg/image/upload/v1692773379/cloud/item/unsplash_5EhN4wbfvBc_rffgdk_ds3xnz.png)",
          // }}
        >
          <Image
            src="/images/banner23.png"
            layout="fill"
            // width={100}
            // height={100}
            className="object-center object-cover pointer-events-none opacity-80 bg-black"
            quality={100}
            style={{ objectFit: "cover" }}
            alt="cover"
          />
          <BlockDiv customClassName="md:col-span-1 flex flex-col justify-between h-full col-span-12 px-2">
            <div className="text-white flex text-center sm:text-xs xs:text-[10px] md:text-base">
              <span className="opacity-80 hover:text-white cursor-pointer">
                Нүүр{" "}
              </span>
              {srcTitle.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <p
                      className="ml-1 cursor-pointer hover:text-white relative"
                      key={item?.id || index}
                      onClick={() => {
                        if (index > 0) {
                          router.push(
                            {
                              pathname: pathname || "/lessons/content",
                              query: {
                                filterid: item?.id,
                                lparentid: router.query?.lparentid,
                              },
                            },
                            undefined,
                            {
                              shallow: false,
                            }
                          );
                        } else {
                          router.push({
                            pathname: "/category",
                            query: {
                              fparentid: item?.id,
                            },
                          });
                        }
                      }}
                    >
                      {item?.name && <span className="opacity-80">/ </span>}
                      <span className="opacity-80 hover:opacity-100 relative">
                        {item?.name}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
            <RenderAtom
              item={
                srcTitle[0]?.mainname || {
                  value: "Контентийн гарчиг",
                }
              }
              renderType="title"
              customClassName={
                "text-lg text-white md:pt-4 sm:text-base xs:text-sm md:text-2xl relative"
              }
            />
            <RenderAtom
              item={
                srcTitle[0]?.description || {
                  value: "Контентийн тайлбар",
                }
              }
              renderType="text"
              customProps={{
                truncateRow: 3,
              }}
              customClassName={
                "md:w-1/2 lg:w-full xl:w-1/2 text-white md:text-[16px] text-[12px] relative"
              }
              customStyle={{
                color: "white !important",
              }}
            />
            <div className="flex items-center">
              <Rate
                allowHalf
                defaultValue={Number(srcTitle[0]?.starval) || 4}
                disabled
                className="text-sm py-4"
                style={{ color: "#FFBB00" }}
              />
              <span className="text-white pl-2">
                {srcTitle[0]?.starval} / {srcTitle[0]?.viewcount}
              </span>
            </div>
            <span className=" mb-0 text-white opacity-80 flex xs:text-xs md:text-sm">
              {srcTitle[0]?.lastmodify}
            </span>
          </BlockDiv>
        </BlockDiv>
      </div>
      <div className="grid grid-flow-row-dense md:grid-cols-9 lg:grid-cols-12  xl:grid-cols-12 lg:mx-10 xs:mx-4 min-h-screen">
        <SideBar options={widgetnemgooReady} />
        <div className="md:col-span-5 lg:col-span-6 xl:col-span-8 3xl:col-span-8 pb-10 relative bg-white mb-10">
          {parent && (
            <div className="flex bg-white  text-blue-600 font-medium mx-6 flex text-center xs:text-[10px] md:text-[16px]  pb-2 pt-4 border-b-[3px] border-[#585858] justify-between  ">
              <div className="flex">
                <span
                  className="opacity-80  cursor-pointer"
                  onClick={() => {
                    router.push({
                      pathname: "/lessons/content",
                      query: {
                        filterid: parent?.id,
                        lparentid: parentid,
                      },
                    });
                    localStorage.removeItem("item");
                    localStorage.removeItem("item1");
                  }}
                >
                  {parent?.name}
                </span>
                {item && <span className="opacity-80 px-1">/ </span>}
                <span
                  className="opacity-80  cursor-pointer"
                  onClick={() => {
                    router.push({
                      pathname: "/lessons/content",
                      query: {
                        filterid: item?.id,
                        lparentid: parentid,
                      },
                    });
                    localStorage.removeItem("item1");
                  }}
                >
                  {item?.name}
                </span>
                {item1 && <span className="opacity-80 px-1">/ </span>}
                <span
                  className="opacity-80  cursor-pointer"
                  onClick={() =>
                    router.push({
                      pathname: "/lessons/content",
                      query: {
                        filterid: item1?.id,
                        lparentid: parentid,
                      },
                    })
                  }
                >
                  {item1?.name}
                </span>
              </div>
              <span className="flex justify-items-end text-[#585858]">[ ]</span>
            </div>
          )}

          <motion.div className="bg-white px-6 py-4 relative min-h-[350px] ">
            <DataLoader />
            {openEdit ? (
              <>
                <input
                  className="font-semibold text-[16px] rounded-lg mb-6 mt-2 w-full border-[#E1E1E1] text-[#585858] focus:outline-none focus:border-[#E1E1E1] focus:ring-0"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <CKEditor
                  // className="min-h-[400px]"
                  initData={htmlDecode(readyDatasrc[0]?.description)}
                  config={{
                    // enterMode: ENTER_P,
                    // shiftEnterMode: ENTER_BR,
                    stylesSet: addStyles,
                    extraPlugins: "colorbutton,colordialog,font",
                    removeButtons: "exportpdf,save,smiley,about,language",
                  }}
                  onChange={(event) => setGetData(event.editor.getData())}
                />
                <button
                  className="p-2 bg-[#699BF7] text-[16px] font-medium text-white cursor-pointer float-right mt-[30px] rounded-[20px] px-4"
                  onClick={() => Submit()}
                >
                  Хадгалах
                </button>
              </>
            ) : (
              <MotionConfig transition={{ duration: 1 }}>
                <RenderAtom
                  item={
                    readyDatasrc[0]?.position1 || {
                      value: readyDatasrc[0]?.name,
                    }
                  }
                  renderType="text"
                  customClassName={
                    "xl:text-[30px] lg:text-2xl xs:text-xl pb-6 pt-2 text-[#585858] font-medium mb-4"
                  }
                />
                <motion.div
                  layout
                  animate={{ opacity: 1 }}
                  transition={{
                    opacity: { ease: "linear" },
                    layout: { duration: 0.3 },
                  }}
                  className="py-4"
                >
                  <RenderAtom
                    item={readyDatasrc[0]?.position22}
                    renderType="htmltext"
                    customClassName={"my-4"}
                  />
                  {readyDatasrc[0].physicalpath && (
                    <>
                      <RenderAtom
                        item={{ value: readyDatasrc[0]?.physicalpath }}
                        renderType="video"
                        customClassName={"my-4"}
                      />
                    </>
                  )}
                </motion.div>
              </MotionConfig>
            )}
          </motion.div>

          <div className="h-8 bg-[#f3f4f6]"></div>

          <div id="comment" className=" bg-white mt-6 px-4 ">
            <div className=" ">
              <HelpComment
                setCommentCount={setCommentCount}
                commentcount={commentcount}
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 3xl:col-span-2 pl-4 py-4">
          <>
            <BlockDiv
              customClassName="cursor-pointer flex pt-4 items-center justify-between"
              onClick={() => setFeautures((prev) => !prev)}
              divNumber={"divRightSideFeautures"}
            >
              <RenderAtom
                item={{ value: "Feautures" }}
                renderType="text"
                customClassName="text-lg text-[#585858] font-semibold"
              />
              {feautures == true ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </BlockDiv>
            {feautures == true && (
              <>
                {_.isEmpty(relatedknowledge) && <EmptyItem />}
                {relatedknowledge.map((menu: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="py-1 list-none my-2 px-2 cursor-pointer border-transparent border-l hover:border-blue-500 rounded-none"
                    >
                      <Link
                        href={`/category/detail?id=${menu.trgknowledgeid}&lparentid=${parentItem}`}
                        className="hover:text-blue-500 text-[#585858] hover:opacity-100 hover:font-medium"
                        shallow={true}
                      >
                        {menu.knowledgename}
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
          </>
          <>
            <div
              className="cursor-pointer flex pt-2 items-center justify-between"
              onClick={() => setMenu((prev) => !prev)}
            >
              <RenderAtom
                item={{ value: "Холбоотой" }}
                renderType="text"
                customClassName="text-lg text-[#585858] font-semibold"
              />
              {menu == true ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </div>
            {menu == true && (
              <>
                {_.isEmpty(relatedknowledge) && <EmptyItem />}
                {relatedknowledge.map((menu: any, index: number) => {
                  return (
                    <li
                      key={index}
                      style={{
                        color: "#585858",
                        fontWeight: "semibold",
                      }}
                      className="py-1 list-none my-2 px-2 cursor-pointer border-transparent border-l hover:border-blue-500 rounded-none"
                    >
                      <Link
                        href={`/lessons/content?filterid=${menu?.trgknowledgeid}&lparentid=${parentItem}`}
                        className="hover:text-blue-500 text-[#585858] hover:opacity-100 hover:font-medium"
                        // shallow={true}
                      >
                        {menu.knowledgename}
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
          </>
          <>
            <div
              className="cursor-pointer flex pt-2 items-center justify-between "
              onClick={() => setShow((prev) => !prev)}
            >
              <RenderAtom
                item={{ value: "Хавсралт" }}
                renderType="text"
                customClassName="text-lg text-[#585858]  font-semibold"
              />
              {show == true ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </div>
            {show == true && (
              <FileViewType />
              // <>{/* <WidgetWithId widgetId={widgetnemgooReady?.fileId} /> */}</>
            )}
          </>
          <>
            <a
              className="cursor-pointer flex pt-2 items-center justify-between"
              // onClick={() => )}
              href="#comment"
            >
              <RenderAtom
                item={{ value: "Сэтгэгдэл" }}
                renderType="text"
                customClassName="text-lg text-[#585858]  font-semibold "
              />
              <p className="pr-2 text-[#585858] font-semibold">
                {commentcount}
              </p>
            </a>
          </>
          <BlockDiv customClassName="flex flex-col mt-[20px] justify-start border  px-6 pb-6 rounded text-center ">
            <div
              className="flex gap-2  hover:opacity-75 cursor-pointer "
              onClick={() => copyUrl()}
            >
              <RenderAtom
                item={{ value: "Холбоос хуулах" }}
                renderType="button"
                customClassName={
                  "text-[#0C529D] justify-start px-0 text-lg text-[#585858] font-semibold "
                }
              />
              <i className="fa-regular fa-copy px-2 py-4 "></i>
            </div>

            <QRCode
              size={130}
              style={{
                height: "auto",
                maxWidth: "70%",
                width: "100%",
                padding: "25px",
                margin: "auto",
              }}
              logoImage="/vlogo.png" // URL of the logo you want to use, make sure it is a dynamic url
              logoHeight={40}
              logoWidth={40}
              logoOpacity={1}
              enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
              qrStyle="dots" // type of qr code, wether you want dotted ones or the square ones
              eyeRadius={10} // radius of the promocode eye
              id={"QR"}
              value={location}
              // viewBox={`0 0 256 256`}
            />
          </BlockDiv>
        </div>
      </div>
    </>
  );
};
export default SingleKnowLedge;

const addStyles = [
  {
    name: "UPPER",
    element: "span",
    styles: {
      "text-transform": "uppercase",
    },
  },
  {
    name: "lower",
    element: "span",
    styles: {
      "text-transform": "lowercase",
    },
  },
  {
    name: "Capitalize",
    element: "span",
    styles: {
      "text-transform": "capitalize",
    },
  },
  {
    name: "Гарчиг ",
    element: "h2",
    styles: {
      color: "#000",
      "font-style": "normal",
      "font-weight": "700",
      "font-size": "20px",
    },
  },
  {
    name: "Дэд гарчиг ",
    element: "h3",
    styles: {
      color: "#000",
      "font-weight": "700",
      "font-size": "18px",
    },
  },
  {
    name: "Гарчиг",
    element: "h2",
    styles: {
      color: "#3498db",
      "font-style": "normal",
      "font-weight": "700",
      "font-size": "20px",
    },
  },
  {
    name: "Дэд гарчиг",
    element: "h3",
    styles: {
      color: "#31708f",
      "font-weight": "700",
      "font-size": "18px",
    },
  },
  {
    name: "Дэлгэрэнгүй",
    element: "p",

    styles: {
      color: "#000",
      "font-style": "normal",
      "font-size": "14px",
      "text-align": "justify",
    },
  },
  {
    name: "Мэдээлэл",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#E6F1FF",
      border: "1px solid #E6F1FF",
      "border-radius": "4px",
      //   with: "100%",
      //   display: "block",
      "font-size": "12px",
      color: "#3382E7",
    },
  },
  {
    name: "Амжилттай",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#DBF6EF",
      "border-left": "4px solid #28AE86",
      //   with: "100%",
      //   display: "block",
      color: "#28AE86",
      "border-radius": "4px",
      "font-size": "12px",
    },
  },

  {
    name: "Aнхааруулга",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#FFF0DA",
      "border-left": "4px solid #F19317",
      //   with: "100%",
      //   display: "block",
      "border-radius": "4px",
      color: "#F19317",
      "font-size": "12px",
    },
  },
  {
    name: "Алдаа",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#fadad9",
      "border-left": "4px solid #E64442",
      //   with: "100%",
      //   display: "block",
      color: "#E64442",
      "border-radius": "4px",
      "font-size": "12px",
    },
  },

  {
    name: "Жишээ код",
    element: "code",
    styles: {
      padding: "20px 15px",
      margin: "15px 0",
      background: "#2f2e2e",
      border: "1px solid #000000",
      color: "#fff6f6",
      with: "100%",
      "border-radius": "4px",
      display: "block",
      "font-size": "12px",
    },
  },

  {
    name: "Marker",
    element: "span",
    attributes: { class: "marker" },
  },

  { name: "Big", element: "big" },
  { name: "Small", element: "small" },
  { name: "Typewriter", element: "tt" },

  { name: "Deleted Text", element: "del" },
  { name: "Inserted Text", element: "ins" },

  /* Object styles */

  {
    name: "Styled Image (left)",
    element: "img",
    attributes: { class: "left" },
  },
  {
    name: "Styled Image (right)",
    element: "img",
    attributes: { class: "right" },
  },

  {
    name: "Compact Table",
    element: "table",
    attributes: {
      cellpadding: "5",
      cellspacing: "0",
      border: "1",
      bordercolor: "#ccc",
    },
    styles: {
      "border-collapse": "collapse",
    },
  },

  {
    name: "Borderless Table",
    element: "table",
    styles: {
      "border-style": "hidden",
      "background-color": "#E6E6FA",
    },
  },
  {
    name: "Square Bulleted List",
    element: "ul",
    styles: { "list-style-type": "square" },
  },

  /* Widget styles */

  {
    name: "Clean Image",
    type: "widget",
    widget: "image",
    attributes: { class: "image-clean" },
  },
  {
    name: "Grayscale Image",
    type: "widget",
    widget: "image",
    attributes: { class: "image-grayscale" },
  },

  {
    name: "Featured Snippet",
    type: "widget",
    widget: "codeSnippet",
    attributes: { class: "code-featured" },
  },

  {
    name: "Featured Formula",
    type: "widget",
    widget: "mathjax",
    attributes: { class: "math-featured" },
  },

  {
    name: "240p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-240p" },
    group: "size",
  },
  {
    name: "360p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-360p" },
    group: "size",
  },
  {
    name: "480p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-480p" },
    group: "size",
  },
  {
    name: "720p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-720p" },
    group: "size",
  },
  {
    name: "1080p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-1080p" },
    group: "size",
  },

  // Adding space after the style name is an intended workaround. For now, there
  // is no option to create two styles with the same name for different widget types. See https://dev.ckeditor.com/ticket/16664.
  {
    name: "240p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-240p" },
    group: "size",
  },
  {
    name: "360p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-360p" },
    group: "size",
  },
  {
    name: "480p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-480p" },
    group: "size",
  },
  {
    name: "720p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-720p" },
    group: "size",
  },
  {
    name: "1080p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-1080p" },
    group: "size",
  },
];
