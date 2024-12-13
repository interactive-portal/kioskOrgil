import { FC, useState } from "react";
import useSWR from "swr";
import parseHtml from "html-react-parser";
import { decode } from "html-entities";

// import Jaak from "@/components//cloud/Project/Cozy/jaak";

type PropsType = {
  data?: any;
  options?: any;
};

const ReportTemplate: FC<PropsType> = ({ data, options }) => {
  const [tempalate, setTemplate] = useState<any>();

  const parameters = `&parameters=${JSON.stringify({
    parameter: {
      ...options,
      datarow: [
        {
          id: data?.contractId,
        },
      ],
    },
  })}`;

  const datas = useSWR(
    `/api/get-process?command=getReportTemplate${parameters}`
  );

  console.log("dataa==========", data);
  // const rawData = parseHtml(decode(datas?.data));

  return <> {parseHtml(decode(datas?.data?.result))}</>;
};

export default ReportTemplate;
