<template>
  <div class="student-page">
    <div class="page-header">
      <h3>👨‍🎓 学生管理</h3>
      <button class="add-btn">新增学生</button>
    </div>

    <div class="search-bar">
      <input placeholder="请输入学生姓名搜索" class="search-input" />
      <button class="search-btn">搜索</button>
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
        <tr>
          <td>2026001</td>
          <td>张三</td>
          <td>男</td>
          <td>计算机1班</td>
          <td>13800138000</td>
          <td>
            <button class="edit-btn">编辑</button>
            <button class="del-btn">删除</button>
          </td>
        </tr>
        <tr>
          <td>2026002</td>
          <td>李四</td>
          <td>女</td>
          <td>计算机1班</td>
          <td>13900139000</td>
          <td>
            <button class="edit-btn">编辑</button>
            <button class="del-btn">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
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