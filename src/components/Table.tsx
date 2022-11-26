import {
  ActionType,
  ProColumns,
  ProTable,
  ProTableProps,
} from "@ant-design/pro-components";
import { message } from "antd";
import { request } from "hooks/useRequest";
import React, { ReactNode } from "react";

export function Table<T>({
  service,
  rowKey,
  columns,
  actions,
  toolBarRender,
  width = 1200,
  actionRef,
  ...rest
}: {
  service: string;
  rowKey: string;
  columns: ProColumns[];
  actions?: [ProColumns];
  actionRef?: React.MutableRefObject<ActionType | undefined>;

  width?: number;
  toolBarRender?: () => ReactNode[];
} & ProTableProps<any, any>) {
  return (
    <>
      <ProTable
        columns={columns.concat(actions ?? [])}
        rowKey={rowKey}
        actionRef={actionRef}
        request={async ({ current, pageSize, ...rest }) => {
          return request<Pagination<T>, any>(service, "POST", {
            skip: (current - 1) * pageSize,
            take: pageSize,
            ...rest,
          })
            .then(({ data, total }) => {
              return {
                data,
                total,
                page: current,
                success: true,
              };
            })
            .catch((e) => {
              message.error(e.message);
              return { success: false };
            });
        }}
        search={{
          labelWidth: 80,
          span: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 },
        }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        toolBarRender={toolBarRender}
        scroll={{ x: width }}
        {...rest}
      ></ProTable>
    </>
  );
}
