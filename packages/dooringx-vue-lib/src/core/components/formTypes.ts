/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 16:01:20
 * @LastEditTime: 2021-11-17 16:01:21
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/components/formTypes.ts
 */


export interface CreateOptionsResAll {
	type: string;
	option: any;
}

export interface CreateOptionsRes<T, K extends keyof T> {
	type: keyof T;
	option: T[K];
}

export function createPannelOptions<T, K extends keyof T>(
	type: K,
	option: T[K]
): CreateOptionsRes<T, K> {
	return {
		type,
		option,
	};
}
