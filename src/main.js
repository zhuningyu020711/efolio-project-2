import { createApp } from 'vue'
import App from './App.vue'

// ✅ 引入 Bootstrap 5 样式（全局生效）
import 'bootstrap/dist/css/bootstrap.min.css'

// import './style.css'  // 本实验先不用自定义文件
createApp(App).mount('#app')
