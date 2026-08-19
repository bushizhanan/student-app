<template>
  <div class="index-wrap">
    <!-- 主卡片容器 -->
    <div class="main-card">
      <div class="content-wrapper">
        <!-- 左侧侧边导航 -->
        <div class="nav-box">
          <RouterLink to="/index/home" class="nav-item">首页</RouterLink>
          <RouterLink to="/index/student" class="nav-item">学生管理</RouterLink>
          <RouterLink to="/index/class" class="nav-item">班级管理</RouterLink>
          <RouterLink to="/index/score" class="nav-item">成绩管理</RouterLink>
          <RouterLink to="/index/user" class="nav-item">用户设置</RouterLink>
        </div>
        <!-- 右侧路由展示区 -->
        <div class="router-container">
          <router-view />
        </div>
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
  width: 90%;
  min-height: calc(100vh - 80px);
  background-color: #f8f5ff;
  border-radius: 20px;
  padding: 40px 36px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  color: #4b2899;
  margin-top: 0;
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 22px;
}

// 外层flex：左边导航，右边内容
.content-wrapper {
  display: flex;
  gap: 30px;
}

// 左侧侧边导航栏
.nav-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 120px;
  border-right: 1px solid #c8b8e8;
  padding-right: 24px;
}

.nav-item {
  font-size: 17px;
  color: #4b2899;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 12px;
  &:hover {
    color: #7b2cb8;
  }
  // router-link激活自带class router-link-active，加选中样式
  &.router-link-active {
    background-color: #e8dfff;
    border-radius: 6px;
  }
}

// 右侧内容区域
.router-container {
  flex: 1;
  min-height: 450px;
}
</style>