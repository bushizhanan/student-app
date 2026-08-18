<script setup lang="ts">
import { useAlertsStore } from "@/stores/user"
const alertsStore = useAlertsStore()
// 项目初始化读取 localStorage，恢复登录状态
alertsStore.loadUser()
</script>

<template>
  <router-view/>
</template>