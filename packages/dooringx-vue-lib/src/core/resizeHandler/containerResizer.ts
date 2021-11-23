/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-23 13:43:41
 * @LastEditTime: 2021-11-23 13:47:23
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/resizeHandler/containerResizer.ts
 */


import UserConfig from '../../config';
import { IStoreData } from '../store/storetypes';
import { deepCopy } from '../utils';

export const containerState = {
	isDrag: false,
	startY: 0,
	startIndex: 0,
	minHeight: 667,
};

export const containerResizer = {
	onMousedown: (e: MouseEvent, config: UserConfig) => {
		const store = config.getStore();
		containerState.isDrag = true;
		containerState.startY = e.clientY;
		containerState.startIndex = store.getIndex();
	},
	onMouseMove: (e: MouseEvent, config: UserConfig) => {
		if (containerState.isDrag) {
			const scaleState = config.getScaleState();
			const store = config.getStore();
			const scale = scaleState.value;
			const diff = ((e.clientY - containerState.startY) / scale) * 2; //可以直接使用movementy
			const clonedata: IStoreData = deepCopy(store.getData());
			const height = clonedata.container.height;
			let tmpHeight = Math.round(
				height + diff < containerState.minHeight ? containerState.minHeight : height + diff
			);
			clonedata.container.height = tmpHeight;
			store.setData(clonedata);
			containerState.startY = e.clientY;
		}
	},
	onMouseUp: (config: UserConfig) => {
		if (containerState.isDrag) {
			const store = config.getStore();
			containerState.isDrag = false;
			const endIndex = store.getIndex();
			store.getStoreList().splice(containerState.startIndex, endIndex - containerState.startIndex);
			store.setIndex(containerState.startIndex);
		}
	},
};
