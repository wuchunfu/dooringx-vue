/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 13:56:33
 * @LastEditTime: 2021-11-17 13:56:34
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/plugin/core/crossDrag/index.ts
 */


 /**
 *
 * @export
 * @interface LeftRegistComponentMapItem
 * @img 图片地址
 * @urlFn 组件异步加载函数
 */
export interface LeftRegistComponentMapItem {
  type: string;
  component: string;
  img: string;
  imgCustom?:any;
  displayName: string;
  urlFn?: () => Promise<any>;
}