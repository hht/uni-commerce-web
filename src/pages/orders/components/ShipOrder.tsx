import {
  DrawerForm,
  ProCard,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message, Typography } from "antd";
import { useStore } from "hooks/useEntityStore";
import { request } from "hooks/useRequest";
import { uniq } from "lib/utils";
import _ from "lodash";
import { FC } from "react";

export const ShipOrder: FC<{ order: Order }> = ({ order }) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { actionRef } = useStore((state) => state);

  return (
    <DrawerForm<any>
      title="装箱发货"
      trigger={<Button type="link">发货</Button>}
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
        return new Promise((resolve, reject) => {
          const { sendOrderNo, packingNo, packingType, content, ...rest } =
            values;
          return request("/ship-order", "POST", {
            sendOrderNo,
            orderNo: order.orderNo,
            packingList: [
              {
                pPackingNo: `PACKING-${uniq()}`,
                packingType,
                content,
              },
            ],
            ...rest,
          })
            .then(() => {
              message.success("发货成功");
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
      <ProFormText name="sendOrderNo" readonly />
      <ProFormSelect
        name="packingType"
        label="包装类型"
        valueEnum={{ "1": "订单商品", "2": "组合商品" }}
        initialValue="1"
        rules={[
          {
            required: true,
            message: "请选择包装类型",
          },
        ]}
      />
      <ProFormList
        name={["content"]}
        initialValue={order?.orderDetails?.map((item, index) => ({
          goods_name: item.goods_name,
          sku: item.sku,
          p_sku: item.p_sku,
          num: item.num,
        }))}
        copyIconProps={false}
        creatorButtonProps={false}
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              bordered
              extra={action}
              title={record.goods_name}
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
        alwaysShowItemLabel
      >
        {(f, index, action) => {
          return (
            <>
              <ProFormGroup>
                <ProFormText name="sku" readonly label={`SKU`} />
                <ProFormText name="p_sku" readonly label={`平台SKU`} />
                <ProFormText
                  name="num"
                  label={`数量`}
                  rules={[
                    {
                      required: true,
                      pattern: /^\d+(\.)?(\d+)?$/,
                      message: "请输入产品数量",
                    },
                  ]}
                />
              </ProFormGroup>
              {order.orderDetails[index].box_type === "2" ? (
                <>
                  <Typography.Title level={5}>产品清单</Typography.Title>
                  <ProFormGroup>
                    <ProFormList name="details">
                      {(f, idx, action) => {
                        return (
                          <>
                            <ProFormGroup>
                              <ProFormSelect
                                name="eSku"
                                label={`商品组件平台SKU`}
                                valueEnum={
                                  order.orderDetails[
                                    index
                                  ].linePackInfo?.reduce((acc, curr) => {
                                    return { ...acc, [curr.eSku]: curr.eSku };
                                  }, {}) ?? {}
                                }
                                rules={[
                                  {
                                    required: true,
                                    message: "请选择商品组件平台SKU",
                                  },
                                ]}
                              />
                              <ProFormText
                                name="num"
                                label={`数量`}
                                rules={[
                                  {
                                    required: true,
                                    pattern: /^\d+(\.)?(\d+)?$/,
                                    message: "请输入商品组件数量",
                                  },
                                ]}
                              />
                            </ProFormGroup>
                          </>
                        );
                      }}
                    </ProFormList>
                  </ProFormGroup>
                </>
              ) : ["0", "4"].includes(
                  order.orderDetails[index].needCheckSn
                ) ? null : (
                <>
                  <Typography.Title level={5}>
                    {order.orderDetails[index].needCheckSn !== "0"
                      ? "产品清单"
                      : ""}
                  </Typography.Title>
                  <ProFormGroup>
                    <ProFormList
                      name="serialNumbers"
                      initialValue={_.times(
                        parseInt(order.orderDetails[index].num)
                      ).map(() => ({}))}
                    >
                      {(f, idx, action) => {
                        return (
                          <>
                            <ProFormGroup>
                              {["1", "3"].includes(
                                order.orderDetails[index].needCheckSn
                              ) ? (
                                <ProFormText
                                  name="sn"
                                  label={`商品序列号`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "请输入商品序列号",
                                    },
                                  ]}
                                />
                              ) : null}
                              {["2", "3"].includes(
                                order.orderDetails[index].needCheckSn
                              ) ? (
                                <ProFormText
                                  name="mac"
                                  label={`商品MAC地址`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "请输入商品MAC地址",
                                    },
                                  ]}
                                />
                              ) : null}
                            </ProFormGroup>
                          </>
                        );
                      }}
                    </ProFormList>
                  </ProFormGroup>
                </>
              )}
            </>
          );
        }}
      </ProFormList>
    </DrawerForm>
  );
};
