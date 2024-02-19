<template>
  <div>
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <ItfDescCard :itf-vo="itfVO" :user-itf-vo="userItfVO" />

      <template v-for="(textareaData, index) in textareaDataList" :key="index">
        <TextareaCard
          v-if="textareaData.content"
          :title="textareaData.title"
          :content="textareaData.content"
          :autosize="{ minRows: 1, maxRows: 20 }"
        />
      </template>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { useItfStore } from "@/store/modules/itf";
import ItfDescCard from "@/components/ItfDescCard/index.vue";
import TextareaCard from "@/components/TextareaCard/index.vue";
import { TextareaData } from "@/components/TextareaCard/type";
import { computed } from "vue";
import { storeToRefs } from "pinia";

defineOptions({ name: "ItfExample" });

const itfStore = useItfStore();
const { itfVO, userItfVO } = storeToRefs(itfStore);

const textareaDataList = computed((): TextareaData[] => {
  return [
    {
      title: "query参数示例",
      content: itfVO.value.queryParamExample
    },
    {
      title: "body参数示例",
      content: itfVO.value.bodyParamExample
    },
    {
      title: "响应结果示例",
      content: itfVO.value.respExample
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
