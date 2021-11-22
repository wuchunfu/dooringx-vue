/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-16 17:52:10
 * @LastEditTime: 2021-11-22 16:25:10
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/config/index.tsx
 */

import ComponentRegister from '../core/components';
import { LeftRegistComponentMapItem } from '../core/crossDrag';
import { IBlockType, IStoreData } from '../core/store/storeTypes';
import { ComponentItemFactory } from '../core/components/abstract';
import Store from '../core/store';
import {reactive} from 'vue'
import {focusState} from '../core/focusHandler/state'
/**
 *
 * @urlFn 组件异步加载函数
 * @component  组件默认导出
 * @export
 * @interface CacheComponentValueType
 */
export interface CacheComponentValueType {
	component?: ComponentItemFactory;
}
export type CacheComponentType = Record<string, CacheComponentValueType> | {};
export type AsyncCacheComponentType = Record<string, () => Promise<any>>;

/**
 *
 *
 * @export 左侧的图标 custom 自定义渲染
 * @interface LeftMapRenderListPropsItemCategory
 */
export interface LeftMapRenderListPropsItemCategory {
	type: string;
	icon: any;
	custom?: boolean;
	customRender?: any;
	displayName?: string;
}


export const defaultStore: IStoreData = {
	container: {
		width: 375,
		height: 667,
	},
	block: [],
	modalMap: {},
	dataSource: {
		defaultKey: 'defaultValue',
	},
	globalState: {
		containerColor: 'rgba(255,255,255,1)',
		title: 'dooring',
		bodyColor: 'rgba(255,255,255,1)',
	},
	modalConfig: {},
};

// 设置部分
export interface InitConfig {
	/**
	 * 初始化store
	 * @type {IStoreData[]}
	 * @memberof InitConfig
	 */
	initStoreData: IStoreData[];

	/**
	 *  左边tab页组件渲染包括异步路径  { type: 'basic', component: 'button', img: 'http://xxxx/1.jpg' ,url:'' },
	 * @memberof InitConfig
	 */
	leftAllRegistMap: LeftRegistComponentMapItem[];
	/**
	 * 左边tab页图标配置
	 * type icon custom customRender
	 * @memberof InitConfig
	 */
  leftRenderListCategory: LeftMapRenderListPropsItemCategory[];

  /**
	 * 组件加载缓存判定，用来设置不异步加载的组件
	 * @memberof InitConfig
	 */
	initComponentCache: CacheComponentType;

	/**
	 *
	 * 内置数据中心配置数据
	 * @memberof InitConfig
	 */
	// initDataCenterMap: Record<string, any>;

}

export const defaultConfig: InitConfig = {
	initStoreData: [defaultStore],
	leftAllRegistMap: [],
	leftRenderListCategory: [],
	initComponentCache: {},
};


/**
 *
 * 部分无法合并属性如果b传了会以b为准
 * initstore不合并
 * leftallregistmap合并
 * leftRenderListCategory合并
 * rightRenderListCategory合并
 * rightGlobalCustom 不合并
 * initComponentCache合并
 * initFunctionMap合并
 * initDataCenterMap合并
 * initCommandModule合并
 * initFormComponents合并
 * containerIcon不合并
 *
 * @export InitConfig
 */
export function userConfigMerge(a: Partial<InitConfig>, b?: Partial<InitConfig>): InitConfig {
	const mergeConfig: InitConfig = {
		initStoreData: [defaultStore],
		leftAllRegistMap: [],
		leftRenderListCategory: [],
    initComponentCache: {},
	};
	if (!b) {
		return userConfigMerge(mergeConfig, a);
	}
	mergeConfig.initStoreData = b.initStoreData
		? [...b.initStoreData]
		: a.initStoreData
		? [...a.initStoreData]
		: [defaultStore];


	mergeConfig.leftAllRegistMap = b.leftAllRegistMap
		? a.leftAllRegistMap
			? [...a.leftAllRegistMap, ...b.leftAllRegistMap]
			: [...b.leftAllRegistMap]
		: a.leftAllRegistMap
		? [...a.leftAllRegistMap]
		: [];
	mergeConfig.leftRenderListCategory = b.leftRenderListCategory
		? a.leftRenderListCategory
			? [...a.leftRenderListCategory, ...b.leftRenderListCategory]
			: [...b.leftRenderListCategory]
		: a.leftRenderListCategory
		? [...a.leftRenderListCategory]
    : [...defaultConfig.leftRenderListCategory];

  mergeConfig.initComponentCache = {
      ...a.initComponentCache,
      ...b.initComponentCache,
    };
	return mergeConfig;
}

