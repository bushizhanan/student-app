<template>
  <div class="student-page">
    <div class="page-header">
      <h3>👨‍🎓 学生管理</h3>
      <button class="add-btn" @click="dialogVisible = true">新增学生</button>
    </div>
    <div class="search-bar">
      <input v-model="searchName" placeholder="请输入学生姓名搜索" class="search-input" />
      <button class="search-btn" @click="getStudentList">搜索</button>
    </div>
    <table class="stu-table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>班级</th>
          <th>手机号</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <!-- v‑for循环渲染后端真实返回的数据，key必须绑定唯一id -->
        <tr v-for="item in stuList" :key="item.id">
          <td>{{ item.studentNum }}</td>
          <td>{{ item.studentName }}</td>
          <td>{{ item.studentGen }}</td>
          <td>{{ item.studentClass }}</td>
          <td>{{ item.studentPhone }}</td>
          <td>
            <button class="edit-btn">编辑</button>
            <button class="del-btn">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 和首页共用这一个弹窗组件 -->
    <AddStudentDialog
      :visible="dialogVisible"
      @close="dialogVisible = false"
      @submit="handleAddStudent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AddStudentDialog from '@/components/AddStudentDialog.vue'
import request from '@/api/request' // 你的axios封装工具

const dialogVisible = ref(false)
const searchName = ref('')
// 用来存放后端返回学生列表
const stuList = ref<any[]>([]) // 初始值改成空数组，不要[[]]

// 获取学生列表接口
async function getStudentList() {
  try {
    const res = (await request.get('/api/sum/getStudentList')) as any
    console.log('获取学生列表成功', res)

    const list = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.list)
          ? res.data.list
          : []

    stuList.value = list
  } catch (err) {
    console.error('获取学生列表失败', err)
  }
}


// 页面加载完成立刻拉取列表
onMounted(() => {
  getStudentList()
})

// 学生页面提交新增
async function handleAddStudent(form: any) {
  console.log('学生管理页提交新增', form)
  // todo 调用新增接口
  // 新增成功之后，重新调用getStudentList()刷新表格数据
  // getStudentList()
  dialogVisible.value = false
}
</script>

<style scoped lang="less">
.student-page {
  height: 100%;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  h3 {
    margin: 0;
    color: #4b2899;
  }
  .add-btn {
    background: #4b2899;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      background: #7b2cb8;
    }
  }
}
.search-bar {
  display: flex;
  gap:10px;
  margin-bottom:16px;
  .search-input {
    flex:1;
    padding:8px 12px;
    border:1px solid #ccc;
    border-radius:6px;
  }
  .search-btn {
    background:#4b2899;
    color:#fff;
    border:none;
    padding:0 16px;
    border-radius:6px;
    cursor:pointer;
  }
}
.stu-table {
  width:100%;
  border-collapse: collapse;
  background:#fff;
  border-radius:8px;
  overflow:hidden;
  th,td {
    border:1px solid #ddd;
    padding:10px;
    text-align:center;
  }
  th {
    background:#e8dfff;
    color:#4b2899;
  }
  .edit-btn {
    background:#5c42b8;
    color:#fff;
    border:none;
    padding:4px 8px;
    border-radius:4px;
    margin-right:4px;
    cursor:pointer;
  }
  .del-btn {
    background:#c84242;
    color:#fff;
    border:none;
    padding:4px 8px;
    border-radius:4px;
    cursor:pointer;
  }
}
</style>
