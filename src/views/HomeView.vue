<script setup lang="ts">
function dataListener(data: any) {
  console.log('来自主应用的数据', data)
}
window.microApp?.addDataListener(dataListener, true)

1
</script>
<template>
  <div>
    <h1>子应用1 - 首页</h1>
    <p>这是子应用1的首页内容 (端口: 8001)</p>
  </div>
</template>
