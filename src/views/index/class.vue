<template>
  <div class="class-page">
    <div class="page-header">
      <h3>📚 班级管理</h3>
      <button class="add-btn">新增班级</button>
    </div>

    <div class="search-bar">
      <input placeholder="输入班级名称搜索" class="search-input"/>
      <button class="search-btn">搜索</button>
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
        <tr>
          <td>CL001</td>
          <td>计算机1班</td>
          <td>王老师</td>
          <td>42</td>
          <td>2026‑02‑10</td>
          <td>
            <button class="edit-btn">编辑</button>
            <button class="del-btn">删除</button>
          </td>
        </tr>
        <tr>
          <td>CL002</td>
          <td>软件技术2班</td>
          <td>李老师</td>
          <td>38</td>
          <td>2026‑02‑10</td>
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

.class-table {
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