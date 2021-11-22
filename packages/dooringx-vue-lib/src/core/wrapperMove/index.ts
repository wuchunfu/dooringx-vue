/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-22 18:04:51
 * @LastEditTime: 2021-11-22 22:06:00
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/wrapperMove/index.ts
 */

import UserConfig from '../../config';


export interface WrapperMoveStateProps {
	isDrag: boolean;
	startX: number;
	startY: number;
	needX: number;
	needY: number;
	ref: null | HTMLDivElement;
}

export const wrapperMoveState: WrapperMoveStateProps = {
	isDrag: false,
	startX: 0,
	startY: 0,
	needX: 0,
	needY: 0,
	ref: null,
};

export const wrapperMoveMouseUp = (config: UserConfig) => {
	if (wrapperMoveState.ref && wrapperMoveState.ref) {
		wrapperMoveState.ref.style.cursor = 'default';
	}
	// containerResizer.onMouseUp(config);  // 暂时不考虑resize;
	wrapperMoveState.isDrag = false;
};
