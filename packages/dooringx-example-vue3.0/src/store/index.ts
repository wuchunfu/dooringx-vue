/*
 * @Author: GeekQiaQia
 * @Date: 2021-07-21 00:09:24
 * @LastEditTime: 2021-11-18 17:36:39
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/store/index.ts
 */
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

import RootStateTypes, { AllStateTypes } from './types';

const defaultState = {
  count: 0,
};
// 新建store 实例
export const store = createStore({
  state() {
    return defaultState;
  },
  mutations: {
    increment(state: typeof defaultState) {
      // eslint-disable-next-line no-plusplus
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
  },
  getters: {
    count(state: typeof defaultState) {
      return state.count;
    },
  },
  modules: {
  },
});

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue3-store');

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}
