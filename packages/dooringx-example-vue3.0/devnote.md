<!--
 * @Author: GeekQiaQia
 * @Date: 2021-11-15 17:03:49
 * @LastEditTime: 2021-11-19 15:21:51
 * @LastEditors: GeekQiaQia
 * @Description: 
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/devnote.md
-->
[windicss 样式库](https://windicss.org/features/)
[windicss 与vite 集成](https://windicss.org/integrations/vite.html)

开发思路：
*  左侧物料中心数据展示和遍历；
*  构造一些假数据，实现位置渲染内容；
* 配置组件对应映射关系:{preview:xxx,render:xxx}
* jsonSchema 的作用是描述渲染器如何渲染组件；


* 移动端组件使用 vant
[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/quickstart)
```
npm i vant@next -S 
``` 

## 组件开发流程：
我们通过 `ComponentItemFactory` 工厂函数创建一个组件对象；



## 开发调试
### 局部链接
通过 npm link 进行局部链接；
如：@dooring/dooringx-vue-lib
```
npm link

```
### 全局链接
执行
```
lerna link

```