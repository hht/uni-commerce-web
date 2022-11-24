import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Card, Descriptions, List, Typography } from "antd";
import { Table } from "components/Table";
import { useEntityStore } from "hooks/useEntityStore";
import { FC, useRef } from "react";

const expandedRowRender = (order: Order) => {
  console.log(order);
  return order.orderDetails.map((it) => (
    <Card key={it.detailId} style={{ marginBottom: 8 }}>
      <Descriptions bordered>
        <Descriptions.Item label="商品编号">{it.detailId}</Descriptions.Item>
        <Descriptions.Item label="商品名称">{it.goods_name}</Descriptions.Item>
        <Descriptions.Item label="商品价格(含税)">{`¥${it.price}`}</Descriptions.Item>

        {it.linePackInfo?.length ? (
          <Descriptions.Item label="组合商品详情">
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={it.linePackInfo}
              rowKey="eDetailId"
              renderItem={(item) => (
                <Card bordered={false}>
                  <Typography.Text ellipsis>{item.eGoodName}</Typography.Text>
                  <div>{`¥${parseFloat(item.eUnitPrice).toFixed(2)}`}</div>
                </Card>
              )}
            ></List>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
    </Card>
  ));
};

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
  { title: "订单金额(含税)", dataIndex: "orderPrice", valueType: "money" },
];

export const Orders: FC = () => {
  useEntityStore(["商城系统", "订单列表"]);
  const actionRef = useRef<ActionType>();
  return (
    <Table
      service="/orders"
      rowKey="orderNo"
      columns={columns}
      actionRef={actionRef}
      search={{
        labelWidth: 120,
        span: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 },
      }}
      expandable={{ expandedRowRender }}
      actions={[
        {
          title: "操作",
          dataIndex: "option",
          valueType: "option",
          fixed: "right",
          width: 120,

          render: (_, record: Partial<Order>) => <></>,
        },
      ]}
    ></Table>
  );
};
