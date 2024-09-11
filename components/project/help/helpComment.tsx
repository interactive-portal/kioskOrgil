import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useRef, useState } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { Select } from "antd";
import AddComment from "./addComment";
import CommentItem from "./commentItem";
import { listToTree } from "@/util/helper";
import useSWR from "swr";

type PropsType = {
  commentData?: any;
  setCommentCount?: any;
  commentcount?: any;
};

const helpComment: FC<PropsType> = ({
  commentData,
  setCommentCount,
  commentcount,
}: any) => {
  const { data: session, status }: any = useSession();
  // return <p>Түр засвартай</p>;

  const { widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);
  const router = useRouter();
  let selectedId = router.query?.filterid;

  const parameters = JSON.stringify({
    filterRecordId: selectedId || widgetnemgooReady?.recordId,
    filterStructureId: "1479204227214",
    // paging: {
    //   pageSize: 5,
    //   offset: 1,
    // },
  });

  const {
    data: comment,
    error,
    mutate,
  } = useSWR(
    `/api/get-process?command=PRTL_MN_GET_COMMENT_004&parameters=${parameters}`
  );

  let clecmcommentd: any = _.values(comment?.result?.ecmcommentdtl);

  let comments = _.values(clecmcommentd);
  let ordered = _.orderBy(comments, ["createddate"], ["desc"]);

  const tree = listToTree(ordered, "parentid");

  const [currPage, setCurrPage] = useState(1);
  let listInnerRef: any = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <BlockDiv
      customClassName="w-full rounded-lg px-2 py-4"
      divNumber={"div100"}
    >
      <div className="flex justify-between items-center w-full">
        <p className="text-[#585858] text-[18px] font-medium leading-[32px]">
          {commentcount != 0 && commentcount} Сэтгэгдэл
        </p>
        <Select
          defaultValue="Шинэ эхэндээ"
          style={{ width: 200, border: "none" }}
          options={[{ value: "Шинэ эхэндээ", label: "Шинэ эхэндээ" }]}
        />
      </div>

      <AddComment mutate={mutate} session={session} selectedId={selectedId} />
      {tree?.length > 0 && (
        <div className="chat-container pb-2 mt-2 max-h-112 overflow-y-auto mb-2 scrollbar-thumb-gray-300  scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-300 -dark scrollbar-thumb-rounded-full lg:max-h-sm h-full">
          <div
            className="  lg:max-h-sm h-full mt-2 max-h-[700px] overflow-y-scroll commentContainer overflow-x-hidden pr-2"
            ref={listInnerRef}
            onScroll={onScroll}
          >
            {tree?.slice(0, currPage * 5).map((item: any, index: number) => {
              return (
                <CommentItem
                  key={index}
                  item={item}
                  index={index}
                  mutate={mutate}
                  session={session}
                  selectedId={selectedId}
                  children={item?.children}
                />
              );
            })}
          </div>
        </div>
      )}
      {/* CHAT */}
      <style>
        {`
          .commentContainer::-webkit-scrollbar {
            width:3px;
            padding: 20px 0px;
            border-radius: 10px;
          }
          .commentContainer::-webkit-scrollbar-track {
            border-radius: 10px;
            background:#5858584D;
          }
          .commentContainer::-webkit-scrollbar-thumb {
            background:#585858;
            border-radius: 10px;
          }
          `}
      </style>
    </BlockDiv>
  );
};
export default helpComment;
