/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-19 17:08:04
 * @LastEditTime: 2021-11-19 19:15:05
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/store/index.ts
 */


import { IStoreData } from './storetypes';
// import { storeChangerState } from '../storeChanger/state';

export const initialData: IStoreData = {
	container: {
		width: 375,
		height: 667,
	},
	block: [
    {
      id: "input-to0-ogdnOOaskrE-DbXbl",
      top: 119,
      zIndex: 0,
      canDrag: true,
      display: "block",
      fixed: false,
      focus: false,
      left: 19,
      resize: true,
      name: "button",
      props:{
        width:100,
        height:30,
        "text": "primary",
        "sizeData": [
            100,
            30
        ],
        "backgroundColor": "rgba(0,132,255,1)",
        "lineHeight": 1,
        "borderRadius": 0,
        "borderData": {
            "borderWidth": 0,
            "borderColor": "rgba(0,0,0,1)",
            "borderStyle": "solid"
        },
        "fontData": {
            "fontSize": 14,
            "textDecoration": "none",
            "fontStyle": "normal",
            "color": "rgba(255,255,255,1)",
            "fontWeight": "normal"
        },
        "boxShadowData": {
            "xOffset": 0,
            "yOffset": 0,
            "blurRadius": 4,
            "color": "rgba(255,255,255,0)"
        }
      },
      position: "absolute"}
  ],
	modalMap: {},
	dataSource: {},
	globalState: {},
	modalConfig: {},
};


class Store {
	static instance: Store;
	constructor(
		public storeDataList: IStoreData[] = [initialData],
		public listeners: Array<Function> = [],
		public current: number = 0,
		public forceupdate: Function = () => {}
	) {}

	getData() {
		return this.storeDataList[this.current];
	}
	getStoreList() {
		return this.storeDataList;
	}

	getListeners() {
		return this.listeners;
	}

	getIndex() {
		return this.current;
	}
	/**
	 *
	 * 注意重置需要注册事件
	 * @param {IStoreData[]} initData
	 * @param {boolean} [check=false]
	 * @memberof Store
	 */
	resetToInitData(initData: IStoreData[], check = false) {
		this.storeDataList = initData;
		this.current = 0;
		//如果是编辑模式，需要修改
		// if (storeChangerState.modalEditName !== '' && check) {
		// 	storeChangerState.modalEditName = '';
		// }
		this.emit();
	}
	/**
	 *
	 * 注意重置需要注册事件
	 * @param {IStoreData[]} initData
	 * @param {number} current
	 * @param {boolean} [check=false]
	 * @memberof Store
	 */
	resetToCustomData(initData: IStoreData[], current: number, check = false) {
		this.storeDataList = initData;
		this.current = current;
		//如果是编辑模式，需要修改
		// if (storeChangerState.modalEditName !== '' && check) {
		// 	storeChangerState.modalEditName = '';
		// }
		this.emit();
	}
	resetListeners() {
		this.listeners = [];
	}

	replaceList(list: IStoreData[]) {
		this.storeDataList = list;
	}

	setForceUpdate(fn: Function) {
		this.forceupdate = fn;
	}
	forceUpdate() {
		this.forceupdate();
	}

	setIndex(num: number) {
		this.current = num;
	}

	redo() {
		const maxLength = this.storeDataList.length;
		if (this.current + 1 < maxLength) {
			this.current = this.current + 1;
			this.emit();
		}
	}

	undo() {
		if (this.current > 0) {
			this.current = this.current - 1;
			this.emit();
		}
	}

	cleanRedundant(index: number) {
		this.storeDataList = this.storeDataList.slice(0, index + 1);
	}

	setData(data: IStoreData) {
		// 如果current不是最后那个，说明后面的被undo过的，如果要新增，那么需要清除之前的
		let flag = true;
		if (this.current + 1 !== this.storeDataList.length) {
			this.cleanRedundant(this.current);
			flag = false;
		}
		this.current = this.current + 1;
		this.storeDataList[this.current] = data;
		if (flag && this.current + 1 !== this.storeDataList.length) {
			this.storeDataList.length = this.current + 1;
		}

		this.emit();
	}

	emit() {
		this.listeners.forEach((fn) => {
			fn(this.getData());
		});
	}

	subscribe(listener: Function) {
		this.listeners.push(listener);
		return () => (this.listeners = this.listeners.filter((v) => v !== listener));
	}
}

export default Store;
