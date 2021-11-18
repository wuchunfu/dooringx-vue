/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-09 16:07:18
 * @LastEditTime: 2021-11-17 17:44:40
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/main.ts
 */
import { createApp } from 'vue';
import { key, store } from './store/index';
import router from './router/index';
import App from './App.vue';
// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
// windicss
import 'virtual:windi.css'
// iconfont
import './assets/icons/iconfont/iconfont.css'


// 1、挂载vuex
// 2、挂载路由
// 3、挂载 elementPlus UI;  .use(store, key).

// 链式注册插件
const app = createApp(App).use(router).use(ElementPlus,{locale});

// 现在所有的导航都是异步的，等路由ready以后再进行挂载组件；
router.isReady().then(() => app.mount('#app'));

// 在导航期间每次发生未捕获的错误时都会调用该处理程序
// eslint-disable-next-line no-console
router.onError((err: any) => { console.error(err); });
