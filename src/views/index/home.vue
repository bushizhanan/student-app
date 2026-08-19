<template>
  <div class="home">
    <div class="welcome-block">
      <h2>学生管理系统</h2>
      <p>欢迎进入系统，可对学生、班级、成绩信息进行管理维护</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-row">
      <div class="stat-card">
        <div class="stat-number">242</div>
        <div class="stat-text">学生总人数</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">14</div>
        <div class="stat-text">班级总数</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">36</div>
        <div class="stat-text">待处理事项</div>
      </div>
    </div>

    <!-- 快捷操作区域 -->
    <div class="quick-area">
      <h4>快捷操作</h4>
      <div class="btn-wrap">
        <button class="operate-btn">新增学生</button>
        <button class="operate-btn">批量导入</button>
        <button class="operate-btn">导出报表</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.home {
  height: 100%;
}
.welcome-block {
  margin-bottom: 28px;
  h2 {
    margin: 0 0 8px;
    color: #4b2899;
  }
  p {
    margin: 0;
    color: #666;
  }
}

.stat-row {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;

  .stat-card {
    flex: 1;
    background: #ffffff;
    padding: 22px 12px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 1px 6px rgba(0,0,0,0.08);

    .stat-number {
      font-size: 30px;
      font-weight: bold;
      color: #4b2899;
      margin-bottom: 6px;
    }
    .stat-text {
      font-size:14px;
      color:#777;
    }
  }
}

.quick-area {
  h4 {
    margin: 0 0 14px;
    color:#333;
  }
  .btn-wrap {
    display:flex;
    gap:14px;
  }
  .operate-btn {
    background:#4b2899;
    color:#fff;
    border: none;
    padding:10px 20px;
    border-radius:8px;
    cursor:pointer;
    transition: 0.2s;
    &:hover {
      background:#7b2cb8;
    }
  }
}
</style>