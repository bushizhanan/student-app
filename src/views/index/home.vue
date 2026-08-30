<template>
  <div class="home">
    <div class="welcome-block">
      <h2>学生管理系统</h2>
      <p>欢迎进入系统，可对学生、班级、成绩信息进行管理维护</p>
    </div>

    <div class="stat-row">
      <div class="stat-card">
        <div class="stat-number">{{ studentAll }}</div>
        <div class="stat-text">学生总人数</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ classAll }}</div>
        <div class="stat-text">班级总数</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ todoCount }}</div>
        <div class="stat-text">待处理事项</div>
      </div>
    </div>

    <div class="quick-area">
      <h4>快捷操作</h4>
      <div class="btn-wrap">
        <button class="operate-btn" @click="dialogVisible = true">新增学生</button>
        <button class="operate-btn">批量导入</button>
        <button class="operate-btn">导出报表</button>
      </div>
    </div>
  </div>

  <!-- 复用弹窗组件 -->
  <AddStudentDialog
    :visible="dialogVisible"
    @close="dialogVisible = false"
    @submit="handleAddStudent"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/api/request'
import AddStudentDialog from '@/components/AddStudentDialog.vue'

const studentAll = ref(0)
const classAll = ref(0)
const todoCount = ref(0)
const dialogVisible = ref(false)

// 新增学生提交
async function handleAddStudent(form: any) {
  console.log('首页提交新增学生', form)
  // todo: axios.post('/api/student/add', form)
  // 添加成功后，重新刷新首页统计 getStat()
  await getStat()
}

async function getStat() {
  const res = (await request.get('/api/home/stat')) as any
  if (res?.code === 200) {
    studentAll.value = res.data.studentAll
    classAll.value = res.data.classAll
    todoCount.value = res.data.todoCount
  }
}

onMounted(() => {
  getStat()
})
</script>

<style scoped lang="less">
/* 你的原有样式不变 */
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
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);

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