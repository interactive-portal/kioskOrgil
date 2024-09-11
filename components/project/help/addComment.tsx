import RenderAtom from "@/components/common/Atom/RenderAtom";
import fetchJson from "@/util/helper";
import { useRef, useState } from "react";
import { Atom_file } from "@/components/common/Atom/Form";
import _ from "lodash";
import { notification } from "antd";

const AddComment = ({ session, selectedId, parentId, mutate }: any) => {
  const [fileList, setFileList] = useState([]);

  let form = useRef<any>();
  const [comment, setComment] = useState("");
  const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const handleUserComment = (e: any) => {
    setComment(e.target.value);
  };

  const handleFilterData = async (payload: any) => {
    const command = "PRTL_MN_COMMENT_001";
    const param = JSON.stringify({
      ...payload,
      dbsessionid: session?.dbsessionid,
      commentFileMap: fileList.map((obj: any, index: number) => {
        return {
          contentId: selectedId,
          files: {
            fileName: obj?.fileName,
            physicalPath: obj?.physicalPath,
            fileSze: obj?.fileSize,
            fileExtension: obj?.fileExtension,
            createdUserid: session?.crmuserid,
          },
        };
      }),
    });
    const result = await fetchJson(
      `/api/post-comment?command=${command}&parameters=${param}`
    );
    if (result?.status == "success") {
      mutate();
      setComment("");
      setFileList([]);
    }
  };

  const EnterClick = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: any) => {
    if (session) {
      e.preventDefault();
      const form_data = new FormData(form.current);
      const payload: any = {};
      form_data.forEach(function (value: any, key: string) {
        payload[key] = value;
      });
      handleFilterData(payload);
    } else {
      notification.warning({
        message: "Хэрэглэгчээр нэвтэрнэ үү !",
      });
    }
  };

  const deleteFile = (item: any) => {
    const newFileList = fileList.filter((obj: any) => {
      return obj !== item;
    });
    setFileList(newFileList);
  };

  function auto_height(elem: any) {
    /* javascript */
    elem.target.style.height = "1px";
    elem.target.style.height = `${elem.target.scrollHeight}px`;
  }

  return (
    <div className="w-full pt-1 pb-4 mt-4 rounded">
      <form ref={form} onSubmit={handleSubmit} className=" ">
        <div className="flex items-center">
          <div className="w-full flex  justify-between ">
            <div className="min-w-[50px]">
              <RenderAtom
                item={{
                  value: `${session?.profileImg}`,
                }}
                renderType="image"
                customClassName={
                  "max-w-[40px] h-[40px] rounded-full object-cover"
                }
              />
            </div>
            <div className="w-full">
              <div className="bg-white rounded-lg border w-full">
                <div className="w-full z-10  flex items-center ">
                  <textarea
                    onKeyDown={(e) => {
                      EnterClick(e);
                    }}
                    rows={2}
                    onInput={(elem) => auto_height(elem)}
                    className="font-medium rounded-[10px] font-roboto min-h-[40px] max-h-[160px] w-full focus:outline-none focus:shadow-none focus:ring-0 text-gray-700 border-none  active:border-none text-base p-[10px] pr-4"
                    name="commentText"
                    placeholder="Сэтгэгдэл үлдээх ..."
                    value={comment}
                    onChange={(e: any) => handleUserComment(e)}
                    style={{
                      minWidth: "40px",
                    }}
                  />
                  <div className="flex gap-3 relative right-4 z-10">
                    <Atom_file
                      config={{ type: "icon" }}
                      fileList={fileList}
                      setFileList={setFileList}
                    />
                    {/* <label>
              <i className="fa-light fa-image text-[#67748E] fa-lg cursor-pointer">
                <input type="file" onChange={(e) => console.log(e)} />
              </i>
            </label> */}
                    <label>
                      <i className="fa-light fa-face-smile text-[#67748E] fa-lg cursor-pointer"></i>
                    </label>
                  </div>
                </div>
                <input type="hidden" name="recordId" value={selectedId} />
                <input
                  type="hidden"
                  name="createdCrmUserId"
                  value={session?.crmuserid}
                />
                {parentId && (
                  <input type="hidden" name="parentId" value={parentId} />
                )}
                <input
                  type="hidden"
                  name="refStructureId"
                  value={"1479204227214"}
                />
                {!_.isEmpty(fileList) && (
                  <div className="bg-gray-100 flex overflow-scroll scrollHide border-t-2 border-[#585858]">
                    <div className="p-3 flex items-center">
                      {fileList?.map((item: any, index: number) => {
                        return (
                          <div key={index} className="relative">
                            <RenderAtom
                              item={{
                                value: `${imgUrl}${item?.physicalPath}`,
                              }}
                              renderType="image"
                              customClassName={
                                "min-h-[100px] max-h-[200px] max-w-[400px]"
                              }
                            />
                            <i
                              className="absolute fa-solid fa-circle-xmark right-2 top-2 fa-xl text-[#699BF7] cursor-pointer"
                              onClick={() => deleteFile(item)}
                            ></i>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`duration-1000 relative  ${
                comment
                  ? " visible opacity-100 translate-x-4 w-[60px]"
                  : "translate-x-[100%] invisible opacity-0 w-0"
              }`}
            >
              <div className=" h-full mt-2">
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
        </div>
      </form>
      <style>
        {`
        input[type="file"] {
          display:none;
        }
        .scrollHide::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </div>
  );
};

export default AddComment;
