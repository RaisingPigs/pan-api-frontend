import { defineStore } from "pinia";
import store from "@/store";
import { reqGetItfDetailsById } from "@/api/itf";
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { reqGetUserItfByItfId } from "@/api/useritf";

export const useItfStore = defineStore("itf", () => {
  const route = useRoute();

  const curItfId = ref(route.query.curItfId as string);
  const curTabName = ref(route.query.curTabName as string);
  const itfVO: Ref<ItfAPI.ItfVO> = ref<ItfAPI.ItfVO>({
    id: "",
    name: "",
    path: "",
    url: "",
    method: 0,
    description: "",
    queryParamExample: "",
    bodyParamExample: "",
    respExample: "",
    reqHeader: "",
    respHeader: "",
    status: 0,
    createTime: "",
    updateTime: ""
  });
  const userItfVO: Ref<UserItfAPI.UserItfVO> = ref<UserItfAPI.UserItfVO>({
    id: "",
    userId: "",
    itfId: "",
    invokeCount: 0,
    leftCount: 0,
    status: 0
  });
  const queryParam: Ref<ItfAPI.ParamVO[]> = ref<ItfAPI.ParamVO[]>([]);
  const bodyParam: Ref<ItfAPI.ParamVO[]> = ref<ItfAPI.ParamVO[]>([]);
  const commonResp: Ref<ItfAPI.ParamVO[]> = ref<ItfAPI.ParamVO[]>([]);
  const respData: Ref<ItfAPI.ParamVO[]> = ref<ItfAPI.ParamVO[]>([]);

  const getItfDetailsById = async (id: string = curItfId.value) => {
    const { data } = await reqGetItfDetailsById(id);

    itfVO.value = data.itfVO;
    userItfVO.value = data.userItfVO;
    queryParam.value = data.queryParam;
    bodyParam.value = data.bodyParam;
    commonResp.value = data.commonResp;
    respData.value = data.respData;
  };

  const getUserItf = async () => {
    const { data } = await reqGetUserItfByItfId(curItfId.value);
    userItfVO.value = data;
  };

  const setIdAndTab = (_itfId: string, _tabName: string) => {
    curItfId.value = _itfId;
    curTabName.value = _tabName;
  };

  return {
    curItfId,
    curTabName,
    itfVO,
    userItfVO,
    queryParam,
    bodyParam,
    commonResp,
    respData,
    getItfDetailsById,
    setIdAndTab,
    getUserItf
  };
});

/** 在 setup 外使用 */
export function useItfStoreHook() {
  return useItfStore(store);
}
