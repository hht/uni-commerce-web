import { RouteObject } from "react-router-dom";
import { AppLayout } from "pages/AppLayout";
import { Interface } from "pages/interface";
import { Orders } from "pages/orders";
import { Invoices } from "pages/invoices";
import { Logistics } from "pages/logistics.tsx";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "b2b/orders", element: <Orders /> },
      { path: "b2b/invoices", element: <Invoices /> },
      { path: "b2b/logistics", element: <Logistics /> },
      { path: "interface/:id", element: <Interface /> },
    ],
  },
];
