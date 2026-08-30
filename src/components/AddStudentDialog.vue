<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h3>新增学生</h3>
      <div class="form-item">
        <label>姓名</label>
        <input v-model="form.name" type="text" />
      </div>
      <div class="form-item">
        <label>学号</label>
        <input v-model="form.stuNo" type="text" />
      </div>
      <div class="form-item">
        <label>性别</label>
        <input v-model="form.gender" type="text" />
      </div>
      <div class="form-item">
        <label>班级</label>
        <input v-model="form.className" type="text" />
      </div>
      <div class="form-item">
        <label>手机号</label>
        <input v-model="form.phone" type="text" />
      </div>

      <div class="dialog-buttons">
        <button class="cancel-btn" @click="handleClose">取消</button>
        <button class="confirm-btn" @click="handleSubmit">确定保存</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import request from '@/api/request'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [form: StudentForm]
}>()

interface StudentForm {
  name: string
  stuNo: string
  gender: string
  className: string
  phone: string
}

// 表单
const form = ref<StudentForm>({
  name: '',
  stuNo: '',
  gender: '',
  className: '',
  phone: ''
})

// 关闭弹窗，清空表单
const handleClose = () => {
  form.value = {
    name: '',
    stuNo: '',
    gender: '',
    className: '',
    phone: ''
  }
  emit('close')
}

// 提交，把表单数据抛给父页面
// async function handleSubmit() {
//   const response = await request.post('/api/home/students', form.value)
//     .then(() => {
//       console.log('新增学生表单数据', form.value)
//       console.log('新增学生成功')
//       console.log('response', response)
//       emit('submit', form.value)
//       handleClose()

//     })
//     .catch((error) => {
//       console.error('新增学生失败', error)
//     })
// }
async function handleSubmit() {
  try {
    // await直接拿到返回结果
    const response = await request.post('/api/home/students', form.value)
    console.log('新增学生表单数据', form.value)
    console.log('新增学生成功')
    console.log('response', response)

    emit('submit', form.value)
    handleClose()
  } catch (error) {
    console.error('新增学生失败', error)
  }
}

</script>

<style scoped lang="less">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-content {
  background: #fff;
  padding: 24px 28px;
  border-radius: 12px;
  min-width: 460px;
  h3 {
    margin-top: 0;
    color: #4b2899;
  }
  .form-item {
    margin-bottom: 14px;
    label {
      display: inline-block;
      width: 70px;
    }
    input {
      width: 260px;
      padding: 6px 8px;
    }
  }
  .dialog-buttons {
    margin-top: 22px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    .cancel-btn {
      padding: 8px 18px;
      border: 1px solid #999;
      background: #fff;
      border-radius: 6px;
      cursor: pointer;
    }
    .confirm-btn {
      padding: 8px 18px;
      background: #4b2899;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
</style>