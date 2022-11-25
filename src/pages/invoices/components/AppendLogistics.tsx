import {
  DrawerForm,
  ProFormDateTimePicker,
  ProFormList,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, Card, Form, message, Typography } from "antd";
import { request } from "hooks/useRequest";
import { uniq } from "lib/utils";
import { FC } from "react";

export const AppendLogistice: FC<{ data: Invoice }> = ({ data }) => {
  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <DrawerForm<any>
      title="物流信息"
      trigger={<Button type="link">添加物流</Button>}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={5000}
      initialValues={{
        sendOrderNo: `INVOICE-${uniq()}`,
        packingNo: `PACKING-${uniq()}`,
      }}
      onFinish={(values) => {
        console.log(values);
        return new Promise((resolve, reject) => {
          return request("/append-logistics", "POST", {
            p_sendOrderNo: data.pSendOrderNo,
            ...values,
          })
            .then(() => {
              message.success("添加物流信息成功");
              resolve(true);
            })
            .catch((error) => {
              message.error(error.message);
              resolve(false);
            });
        });
      }}
    >
      <Typography.Title level={5}>物流信息</Typography.Title>

      <ProFormList
        itemRender={({ listDom, action }, { record }) => {
          return (
            <Card
              bordered
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
              <div style={{ position: "absolute", right: 16, top: 8 }}>
                {action}
              </div>
            </Card>
          );
        }}
        name={["logisticsInfo"]}
        alwaysShowItemLabel
      >
        {(f, index, action) => {
          return (
            <>
              <ProFormDateTimePicker name="msgTime" label={`时间`} />
              <ProFormTextArea name="content" label={`物流信息`} />
            </>
          );
        }}
      </ProFormList>
    </DrawerForm>
  );
};
