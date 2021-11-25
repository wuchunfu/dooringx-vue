import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import layout from '../layout/index.vue'
NProgress.configure({ showSpinner: false })

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: {
      title: {
        '/zh-CN': '首页',
        '/en-US': 'Home Page'
      },
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
        meta: {
          title: {
            '/zh-CN': '首页',
            '/en-US': 'Home Page'
          },
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: {
        '/zh-CN': '登录',
        '/en-US': 'Login'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '404',
        '/en-US': '404'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '未找到',
        '/en-US': 'NOT FOUND'
      },
      hidden: true,
      hiddenTab: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

router.beforeEach(() => {
  NProgress.start() // start progress bar
  return true
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
