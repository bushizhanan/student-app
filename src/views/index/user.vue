<template>
  <div class="user-page">
    <h3>👤 用户设置</h3>
    <div class="user-form">
      <div class="form-item">
        <label>用户名</label>
        <input type="text" value="admin" />
      </div>
      <div class="form-item">
        <label>昵称</label>
        <input type="text" value="系统管理员" />
      </div>
      <div class="form-item">
        <label>旧密码</label>
        <input type="password" placeholder="请输入旧密码"/>
      </div>
      <div class="form-item">
        <label>新密码</label>
        <input type="password" placeholder="请输入新密码"/>
      </div>
      <div class="form-item">
        <label>确认密码</label>
        <input type="password" placeholder="再次输入新密码"/>
      </div>
      <div class="btn-wrap">
        <button class="save-btn">保存修改</button>
        <button class="reset-btn">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.user-page {
  height:100%;
  h3 {
    color:#4b2899;
    margin:0 0 24px;
  }
}
.user-form {
  background:#fff;
  padding:30px;
  border-radius:12px;
  max-width:420px;
}
.form-item {
  margin-bottom:18px;
  label {
    display:block;
    margin-bottom:6px;
    color:#333;
  }
  input {
    width:100%;
    box-sizing:border-box;
    padding:10px 12px;
    border:1px solid #ccc;
    border-radius:6px;
  }
}
.btn-wrap {
  margin-top:24px;
  display:flex;
  gap:14px;
  .save-btn {
    background:#4b2899;
    color:#fff;
    border:none;
    padding:10px 22px;
    border-radius:8px;
    cursor:pointer;
    &:hover {
      background:#7b2cb8;
    }
  }
  .reset-btn {
    background:#bbbbbb;
    color:#fff;
    border:none;
    padding:10px 22px;
    border-radius:8px;
    cursor:pointer;
  }
}
</style>