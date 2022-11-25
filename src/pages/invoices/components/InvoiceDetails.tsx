import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Descriptions } from "antd";
import _ from "lodash";
import { FC } from "react";

const columns: ProColumns<BoxItem>[] = [
  {
    title: "产品编号",
    dataIndex: "detailNo",
  },
  {
    title: "商品名称",
    dataIndex: "goods_name",
  },
  {
    title: "发货数量",
    dataIndex: "send_num",
    valueType: "digit",
  },
  {
    title: "收货数量",
    dataIndex: "receipt_num",
    valueType: "digit",
  },
];

export const InvoiceDetails: FC<{ data: Invoice }> = ({ data }) => {
  return (
    <>
      {data.boxs?.map((box) => (
        <ProTable
          key={box.id}
          pagination={false}
          columns={columns}
          search={false}
          dataSource={box.boxInfoList}
          rowKey="detailId"
          bordered
          headerTitle="发货明细"
          toolBarRender={false}
          footer={() => (
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="装箱单号">{box.no}</Descriptions.Item>
              <Descriptions.Item label="当前状态">{box.note}</Descriptions.Item>
              <Descriptions.Item label="货物数量">
                {box.goods_num}
              </Descriptions.Item>
            </Descriptions>
          )}
        />
      ))}
    </>
  );
};
