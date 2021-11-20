/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-20 13:48:58
 * @LastEditTime: 2021-11-20 13:53:39
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/utils/index.ts
 */

import { nanoid } from 'nanoid';
import deepCopys from 'deepcopy';




export function createUid(name?: string) {
	if (name) {
		return name + '-' + nanoid();
	} else {
		return nanoid();
	}
}

export function deepCopy<T = any>(obj: any): T {
	return deepCopys(obj);
}