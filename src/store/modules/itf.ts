import { defineStore } from "pinia";
import store from "@/store";
import { reqGetItfDetailsById } from "@/api/itf";
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";

export const useItfStore = defineStore("itf", () => {
  const route = useRoute();

  const curItfId = ref(route.query.curItfId as string);
  const curTabName = ref(route.query.curTabName as string);
  const itfDetails: Ref<ItfAPI.ItfDetailsVO> = ref<ItfAPI.ItfDetailsVO>({});

  const getItfDetailsById = async (id: string) => {
    const { data } = await reqGetItfDetailsById(id);
    itfDetails.value = data;
  };

  const setIdAndTab = (_itfId: string, _tabName: string) => {
    curItfId.value = _itfId;
    curTabName.value = _tabName;
  };

  return {
    itfDetails,
    curItfId,
    curTabName,
    getItfDetailsById,
    setIdAndTab
  };
});

/** 在 setup 外使用 */
export function useItfStoreHook() {
  return useItfStore(store);
}
