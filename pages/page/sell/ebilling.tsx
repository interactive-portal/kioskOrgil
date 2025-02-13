import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import Payment from "@/components/project/riverclub/v1/payment/payment";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Statistic } from "antd";
import Layout from "../kioskLayout";
export default function Ebilling({
  item,
  content,
}: {
  item?: any;
  content?: any;
}) {
  console.log("item  pos:>> ", item);
  console.log("content  pos:>> ", content);
  const [printOptions, setPrintOptions] = useState({
    lang: {
      mn: "",
      en: "",
    },
    ishtml: 1,
    print_options: {
      numberOfCopies: "1",
      isPrintNewPage: "1",
      isSettingsDialog: "0",
      isShowPreview: "1",
      isPrintPageBottom: "0",
      isPrintPageRight: "0",
      pageOrientation: "portrait",
      isPrintSaveTemplate: "1",
      paperInput: "portrait",
      pageSize: "a5",
      printType: "1col",
      templatemetaid: "170174656028110",
      templateIds: "170174656028110",
    },
  });
  
  const router = useRouter();


  const [conId, setConId] = useState("17304746821143");

  const printEbarimt = () => {
    var content: any = document.getElementById("portraid");
    const pri: any = (document.getElementById("content") as HTMLIFrameElement)
      .contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();

    window.location.href="/"

  };

  const contractid = router?.query?.id;


  const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;

  if (!contractid)
    return (
      <div className="min-h-[450px] flex flex-col space-y-8 items-center justify-center mx-auto">
        <Spin indicator={antIcon} />
      </div>
    );
  return (
    <Layout>
      <div className="min-h-[900px] flex items-center justify-center mt-[250px] flex-col">
        <div className="w-[500px] min-h-[400px] rounded-lg printContent py-10 border  items-center  text-center">
        <iframe id="content" className="h-0 w-0 absolute"></iframe>
        <div id={"portraid"} className="h- w-[260px] mx-auto">
            <ReportTemplate
            options={printOptions}
            data={{
                contractId: router?.query?.id, // || "17304644323913",
            
            }}
            />
        </div>
        <p className="text-[20px] mt-6 px-4 text-white">
            Та баримтаа хэвлэж авна уу
        </p>
        <div className="py-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer button">
            <div
            className="px-6 py-1 float-right bg-white border-[#A68B5C] border text-[#A68B5C]   justify-center text-[18px] w-[200px] rounded-full mx-auto"
            onClick={() => {
                printEbarimt();
            }}
            >
            Баримт хэвлэх
            </div>
        </div>
        </div>
        <style>
        {`
                #portraid {
                page-break-before: always;
                page-break-inside: avoid;
                padding:30px;
                background:#fff;
                color:#000;
                }
            @media print {
            body {
                font-family: Arial, sans-serif;
                font-size: 12pt;
                color: black;
                padding:40px;
            }

                #portraid {
                page-break-before: always;
                page-break-inside: avoid;
                padding:30px;
                background:#fff;
                }

                .button {
                display: none;
                }

                .txt {
                display: none;
                }
                img :{
                display: none;
                }
            }

    `}
        </style>
      </div>
      </Layout>
  );
}
