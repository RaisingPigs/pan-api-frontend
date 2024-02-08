<template>
  <div class="app-container">
    <el-tabs
      v-model="itfStore.curTabName"
      tab-position="left"
      @tab-change="handleTabChange"
      style="height: 100%"
    >
      <el-tab-pane label="详情" name="ItfDetails">
        <template #label>
          <el-space>
            <el-icon>
              <Document />
            </el-icon>
            <span>详情</span>
          </el-space>
        </template>

        <ItfDetails />
      </el-tab-pane>

      <el-tab-pane label="示例" name="ItfExample">
        <template #label>
          <el-space>
            <el-icon>
              <VideoPlay />
            </el-icon>
            <span>示例</span>
          </el-space>
        </template>

        <ItfExample />
      </el-tab-pane>

      <el-tab-pane label="调用" name="ItfInvoke">
        <template #label>
          <el-space>
            <el-icon>
              <VideoPlay />
            </el-icon>
            <span>调用</span>
          </el-space>
        </template>

        <ItfInvoke />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import ItfDetails from "@/views/itf/info/components/details/index.vue";
import ItfExample from "@/views/itf/info/components/example/index.vue";
import ItfInvoke from "@/views/itf/info/components/invoke/index.vue";
import { useItfStore, useItfStoreHook } from "@/store/modules/itf";
import { useRouter } from "vue-router";

defineOptions({ name: "ItfInfo" });

const itfStore = useItfStore();
const router = useRouter();

useItfStoreHook().getItfDetailsById(itfStore.curItfId);

const handleTabChange = (tabPaneName: string) => {
  router.push({
    name: "ItfInfo",
    query: {
      curItfId: useItfStoreHook().curItfId,
      curTabName: tabPaneName
    }
  });
};
</script>

<style scoped lang="scss"></style>
