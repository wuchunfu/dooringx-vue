/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 15:28:36
 * @LastEditTime: 2021-11-17 15:28:36
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/store/storeTypes.ts
 */

export interface IStoreData {
	container: {
		width: number;
		height: number;
	};
	block: Array<IBlockType>;
	modalMap: Record<string, IStoreData>;
	dataSource: Record<string, any>;
	globalState: Record<string, any>;
	modalConfig: Record<string, any>;
}

export interface IBlockType {
	id: string;
	name: string;
	top: number;
	left: number;
	zIndex: number;
	position: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky';
	width?: number | string;
	height?: number | string;
	display?: 'inline-block' | 'block' | 'inline';
	focus: boolean;
	resize: boolean;
	canDrag: boolean;
	props: Record<string, any>;
	// syncList: Array<string>;
	// functionList: Array<string>; //抛出的函数名
	// rotate: {
	// 	value: number;
	// 	canRotate: boolean;
	// };
	// animate: {
	// 	animate?: string; //动画名
	// 	animationIterationCount?: number | string;
	// 	speed?: //动画速度
	// 	'animate__slow' | 'animate__slower' | 'animate__fast' | 'animate__faster' | '';
	// 	delay?: //首次延迟
	// 	'animate__delay-2s' | 'animate__delay-3s' | 'animate__delay-4s' | 'animate__delay-5s' | '';
	// };
	fixed: boolean; // 用于制作fixed组件
}
