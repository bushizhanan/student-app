<template>
  <div class="student-page">
    <div class="page-header">
      <h3>👨‍🎓 学生管理</h3>
      <button class="add-btn" @click="openAddDialog">新增学生</button>
    </div>
    <div class="search-bar">
      <input
        v-model="searchName"
        placeholder="请输入学生姓名搜索"
        class="search-input"
      />
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
            <button class="edit-btn" @click="openEditDialog(item)">编辑</button>
            <button class="del-btn" @click="handleDeleteStudent(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 新增/编辑共用弹窗 -->
    <AddStudentDialog
      :visible="dialogVisible"
      :edit-data="currentEditData"
      @close="closeDialog"
      @submit="handleDialogSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AddStudentDialog from '@/components/AddStudentDialog.vue'
import request from '@/api/request'

const dialogVisible = ref(false)
const searchName = ref('')
const stuList = ref<any[]>([])

// 当前编辑的数据，null代表新增模式
const currentEditData = ref<any>(null)

// 打开新增弹窗
function openAddDialog() {
  currentEditData.value = null
  dialogVisible.value = true
}

// 打开编辑弹窗，回填该行数据
function openEditDialog(row: any) {
  currentEditData.value = { ...row }
  dialogVisible.value = true
}

// 关闭弹窗
function closeDialog() {
  dialogVisible.value = false
  currentEditData.value = null
}

// 获取学生列表
async function getStudentList() {
  try {
    const res = (await request.get('/api/sum/getStudentList', {
      params: {
        name: searchName.value || undefined
      }
    })) as any
    console.log('获取学生列表成功', res)
    const list = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.list)
          ? res.data.list
          : []
    stuList.value = list
    console.log('学生列表', list)
  } catch (err) {
    console.error('获取学生列表失败', err)
  }
}

// 弹窗提交：区分新增 / 编辑
async function handleDialogSubmit(form: any) {
  try {
    if (currentEditData.value) {
      // 编辑模式，带上id
      await request.post('/api/sum/update', {
        id: currentEditData.value.id,
        ...form
      })
      alert('编辑成功')
    } else {
      // 新增模式
      await request.post('/api/sum/add', form)
      alert('新增成功')
    }
    closeDialog()
    // 刷新列表
    await getStudentList()
  } catch (err: any) {
    console.error('提交失败', err)
    alert(err?.response?.data?.msg || '操作失败')
  }
}

// 删除学生
async function handleDeleteStudent(id: number) {
  if (!confirm('确定要删除这条学生记录吗？')) return
  try {
    await request.post(`/api/sum/delete?id=${id}`)
    alert('删除成功')
    await getStudentList()
  } catch (err: any) {
    console.error('删除失败', err)
    alert(err?.response?.data?.msg || '删除失败')
  }
}

onMounted(() => {
  getStudentList()
})
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
  gap: 10px;
  margin-bottom: 16px;
  .search-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .search-btn {
    background: #4b2899;
    color: #fff;
    border: none;
    padding: 0 16px;
    border-radius: 6px;
    cursor: pointer;
  }
}
.stu-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  th {
    background: #e8dfff;
    color: #4b2899;
  }
  .edit-btn {
    background: #5c42b8;
    color: #fff;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 4px;
    cursor: pointer;
  }
  .del-btn {
    background: #c84242;
    color: #fff;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
