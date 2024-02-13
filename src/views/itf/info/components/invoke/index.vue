<template>
  <div>
    <el-card shadow="never" header="模拟调用">
      <LeftCountIncrement/>
      <el-space direction="vertical" fill style="width: 100%" :size="25">
        <div class="invoke_area">
          <el-input
            size="large"
            v-model="itfVO.url"
            placeholder="请输入请求路径"
            readonly
          >
            <template #prepend>GET</template>
          </el-input>
          <el-button
            @click="handleItfInvoke"
            size="large"
            class="invoke_btn"
            type="primary"
            :loading="loading"
          >
            发送请求
          </el-button>
        </div>

        <div class="param_area">
          <el-text tag="b" size="small" type="info">请求参数</el-text>

          <el-tabs v-model="activeName" tab-position="top" type="border-card">
            <el-tab-pane label="query" name="query">
              <el-input
                v-model="itfVO.queryParamExample"
                :rows="11"
                type="textarea"
                placeholder="请输入query参数, json格式"
              />
            </el-tab-pane>

            <el-tab-pane label="body" name="body">
              <el-input
                v-model="itfVO.bodyParamExample"
                :rows="11"
                type="textarea"
                placeholder="请输入body参数, json格式"
              />
            </el-tab-pane>
          </el-tabs>
        </div>

        <div>
          <el-text tag="b" size="small" type="info">响应结果</el-text>

          <div class="resp_area">
            <el-scrollbar>
              <vue-json-pretty
                :data="respData"
                showDoubleQuotes
                showLineNumber
                showLine
              />
            </el-scrollbar>
          </div>
        </div>
      </el-space>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqInvokeItf } from "@/api/itf";
import { useItfStoreHook } from "@/store/modules/itf";

import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import LeftCountIncrement from "@/views/itf/info/components/left-count-increment/index.vue";

defineOptions({ name: "ItfInvoke" });

const { itfVO } = storeToRefs(useItfStoreHook());
const activeName = ref<string>("query");
const respData = ref<object>();
const loading = ref<boolean>(false);

const handleItfInvoke = async () => {
  let queryParam = undefined;
  let bodyParam = undefined;

  try {
    if (itfVO.value.queryParamExample) {
      queryParam = JSON.parse(itfVO.value.queryParamExample);
    }
    if (itfVO.value.bodyParamExample) {
      bodyParam = JSON.parse(itfVO.value.bodyParamExample);
    }
  } catch (e) {
    ElMessage.error("参数格式异常");
    return;
  }

  loading.value = true;
  try {
    respData.value = await reqInvokeItf({
      id: useItfStoreHook().curItfId,
      queryParam: queryParam,
      bodyParam: bodyParam
    });
    await useItfStoreHook().getUserItf();
  } catch (e) {
  } finally {
    loading.value = false;
  }
};
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

.resp_area {
  height: 260px;
  border: 2px solid #dcdfe6;
  border-radius: 4px;
}
</style>
