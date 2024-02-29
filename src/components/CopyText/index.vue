<template>
  <div>
    <el-text>
      <el-space>
        <span>{{ dataEncrypted }}</span>

        <el-link :underline="false" @click="show = !show">
          <el-icon>
            <View v-if="show" />
            <Hide v-else />
          </el-icon>
        </el-link>

        <el-link :underline="false" @click="handleCopy(data)">
          <el-icon>
            <CopyDocument />
          </el-icon>
        </el-link>
      </el-space>
    </el-text>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { handleCopy } from "@/utils/copy";

defineOptions({ name: "CopyText" });

const props = defineProps<{ data: string }>();

const show = ref<boolean>(false);

const dataEncrypted = computed(() => {
  console.log(show);

  if (show.value) {
    return props.data;
  }

  return encryptStr(props.data.length);
});

const encryptStr = (len: number) => {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += "*";
  }

  return str;
};

</script>

<style scoped lang="scss">

</style>
