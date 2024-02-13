<template>
  <div>
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <ItfDescCard :itf-vo="itfVO" :user-itf-vo="userItfVO" />

      <template v-for="paramData in paramDataList" :key="paramData.title">
        <ParamTableCard
          v-if="paramData.tableData"
          :title="paramData.title"
          :table-data="paramData.tableData"
          :required_row="paramData.required_row"
        />
      </template>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { useItfStore } from "@/store/modules/itf";
import { storeToRefs } from "pinia";
import ParamTableCard from "@/components/ParamTableCard/index.vue";
import { computed } from "vue";
import ItfDescCard from "@/components/ItfDescCard/index.vue";
import { ParamData } from "@/components/ParamTableCard/type";

defineOptions({ name: "ItfDetails" });

const itfStore = useItfStore();
const { itfVO, userItfVO, queryParam, bodyParam, commonResp, respData } = storeToRefs(itfStore);

const paramDataList = computed((): ParamData[] => {
  return [
    {
      title: "query参数",
      tableData: queryParam.value as ItfAPI.ParamVO,
      required_row: true
    },
    {
      title: "body参数",
      tableData: bodyParam.value as ItfAPI.ParamVO,
      required_row: true
    },
    {
      title: "通用响应结果",
      tableData: commonResp.value as ItfAPI.ParamVO,
      required_row: false
    },
    {
      title: "响应结果data",
      tableData: respData.value as ItfAPI.ParamVO,
      required_row: false
    }
  ];
});
</script>

<style scoped lang="scss">
.req_params_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
