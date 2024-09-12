import { FC, useContext } from "react";

import usePostDataSWR from "./usePostDataSWR";
import _ from "lodash";
import KpiTable from "./KpiTable";
import FormMetaContext from "@/context/Meta/FormMetaContext";
import { useSession } from "next-auth/react";
import { Empty } from "antd";
type PropsType = {
  pathConfig: any;
  config: any;
  inputclassName?: any;
};

const KpiForm: FC<PropsType> = ({ pathConfig, config, inputclassName }) => {
  const {
    processExpression,
    formDataInitData,
    setFormDataData,
    processConfig,
  } = useContext(FormMetaContext);
  const { data: session, status }: any = useSession();
  if (_.isEmpty(session))
    return <Empty description="Та хандах эрхгүй байна " />;
  const [dataReady, dataError, dataMutate] = usePostDataSWR(
    "mobKpiTemplateGetDV_004",
    {
      id: formDataInitData?.kpiTemplateId,
    }
  );
  // console.log("dataReadydataReadydataReadydataReady", dataReady);

  const kpiTemplate = _.values(dataReady?.kpitemplate);

  return (
    <div className="kpiFormSection  ">
      {kpiTemplate?.map((item, i) => (
        <KpiTable dataSrc={item} key={i} />
      ))}
    </div>
  );
};

export default KpiForm;
