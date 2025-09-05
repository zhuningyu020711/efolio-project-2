// src/utils/index.js  —— 路由
import { createRouter, createWebHistory } from 'vue-router'

// 你的页面实际在 components 目录
import HomeView from '../components/HomeView.vue'
import AboutView from '../components/AboutView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
