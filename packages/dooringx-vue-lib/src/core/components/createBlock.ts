/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-20 13:47:10
 * @LastEditTime: 2021-11-23 17:02:52
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/components/createBlock.ts
 */

import { IBlockType } from '../store/storetypes'
import { createUid } from '../utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentItem } from './componentItem'

export function createBlock(top: number, left: number, ComponentItem: ComponentItem): IBlockType {
  return {
    id: createUid(ComponentItem.name),
    name: ComponentItem.name,
    top,
    left,
    zIndex: ComponentItem.initData.zIndex || 0,
    props: ComponentItem.initData.props || {},
    resize: ComponentItem.initData.resize || ComponentItem.resize,
    focus: false,
    position: ComponentItem.initData.position || 'absolute',
    display: ComponentItem.initData.display || 'block',
    width: ComponentItem.initData.width,
    height: ComponentItem.initData.height,
    // syncList: ComponentItem.initData.syncList || [],
    canDrag: ComponentItem.initData.canDrag ?? true,
    // eventMap: ComponentItem.initData.eventMap || {},
    // functionList: ComponentItem.initData.functionList || [],
    // animate: ComponentItem.initData.animate || {},
    fixed: ComponentItem.initData.fixed || false,
    rotate: ComponentItem.initData.rotate || {
      value: 0,
      canRotate: true
    }
  }
}
