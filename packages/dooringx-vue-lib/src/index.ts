/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-16 17:17:35
 * @LastEditTime: 2021-11-18 17:14:50
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/index.ts
 */
import type { InjectionKey } from 'vue'
// 用于制作组件的函数
export { ComponentItemFactory } from './core/components/abstract';

// 用于config类型定义
export  type { InitConfig } from './config/index';

// 用户的设置 包括可以获取store commander
export { default as UserConfig } from './config/index';

export const injectKey: InjectionKey<ReturnType<any>> = Symbol()
