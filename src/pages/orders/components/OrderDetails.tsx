import { ProColumns, ProTable } from "@ant-design/pro-components";
import { FC } from "react";
import Barcode from "react-barcode";

const columns: ProColumns<OrderDetails>[] = [
  {
    title: "产品编号",
    dataIndex: "p_sku",
  },
  {
    title: "条形码",
    dataIndex: "goods_code",
    width: 120,
    render: (__, record) => {
      return record.goods_code ? (
        <Barcode
          value={record.goods_code}
          height={24}
          width={1}
          margin={0}
          displayValue={false}
          marginTop={4}
        />
      ) : (
        "-"
      );
    },
  },
  {
    title: "商品名称",
    dataIndex: "goods_name",
  },
  {
    title: "含税单价",
    dataIndex: "price",
    valueType: "money",
  },
  {
    title: "采购数量",
    dataIndex: "num",
    valueType: "digit",
  },
  {
    title: "是否组合商品",
    dataIndex: "isPack",
    valueEnum: {
      0: "否",
      1: "是",
    },
  },
  {
    title: "装箱方式",
    dataIndex: "box_type",
    valueEnum: {
      1: "按照订单商品装箱",
      2: "按订单商品的组件",
    },
  },
];

export const OrderDetails: FC<{ data: Order }> = ({ data }) => {
  return (
    <div>
      <ProTable
        pagination={false}
        columns={columns}
        search={false}
        dataSource={data.orderDetails}
        rowKey="detailId"
        bordered
        toolBarRender={false}
        size="small"
      />
    </div>
  );
};
