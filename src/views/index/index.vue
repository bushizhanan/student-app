<template>
  <div class="index-wrap">
    <!-- 主卡片容器 -->
    <div class="main-card">
      <h2 class="title">系统首页</h2>
      <div class="nav-box">
        <RouterLink to="/index/home" class="nav-item">首页</RouterLink>
        <div class="nav-item">
            <RouterLink to="/index/gongneng" class="nav-item">功能</RouterLink>
        </div>
      </div>
      <div class="router-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<style scoped lang="less">
.index-wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #4b2899, #7b2cb8);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.main-card {
  width: 420px;
  min-height: 520px;
  background-color: #f8f5ff;
  border-radius: 20px;
  padding: 32px 28px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  color: #4b2899;
  margin-top: 0;
  margin-bottom: 24px;
  font-weight: 600;
}

.nav-box {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #c8b8e8;
  padding-bottom: 12px;
}

.nav-item {
  font-size: 17px;
  color: #4b2899;
  cursor: pointer;
  text-decoration: none;
  padding: 6px 10px;
  &:hover {
    color: #7b2cb8;
  }
}

.router-container {
  min-height: 320px;
}
</style>