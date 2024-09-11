import React, { FC } from "react";
import { renderKpiJson, renderKpiHeaderJson } from "@/util/helper";

import RenderAtom from "@/components/common/Atom/RenderAtom";
import Table from "./tableData";
type PropsType = {
  dataSrc: any;
  key?: number;
};

const kpiTable: FC<PropsType> = ({ dataSrc, key }) => {
  const indicator = renderKpiJson(dataSrc);
  const headerKpi = renderKpiHeaderJson(dataSrc);
  // const { data: session, status }: any = useSession();
  // console.log(
  // 	indicator,
  // 	"dddddddddddddddddddddd----------------------------------------s",
  // );
  const columns = React.useMemo(
    () => [
      {
        Header: "Үзүүлэлт",
        accessor: "name",
        className: "w-50",
      },
      ...headerKpi,
    ],
    []
  );

  return (
    <>
      {/* <pre>{JSON.stringify(indicator, null, 4)}</pre> */}
      <RenderAtom
        item={{ value: dataSrc.name }}
        renderType="title"
        customClassName={"border-b-2 text-left  border-black py-2  my-3"}
      />
      <Table columns={columns} data={indicator} />
    </>
  );
};

export default kpiTable;
