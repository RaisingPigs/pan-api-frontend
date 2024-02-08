<template>
  <div>
    <el-card shadow="never" :header="title" v-bind="$attrs">
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        v-bind="$attrs"
      >
        <el-table-column prop="name" label="参数名" />
        <el-table-column prop="dataType" label="类型" />
        <el-table-column v-if="required_row" prop="required" label="是否必填" />
        <el-table-column prop="description" label="描述" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ParamTableCard" });

defineProps<{ title: string, tableData: ItfAPI.ParamVO, required_row: boolean }>();
</script>

<style scoped lang="scss">

</style>
