<template>
  <div>
    <el-card shadow="never" class="box-card">
      <el-statistic :value="value">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            {{title}}
            <el-icon style="margin-left: 4px" :size="12">
              <component :is="titleIcon" />
            </el-icon>
          </div>
        </template>
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <component :is="contentIcon" />
          </el-icon>
        </template>
      </el-statistic>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "StatisticCard" });

defineProps<{ title: string, titleIcon: string, value: number, contentIcon: string }>();

</script>

<style scoped lang="scss">
.box-card {
  padding: 20px;
  text-align: center;
}
</style>
