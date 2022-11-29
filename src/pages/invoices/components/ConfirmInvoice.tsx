import {
  DrawerForm,
  ProCard,
  ProFormDateTimePicker,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Button, Form, message, Typography } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useStore } from "hooks/useEntityStore";
import { baseUrl, request } from "hooks/useRequest";
import { uniq } from "lib/utils";
import { FC } from "react";

const mobileRegx =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

const onChange = ({
  file,
  fileList,
}: UploadChangeParam<
  UploadFile<{
    success: boolean;
    data: { url: string; key: string };
    message: string;
  }>
>) => {
  if (file.response?.success === false) {
    const item = (fileList as UploadFile[])[
      (fileList as UploadFile[]).findIndex((it) => it.uid === file.uid)
    ];
    if (item) {
      item.status = "error";
    }
  }
};

export const ConfirmInvoice: FC<{ data: Invoice }> = ({ data }) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { actionRef } = useStore((state) => state);

  return (
    <DrawerForm<any>
      title="妥投"
      trigger={<Button type="link">妥投</Button>}
      form={form}
      width={600}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={5000}
      initialValues={{
        deliveredId: `DELIVERED-${uniq()}`,
        orderNo: data.orderNo,
        p_sendOrderNo: data.pSendOrderNo,
        attachment: [],
      }}
      onFinish={(values) => {
        return new Promise((resolve, reject) => {
          const { attachment, ...rest } = values;
          return request("/confirm-invoice", "POST", {
            ...rest,
            attachment: (
              attachment as UploadFile<{
                data: { url: string; key: string };
              }>[]
            )?.map((it) => it.response?.data),
          })
            .then(() => {
              message.success("妥投成功");
              actionRef?.current?.reload();
              resolve(true);
            })
            .catch((error) => {
              message.error(error.message);
              resolve(false);
            });
        });
      }}
    >
      <ProFormText name="deliveredId" readonly />
      <ProFormGroup>
        <ProFormText name="orderNo" readonly label="订单号" />
        <ProFormText name="p_sendOrderNo" readonly label="平台发货单号" />
      </ProFormGroup>
      <ProFormText name="deliveredName" label="妥投人姓名" required />
      <ProFormText
        name="deliveredMobile"
        label="妥投人电话号码"
        rules={[
          {
            required: true,
            pattern: mobileRegx,
            message: "请输入正确的电话号码",
          },
        ]}
      />
      <ProFormDateTimePicker
        name="deliveredTime"
        label="妥投时间"
        required
      ></ProFormDateTimePicker>
      <ProFormTextArea name="remark" label="备注"></ProFormTextArea>
      <ProFormText name="signer" label="签收人姓名" required />
      <ProFormText
        name="signMobile"
        label="签收人电话号码"
        required
        rules={[
          {
            required: true,
            pattern: mobileRegx,
            message: "请输入正确的电话号码",
          },
        ]}
      />
      <Typography.Title level={5}>上传附件</Typography.Title>
      <ProCard bordered>
        <ProFormUploadButton
          onChange={onChange}
          name="attachment"
          title="选择文件"
          action={`${baseUrl}/upload`}
        ></ProFormUploadButton>
      </ProCard>
    </DrawerForm>
  );
};
