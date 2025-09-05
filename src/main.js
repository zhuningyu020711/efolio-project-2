import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

// 路由文件在 src/utils/index.js
import router from './utils/index.js' // （也可写成 './utils'）

createApp(App).use(router).mount('#app')
