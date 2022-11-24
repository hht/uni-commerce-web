import { RouteObject } from "react-router-dom";
import { AppLayout } from "pages/AppLayout";
import { Interface } from "pages/Interface";
import { Orders } from "pages/Orders";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "orders", element: <Orders /> },
      { path: "interface/:id", element: <Interface /> },
    ],
  },
];
