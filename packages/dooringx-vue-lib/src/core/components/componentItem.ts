/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 15:28:06
 * @LastEditTime: 2021-11-17 16:15:39
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/components/componentItem.ts
 */

import {IBlockType} from '../store/storeTypes'
// import UserConfig from '../../config';
// import Store from '../store';
import { CreateOptionsResAll } from './formTypes';

/**
 *
 * 包装部分配置，渲染配置，条件渲染，属性
 * @export
 * @interface ComponentItem
 */
export interface ComponentItem {
	init: () => void;
	name: string; // map上key名
	display: string; //显示名称
	resize: boolean;
	needPosition: boolean; //是否要使用拖拽的点
	initData: Partial<IBlockType>; //初始值
	props: Record<string, CreateOptionsResAll[]>; // 配置属性
  // render: (data: IBlockType, context: any, store: Store, config: UserConfig) => JSX.Element;
	render: (data: IBlockType, context: any) => JSX.Element;
	destroy: () => void;
}
export type ComponentRenderConfigProps = {
	data: IBlockType;
	context: any;
	// store: Store;
	// config: UserConfig;
};
