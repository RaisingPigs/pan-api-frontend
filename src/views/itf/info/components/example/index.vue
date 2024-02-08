<template>
  <div>
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <ItfDescCard :itf-details="itfDetails" />

      <template v-for="(textareaData, index) in textareaDataList" :key="index">
        <TextareaCard
          v-if="textareaData.value"
          :title="textareaData.title"
          :value="textareaData.value"
          :autosize="{ minRows: 1, maxRows: 20 }"
        />
      </template>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useItfStore } from "@/store/modules/itf";
import { storeToRefs } from "pinia";
import ItfDescCard from "@/components/ItfDescCard/index.vue";
import TextareaCard from "@/components/TextareaCard/index.vue";
import { TextareaData } from "@/components/TextareaCard/type";

defineOptions({ name: "ItfExample" });

const itfStore = useItfStore();
const { itfDetails } = storeToRefs(itfStore);

const textareaDataList = computed((): TextareaData[] => {
  return [
    {
      title: "query参数示例",
      value: itfDetails.value.queryParamExample as string
    },
    {
      title: "body参数示例",
      value: itfDetails.value.bodyParamExample as string
    },
    {
      title: "响应结果示例",
      value: itfDetails.value.respExample as string
    }
  ];
});
</script>

<style scoped lang="scss">
.params_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
