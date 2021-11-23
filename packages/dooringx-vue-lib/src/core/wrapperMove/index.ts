/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-22 18:04:51
 * @LastEditTime: 2021-11-23 16:23:34
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/wrapperMove/index.ts
 */
import {  reactive } from "vue";
import UserConfig from '../../config';
import { containerResizer } from "../resizeHandler/containerResizer";

export interface WrapperMoveStateProps {
	isDrag: boolean;
	startX: number;
	startY: number;
	needX: number;
	needY: number;
	ref: null | HTMLDivElement;
}

/**
 * @description  将 wrapper容器移动数据state进行响应式代理
 * 通过在wrapper中监听Mousedown Mousemove,
 * 修改state,进而修改contaner中对wrapperMoveState的引用
 *
*/
export const wrapperMoveState:WrapperMoveStateProps = reactive<WrapperMoveStateProps>({
	isDrag: false,
	startX: 0,
	startY: 0,
	needX: 0,
	needY: 0,
	ref: null,
});


export const wrapperEvent = (ref: HTMLDivElement, config: UserConfig) => {
	const scale = config.getScaleState().value;
	const store = config.getStore();
	return {
		onMousedown: (e: MouseEvent) => {
			// e.preventDefault();// 不能使用preventDefault 否则弹窗输入框焦点无法触发
			// contextMenuState.unmountContextMenu();  // 暂时屏蔽右键菜单；
			if (e.target !== ref) {
			} else {
				wrapperMoveState.isDrag = true;
				wrapperMoveState.startX = e.clientX;
				wrapperMoveState.startY = e.clientY;
				if (ref) {
					ref.style.cursor = 'grab';
					wrapperMoveState.ref = ref;
				}
			}
		},
		onMousemove: (e: MouseEvent) => {
			if (wrapperMoveState.isDrag) {
				const diffX = e.clientX - wrapperMoveState.startX;
				const diffY = e.clientY - wrapperMoveState.startY;
				wrapperMoveState.needX = wrapperMoveState.needX + diffX / scale;
				wrapperMoveState.needY = wrapperMoveState.needY + diffY / scale;
				wrapperMoveState.startX = e.clientX;
				wrapperMoveState.startY = e.clientY;
				store.forceUpdate();
      }
			containerResizer.onMouseMove(e, config);
		},
	};
};

/**
 * @description
 *
*/
export const wrapperMoveMouseUp = (config: UserConfig) => {
	if (wrapperMoveState.ref && wrapperMoveState.ref) {
		wrapperMoveState.ref.style.cursor = 'default';
	}
	containerResizer.onMouseUp(config);
	wrapperMoveState.isDrag = false;
};
