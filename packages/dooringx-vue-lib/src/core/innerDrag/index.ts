/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-22 15:58:34
 * @LastEditTime: 2021-11-23 16:39:48
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/innerDrag/index.ts
 */

import UserConfig from '../../config'
import { IBlockType } from '../store/storetypes'
import { innerDragState } from './state'
import { blockFocus } from '../focusHandler/index'
import { deepCopy, isMac } from '../utils'
import { wrapperMoveMouseUp } from '../wrapperMove/index'

/**
 * @description 获取焦点
 *
 */
export const innerDrag = function (item: IBlockType, config: UserConfig, ref: HTMLDivElement) {
  const store = config.getStore()

  return {
    onMousedown: (e: MouseEvent) => {
      e.stopPropagation()

      //特殊元素不可操作
      // if (specialCoList.includes(item.name)) {
      // 	containerFocusRemove(config).onMouseDown(e);
      // 	return;
      // }

      // 暂时屏蔽右键菜单；
      // if (item.id && innerDragState.lastClick && item.id !== innerDragState.lastClick.id) {
      // 	contextMenuState.unmountContextMenu();
      // }

      //candrag给选中，不给拖
      blockFocus(e, item, config)
      if (!item.canDrag) {
        return
      }
      // 记录画布内最后点击的元素；
      innerDragState.lastClick = item
      // 非可移动组件
      if (item.position === 'static') {
        return
      }

      if (ref) {
        ref.style.cursor = 'move'
        ref.style.willChange = 'left,right,width,height'
      }
      innerDragState.startX = Math.round(e.clientX)
      innerDragState.startY = Math.round(e.clientY)
      innerDragState.item = item
      innerDragState.isDrag = true
      innerDragState.ref = ref
      innerDragState.current = store.getIndex()
    }
  }
}

/**
 *
 * @description  画布container容器监听Mousemove事件，更新当前选中blocks的left,top属性；并记录移动block的startX,startY;
 *
 */
export const innerContainerDrag = function (config: UserConfig) {
  let lastblock: null | IBlockType
  const store = config.getStore()
  const scaleState = config.getScaleState() //获取当前缩放value;
  const onMousemove = (e: MouseEvent) => {
    // 右键菜单
    // if (isMac() && contextMenuState.state) {
    // 	//mac有bug
    // 	return;
    // }

    const id = innerDragState.item?.id
    if (id && innerDragState.isDrag) {
      const current = store.getData().block.find((v) => v.id === id)
      if (current?.position === 'static') {
        return
      }

      let { clientX: moveX, clientY: moveY } = e
      const { startX, startY } = innerDragState
      const scale = scaleState.value

      let durX = Math.round((moveX - startX) / scale)
      let durY = Math.round((moveY - startY) / scale)

      let newblock: IBlockType[]
      if (lastblock !== innerDragState.item) {
        const cloneblock: IBlockType[] = deepCopy(store.getData().block)
        lastblock = innerDragState.item
        newblock = cloneblock.map((v) => {
          if (v.focus && v.position !== 'static') {
            v.left = Math.round(v.left + durX)
            v.top = Math.round(v.top + durY)
          }
          return v
        })
      } else {
        newblock = store.getData().block.map((v) => {
          if (v.focus && v.position !== 'static') {
            v.left = Math.round(v.left + durX)
            v.top = Math.round(v.top + durY)
          }
          return v
        })
      }
      store.setData({ ...store.getData(), block: newblock })
      innerDragState.startX = moveX
      innerDragState.startY = moveY
    }
    // resizerMouseMove(e, config);  // 暂时不考虑resize
    // rotateMouseMove(e, config);  // 暂时不考虑 rotate;
    // if (selectData.selectDiv) {
    // 	selectRangeMouseMove(e);
    // }
  }
  return {
    onMousemove
  }
}

/**
 *
 * @description  画布容器中鼠标up时释放
 *
 */
export const innerContainerDragUp = function (config: UserConfig) {
  const store = config.getStore()
  const onMouseUp = (e: MouseEvent) => {
    // e.preventDefault(); 这个会导致无法取消选中
    // iframeWrapperMove(config);
    wrapperMoveMouseUp(config)
    // selectRangeMouseUp(e, config);
    if (innerDragState.ref && innerDragState.ref) {
      innerDragState.ref.style.cursor = 'default'
      innerDragState.ref.style.willChange = 'auto'
    }
    // resizerMouseUp(config);
    // rotateMouseUp(config);
    if (innerDragState.current) {
      const endindex = store.getIndex()
      store.getStoreList().splice(innerDragState.current, endindex - innerDragState.current)
      store.setIndex(innerDragState.current)
    }
    innerDragState.ref = null
    innerDragState.isDrag = false
    innerDragState.item = null
    innerDragState.current = 0
    // marklineConfig.marklineUnfocus = null;
    store.forceupdate()
  }
  return {
    onMouseUp
  }
}
