import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Table } from "components/Table";
import dayjs from "dayjs";
import { useEntityStore } from "hooks/useEntityStore";
import { FC, useRef } from "react";

const columns: ProColumns<Invoice>[] = [
  {
    title: "序号",
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
    fixed: "left",
  },
  {
    title: "平台发货单号",
    dataIndex: "p_sendOrderNo",
    ellipsis: true,
    copyable: true,
    fixed: "left",
    hideInSearch: true,
  },
  {
    title: "订单编号",
    dataIndex: "orderNo",
    ellipsis: true,
    copyable: true,
    hideInSearch: true,
  },
  {
    title: "发货单状态",
    dataIndex: "state",
    valueEnum: {
      0: { text: "正常", status: "Success" },
      1: { text: "作废", status: "Default" },
      2: { text: "挂起", status: "Warning" },
      3: { text: "退回(服务订单)", status: "Error" },
      4: { text: "已撤回", color: "Default" },
    },
    hideInSearch: true,
  },
  {
    title: "发货状态",
    dataIndex: "sendState",
    valueEnum: {
      0: { text: "未发货", status: "Warning" },
      1: { text: "已发货", status: "Success" },
    },
    hideInSearch: true,
  },
  {
    title: "妥投状态",
    dataIndex: "isDelivered",
    valueEnum: {
      0: { text: "未妥投", status: "Warning" },
      1: { text: "已妥投", status: "Success" },
      2: { text: "妥投驳回", status: "Error" },
    },
    hideInSearch: true,
  },

  {
    title: "签收状态",
    dataIndex: "receiptStatus",
    valueEnum: {
      0: { text: "未收货", status: "Default" },
      1: { text: "部分收货", status: "Warning" },
      2: { text: "全部收货", status: "Success" },
      3: { text: "拒收", status: "Error" },
    },
    hideInSearch: true,
  },
  {
    title: "发货时间",
    dataIndex: "sendTime",
    valueType: "dateTime",
    hideInSearch: true,
  },
  {
    title: "金额(含税)",
    dataIndex: "orderPrice",
    valueType: "money",
    hideInSearch: true,
  },
  {
    title: "时间范围",
    dataIndex: "duration",
    valueType: "dateTimeRange",
    hideInTable: true,
    initialValue: [dayjs().subtract(1, "month"), dayjs()],
    colSize: 2,
  },
];

export const InvoiceSummaries: FC = () => {
  useEntityStore(["商城系统", "发货查询"]);
  const actionRef = useRef<ActionType>();

  return (
    <Table
      service="/invoice-summaries"
      rowKey="sendOrderNo"
      columns={columns}
      actionRef={actionRef}
      search={{
        labelWidth: 120,
        span: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 },
      }}
      actions={undefined}
    ></Table>
  );
};
