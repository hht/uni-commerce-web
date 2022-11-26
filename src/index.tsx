import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routes } from "routes";
import zhCN from "antd/lib/locale/zh_CN";
import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import "styles/app.scss";

import { ConfigProvider, theme } from "antd";

dayjs.locale("zh-cn");

export const App = () => {
  const Routes = useRoutes(routes);
  return Routes;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HashRouter>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#e60000",
          colorLink: "#FF5722",
          colorLinkHover: "#e60000",
          borderRadius: 2,
        },
        algorithm: [theme.defaultAlgorithm],
      }}
    >
      <App />
    </ConfigProvider>
  </HashRouter>
);
