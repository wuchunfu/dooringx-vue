/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 13:56:33
 * @LastEditTime: 2021-11-23 17:27:23
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/crossDrag/index.ts
 */

import UserConfig from '../../config'
import { IBlockType } from '../store/storetypes'
import { createBlock } from '../components/createBlock'
import { deepCopy } from '../utils/index'

/**
 *
 * @export
 * @interface LeftRegistComponentMapItem
 * @img 图片地址
 * @urlFn 组件异步加载函数
 */
export interface LeftRegistComponentMapItem {
  type: string
  component: string
  img: string
  imgCustom?: any
  displayName: string
  urlFn?: () => Promise<any>
}

let currentDrag: LeftRegistComponentMapItem | null = null
export const dragEventResolve = function (item: LeftRegistComponentMapItem) {
  return {
    draggable: true,
    onDragstart: (e?: Event) => {
      currentDrag = item
    },
    onDragover: (e: DragEvent) => {
      e.preventDefault()
    },
    onDrop: () => {},
    onDragend: () => {}
  }
}

export const containerDragResolve = (config: UserConfig) => {
  const store = config.getStore()
  return {
    onDragstart: () => {},
    onDragover: (e: DragEvent) => {
      e.preventDefault()
    },
    onDrop: (e: DragEvent) => {
      const componentRegister = config.getComponentRegister()
      const offsetX = Math.round(e.offsetX)
      const offestY = Math.round(e.offsetY)

      //drop后修改store，
      if (currentDrag) {
        // 还需要拿到注册的组件状态
        const origin = componentRegister.getComp(currentDrag.component)
        if (!origin) {
          console.log(currentDrag.component, 'wait the chunk pull compeletely and retry')
          return
        }
        const target = e.target as HTMLElement
        let newblock: IBlockType
        if (!origin.needPosition) {
          newblock = createBlock(origin.initData.top ?? offestY, origin.initData.left ?? offsetX, origin)
        } else {
          if (target.id !== 'dr-container') {
            newblock = createBlock(offestY + target.offsetTop, offsetX + target.offsetLeft, origin)
          } else {
            newblock = createBlock(offestY, offsetX, origin)
          }
        }
        const data = deepCopy(store.getData())
        data.block.push(newblock)
        store.setData({ ...data })
      }
      currentDrag = null
    },
    onDragend: () => {}
  }
}
