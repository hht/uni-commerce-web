import { ActionType, ProFormInstance } from "@ant-design/pro-components";
import { useEffect, useRef } from "react";
import { useUserInterfaceStore } from "./useUserInterface";
import create from "zustand";

export const useStore = create<
  EntityStore<any> & {
    actionRef?: React.MutableRefObject<ActionType | undefined>;
    formRef?: React.MutableRefObject<ProFormInstance<any> | undefined>;
  }
>((set) => ({
  onDismiss: () => {
    set({ currentRow: undefined });
  },
}));

export const useEntityStore = (breadcrumb: string[]) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    document.title = breadcrumb.length
      ? `${breadcrumb[1]}.::.:联通B2B接口对接`
      : "联通B2B接口对接";
    useUserInterfaceStore.setState({ breadcrumb });
  }, [breadcrumb]);
  return { actionRef, formRef };
};
