import { ProColumns } from "@ant-design/pro-components";
import { Table } from "components/Table";
import { useEntityStore } from "hooks/useEntityStore";
import { FC } from "react";

const columns: ProColumns<Order>[] = [
  {
    title: "序号",
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
    fixed: "left",
  },
  {
    title: "编码",
    dataIndex: "logisticsComNo",
  },
  { title: "名称", dataIndex: "logisticsCom" },
];

export const Logistics: FC = () => {
  useEntityStore(["商城系统", "物流公司"]);
  return (
    <Table
      service="/logistics"
      rowKey="logisticsComNo"
      columns={columns}
      search={false}
    ></Table>
  );
};
