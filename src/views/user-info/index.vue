<template>
  <div class="app-container">
    <el-card
      v-loading="loading"
      shadow="never"
      header="个人信息"
    >
      <el-descriptions
        :column="1"
        border
        class="desc"
      >
        <el-descriptions-item label="昵称">
          {{ user.name }}
        </el-descriptions-item>
        <el-descriptions-item label="账号">
          {{ user.username }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ user.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="accessKey">
          <CopyText :data="user.accessKey" />
        </el-descriptions-item>
        <el-descriptions-item label="secretKey">
          <CopyText :data="user.secretKey" />
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqGetUserWithAkSk } from "@/api/user";
import CopyText from "@/components/CopyText/index.vue";

let loading = ref<boolean>(false);

onMounted(() => {
  handleGetUserWithAkSk();
});

const user = ref<UserAPI.UserAkSkVO>({
  id: "",
  name: "",
  username: "",
  avatar: "",
  gender: "",
  role: "",
  accessKey: "",
  secretKey: "",
  createTime: "",
  updateTime: ""
});

const handleGetUserWithAkSk = async () => {
  try {
    loading.value = true;
    const { data } = await reqGetUserWithAkSk();
    user.value = data;
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped lang="scss">

.app-container {
  height: 100%;

  :deep(.el-card) {
    height: 100%;
  }
}

.desc {
  width: 50%;
  margin: auto;
}
</style>
