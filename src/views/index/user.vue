<template>
  <div class="app-style-personal">
    <!-- 顶部用户信息卡片 -->
    <div class="user-header-card">
      <div class="avatar-box">
        <img src="https://cube.elemecdn.com/sign_user_avatar.png" alt="avatar" />
      </div>
      <div class="user-info">
        <div class="name">{{ userInfo.nickname }}</div>
        <div class="account">账号：{{ userInfo.username }}</div>
        <div class="role">角色：系统管理员</div>
      </div>
    </div>

    <!-- 功能菜单列表 -->
    <div class="menu-list">
      <div class="menu-item" @click="openEditProfile">
        <div class="menu-left">
          <span class="icon">✏️</span>
          <span>编辑资料</span>
        </div>
        <span class="arrow">></span>
      </div>
      <div class="menu-item" @click="openPwdDialog = true">
        <div class="menu-left">
          <span class="icon">🔐</span>
          <span>修改密码</span>
        </div>
        <span class="arrow">></span>
      </div>
      <div class="menu-item">
        <div class="menu-left">
          <span class="icon">ℹ️</span>
          <span>关于系统</span>
        </div>
        <span class="arrow">></span>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <div v-if="openPwdDialog" class="dialog-mask" @click.self="openPwdDialog=false">
      <div class="dialog-box">
        <div class="dialog-title">修改密码</div>
        <div class="form-item">
          <label>旧密码</label>
          <input v-model="pwdForm.oldPwd" type="password" placeholder="请输入旧密码" />
        </div>
        <div class="form-item">
          <label>新密码</label>
          <input v-model="pwdForm.newPwd" type="password" placeholder="请输入新密码" />
        </div>
        <div class="form-item">
          <label>确认密码</label>
          <input v-model="pwdForm.rePwd" type="password" placeholder="再次输入新密码" />
        </div>
        <div class="dialog-buttons">
          <button class="cancel-btn" @click="openPwdDialog=false">取消</button>
          <button class="confirm-btn" @click="submitPassword">确定保存</button>
        </div>
      </div>
    </div>

    <!-- 编辑资料弹窗 -->
    <div v-if="openEditDialog" class="dialog-mask" @click.self="openEditDialog=false">
      <div class="dialog-box">
        <div class="dialog-title">编辑个人资料</div>
        <div class="form-item">
          <label>用户名</label>
          <input v-model="userInfo.username" type="text" readonly />
        </div>
        <div class="form-item">
          <label>昵称</label>
          <input v-model="userInfo.nickname" type="text" />
        </div>
        <div class="dialog-buttons">
          <button class="cancel-btn" @click="openEditDialog=false">取消</button>
          <button class="confirm-btn" @click="submitProfile">确定保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 用户信息
const userInfo = ref({
  username: 'admin',
  nickname: '系统管理员'
})

// 修改密码弹窗
const openPwdDialog = ref(false)
const pwdForm = ref({
  oldPwd: '',
  newPwd: '',
  rePwd: ''
})

// 编辑资料弹窗
const openEditDialog = ref(false)
const openEditProfile = () => {
  openEditDialog.value = true
}

// 提交密码修改
const submitPassword = () => {
  console.log('修改密码', pwdForm.value)
  // 简单校验
  if(pwdForm.value.newPwd !== pwdForm.value.rePwd){
    alert('两次输入密码不一致')
    return
  }
  // 这里调用后端接口
  openPwdDialog.value = false
  // 关闭后清空表单
  pwdForm.value.oldPwd = ''
  pwdForm.value.newPwd = ''
  pwdForm.value.rePwd = ''
}

// 提交资料编辑
const submitProfile = () => {
  console.log('保存资料', userInfo.value)
  //调用接口
  openEditDialog.value = false
}
</script>

<style scoped lang="less">
.app-style-personal {
  padding: 24px;
  max-width: 600px;
}

// 用户头部卡片
.user-header-card {
  background: linear-gradient(135deg,#5c30b8,#8048d8);
  border-radius:14px;
  padding:32px 24px;
  display:flex;
  align-items:center;
  gap:18px;
  color:#fff;
  .avatar-box {
    width:80px;
    height:80px;
    border-radius:50%;
    overflow:hidden;
    background:#fff;
    img {
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  .user-info {
    .name {
      font-size:20px;
      font-weight:600;
      margin-bottom:6px;
    }
    .account, .role {
      font-size:14px;
      opacity:0.9;
      margin:3px 0;
    }
  }
}

// 菜单列表
.menu-list {
  margin-top:20px;
  background:#fff;
  border-radius:12px;
  overflow:hidden;
  .menu-item {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:16px 20px;
    border-bottom:1px solid #f2f2f2;
    cursor:pointer;
    transition:background 0.2s;
    &:last-child {
      border-bottom:none;
    }
    &:hover {
      background:#f7f5fc;
    }
    .menu-left {
      display:flex;
      align-items:center;
      gap:12px;
      font-size:15px;
      .icon {
        font-size:18px;
      }
    }
    .arrow {
      color:#999;
      font-size:18px;
    }
  }
}

// 弹窗遮罩
.dialog-mask {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:999;
  .dialog-box {
    width:420px;
    background:#fff;
    border-radius:12px;
    padding:24px;
    .dialog-title {
      font-size:17px;
      font-weight:600;
      margin-bottom:20px;
    }
    .form-item {
      margin-bottom:16px;
      label {
        display:block;
        margin-bottom:6px;
        font-size:14px;
      }
      input {
        width:100%;
        box-sizing:border-box;
        padding:10px 12px;
        border:1px solid #ddd;
        border-radius:6px;
        font-size:14px;
        &:read-only {
          background:#f5f5f5;
        }
      }
    }
    .dialog-buttons {
      margin-top:10px;
      display:flex;
      gap:12px;
      justify-content:flex-end;
      .cancel-btn {
        padding:9px 20px;
        border-radius:6px;
        border:1px solid #ccc;
        background:#fff;
        cursor:pointer;
      }
      .confirm-btn {
        padding:9px 20px;
        border-radius:6px;
        border:none;
        background:#5c30b8;
        color:#fff;
        cursor:pointer;
      }
    }
  }
}
</style>