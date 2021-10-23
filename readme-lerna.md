
# lerna playground 
[本例项目演示地址](https://github.com/GeekQiaQia/lerna-playground.git)

[lerna官网](<https://www.lernajs.cn/>)

[lernaGithub](<https://github.com/lerna/lerna>)
## lerna 起步
Lerna 2.x 是推荐的开始版本[lerna.org](https://lerna.js.org/)

    npm install --global lerna

接下来我们将创建一个新的 git 存储库：

    git init lerna-repo
    cd lerna-repo
创建一个新的 lerna 存储库或将现有存储库升级到 Lerna 的当前版本。

    lerna init

初始化成功如下所示：
```js
    lerna notice cli v4.0.0
    lerna info Creating package.json
    lerna info Creating lerna.json
    lerna info Creating packages directory
    lerna success Initialized Lerna files
```


### 创建包 package

    lerna create mylerna  // 创建的包名 mylerna  
   默认已经帮我们生成以下文件：
     
    __test__       //单元测试
    lib           //入口lib主文件
    package.json // 配置文件
    README.MD   // readme
### 安装依赖    
>以安装依赖包 `yargs` 举例三种情况下的依赖安装；
```
lerna add yargs 
// 此时它会安装到所有的packages下面的项目中；

lerna add yargs  packages/mylerna
// 将依赖包安装到packages下的指定项目中；

npm i yargs
// 将会安装到learn 根目录依赖中；

```    
安装成功如下所示：
```js
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info Adding yarn in 1 package
lerna info Bootstrapping 2 packages
lerna info Installing external dependencies
lerna info Symlinking packages and binaries
lerna success Bootstrapped 2 packages
```

## 添加依赖
通过`lerna create` 我们在packages下创建多个包：
**cli**、**create**、**init**；

并在初始化时配置packages.json中name字段分别命名为：

    @frontendplayer/cli、@frontendplayer/init、@frontendplayer/create

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/431acfc95ad741e2bc6b4e1635beb323~tplv-k3u1fbpfcp-watermark.image?)

为避免冲突`@frontendplayer` 为我们自定义npm包组织名称；

在包名为**mylerna**中添加依赖：
```
"dependencies": {
    "yargs": "^17.1.1",
    "@frontendplayer/cli":"^0.0.0",
    "@frontendplayer/init":"^0.0.0",
    "@frontendplayer/create":"^0.0.0"
  }
```  


## `link` 链接依赖
在我们的**mylerna**包中执行依赖链接
```
 lerna link 
```
此时node_modules新增 @frontendplayer文件，包含 cli/create/init 软链接
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/010f910ba20b426da1dc5df5eee18017~tplv-k3u1fbpfcp-watermark.image?)
### 全局link
```
npm link  
```
执行成功如下所示：
```js
added 1 package, and audited 3 packages in 4s

found 0 vulnerabilities
```
查看全局 **link** 结果
```
npm root -g
// windows下：C:\Program Files\nodejs\node_modules

```

对应目录多出一个`@frontendplayer`的链接包

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83846274bce84aabad1a1bdac391f63b~tplv-k3u1fbpfcp-watermark.image?)
## `publish` 发布上线

```
lerna version // 查看版本
lerna publish // 发布 
```
首次发布需要将项目初始提交到git与远程仓库建立连接;

以下以 npm 公服为列：
### `Organization` 创建组织
[点击登录并创建](https://www.npmjs.com/org/create)npm组织

例：创建组织**frontendplayer**
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/135d0d0f46cd4b3b9e69a19a6991fd26~tplv-k3u1fbpfcp-watermark.image)

创建成功：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec7cdd93f1724920980aa62558a3423a~tplv-k3u1fbpfcp-watermark.image)

### `publishConfig` 修改为公服
将需要发布到公服组织的**package.json**,**publishConfig**字段改为如下所示：

```
   "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  },
```
### `npm login` 登录 npm
确保已经 **npm** 登录成功
```
npm login 
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f3e0c1effef412d84f7ab383e5daa0a~tplv-k3u1fbpfcp-watermark.image)

### `version`选择版本
Lerna 项目有两种模式：Fixed/Locked mode (default) | Independent mode，他们对应包版本号管理的两种方式。

#### Fixed/Locked mode (default)

这模式下所有包的版本同步一个主版本号，即 `lerna.json` 里的 `version`

```
{
  "version": "0.0.0"
}
复制代码
```

#### Independent mode

该模式下，每个包可以独立维护自己的版本号，如果要指定独立运行模式，在 lerna.json 里指定 version 配置如下：

```
{
  "version": "independent"
}
```

演示项目为固定模式，此时packages下的所有包都统一升级为:`^0.1.3`,如下所示：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93dfcb5755fb4d7da05a170091a35c62~tplv-k3u1fbpfcp-watermark.image)

发布成功：
```js
Successfully published:
 - @frontendplayer/cli@0.1.3
 - @frontendplayer/create@0.1.3
 - @frontendplayer/init@0.1.3
 - @frontendplayer/mylerna@0.1.3
