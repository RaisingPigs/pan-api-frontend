<template>
  <div>
    <el-card shadow="never" v-bind="$attrs">
      <template #header>
        <div class="params_header">
          <span>{{ title }}</span>
          <el-button @click="handleCopy(content)" class="button" size="small" text
          >复制
          </el-button>
        </div>
      </template>

      <el-input
        :model-value="content"
        type="textarea"
        readonly
        v-bind="$attrs"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { handleCopy } from "@/utils/copy";

defineOptions({ name: "TextareaCard" });

defineProps<{ title: string; content: string }>();
</script>

<style scoped lang="scss">
.params_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
