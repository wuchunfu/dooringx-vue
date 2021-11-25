/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 17:40:37
 * @LastEditTime: 2021-11-23 18:06:16
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/hooks/index.ts
 */

import UserConfig from '../config'
import { reactive } from 'vue'

export function useStoreState(config: UserConfig) {
  const store = config.getStore()
  const state = reactive(store.getData())
  return state
}
