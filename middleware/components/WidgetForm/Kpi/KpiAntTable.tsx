import { FC } from "react";
import { renderKpiJson, renderKpiHeaderJson } from "@/util/helper";
import { Table } from "antd";
import RenderAtom from "@/components/common/Atom/RenderAtom";
type PropsType = {
  dataSrc: any;
  config?: any;
  inputclassName?: any;
};

const kpiTable: FC<PropsType> = ({ dataSrc, config, inputclassName }) => {
  const indicator = renderKpiJson(dataSrc);
  const headerKpi = renderKpiHeaderJson(dataSrc);

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      width: "2%",
    },
    {
      title: "Үзүүлэлт",
      dataIndex: "name",
      width: "50%",
      // render: (_, record: { name: string }) => (
      // 	<input placeholder={record.name} className="w-full" />
      // ),
    },
    ...headerKpi,
  ];
  const data = [...indicator];

  return (
    <div className="kpiTableSection col-md-12  kpi-rendertype-grid  my-8">
      <RenderAtom
        item={{ value: dataSrc.name }}
        renderType="title"
        customClassName={"border-b-2 text-left  border-black py-2  my-3"}
      />
      <Table
        rowClassName={() => "editable-row"}
        dataSource={data}
        columns={columns}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default kpiTable;
