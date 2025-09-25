<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('子应用1 - 用户管理页面已加载')
})
</script>

<template>
  <div class="page-container">
    <h1>用户管理</h1>
    <p>这是子应用1的用户管理页面</p>
    <div class="content">
      <p>路径: /user</p>
      <p>功能: 用户管理相关功能</p>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.content {
  margin-top: 20px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
