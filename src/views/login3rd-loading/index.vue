<template>
  <div class="login-loading-text">
    正在登录中...
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStoreHook } from "@/store/modules/user";

defineOptions({ "name": "Login3rdLoading" });
const route = useRoute();
const router = useRouter();

const getLogin3rdReq = (): LoginAPI.Login3rdReq => {
  return {
    code: route.query.code as string,
    state: route.query.state as string
  };
};

const handleLoginByGitee = async () => {
  const data = await getLogin3rdReq();
  await useUserStoreHook().loginByGitee(data);
  await router.replace({ path: "/" });
};

onMounted(() => {
  handleLoginByGitee();
});
</script>

<style scoped lang="scss">
.login-loading-text {
  text-align: center;
  font-size: 25px;
  margin-top: 5vw;
}
</style>
