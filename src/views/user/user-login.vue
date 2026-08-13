<template>
    <div>
        <div class="login">
            <div class="login-box">
                <div class="login-title">
                    <div class="login-title-text">登录</div>
                </div>
                <div class="login-form">
                    <div class="login-form-item">
                        <div class="login-form-item-label">用户名</div>
                        <div class="login-form-item-input">
                            <input type="text" v-model="name" placeholder="请输入用户名" />
                        </div>
                        <div class="login-form-item-label">密码</div>
                        <div class="login-form-item-input">
                            <input type="password" v-model="password" placeholder="请输入密码" />
                        </div>
                        <div class="login-form-item-input00">
                            <button class="login-form-item-input-button" @click="login">login</button>
                        </div>
                        <div style="top: 10px; position: relative; text-align:center;">
                            <router-link to="/register">点击注册</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!--
<script setup> 
import { ref } from 'vue'

const password = ref('')
const name = ref('')
let  params = {
    name: name.value,
    password: password.value
}
async function login(params) {

    try {
        const response = await axios.post('http://localhost:8080/api/login', params)
        console.log('登录成功:', response.data)
        // 处理登录成功逻辑，例如跳转到首页或保存用户信息
    } catch (error) {
        console.error('登录失败:', params, error)
        alert('登录失败，请检查用户名和密码是否正确')
        password.value = ''
        name.value = ''
        // 处理登录失败逻辑，例如显示错误消息
    }
}

</script>

-->

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const password = ref('')
const name = ref('')

// 登录函数：点击按钮时再组装参数
async function login() {
  // 【关键点】点击登录那一刻，拿输入框最新的值
  let params = {
    name: name.value,
    password: password.value
  }
  try {
    // 注意！后端地址如果没有/api，删掉前缀！
    const response = await axios.post('http://localhost:8080/api/login', params)
    console.log(response.data)

    // 成功后清空输入框
    name.value = ''
    password.value = ''
    router.push('/userinfo')
  } catch (error) {
    console.error('网络异常', error)
    alert('服务器连接失败！')
    password.value = ''
    name.value = ''
  }
}
</script>

<!-- template部分给你参考，要有按钮调用login() -->
<!--
<template>
  <div>
    <input v-model="name" placeholder="用户名"/>
    <input v-model="password" placeholder="密码"/>
    <button @click="login">登录</button>
  </div>
</template>
-->
<style scoped>
.login {
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #662D8C, #4834A0);
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-box {
    width: 400px;
    height: 600px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 245, 255, 0.96));
    border-radius: 18px;
    box-shadow:
        0 0 30px rgba(102, 45, 140, 0.35),
        0 0 60px rgba(72, 52, 160, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.login-title {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(126, 72, 213, 0.35);
}
.login-title-text {
    font-size: 24px;
    font-weight: bold;
    color: #572b91;
}
.login-form {
    width: 100%;
    height: 100vh;
    padding: 40px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-radius: 10px;
    position: relative;
}
/* 修改：光晕扩大、颜色变淡，扩散范围更大 */
.login-form::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    height: 420px;
    background: radial-gradient(circle, rgba(126, 72, 213, 0.13), transparent 72%);
    transform: translate(-50%, -50%);
    pointer-events: none;
}
.login-form-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 160px;
}
.login-form-item-label {
    font-size: 16px;
    color: #4b2380;
    margin-bottom: 8px;
    font-weight: 800;
}
.login-form-item-input {
    width: 100%;
}
.login-form-item-input input {
    width: 100%;
    height: 42px;
    padding: 0 12px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border 0.2s;
}
.login-form-item-input00 {
    width: 100%;
    margin-top: 20px;
}
.login-form-item-input input:focus {
    border-color: #7e48d5;
}
.login-form-item-input-button {
    width: 100%;
    height: 44px;
    background: linear-gradient(90deg, #7e48d5, #6432c2);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
}
.login-form-item-input-button:hover {
    background: linear-gradient(90deg, #6c3bc2, #5325aa);
}
.login-form-item-input-button:active {
    background: linear-gradient(90deg, #5c31a8, #471e94);
}
a {
    color: #6432c2;
}
a:hover {
    color: #4b2380;
}
</style>