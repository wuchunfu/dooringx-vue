/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-16 21:38:15
 * @LastEditTime: 2021-11-25 21:41:38
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/plugin/index.tsx
 */

import  type { InitConfig } from '@dooring/dooringx-vue-lib';
import {LeftRegistComponentMapItem} from '@dooring/dooringx-vue-lib/src/core/crossDrag'
import Button  from './regist-components/button'
// 物料中心组件所有注册组件Map;
const LeftRegistMap: LeftRegistComponentMapItem[] = [
	{
		type: 'basic',
		component: 'button',
		img: 'icon-anniu1',
		displayName: '按钮',
		urlFn: () => import('./regist-components/button'),
  },
  {
    type: 'basic',
    component: 'checkbox',
    img: 'icon-duoxuan',
    displayName: '复选框',
    urlFn: () => import('./regist-components/button'),
  },
  {
    type: 'basic',
    component: 'qrcode',
    img: 'icon-erweima',
    displayName: '二维码',
    urlFn: () => import('./regist-components/button'),
  },
  // 媒体组件
  {
    type: 'media',
    component: 'videoCo',
    img: 'icon-shipin-',
    displayName: '视频组件',
    urlFn: () => import('./regist-components/button'),
  },
  {
    type: 'media',
    component: 'voiceCo',
    img: 'icon-yinpin1',
    displayName: '音频组件',
    urlFn: () => import('./regist-components/button'),
  },
  // 可视化组件
  {
    type: 'visual',
    component: 'pieChart',
    img: 'icon-bingzhuangtu',
    displayName: '饼状图组件',
    urlFn: () => import('./regist-components/button'),
  },
  {
    type: 'visual',
    component: 'areaChart',
    img: 'icon-mianjitu',
    displayName: '面积图组件',
    urlFn: () => import('./regist-components/button'),
  }
]
// 用于config类型定义
export const defaultConfig: Partial<InitConfig> = {
  leftAllRegistMap: LeftRegistMap,
  leftRenderListCategory: [
    {
      type: 'basic',
      icon: 'icon-biaoge',
      displayName: '基础组件'
    },
    {
      type: 'media',
      icon: 'icon-shipin',
      displayName: '媒体'
    },
    {
      type: 'visual',
      icon: 'icon-bingzhuangtu',
      displayName: '可视化'
    }
  ],
  rightRenderListCategory: [
    {
      type: 'style',
      displayName:"外观"
    },
    {
      type: 'animate',
      displayName:"动画"
    },
    {
      type: 'fn',
      displayName:"函数"

    },
    {
      type: 'actions',
      displayName:"事件"
    },
  ],
  initComponentCache: {
    button: { component: Button }
  }
}
