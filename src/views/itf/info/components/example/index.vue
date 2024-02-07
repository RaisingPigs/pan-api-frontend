<template>
  <div>
    <el-space :size="20" direction="vertical" fill style="width: 100%">
      <el-card shadow="never" header="请求路径">
        <el-descriptions :column="1">
          <el-descriptions-item label="接口名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="请求方式">
            <el-tag>get</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="路径与query参数">
            http://localhost:8888/api/itf/name/post/json5
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="params_header">
            <span>body参数示例</span>
            <el-button class="button" size="small" text>复制</el-button>
          </div>
        </template>

        <el-input
          v-model="textarea"
          :autosize="{ minRows: 1, maxRows: 10 }"
          type="textarea"
          readonly
        />
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="params_header">
            <span>响应结果示例</span>
            <el-button class="button" size="small" text>复制</el-button>
          </div>
        </template>

        <el-input
          v-model="textarea"
          :autosize="{ minRows: 1, maxRows: 10 }"
          type="textarea"
          readonly
        />
      </el-card>

    </el-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "ItfExample" });

defineProps<{ id: string }>();

const textarea = ref<string>("{\n" +
  "  \"id\": 1,\n" +
  "  \"urlParams\": {\"name\": \"张三\"},\n" +
  "  \"jsonBody\": \"\"\n" +
  "}");

interface User {
  id: number;
  date: string;
  name: string;
  address: string;
  hasChildren?: boolean;
  children?: User[];
}
</script>

<style scoped lang="scss">
.params_header {
  display: flex;
  justify-content: space-between;
  align-items: center
}
</style>
