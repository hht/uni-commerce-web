import { useReactive } from "ahooks";
import { Layout, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { FC, useCallback, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUserInterfaceStore } from "hooks/useUserInterface";
import { TeamOutlined } from "@ant-design/icons";
import { last } from "lodash";

const items: ItemType[] = [
  {
    label: "订单管理",
    key: "orders",
    icon: <TeamOutlined />,
    children: [{ label: "订单列表", key: "/orders" }],
  },
  {
    label: "接口调试",
    key: "interface",
    icon: <TeamOutlined />,
    children: [
      { label: "订单", key: "/interface/1" },
      { label: "发货单", key: "/interface/2" },
      { label: "退货", key: "/interface/3" },
      { label: "结算", key: "/interface/4" },
      { label: "地址", key: "/interface/5" },
      { label: "妥投驳回", key: "/interface/6" },
    ],
  },
];

const { Sider } = Layout;

export const SideBar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const collapsed = useUserInterfaceStore((state) => state.collapsed);
  const config = useReactive<{
    defaultSelectedKeys: string[];
    initialized: boolean;
    openKeys: string[];
  }>({
    defaultSelectedKeys: [],
    openKeys: [],
    initialized: false,
  });
  useEffect(() => {
    const paths = location.pathname.split("/").filter((it) => it);
    config.openKeys = [paths[0]];
    config.defaultSelectedKeys = [location.pathname];
    config.initialized = true;
  }, [location.pathname, config]);
  const onOpenChange = useCallback(
    (openKeys: string[]) => {
      const lastOpened = last(openKeys);
      config.openKeys = lastOpened ? [lastOpened] : [];
    },
    [config]
  );
  if (location.pathname === "/") {
    return <Navigate to="/orders" />;
  }
  return config.initialized ? (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Layout className="flex">
        <Menu
          mode="inline"
          items={items}
          defaultSelectedKeys={config.defaultSelectedKeys}
          onOpenChange={onOpenChange}
          openKeys={config.openKeys}
          onClick={({ key }) => navigate(key)}
          style={{ flex: 1 }}
        ></Menu>
      </Layout>
    </Sider>
  ) : null;
};
