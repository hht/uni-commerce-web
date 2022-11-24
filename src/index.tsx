import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routes } from "routes";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import "styles/app.scss";

import { ConfigProvider, theme } from "antd";

moment.locale("zh-cn");

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
          colorPrimary: "#6B1B9A",
          borderRadius: 2,
        },
        algorithm: [theme.compactAlgorithm],
      }}
    >
      <App />
    </ConfigProvider>
  </HashRouter>
);
