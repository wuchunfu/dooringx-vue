/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-22 16:19:20
 * @LastEditTime: 2021-11-24 11:29:07
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/focusHandler/index.ts
 */

import UserConfig from "../../config";
import { innerDragState } from '../innerDrag/state';
import { IBlockType } from "../store/storeTypes";
import { deepCopy } from "../utils";

/**
 *
 * @description 获取当前选中block元素数组；
 *
*/
export function blockFocus(e: MouseEvent, item: IBlockType, config: UserConfig) {
	const store = config.getStore();
	const clonedata = deepCopy(store.getData());
	const focusState = config.getFocusState();
	if (e.shiftKey) {
		const newBlock = clonedata.block.map((v: IBlockType) => {
			if (v.id === item.id) {
				v.focus = true;
				focusState.blocks.push(item);
			}
			return v;
		});
		store.setData({ ...clonedata, block: newBlock });
	} else {
		let blocks: IBlockType[] = [];
		const newBlock = clonedata.block.map((v: IBlockType) => {
			if (v.id === item.id) {
				blocks.push(item);
				v.focus = true;
			} else {
				v.focus = false;
			}
			return v;
		});
		focusState.blocks = blocks;
		store.setData({ ...clonedata, block: newBlock });
	}
}

/**
 *
 * @description container 当焦点再次处于画板时，元素失去focus焦点；
 *
*/

export function containerFocusRemove(config: UserConfig) {
	const store = config.getStore();

	const onMousedown = (e: MouseEvent) => {
		const focusState = config.getFocusState();
		const clonedata = deepCopy(store.getData());
		const newBlock = clonedata.block.map((v: IBlockType) => {
			v.focus = false;
			return v;
		});
		focusState.blocks = [];
    store.setData({ ...clonedata, block: newBlock });
     // 暂时屏蔽其他几种情况
		// if (!innerDragState.item) {
		// 	selectRangeMouseDown(e, config);
		// }
		// unmountContextMenu();
	};
	return {
		onMousedown,
	};
}