/**
 *
 *
 * @export 用户配置项
 * @class UserConfig
 */
export class UserConfig {
	public initConfig: InitConfig;
  public store = new Store();
	public componentRegister = new ComponentRegister();

	public componentCache = {};
	public asyncComponentUrlMap = {} as AsyncCacheComponentType;
	public focusState = focusState;
	public collapsed = false;
	public ticker = true;

	constructor(initConfig?: Partial<InitConfig>) {
		const mergeConfig = userConfigMerge(defaultConfig, initConfig);
    this.initConfig = mergeConfig;

		// this.commanderRegister = new CommanderWrapper(this.store, {}, this);
		// this.eventCenter = new EventCenter({}, mergeConfig.initFunctionMap);
		// this.dataCenter = new DataCenter(mergeConfig.initDataCenterMap);
		this.init();
		// 右侧配置项注册 初始注册组件暂时固定
	}
  // 执行组件注册
	toRegist() {
		// const modules = this.initConfig.initFormComponents;
		// formComponentRegisterFn(this.formRegister, modules);

		const cache = this.initConfig.initComponentCache;
		this.componentCache = cache;
		// 拿到组件缓存后，先同步加载map上组件
		Object.values(cache).forEach((v) => {
			if ((v as CacheComponentValueType).component) {
				this.registComponent((v as CacheComponentValueType).component!);
			}
		});
		// 异步组件注册地址
		this.initConfig.leftAllRegistMap.forEach((v) => {
			if (v.urlFn) {
				//@ts-ignore
				this.asyncComponentUrlMap[v.component] = v.urlFn;
			}
		});
		// // 注册画布上组件
		// this.store.getData().block.forEach((v) => {
		// 	this.asyncRegistComponent(v.name);
		// });

		// // 注册data
		// this.dataCenter = new DataCenter(this.initConfig.initDataCenterMap);
		// //数据需要加上store上的
		// this.dataCenter.initAddToDataMap(this.store.getData(), this.storeChanger);
		// // 修改事件与数据初始
		// this.eventCenter = new EventCenter({}, this.initConfig.initFunctionMap);
		// // 注册画布事件
		// this.eventCenter.syncEventMap(this.store.getData(), this.storeChanger);
	}

	init() {
		// this.store.resetToInitData(deepCopy(this.initConfig.initStoreData), true);
		this.toRegist();
	}

	getCollapse() {
		return this.collapsed;
	}

	// getStoreJSON() {
	// 	return JSON.stringify(this.store.getData());
	// }

	parseStoreJson(json: string) {
		return JSON.parse(json);
	}

	// resetData(data: IStoreData[]) {
	// 	this.store.resetToInitData(data, true);
	// 	this.toRegist();
	// }

	// getWrapperMove() {
	// 	return {
	// 		data: this.wrapperMoveState,
	// 		iframe: this.iframeWrapperMoveState,
	// 	};
	// }
  // 获取当前block组件选中元素，多个元素选中可以为数组；
	getFocusState() {
		return this.focusState;
	}
	// getScaleState() {
	// 	return this.scaleState;
	// }
	// getDataCenter() {
	// 	return this.dataCenter;
	// }
	// getEventCenter() {
	// 	return this.eventCenter;
	// }
	// getStoreChanger() {
	// 	return this.storeChanger;
	// }
	getConfig() {
		return this.initConfig;
  }
  // 获取当前store 仓库实例
	getStore() {
		return this.store;
  }
  // 获取注册组件实例
	getComponentRegister() {
		return this.componentRegister;
	}
	// getContextMenuState() {
	// 	return this.contextMenuState;
	// }
	// getFormRegister() {
	// 	return this.formRegister;
	// }
	// getCommanderRegister() {
	// 	return this.commanderRegister;
	// }

