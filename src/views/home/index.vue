<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import AdminHome from "./components/AdminHome.vue";
import UserHome from "./components/UserHome.vue";

defineOptions({ name: "Home" });

const userStore = useUserStore();
const isAdmin = userStore.roles.includes("admin");
</script>

<template>
  <component :is="isAdmin ? AdminHome : UserHome" />
</template>
