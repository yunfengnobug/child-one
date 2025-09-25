import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import router from './router'
import setupMicroAppRouter from './utils/micro-app-router'

// iframe模式下直接启动应用
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')

// 使用统一的微前端路由处理器（自动检测路由模式）
setupMicroAppRouter(router)
