/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 15:27:19
 * @LastEditTime: 2021-11-17 15:59:12
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-vue-lib/src/core/components/abstract.ts
 */
import { ComponentItem } from './componentItem';

export class ComponentItemFactory implements ComponentItem {
	constructor(
		public name: ComponentItem['name'],
		public display: ComponentItem['display'],
		public props: ComponentItem['props'],
		public initData: ComponentItem['initData'],
		public render: ComponentItem['render'],
		public resize: ComponentItem['resize'] = true,
		public needPosition: ComponentItem['needPosition'] = true,
		public init: ComponentItem['init'] = () => {},
		public destroy: ComponentItem['destroy'] = () => {}
	) {}
}
