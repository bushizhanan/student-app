<template>
  <div class="score-page">
    <div class="page-header">
      <h3>📝 成绩管理</h3>
      <div>
        <button class="add-btn" @click="openAddDialog">录入成绩</button>
        <button class="export-btn" @click="exportExcel">导出成绩</button>
      </div>
    </div>
    <div class="search-bar">
      <input placeholder="学生姓名" class="search-input" />
      <input placeholder="选择课程" class="search-input" />
      <button class="search-btn">搜索</button>
    </div>
    <table class="score-table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>课程名称</th>
          <th>成绩</th>
          <th>考试时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr>
          <td>2026001</td>
          <td>张三</td>
          <td>计算机1班</td>
          <td>Vue开发</td>
          <td>88</td>
          <td>2026‑06‑20</td>
          <td>
            <button class="edit-btn" @click="openEditDialog(item)">编辑</button>
            <button class="del-btn">删除</button>
          </td>
        </tr>
        <tr>
          <td>2026002</td>
          <td>李四</td>
          <td>计算机1班</td>
          <td>Vue开发</td>
          <td>92</td>
          <td>2026‑06‑20</td>
          <td>
            <button class="edit-btn">编辑</button>
            <button class="del-btn">删除</button>
          </td>
        </tr> -->
        <tr v-for="item in scoreList" :key="item.id || item.studentId">
          <td>{{ item.studentId }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.className }}</td>
          <td>{{ item.subject }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.examTime }}</td>
          <td>
            <button class="edit-btn" @click="openEditDialog(item)">编辑</button>
            <button class="del-btn" @click="score_delete(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 录入成绩弹窗 学院‑专业联动 -->
    <div v-if="dialogVisible" class="dialog-mask" @click.self="dialogVisible = false">
      <div class="dialog-box">
        <div class="dialog-title">{{ isEditing ? '编辑成绩' : '录入成绩' }}</div>
        <div class="form-item">
          <label>学院</label>
          <select v-model="form.college" @change="onCollegeChange">
            <option value="">请选择学院</option>
            <option value="信息工程学院">信息工程学院</option>
            <option value="管理工程学院">管理工程学院</option>
            <option value="机械制造学院">机械制造学院</option>
            <option value="国凯航空学院">国凯航空学院</option>
          </select>
        </div>
        <div class="form-item">
          <label>专业</label>
          <select v-model="form.major">
            <option value="">请选择专业</option>
            <option v-for="item in majorOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="form-item">
          <label>姓名</label>
          <input v-model="form.name" placeholder="请输入姓名" />
        </div>
        <div class="form-item">
          <label>性别</label>
          <select v-model="form.gender">
            <option value="">请选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div class="form-item">
          <label>学号</label>
          <input v-model="form.studentId" placeholder="请输入学号" />
        </div>
        <div class="form-item">
          <label>班级</label>
          <select v-model="form.className" placeholder="请输入班级">
            <option value="">请选择班级</option>
            <option value="计算机1班">1班</option>
            <option value="计算机2班">2班</option>
            <option value="计算机3班">3班</option>
            <option value="计算机4班">4班</option>
            <option value="计算机5班">5班</option>
          </select>
        </div>
        <div class="form-item">
          <label>科目</label>
          <select v-model="form.subject">
            <option value="">请选择科目</option>
            <option value="Vue">Vue</option>
            <option value="Mysql">Mysql</option>
            <option value="java">java</option>
          </select>
        </div>
        <div class="form-item">
          <label>成绩</label>
          <input v-model.number="form.score" type="number" placeholder="请输入成绩" />
        </div>
        <div class="dialog-footer">
          <button class="cancel-btn" @click="dialogVisible = false">取消</button>
          <button class="submit-btn" @click="submitForm">{{ isEditing ? '保存' : '提交' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import request from '@/api/request'
import axios from 'axios'


const dialogVisible = ref(false)
const isEditing = ref(false)


//学院‑专业映射配置
const majorMap: Record<string, string[]> = {
  '信息工程学院': ['计算机网络技术', '信息安全技术', '大数据技术'],
  '管理工程学院': ['工商企业管理', '物流管理', '市场营销'],
  '机械制造学院': ['机械设计与制造', '机电一体化技术', '数控技术'],
  '国凯航空学院': ['航空物流管理', '民航安全技术管理', '无人机应用技术']
}

const majorOptions = ref<string[]>([])

//表单，college 参数放在最前面
const form = ref({
  id: null as number | string | null,
  college: '',
  name: '',
  gender: '',
  studentId: '',
  major: '',
  className: '',
  subject: '',
  score: null as number | null
})

//切换学院，刷新专业下拉，清空已选专业
const onCollegeChange = () => {
  majorOptions.value = majorMap[form.value.college] || []
  form.value.major = ''
}

//打开弹窗重置表单
const openAddDialog = () => {
  isEditing.value = false
  form.value = {
    id: null,
    college: '',
    name: '',
    gender: '',
    studentId: '',
    major: '',
    className: '',
    subject: '',
    score: null
  }
  majorOptions.value = []
  dialogVisible.value = true
}

// 打开编辑弹窗并回填当前成绩
const openEditDialog = (item: any) => {
  isEditing.value = true
  form.value = {
    id: item.id ?? null,
    college: item.college ?? '',
    name: item.name ?? '',
    gender: item.gender ?? '',
    studentId: item.studentId ?? '',
    major: item.major ?? '',
    className: item.className ?? '',
    subject: item.subject ?? '',
    score: item.score ?? null
  }
  majorOptions.value = majorMap[form.value.college] || []
  dialogVisible.value = true
}

//提交
const submitForm = async () => {
  const data = form.value
  if (!data.college || !data.major || !data.name || !data.gender || !data.studentId || !data.className || !data.subject || data.score === null) {
    alert('请填写全部表单')
    return
  }
  if (data.score < 0 || data.score > 100) {
    alert('成绩范围0‑100')
    return
  }

  try {
    if (isEditing.value) {
      if (data.id === null) {
        alert('成绩ID不能为空')
        return
      }

      const result = (await request.post('/api/score/update', data)) as any
      if (result?.code === 200 && result?.data !== false) {
        alert('编辑成功')
        dialogVisible.value = false
        await getScoreList()
      } else {
        alert(result?.msg || '编辑失败')
      }
      return
    }

    const res = await fetch('/api/home/score', {
      method: 'POST',
      headers: {
        'Content‑Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    if (res.ok) {
      alert('录入成功')
      dialogVisible.value = false
      await getScoreList()
    } else {
      alert(result.msg || '录入失败')
    }
  } catch (err) {
    console.error(err)
    alert('网络请求异常')
  }
}
  const score_delete = async (id: number) => {
  if (!window.confirm('确定删除该班级？')) return
  try {
    await axios.post(`http://localhost:9090/api/score/delete`, null, { params: { id } })
    await getScoreList()
    alert('删除成功')
  } catch (err) {
    console.error('删除失败', err)
    alert('删除失败')
  }
}

// 导出
import * as XLSX from 'xlsx'

const scoreList = ref<any[]>([])

function normalizeScore(item: any) {
  return {
    ...item,
    studentId: item.studentId ?? item.studentNum ?? item.studentNo ?? item.student?.studentNum,
    name: item.name ?? item.studentName ?? item.student?.studentName,
    subject: item.subject ?? item.courseName ?? item.subjectName ?? item.course?.courseName,
    className: item.className ?? item.studentClass ?? item.class?.className,
    examTime: item.examTime ?? item.testTime ?? item.createTime
  }
}

// 获取成绩列表
async function getScoreList() {
  try {
    const res = (await request.get('/api/score/list')) as any
    console.log('获取成绩列表成功', res)

    const list = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.list)
          ? res.data.list
          : Array.isArray(res?.data?.records)
            ? res.data.records
            : []

    scoreList.value = list.map(normalizeScore)
  } catch (err) {
    console.error('获取成绩列表失败', err)
  }
}

onMounted(() => {
  getScoreList()
})

// 导出成绩Excel
const exportExcel = () => {
  const header = ['学号', '姓名', '班级', '课程名称', '成绩', '考试时间']
  const body = scoreList.value.map(item => [
    item.studentId,
    item.name,
    item.className,
    item.subject,
    item.score,
    item.examTime
  ])
  // 数组转工作表
  const ws = XLSX.utils.aoa_to_sheet([header, ...body])
  // 设置列宽
  ws['!cols'] = [{ wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 14 }, { wch: 8 }, { wch: 14 }]
  // 建工作簿并写入
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '成绩单')
  // 触发下载，文件名带当天日期
  XLSX.writeFile(wb, `成绩表_${new Date().toISOString().slice(0, 10)}.xlsx`)
}

</script>

<style scoped lang="less">
.score-page {
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
    margin-right: 8px;

    &:hover {
      background: #7b2cb8;
    }
  }

  .export-btn {
    background: #3b72bc;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
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

.score-table {
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  .dialog-box {
    width: 460px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 24px;

    .dialog-title {
      font-size: 18px;
      color: #4b2899;
      font-weight: bold;
      margin-bottom: 18px;
    }

    .form-item {
      margin-bottom: 14px;

      label {
        display: block;
        margin-bottom: 4px;
        color: #333;
      }

      input,
      select {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;

      .cancel-btn {
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 6px;
        cursor: pointer;
      }

      .submit-btn {
        padding: 8px 20px;
        background: #4b2899;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
}
</style>