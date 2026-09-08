<template>
  <div class="class-page">
    <div class="page-header">
      <h3>📚 班级管理</h3>
      <button class="add-btn" @click="openAddDialog">新增班级</button>
    </div>
    <div class="search-bar">
      <input v-model="searchName" placeholder="输入班级名称搜索" class="search-input" />
      <button class="search-btn" @click="loadClassList">搜索</button>
    </div>
    <table class="class-table">
      <thead>
        <tr>
          <th>班级编号</th>
          <th>班级名称</th>
          <th>班主任</th>
          <th>学生人数</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.className }}</td>
          <td>{{ item.teacher }}</td>
          <td>{{ item.studentCount }}</td>
          <td>{{ item.createTime }}</td>
          <td>
            <button class="edit-btn" @click="openEditDialog(item)">编辑</button>
            <button class="del-btn" @click="handleDelete(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--新增/编辑弹窗 -->
    <div v-if="dialogVisible" class="dialog-mask" @click.self="dialogVisible = false">
      <div class="dialog-box">
        <h4>{{ isEdit ? '编辑班级' : '新增班级' }}</h4>
        <div class="form-item">
          <label>班级名称</label>
          <input v-model="form.className" type="text" />
        </div>
        <div class="form-item">
          <label>班主任</label>
          <input v-model="form.teacher" type="text" />
        </div>
        <div class="form-item">
          <label>学生人数</label>
          <input v-model="form.studentCount" type="text" />
        </div>
        <div class="dialog-btns">
          <button @click="dialogVisible = false">取消</button>
          <button class="submit-btn" @click="submitForm" :disabled="submitting">
            {{ submitting ? '提交中...' : '确定' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ✅ 修改为你的后端地址 localhost:9090，接口后缀 /class
const baseUrl = 'http://localhost:9090/api/class'

const searchName = ref('')
const tableList = ref<any[]>([])

const dialogVisible = ref(false)
const isEdit = ref(false)
const submitting = ref(false)

const form = ref({
  id: null as number | null,
  className: '',
  teacher: '',
  studentCount: '',
})

// 加载班级列表 GET http://localhost:9090/class/list
const loadClassList = async () => {
  try {
    const res = await axios.get(`${baseUrl}/list`, {
      params: {
        className: searchName.value || undefined
      }
    })
    if (res.data.code === 200) {
      tableList.value = res.data.data
    }
  } catch (err) {
    console.error('获取班级列表失败', err)
  }
}

//打开新增弹窗
const openAddDialog = () => {
  isEdit.value = false
  form.value = { id: null, className: '', teacher: '', studentCount: '' }
  dialogVisible.value = true
}

//打开编辑弹窗
const openEditDialog = (row: any) => {
  isEdit.value = true
  form.value = {
    id: row.id,
    className: row.className,
    teacher: row.teacher,
    studentCount: row.studentCount
  }
  dialogVisible.value = true
}

/**
 * 新增 POST http://localhost:9090/class/add
 * 编辑 POST http://localhost:9090/class/update
 * 提交成功重新拉取数据库最新数据
 */
const submitForm = async () => {
  if (submitting.value) return
  submitting.value = true
  try {
    if (isEdit.value) {
      await axios.post(`${baseUrl}/update`, form.value)
    } else {
      await axios.post(`${baseUrl}/add`, form.value)
    }
    dialogVisible.value = false
    // 刷新表格，读取数据库返回的数据
    await loadClassList()
  } catch (err) {
    console.error('提交失败：', err)
    alert('操作失败，请检查后端9090端口是否启动！')
  } finally {
    submitting.value = false
  }
}

//删除班级 POST http://localhost:9090/class/delete
const handleDelete = async (id: number) => {
  if (!window.confirm('确定删除该班级？')) return
  try {
    await axios.post(`${baseUrl}/delete`, null, { params: { id } })
    await loadClassList()
  } catch (err) {
    console.error('删除失败', err)
    alert('删除失败')
  }
}

onMounted(() => {
  loadClassList()
})
</script>

<style scoped lang="less">
.class-page {
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

.class-table {
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

.dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  .dialog-box {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    width: 420px;
    pointer-events: auto;

    h4 {
      margin-top: 0;
      color: #4b2899;
    }

    .form-item {
      margin-bottom: 14px;

      label {
        display: block;
        margin-bottom: 4px;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }

    .dialog-btns {
      display: flex;
      justify-content: flex-end;
      gap: 10px;

      button {
        padding: 6px 14px;
        border-radius: 4px;
        border: 1px solid #ccc;
        cursor: pointer;
      }

      .submit-btn {
        background: #4b2899;
        color: #fff;
        border: none;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>