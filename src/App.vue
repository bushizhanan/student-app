<script setup lang="ts">
import { useUserStore } from "@/stores/user"
const userStore = useUserStore()
// 项目初始化读取 localStorage，恢复登录状态
userStore.loadUser()
</script>

<template>
  <router-view/>
</template>