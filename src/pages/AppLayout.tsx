import { Avatar, Layout } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "components/SideBar";
import { ContentTitle } from "components/ContentTitle";

const { Header, Content } = Layout;
export const AppLayout: FC = () => {
  return (
    <Layout>
      <Header className="flex flex-row linear-gradient">
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              paddingLeft: 12,
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              textShadow:
                "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)",
            }}
          >
            联通商城B2B对接测试
          </div>
        </div>
      </Header>
      <Layout style={{ flex: 1, overflow: "hidden" }}>
        <SideBar />
        <Content className="p-4" style={{ flex: 1, overflowY: "scroll" }}>
          <ContentTitle />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
