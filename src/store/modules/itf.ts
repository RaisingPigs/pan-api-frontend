import { defineStore } from "pinia";
import store from "@/store";

export const useItfStore = defineStore("itf", () => {
  
  return {
  };
});

/** 在 setup 外使用 */
export function useItfStoreHook() {
  return useItfStore(store);
}
