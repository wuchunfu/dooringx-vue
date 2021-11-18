/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-09 16:07:18
 * @LastEditTime: 2021-11-17 15:13:03
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/vite.config.ts
 */
import { defineConfig ,ConfigEnv,UserConfig,loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path';
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// windicss
import WindiCSS from 'vite-plugin-windicss'
// vant
import styleImport from 'vite-plugin-style-import';
const CWD = process.cwd()



// https://cn.vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {

    // 环境变量
  const { VITE_BASE_URL } = loadEnv(mode, CWD)

  return {
    base: './',             // 设开发或生产环境服务的 公共基础路径
    define: {              // 类型： Record<string, string> 定义全局变量替换方式。每项在开发时会被定义为全局变量，而在构建时则是静态替换。
      'process.platform': null,
      'process.version': null,
    },
    plugins: [           // 类型： (Plugin | Plugin[])[]  将要用到的插件数组
      vue(),
      vueJsx(),
      WindiCSS(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style`,
          },
        ],
      })
    ],
    resolve: {          // 类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string }> 将会被传递到 @rollup/plugin-alias 作为它的 entries。
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, './src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'] // 类型： string[] 导入时想要省略的扩展名列表。
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层

      // 服务配置
      port: 4399,    // 类型： number 指定服务器端口;
      open: true,   // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true,  // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {    // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
        '/api': {
          target: 'http://106.12.45.247:3000/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/api', '')
        }
      },
    },
    // https://www.vitejs.net/config/#build-commonjsoptions
    build: {
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
      commonjsOptions: {
        ignoreDynamicRequires: false, // Default: false
        transformMixedEsModules: true,
        sourceMap: false
      },
    },
    optimizeDeps: {
      include: [
        'element-plus/lib/locale/lang/zh-cn',
        'element-plus/lib/locale/lang/en'
      ]

    },
  }
}
