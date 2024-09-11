import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import moment from "moment";
import AddComment from "./addComment";
import { useState } from "react";
import _ from "lodash";
import { Image, Dropdown, MenuProps } from "antd";
import fetchJson from "@/util/helper";
import useSWR from "swr";

const CommentItem = ({
  item,
  index,
  session,
  selectedId,
  children,
  mutate,
  key,
}: any) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [leading, setLeading] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userComment, setUserComment] = useState(item?.commenttext);
  const [loadProcess, setLoadProcess] = useState(false);
  const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const commentLenght: any = document.getElementById(`text${index}`)?.innerText
    .length;

  const param = JSON.stringify({
    filtertablename: "ECM_COMMENT",
    filterrecordid: item?.id,
    filteractionname: "LIKE",
  });

  let {
    data: likeCount,
    error,
    mutate: likeMutate,
  } = useSWR(
    `/api/get-process?command=PRTL_MN_ACTIVITIES_COUNT_004&parameters=${param}`
  );

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p className="text-[#585858]" onClick={() => setEdit(!edit)}>
          Засах
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p className="text-[#585858]" onClick={() => deleteComment()}>
          Устгах
        </p>
      ),
    },
  ];

  const deleteComment = async () => {
    setLoadProcess(true);

    const command = "PRTL_MN_COMMENT_005";
    const param = JSON.stringify({
      id: item?.id,
      dbsessionid: session?.dbsessionid,
    });

    if (session) {
      const res = await fetchJson(`
      /api/post-comment?command=${command}&parameters=${param}
      `);
      if (res?.status == "success") {
        setOpenDropDown(!openDropDown);
        mutate();
        setLoadProcess(false);
      }
    }
  };

  const editComment = async () => {
    setLoadProcess(true);

    const command = "PRTL_MN_COMMENT_002";
    const param = JSON.stringify({
      ...item,
      commenttext: userComment,
      dbsessionid: session?.dbsessionid,
    });
    const result = await fetchJson(
      `/api/post-comment?command=${command}&parameters=${param}`
    );

    if (result?.status == "success") {
      mutate();
      setEdit(!edit);
      setLoadProcess(false);
    }
  };

  const EnterClick = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault();
      editComment();
    }
  };

  const addLike = async () => {
    const command = "PRTL_MN_ACTIVITIES_001";
    const param = JSON.stringify({
      tableName: "ECM_COMMENT",
      recordId: item?.id,
      actionName: "LIKE",
      createdCrmUserId: session?.crmuserid,
      dbsessionid: session?.dbsessionid,
    });
    const result = await fetchJson(
      `/api/post-comment?command=${command}&parameters=${param}`
    );
    if (result?.status == "success") {
      likeMutate();
    }
  };

  const unLike = async () => {
    const command = "PRTL_MN_ACTIVITIES_001";
    const param = JSON.stringify({
      tableName: "ECM_COMMENT",
      recordId: item?.id,
      actionName: "DISLIKE",
      createdCrmUserId: session?.crmuserid,
      dbsessionid: session?.dbsessionid,
    });
    const result = await fetchJson(
      `/api/post-comment?command=${command}&parameters=${param}`
    );

    console.log("result", result);
    if (result?.status == "success") {
      likeMutate();
    }
  };

  return (
    <BlockDiv
      key={item?.id || index}
      customClassName={`bg-transparent rounded-lg mt-2 py-2
      ${loadProcess ? "opacity-50" : "opacity-100"}
      `}
    >
      <div className="flex">
        <div
          className=""
          style={{
            minWidth: "50px",
          }}
        >
          <img
            src={
              item?.profilephoto
                ? `${imgUrl}${item?.profilephoto}`
                : `${imgUrl}assets/core/global/img/user.png`
            }
            className=" w-10 h-10 mt-3 rounded-full object-cover"
          />
        </div>
        <div
          className={`bg-gray-100  rounded-lg py-3 px-6  w-[96%] overflow-hidden relative

        `}
        >
          {session && item?.createdcrmuserid == session?.crmuserid && (
            <div className="absolute top-3 right-6 cursor-pointer">
              <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow
                open={openDropDown}
                onOpenChange={() => setOpenDropDown(!openDropDown)}
                trigger={["click"]}
              >
                <i className="fa-solid fa-ellipsis text-[#585858] fa-xs"></i>
              </Dropdown>
            </div>
          )}

          <div className="flex w-full items-center justify-between">
            <div className="w-full capitalize flex items-center gap-2 min-h-[40px]">
              <div className="">
                <div className="flex items-center justify-center">
                  <RenderAtom
                    item={{
                      value: item?.username || "Зочин",
                    }}
                    renderType="text"
                    customClassName="text-base text-[#585858]  font-semibold block leading-[14px]"
                  />
                  <RenderAtom
                    item={{
                      value: `&#8226; ${moment(item?.createdDate).format(
                        "h:mm"
                      )}`,
                    }}
                    renderType="text"
                    customClassName="text-[14px] font-semibold  text-[#67748E]  text-right lowercase pl-2 "
                    customStyle={{ color: "#67748E" }}
                  />
                </div>
                <RenderAtom
                  item={{
                    value: item?.departmentname || "Байгууллага",
                  }}
                  renderType="text"
                  customClassName="text-xs text-[#585858]/70  font-semibold block leading-2"
                />
              </div>
            </div>
            {/* <i className="fa-regular fa-thumbs-up fa-lg text-[#585858]"></i> */}
          </div>
          {edit ? (
            <div className="mt-3">
              <div className="flex items-center">
                <textarea
                  onKeyDown={(e) => {
                    EnterClick(e);
                  }}
                  value={userComment}
                  onChange={(e: any) => setUserComment(e.target.value)}
                  className="font-medium rounded-[10px] font-roboto min-h-[40px] max-h-[160px] w-full focus:outline-none focus:shadow-none focus:ring-0 text-gray-700 border-none  active:border-none text-base p-[10px] pr-4"
                ></textarea>
                <div
                  className={`duration-1000 relative visible opacity-100 translate-x-4 w-[60px]"
                  }`}
                >
                  <div className=" h-full mt-2" onClick={() => editComment()}>
                    <button className="px-1 cursor-pointer" type="submit">
                      <svg
                        width="27"
                        height="23"
                        viewBox="0 0 27 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.833011 22.4197C1.47895 23.0376 2.49271 22.9432 3.68591 22.4369L24.9122 13.3744C25.4863 13.1341 25.9439 12.8681 26.2489 12.5763C26.832 12.0185 26.832 11.332 26.2489 10.7741C25.9439 10.4824 25.4863 10.2163 24.9122 9.97603L3.56928 0.870704C2.5286 0.424449 1.48792 0.304303 0.83301 0.930777C0.00764455 1.72031 0.357528 2.58707 0.958609 3.6598L4.33184 9.70141C4.72658 10.4223 5.05853 10.7055 5.81212 10.7398L24.8404 11.3491C25.0647 11.3577 25.1813 11.5036 25.1992 11.6752C25.1992 11.8469 25.0736 11.9842 24.8494 11.9928L5.80315 12.6707C5.09441 12.6965 4.76247 12.9625 4.33185 13.7005L1.02141 19.5963C0.384443 20.7205 -0.00132605 21.6216 0.833011 22.4197Z"
                          fill="#699BF7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* <AddComment
                commentId={item?.id}
                parentId={item?.parentid}
                session={session}
                selectedId={selectedId}
                comment={item?.commenttext}
                commentFile={item?.commentfile}
              /> */}
            </div>
          ) : (
            <div className="mt-3">
              <p
                className={`relative text-[16px] leading-5 font-normal text-gray-500 inline  ${
                  leading && "line-clamp-5"
                }  text-justify`}
                style={{
                  color: "#585858",
                }}
                id={`text${index}`}
              >
                {item?.commenttext} {/* {leading && ( */}
                {commentLenght >= 350 && leading && (
                  <span
                    onClick={() => setLeading(!leading)}
                    className="float-right cursor-pointer text-blue-400 text-sm"
                  >
                    ...Дэлгэрэнгүй
                  </span>
                )}
                {/* )} */}
              </p>

              {!_.isEmpty(item.commentfile) && (
                <Image.PreviewGroup
                  preview={{
                    visible: isPreviewVisible,
                    onVisibleChange: (visible, prevVisible) =>
                      setPreviewVisible(visible),
                  }}
                >
                  <div className="flex items-center mt-5">
                    {item?.commentfile.map((obj: any, index: number) => {
                      switch (obj?.fileextension) {
                        case "png" || "jpg" || "jpeg":
                          if (index == 1) {
                            return (
                              <div className="relative ">
                                <Image
                                  // width={240}

                                  // height={300}
                                  src={`https://dev.veritech.mn/${obj?.physicalpath}`}
                                  className="object-cover"
                                  sizes="cover"
                                  wrapperClassName="object-cover rounded-lg"
                                  style={{
                                    maxWidth: "300px",
                                  }}
                                />
                                {/* <div
                                className="flex items-center justify-center rounded-lg absolute top-0 bg-black/20 w-full h-[98%] text-white cursor-pointer"
                                onClick={() => setPreviewVisible(true)}
                              >
                                <p className="text-[70px] font-bold">
                                  +{item?.commentfile?.length - 2}
                                </p>
                              </div> */}
                              </div>
                            );
                          } else {
                            return (
                              <div className="relative">
                                <Image
                                  // width={240}
                                  // height={300}
                                  src={`https://dev.veritech.mn/${obj?.physicalpath}`}
                                  className="object-cover rounded-lg"
                                  sizes="cover"
                                  wrapperClassName="object-cover rounded-lg"
                                />
                              </div>
                            );
                          }
                      }
                    })}
                  </div>
                </Image.PreviewGroup>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center pl-[55px] text-[12px] text-[#585858]">
        <div className="flex items-center">
          {likeCount?.result?.recordcount > "0" &&
          !_.isEmpty(likeCount?.result?.userids) ? (
            <p
              className="text-[#699BF7] cursor-pointer"
              onClick={() => unLike()}
            >
              disLike
            </p>
          ) : (
            <p
              className="hover:text-[#699BF7] cursor-pointer"
              onClick={() => addLike()}
            >
              Like
            </p>
          )}

          {likeCount?.result?.recordcount > "0" && likeCount?.result && (
            <p className="pl-1">({likeCount?.result?.recordcount})</p>
          )}
        </div>
        <p className="px-4">|</p>
        <p
          className="hover:text-[#699BF7] cursor-pointer"
          onClick={() => setReplyOpen(!replyOpen)}
        >
          Хариулах
        </p>
        {!_.isEmpty(children) && (
          <>
            <p className="px-4">|</p>
            <p className="">{children.length} Replies</p>
          </>
        )}
      </div>
      <div className="pl-[55px] w-full">
        {replyOpen && (
          <>
            <div className="w-full">
              <AddComment
                //   form={form}
                session={session}
                mutate={mutate}
                //   handleSubmit={handleSubmit}
                //   EnterClick={EnterClick}
                selectedId={selectedId}
                parentId={item?.id}
              />
            </div>
            {!_.isEmpty(children) &&
              children.map((item: any, index: any) => {
                return (
                  <CommentItem
                    item={item}
                    index={index}
                    session={session}
                    mutate={mutate}
                    selectedId={selectedId}
                    children={item?.children}
                  />
                );
              })}
          </>
        )}
      </div>
      <style>
        {`
          .ant-image-img {
            border-radius:10px;
            max-width:300px
          }
          .ant-image-mask {
            border-radius:10px

          }
          `}
      </style>
    </BlockDiv>
  );
};

export default CommentItem;