	/**
	 *
	 * 以默认设置重置配置项
	 * @param {Partial<InitConfig>} v
	 * @memberof UserConfig
	 */
	resetConfig(v: Partial<InitConfig>) {
		const mergeConfig = userConfigMerge(defaultConfig, v);
		this.initConfig = mergeConfig;
		this.init();
		// this.store.forceUpdate();
	}
	/**
	 *  会重置配置，请修改配置后增加
	 * 异步增加左侧tab页
	 * @memberof UserConfig
	 */
	addLeftCategory(v: LeftMapRenderListPropsItemCategory[]) {
		const obj = {} as InitConfig;
		obj.leftRenderListCategory = v;
		this.initConfig = userConfigMerge(this.initConfig, obj);
		this.init();
		// this.store.forceUpdate();
	}

	/**
	 *  会重置配置，请修改配置后增加
	 * 异步增加右侧tab页
	 * @memberof UserConfig
	 */
	// addRightCategory(v: RightMapRenderListPropsItemCategory[]) {
	// 	const obj = {} as InitConfig;
	// 	obj.rightRenderListCategory = v;
	// 	this.initConfig = userConfigMerge(this.initConfig, obj);
	// 	this.init();
	// 	this.store.forceUpdate();
	// }

	/**
	 * 会重置配置，请修改配置后增加
	 * 异步增加组件map
	 * @memberof UserConfig
	 */
	addCoRegistMap(v: LeftRegistComponentMapItem) {
		const obj = {} as InitConfig;
		obj.leftAllRegistMap = [v];
		this.initConfig = userConfigMerge(this.initConfig, obj);
		this.init();
		// this.store.forceUpdate();
	}

	/**
	 *会重置配置，请修改配置后增加
	 * 异步修改config 重置store
	 * @memberof UserConfig
	 */
	setConfig(v: Partial<InitConfig>) {
		this.initConfig = userConfigMerge(this.initConfig, v);
		this.init();
		// this.store.forceUpdate();
	}

	/**
	 *
	 * 同步注册指令
	 * @param {CommanderItem} command
	 * @memberof UserConfig
	 */
	// registCommander(command: CommanderItem) {
	// 	this.commanderRegister.register(command);
	// }

	/**
	 *
	 * 用于修改markline配置
	 * @returns
	 * @memberof UserConfig
	 */
	// getMarklineConfig() {
	// 	return this.marklineConfig;
	// }

	getComponentCache() {
		return this.componentCache;
	}
	/**
	 *
	 * 同步注册组件，不会检测缓存是否存在
	 * @param {ComponentItemFactory} item
	 * @memberof UserConfig
	 */
	registComponent(item: ComponentItemFactory) {
		this.componentRegister.register(item);
	}
	/**
	 *
	 * 异步注册组件，会判定缓存是否存在
	 * @param {string} name
	 * @memberof UserConfig
	 */
	// async asyncRegistComponent(name: string) {
	// 	//判定缓存
	// 	if (
	// 		!(this.componentCache as Record<string, CacheComponentValueType>)[name] &&
	// 		this.asyncComponentUrlMap[name]
	// 	) {
	// 		const chunk = await this.asyncComponentUrlMap[name]();
	// 		const chunkDefault = chunk.default;
	// 		this.componentRegister.register(chunkDefault);
	// 		(this.componentCache as Record<string, CacheComponentValueType>)[name] = {
	// 			component: chunkDefault,
	// 		};
	// 		this.componentRegister.emitEvent(name);
	// 	}
	// }
}

export default UserConfig;
