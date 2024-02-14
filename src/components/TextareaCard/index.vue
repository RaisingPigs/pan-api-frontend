<template>
  <div>
    <el-card shadow="never" v-bind="$attrs">
      <template #header>
        <div class="params_header">
          <span>{{ title }}</span>
          <el-button @click="handleCopy" class="button" size="small" text
            >复制</el-button
          >
        </div>
      </template>

      <el-input v-model="_val" type="textarea" readonly v-bind="$attrs" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";

defineOptions({ name: "TextareaCard" });

const props = defineProps<{ title: string; value: string }>();
const _val = props.value;

const { toClipboard } = useClipboard();
const handleCopy = async () => {
  const res = await toClipboard(_val);
  if (res) {
    ElMessage.success("复制成功");
  } else {
    ElMessage.error("复制失败");
  }
};
</script>

<style scoped lang="scss">
.params_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
