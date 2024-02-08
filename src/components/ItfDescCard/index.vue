<template>
  <div>
    <el-card shadow="never" header="请求路径">
      <el-descriptions :column="1">
        <el-descriptions-item label="接口名">
          {{ itfDetails.name }}
        </el-descriptions-item>

        <el-descriptions-item label="接口描述">
          {{ itfDetails.description }}
        </el-descriptions-item>

        <el-descriptions-item label="路径">
          {{ itfDetails.url }}
        </el-descriptions-item>

        <el-descriptions-item label="请求方式">
          <el-tag>{{ itfDetails.method }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="返回格式">
          json
        </el-descriptions-item>
        <el-descriptions-item label="接口状态">
          {{ itfDetails.status }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ItfDescCard" });

defineProps<{ itfDetails: ItfAPI.ItfDetailsVO }>();
</script>

<style scoped lang="scss">

</style>
