import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Row } from "antd";
import { useUserInterfaceStore } from "hooks/useUserInterface";
import { FC } from "react";

const { Item } = Breadcrumb;
export const ContentTitle: FC = () => {
  const { collapsed, breadcrumb } = useUserInterfaceStore((state) => state);
  return (
    <Row style={{ alignItems: "center", paddingBottom: 12 }}>
      <Button
        type="link"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => {
          useUserInterfaceStore.setState({ collapsed: !collapsed });
        }}
      ></Button>
      <Breadcrumb>
        <Item>首页</Item>
        {breadcrumb.map((it) => (
          <Item key={it}>{it}</Item>
        ))}
      </Breadcrumb>
    </Row>
  );
};
