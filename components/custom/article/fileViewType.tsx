import { useToggle } from "react-use";
import { Image } from "antd";
import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useSWR from "swr";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf-worker.js";

import { Modal } from "antd";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import BlockDiv from "@/components/common/Block/BlockDiv";
type PropsType = {
  dataItem?: any;
};

const fileViewType: FC<PropsType> = ({ dataItem }) => {
  const { data: session, status }: any = useSession();
  const {
    config,
    readyDatasrc,
    widgetnemgooReady,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
  } = useContext(WidgetWrapperContext);
  const [visibleModal2, setVisibleModal2] = useToggle(false);
  const { callProcess } = useCallProcess();
  const router = useRouter();
  const cloudContext = useCloud();
  const [selectedId, setSelectedId] = useState<any>(router.query?.filterid);
  const [content, setContent] = useState<any>();
  const [fileList, setFileList] = useState<any>();
  const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  const parameters = {
    filterrecordid: selectedId,
    filterstructureid: widgetnemgooReady?.listconfig?.filterstructureid,
  };
  // console.log(selectedId);

  const getFile = async () => {
    const data = await callProcess({
      command: "getFile_004",
      parameter: parameters,
      silent: true,
      moreRequest: null,
      resultConfig: null,
    });
    setFileList(data?.result);
  };

  useEffect(() => {
    getFile();
  }, []);

  const fileSrc = _.values(fileList?.filedtl);
  const onClose = () => {
    setVisibleModal2(false);
  };
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const onClickOpenFdf = (item: any) => {
    if (item?.fileextension === "png") {
      window.open(`https://cloudnew.veritech.mn/app/${item?.physicalpath}`);
    } else {
      setContent(
        <div className="container mx-auto min-h-[600px]">
          <iframe
            className="w-full h-[600px]"
            src={`https://cloudnew.veritech.mn/app/${item?.physicalpath}`}
          />
          {/* <Document
            file={`https://cloudnew.veritech.mn/app/${item?.physicalpath}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={1} scale={1.6} />
          </Document> */}
        </div>
      );
      setVisibleModal2(true);
    }
  };

  return (
    <>
      {_.isEmpty(fileSrc) && (
        <div className="w-full text-center my-2">
          <p className="text-[#585858]">Хоосон байна</p>
        </div>
      )}
      <BlockDiv customClassName=" mt-6 " divNumber={"FileDiv"}>
        {fileSrc.map((item: any, index: number) => {
          const type = item?.fileextension || "";
          let imgSrc = item?.physicalpath;
          const contentItem = () => {
            switch (type) {
              case "pdf":
                return (
                  <img
                    src="https://res.cloudinary.com/dzih5nqhg/image/upload/v1649641911/cloud/icons/Group_7134_4_iujlmx.png"
                    alt="icon"
                    className=""
                    width={40}
                    onClick={() => onClickOpenFdf(imgSrc)}
                  />
                );
              default:
                return (
                  <Image
                    width={40}
                    src={`https://cloudnew.veritech.mn/app/${imgSrc}`}
                  />
                );
            }
          };

          return (
            <div
              className="bg-white flex h-16 list-none my-2 rounded-lg px-4 cursor-pointer gap-3"
              key={item?.id || index}
              onClick={() => onClickOpenFdf(item)}
            >
              <div className="w-10 flex items-center ">{contentItem()}</div>
              <div className=" grid content-center ">
                <>
                  <p
                    className="text-citizen-title font-medium text-tiny m-0 pt-2 line-clamp-2 w-100"
                    style={{ lineHeight: "16px" }}
                  >
                    {item.filename}
                  </p>
                  <span className="text-gray-300  text-tiny ">
                    {formatBytes(item.filesize)}
                  </span>
                </>
              </div>
            </div>
          );
        })}
      </BlockDiv>
      <Modal
        open={visibleModal2}
        width={1200}
        title="Файл харах"
        // centered
        footer={false}
        onCancel={onClose}
      >
        {content}
      </Modal>
    </>
  );
};

export default fileViewType;
