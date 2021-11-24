/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-22 16:22:24
 * @LastEditTime: 2021-11-22 16:22:25
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/focusHandler/state.ts
 */
import { IBlockType } from '../store/storetypes'
export interface FocusStateType {
  blocks: IBlockType[]
}
export const focusState: FocusStateType = {
  blocks: []
}
