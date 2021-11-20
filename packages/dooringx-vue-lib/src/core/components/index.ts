/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-18 12:26:52
 * @LastEditTime: 2021-11-18 16:48:26
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/components/index.ts
 */

import { ComponentItem } from './componentItem';

/**
 *
 * 注册组件需要异步的，由注册时效果决定。
 * 主要是存放所有已注册组件。可以在其render时提供对应context
 * @class ComponentRegister
 */
class ComponentRegister {
	constructor(
		public componentMap: Record<string, ComponentItem> = {},
		public componentList: ComponentItem[] = [],
		public listener: Function[] = [],
		public eventMap: Record<string, Function[]> = {}
	) {}
	getMap() {
		return this.componentMap;
	}
	getList() {
		return this.componentList;
	}
	getComp(name: string) {
		return this.componentMap[name];
	}

	subscribe(fn: Function) {
		this.listener.push(fn);
		return () => this.listener.filter((v) => v !== fn);
	}

	emit() {
		this.listener.forEach((v) => v());
	}
  // 组件注册时提供组件事件注册
	on(event: string, fn: Function) {
		if (!this.eventMap[event]) {
			this.eventMap[event] = [];
		}
		this.eventMap[event].push(fn);
		return () => this.eventMap[event].filter((v) => v !== fn);
  }
  // 触发事件队列
	emitEvent(event: string) {
		if (!this.eventMap[event]) {
			return;
		}
		this.eventMap[event].forEach((v) => v());
	}
  // 注册组件到componentMap
	register(item: ComponentItem) {
		if (this.componentMap[item.name]) {
			// console.error(`${item.name} component has registed`);
			return;
		}
		this.componentMap[item.name] = item;
		this.componentList.push(item);
		this.emit();
		item.init();
	}

	unRegister(name: string) {
		if (!this.componentMap[name]) {
			console.error(`${name} component not found`);
			return;
		}
		const item = this.componentMap[name];
		item.destroy();
		this.emit();
		this.componentList = this.componentList.filter((v) => v !== item);
		delete this.componentMap[item.name];
	}
}
export default ComponentRegister;
