import create from "zustand";
interface UserInterfaceStore {
  collapsed: boolean;
  breadcrumb: string[];
}

export const useUserInterfaceStore = create<UserInterfaceStore, any>((set) => ({
  collapsed: false,
  breadcrumb: [],
}));
