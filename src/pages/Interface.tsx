import { Alert, Button, Layout, Result } from "antd";
import { useEntityStore } from "hooks/useEntityStore";
import { request, useRequest } from "hooks/useRequest";
import _ from "lodash";
import { useEffect } from "react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

const Category: { [key: string]: string } = {
  "1": "订单",
  "2": "发货单",
  "3": "退货",
  "4": "结算",
  "5": "地址",
  "6": "妥投驳回",
};

export const Interface: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [response, setResponse] = useState<any>();
  const { loading, run, data } = useRequest(
    (id) => request("/interface", "POST", { id }),
    {
      manual: true,
      onSuccess: setResponse,
    }
  );
  useEffect(() => {
    setResponse(undefined);
  }, [id]);
  useEntityStore(["消息推送", Category[id ?? ""]]);

  if (!id || !_.keys(Category).includes(id)) {
    return (
      <Result
        status="error"
        title="参数错误"
        subTitle="您输入的地址有误，请检查后重试"
      />
    );
  }
  return (
    <>
      <Button loading={loading} type="primary" onClick={() => run(id)}>
        {Category[id]}
      </Button>
      {response ? (
        <Layout.Content
          style={{ margin: "16px 0", padding: 16, backgroundColor: "white" }}
        >
          {JSON.stringify(response)}
        </Layout.Content>
      ) : null}
    </>
  );
};
