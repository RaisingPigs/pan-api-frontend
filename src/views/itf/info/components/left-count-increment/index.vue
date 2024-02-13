<template>
  <div>
    <div>
      <el-space direction="horizontal" :size="25">
        <el-text type="info">已调用次数: {{ userItfVO.invokeCount }}</el-text>
        <el-text type="info">剩余调用次数: {{ userItfVO.leftCount }}</el-text>
        <el-button @click="dialogVisible = true" type="info" size="small" plain>增加次数</el-button>
      </el-space>
    </div>

    <div>
      <el-dialog
        v-model="dialogVisible"
        title="增加可调用次数"
        width="40%"
      >
        <p>已调用次数: {{ userItfVO.invokeCount }}</p>
        <p>已调用次数: {{ userItfVO.leftCount }}</p>
        <div>
          <span>请输入需要增加的次数: </span>
          <el-input-number v-model="count" :min="1" :max="10000" />
        </div>

        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleIncrementLeftCount"
            :loading="loading"
          >
            确认
          </el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqLeftCountIncrement } from "@/api/useritf";
import { useItfStoreHook } from "@/store/modules/itf";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";


defineOptions({ name: "LeftCountIncrement" });

const { userItfVO } = storeToRefs(useItfStoreHook());

const loading = ref<boolean>(false);
const dialogVisible = ref<boolean>(false);
const count = ref<number>(10);

const handleIncrementLeftCount = async () => {
  loading.value = true;
  try {
    await reqLeftCountIncrement({
      itfId: useItfStoreHook().userItfVO.itfId,
      userId: useItfStoreHook().userItfVO.userId,
      count: count.value
    });
    await useItfStoreHook().getUserItf();
    dialogVisible.value = false;
    ElMessage.success(`增加调用次数成功, 当前可调用次数: ${userItfVO.value.leftCount}`);
  } catch (e) {
    ElMessage.error("增加调用次数失败");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">

</style>
