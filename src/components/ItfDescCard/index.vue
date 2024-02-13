<template>
  <div>
    <el-card shadow="never" header="请求路径">
      <el-descriptions :column="1">
        <el-descriptions-item label="接口名">
          {{ itfVo.name }}
        </el-descriptions-item>

        <el-descriptions-item label="接口描述">
          {{ itfVo.description }}
        </el-descriptions-item>

        <el-descriptions-item label="路径">
          {{ itfVo.url }}
        </el-descriptions-item>

        <el-descriptions-item label="请求方式">
          <el-tag>{{ itfVo.method }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="返回格式"> json</el-descriptions-item>
        <el-descriptions-item label="接口状态">
          {{ itfVo.status }}
        </el-descriptions-item>
      </el-descriptions>

      <LeftCountIncrement/>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import LeftCountIncrement from "@/views/itf/info/components/left-count-increment/index.vue";

defineOptions({ name: "ItfDescCard" });

defineProps<{ itfVo: ItfAPI.ItfVO, userItfVo: UserItfAPI.UserItfVO }>();
</script>

<style scoped lang="scss"></style>
