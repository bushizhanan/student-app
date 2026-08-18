<template>
  <div class="userinfo-page">
    <div class="info-card">
      <h2>👤 用户个人信息</h2>
      <div class="item">
        <span class="label">用户ID：</span>
        <span class="value">{{userInfo?.data?.id }}</span>
      </div>
      <div class="item">
        <span class="label">用户名：</span>
        <span class="value">{{ userInfo?.data?.name ?? "未填写" }}</span>
      </div>
      <div class="item">
        <span class="label">性别：</span>
        <span class="value">{{ alertsStore.userInfo?.data?.age ?? "未填写" }}</span>
      </div>
      <div class="item">
        <span class="label">邮箱：</span>
        <span class="value">{{ alertsStore.userInfo?.data?.email ?? "未填写"  }}</span>
      </div>

      <div class="btn-group">
        <button @click="goBack" class="back-btn">返回登录</button>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useAlertsStore } from "../../stores/user"
import { storeToRefs } from "pinia"

// 调试：打印看有没有值


const router = useRouter()
const alertsStore = useAlertsStore()
const { userInfo } = storeToRefs(alertsStore)

//const { loginUser } = storeToRefs(alertsStore)
console.log('userInfo', userInfo.value)
const goBack = () => {
  router.push("/login")
}
</script>

<style scoped>
.userinfo-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #6b46c1, #805ad5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.info-card {
  background: #ffffff;
  width: 420px;
  padding: 36px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.info-card h2 {
  text-align: center;
  color: #333;
  margin-top: 0;
  margin-bottom: 28px;
}

.item {
  display: flex;
  padding:14px 8px;
  border-bottom:1px solid #eee;
}

.label {
  width:90px;
  font-weight:bold;
  color:#444;
}
.value {
  color:#666;
}

.btn-group{
  margin-top:32px;
  text-align:center;
}

.back-btn{
  padding:10px 26px;
  background:#6b46c1;
  color:white;
  border:none;
  border-radius:8px;
  font-size:16px;
  cursor:pointer;
}
.back-btn:hover{
  background:#553c9a;
}

.no-login{
  text-align:center;
  color:#fff;
}
</style>