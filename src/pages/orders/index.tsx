import { ProColumns } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { Table } from "components/Table";
import { useEntityStore, useStore } from "hooks/useEntityStore";
import { request, useRequest } from "hooks/useRequest";
import { FC } from "react";
import { OrderDetails } from "pages/orders/components/OrderDetails";
import { ShipOrder } from "./components/ShipOrder";

const columns: ProColumns<Order>[] = [
  {
    title: "序号",
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
    fixed: "left",
  },
  {
    title: "订单编号",
    dataIndex: "orderNo",
    ellipsis: true,
    copyable: true,
    width: 200,
    // hideInSearch: true,
    fixed: "left",
  },
  { title: "客户", dataIndex: "comName" },
  {
    title: "下单组织",
    dataIndex: "ouName",
    width: 200,
    ellipsis: true,
    copyable: true,
    hideInSearch: true,
  },
  {
    title: "下单人",
    dataIndex: "createName",
    width: 200,
  },
  {
    title: "订单状态",
    dataIndex: "orderState",
    valueEnum: {
      0: { text: "已取消", status: "Warning" },
      1: { text: "正常", status: "Success" },
      2: { text: "已挂起", status: "Error" },
    },
  },
  {
    title: "订单金额(含税)",
    dataIndex: "orderPrice",
    valueType: "money",
    hideInSearch: true,
  },
];

const expandedRowRender = (order: Order) => {
  return <OrderDetails data={order} />;
};

export const Orders: FC = () => {
  const { actionRef } = useEntityStore(["商城系统", "订单列表"]);
  const { currentRow } = useStore();

  const { loading: fetching, run: getOrder } = useRequest(
    (orderNo) => request("/order", "POST", { orderNo }),
    {
      manual: true,
      onSuccess: () => {
        message.success("订单更新成功");
        actionRef?.current?.reload();
      },
    }
  );
  return (
    <Table
      service="/orders"
      rowKey="orderNo"
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
          width: 160,

          render: (_, record: Order) => (
            <>
              <Button
                type="link"
                key="refresh"
                size="small"
                loading={fetching && currentRow?.orderNo === record.orderNo}
                onClick={() => {
                  getOrder(record.orderNo);
                }}
              >
                更新
              </Button>
              <ShipOrder order={record} />
            </>
          ),
        },
      ]}
    ></Table>
  );
};
