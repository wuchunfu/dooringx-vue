/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-22 16:14:52
 * @LastEditTime: 2021-11-22 16:14:52
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/innerDrag/state.ts
 */


import { IBlockType } from '../store/storetypes';

export interface innerDragStateType {
	startX: number;
	startY: number;
	item: null | IBlockType;
	isDrag: boolean;
	ref: HTMLDivElement| null;
	current: number;
	lastClick: null | IBlockType;
}

export const innerDragState: innerDragStateType = {
	startX: 0,
	startY: 0,
	item: null,
	isDrag: false,
	ref: null,
	current: 0,
	lastClick: null,
};
