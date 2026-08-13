<template>
  <div class="register-page">
    <div class="register-card">
      <h2>注册页面</h2>
      <div class="form-item">
        <label>账号：</label>
        <input type="text" v-model="username" placeholder="请输入账号"/>
      </div>
      <div class="form-item">
        <label>密码：</label>
        <input type="password" v-model="password" placeholder="请输入密码"/>
      </div>
      <!--新增 年龄、邮箱 -->
      <div class="form-item">
        <label>年龄：</label>
        <input type="number" v-model.number="age" placeholder="请输入年龄"/>
      </div>
      <div class="form-item">
        <label>邮箱：</label>
        <input type="email" v-model="email" placeholder="请输入邮箱"/>
      </div>

      <button class="submit-btn" @click="register">完成注册</button>
      <div class="back-login">
        <router-link to="/">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const password = ref('')
//新增变量
const age = ref<number | null>(null)
const email = ref('')

async function register() {
    let params = {
    name: username.value,
    password: password.value,
    age: age.value,
    email: email.value
  }
  try{
    const response = await axios.post('http://localhost:8080/api/register', params)
    console.log(response.data)
    //清空全部输入框
    username.value = ''
    password.value = ''
    age.value = null
    email.value = ''
    router.push('/')
    }
    catch (error) {
        console.error('注册失败:', error)
        alert('注册失败，请稍后重试')
    }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #6b46c1, #805ad5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.register-card {
  background-color: #fff;
  width: 360px;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.register-card h2 {
  text-align: center;
  color: #553c9a;
  margin-top: 0;
  margin-bottom: 30px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 6px;
  color: #444;
  font-weight: 500;
}

.form-item input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
}

.submit-btn {
  width: 100%;
  padding:13px;
  background-color:#6b46c1;
  color:#fff;
  border:none;
  border-radius:8px;
  font-size:16px;
  cursor:pointer;
}

.submit-btn:hover {
  background-color:#553c9a;
}

.back-login {
  text-align:center;
  margin-top:20px;
}

.back-login a {
  color:#6b46c1;
  text-decoration:none;
}
</style>