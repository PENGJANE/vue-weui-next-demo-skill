# Vue + vue-weui-next 工程模板

## 目录结构

```
my-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── src/
    ├── main.ts          ← 全量引入入口
    ├── App.vue          ← 根组件
    ├── router/
    │   └── index.ts
    ├── styles/
    │   └── global.css
    └── views/
        └── XxxDemo.vue  ← 各组件 Demo 页面
```

## package.json

```json
{
  "name": "weui-app",
  "version": "0.0.1",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build"
  },
  "dependencies": {
    "@tencent/vue-weui-next": "~0.3.3",
    "vue": "^3.4.0",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```

## main.ts（全量引入模板）

```ts
import { createApp } from 'vue'
import WeUI from '@tencent/vue-weui-next'
import App from './App.vue'
import router from './router'

import '@tencent/vue-weui-next/dist/index.css'  // 必须单独引入
import './styles/global.css'

createApp(App).use(WeUI).use(router).mount('#app')
```

## vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["@tencent/vue-weui-next/global"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

## Demo 页面写法模板

```vue
<template>
  <div>
    <div class="section-label">组件标题</div>
    <div class="demo-card">
      <div class="demo-card__title">组件名称</div>
      <div class="demo-card__body">
        <!-- 组件使用示例 -->
        <MpButton type="primary">按钮</MpButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// 全量引入后无需单独 import 组件
</script>
```

## 安装命令

```bash
# 切换到腾讯内网 npm 源
npm config set registry https://mirrors.tencent.com/npm/

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```