lerna success published 4 packages
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fddb97e77a6a43038b998471cda5dd98~tplv-k3u1fbpfcp-watermark.image)

查看[ npm 公服 frontendplayer](<https://www.npmjs.com/settings/frontendplayer/packages>)：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bf0e89fa0e54cfd85b9fb7282601f31~tplv-k3u1fbpfcp-watermark.image)
## 项目规范
通过`eslint`、`prettier`、`editorconfig`等工具规范代码风格，保证代码质量；
  ## `eslint` -统一代码质量
  > eslint 是一个插件化可配置的javascript 语法规则和代码风格的检查工具
  * 代码质量问题
    * 使用方式可能有问题
  * 代码风格问题
    * 风格不符合一定的规则
```
  npm i eslint --save-dev       
```
### .eslintrc.js
核心配置如下：
```
module.exports={
    extends:['eslint:recommended'],
    parserOptions:{
        ecmaVersion:2017,
        sourceType:'module'
    },
    rules:{

    },
    env:{
        node:true,jest:false
    }
}
``` 
更多配置详见文档[eslint](https://www.npmjs.com/package/eslint)

### .eslingignore
忽略检查目录
```
__tests__
```
**tips** 如果`vscode`可自行安装插件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31c5751bc5884e59a47a487cb1ee69ad~tplv-k3u1fbpfcp-watermark.image)
## `Prettier` -统一代码风格
> Prettier 主要解决代码风格问题，以统一固定的格式输出代码风格；是一个有主见的代码格式化工具；

```
npm i prettier eslint-plugin-prettier --save-dev
```
### 修改.eslintrc.js
>修改配置eslintrc 中的plugins和rules属性，使得prettier和eslint混合使用；
```
module.exports = {
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  plugins: ["prettier"], // 关闭和eslint 冲突的规则；走prettier风格
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  env: {
    node: true,
    jest: false,
  },
};

```
### 创建.prettierrc文件
>根目录创建.prettierrc ,并配置相关常见格式化规则；
```
{
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 200,
    "singleQuote": true,
    "trailingComma": "none",
    "bracketSpacing": true,
    "semi": false
  }
  
```
**tips** 如果`vscode`可自行安装插件
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7e1a8196c724d74904cbb0421028a35~tplv-k3u1fbpfcp-watermark.image)
## editorconfig 编辑器配置
> 帮助开发人员在不同的编辑器和IDE之间定义和维护一致的编码风格

不同的开发人员，不同的编辑器，有不同的代码风格，EditorConfig用来协调团队开发人员之间的及样式规范化的一个工具；
* 说明
    * Unix 系统中，每行结尾只有**换行**，即 \n LF(line Feed)
    * Windows 系统中，每行结尾是**换行回车**，即\r\n CR/LF
    * Mac 系统里，每行结尾是**回车** ，即\r CR(Carriage Return)
>根目录创建.editorconfig ,并配置编辑器统一规则；
```
root=true

[*]
indent_style=space
indent_size=2
end_of_line=lf
charset=utf-8
trim_trailing_whitespace=true


[*.md]
trim_trailing_whitespace=false

```
**tips** 如果`vscode`可自行安装插件
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63957f1db24b4a24add11eb355ee22e2~tplv-k3u1fbpfcp-watermark.image)
## 规范总结
开发过程中通过统一的代码风格和规范，在不同的编辑器环境中，保持统一的风格，有利于代码的维护和代码质量的保证；

## 参考命令
  ### 项目初始化
  | 命令               |       说明                        | 
| --------------------- | ------------------------------- | 
| lerna init | 初始化项目   |

### 创建包
  | 命令               |       说明                        | 
| --------------------- | ------------------------------- | 
| lerna create | 创建package 包   |
| lerna add    | 安装依赖   |
| lerna link   | 链接依赖   |

### 开发和调试
  | 命令               |       说明                        | 
| --------------------- | ------------------------------- | 
| lerna exec | 执行shell脚本   |
| lerna run  'command' | 执行npm命令   'command'   |
| lerna run  'command' --scope 'packageName'| 执行具体某个packageName下的npm命令'command'   |
| lerna clean               | 清空依赖   |
| lerna bootstrap   | 重新安装依赖   |


### 发布上线
  | 命令               |       说明                        | 
| --------------------- | ------------------------------- | 
| lerna version | 修改版本号   |
| lerna change   | 查看上个版本以来的所有变更   |


