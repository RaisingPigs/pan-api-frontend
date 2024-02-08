<template>
  <div>
    <el-card shadow="never" v-bind="$attrs">
      <template #header>
        <div class="params_header">
          <span>{{ title }}</span>
          <el-button class="button" size="small" text>复制</el-button>
        </div>
      </template>

      <el-input v-model="_val" type="textarea" readonly v-bind="$attrs" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "TextareaCard" });

const props = defineProps<{ title: string; value: string }>();
const _val = props.value;
</script>

<style scoped lang="scss">
.params_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
