<template>
  <div class="score-page">
    <div class="page-header">
      <h3>📝 成绩管理</h3>
      <div>
        <button class="add-btn">录入成绩</button>
        <button class="export-btn">导出成绩</button>
      </div>
    </div>

    <div class="search-bar">
      <input placeholder="学生姓名" class="search-input"/>
      <input placeholder="选择课程" class="search-input"/>
      <button class="search-btn">搜索</button>
    </div>

    <table class="score-table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>课程名称</th>
          <th>分数</th>
          <th>考试时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2026001</td>
          <td>张三</td>
          <td>计算机1班</td>
          <td>Vue开发</td>
          <td>88</td>
          <td>2026‑06‑20</td>
          <td>
            <button class="edit-btn">编辑</button>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
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
    margin-right:8px;
    &:hover {
      background: #7b2cb8;
    }
  }
  .export-btn {
    background:#3b72bc;
    color:#fff;
    border:none;
    padding:8px 16px;
    border-radius:6px;
    cursor:pointer;
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

.score-table {
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