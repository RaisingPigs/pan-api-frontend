<template>
  <div>
    <el-card shadow="never" header="模拟调用">
      <el-space direction="vertical" fill style="width: 100%" :size="25">
        <div class="invoke_area">
          <el-input size="large" v-model="url" placeholder="请输入请求路径" readonly>
            <template #prepend>GET</template>
          </el-input>
          <el-button size="large" class="invoke_btn" type="primary">发送请求</el-button>
        </div>

        <div class="param_area">
          <el-text tag="b" size="small" type="info">请求参数</el-text>

          <el-tabs
            v-model="activeName"
            tab-position="top"
            type="border-card"
          >
            <el-tab-pane label="query" name="query">
              <el-input
                v-model="queryParam"
                :rows="11"
                type="textarea"
                placeholder="请输入query参数, json格式"
              />
            </el-tab-pane>

            <el-tab-pane label="body" name="body">
              <el-input
                v-model="bodyParam"
                :rows="11"
                type="textarea"
                placeholder="请输入body参数, json格式"
              />
            </el-tab-pane>
          </el-tabs>
        </div>

        <div>
          <el-text tag="b" size="small" type="info">响应结果</el-text>

          <el-input
            v-model="queryParam"
            :rows="11"
            type="textarea"
            placeholder="这里展示响应结果"
            readonly
          />
        </div>

      </el-space>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ name: "ItfInvoke" });
defineProps<{ id: string }>();

const url = ref<string>("http://localhost:8888/api/itf/name/post/json5");

const activeName = ref<string>("query");

const queryParam = ref<string>("");
const bodyParam = ref<string>("");

</script>

<style scoped lang="scss">
.invoke_area {
  display: flex;
  align-items: center;

  .invoke_btn {
    margin-left: 15px;
  }
}


.param_area {
  & :deep(.el-tabs__content) {
    padding: 0;

  }

  & :deep(.el-tabs__header) {
    border: none;
  }
}

</style>
