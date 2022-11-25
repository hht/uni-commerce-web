import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { Table } from "components/Table";
import { useEntityStore } from "hooks/useEntityStore";
import { request, useRequest } from "hooks/useRequest";
import { FC, useRef } from "react";
import { AppendLogistice } from "./components/AppendLogistics";
import { ConfirmInvoice } from "./components/ConfirmInvoice";
import { InvoiceDetails } from "./components/InvoiceDetails";

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
    dataIndex: "pSendOrderNo",
    ellipsis: true,
    copyable: true,
    fixed: "left",
  },
  {
    title: "订单编号",
    dataIndex: "orderNo",
    ellipsis: true,
    copyable: true,
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
  },
  {
    title: "发货状态",
    dataIndex: "sendState",
    valueEnum: {
      0: { text: "未发货", status: "Warning" },
      1: { text: "已发货", status: "Success" },
    },
  },
  {
    title: "妥投状态",
    dataIndex: "isDelivered",
    valueEnum: {
      0: { text: "未妥投", status: "Warning" },
      1: { text: "已妥投", status: "Success" },
      2: { text: "妥投驳回", status: "Error" },
    },
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
  },
  {
    title: "发货时间",
    dataIndex: "sendTime",
    valueType: "dateTime",
  },
  {
    title: "金额(含税)",
    dataIndex: "orderPrice",
    valueType: "money",
    hideInSearch: true,
  },
];

const expandedRowRender = (data: Invoice) => {
  return <InvoiceDetails data={data} />;
};

export const Invoices: FC = () => {
  useEntityStore(["商城系统", "发货单列表"]);
  const actionRef = useRef<ActionType>();
  const { run: getInvoice } = useRequest(
    (p_sendOrderNo) => request("/invoice", "POST", { p_sendOrderNo }),
    {
      manual: true,
      onSuccess: () => {
        message.success("更新发货单信息成功");
        actionRef.current?.reload();
      },
    }
  );
  return (
    <Table
      service="/invoices"
      rowKey="sendOrderNo"
      columns={columns}
      actionRef={actionRef}
      expandable={{ expandedRowRender }}
      search={{
        labelWidth: 120,
        span: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 },
      }}
      actions={[
        {
          title: "操作",
          dataIndex: "option",
          valueType: "option",
          fixed: "right",
          width: 200,

          render: (_, record: Invoice) => (
            <>
              <Button
                type="link"
                key="refresh"
                size="small"
                onClick={() => {
                  getInvoice(record.pSendOrderNo);
                }}
              >
                更新
              </Button>
              <ConfirmInvoice data={record} />
              <AppendLogistice data={record}></AppendLogistice>
            </>
          ),
        },
      ]}
    ></Table>
  );
};
