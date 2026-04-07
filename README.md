# vue-weui-next-demo Skill

> 一个用于 [Claude Code](https://claude.ai/code) 的 Skill，帮你快速生成符合 `@tencent/vue-weui-next` 规范的 Vue 3 组件 Demo 和页面。

## 能做什么

- 自动生成符合 WeUI 规范的 Vue 3 组件 Demo 页面
- 确保 `MpButton`、`MpInput`、`MpDialog`、`MpCells` 等所有 `Mp*` 组件用法正确
- 自动配置 `main.ts` 全量引入（含样式）
- 生成完整的 Vite + TypeScript 工程脚手架
- 规避常见错误（v-model 写法、CSS 遗漏、事件名错误等）

## 技术栈

| 技术 | 版本 |
|------|------|
| Vue 3 | Composition API + `<script setup>` |
| TypeScript | ✅ |
| Vite | ✅ |
| @tencent/vue-weui-next | ~0.3.3 |

## 安装

将本仓库克隆到你的 Claude Code skills 目录：

```bash
git clone https://github.com/PENGJANE/vue-weui-next-demo-skill.git \
  ~/.codebuddy/skills/vue-weui-next-demo
```

## 使用方式

在 Claude Code 中，使用以下任意触发短语即可激活该 Skill：

```
用 vue-weui-next 写一个表单页面
生成 WeUI 组件 Demo
按照 WeUI 规范写一个登录页
生成 Demo
写一个 WeUI 页面
@tencent/vue-weui-next
```

## 示例

**输入：**
> 用 vue-weui-next 写一个包含输入框、开关和弹窗的表单页面

**输出：**
- 完整的 Vite + Vue 3 + TypeScript 工程结构
- 正确配置 `main.ts` 全量引入
- 使用 `<MpInput>`、`<MpSwitch>`、`<MpDialog>` 并绑定正确的 `v-model`

## 目录结构

```
vue-weui-next-demo/
├── SKILL.md                    # Skill 主配置（Claude Code 读取）
├── references/
│   ├── api_reference.md        # 所有 Mp* 组件的 Props / Events / Slots
│   └── project_template.md     # 完整工程 boilerplate 模板
└── assets/                     # 预留资源目录
```

## 核心规范速览

### 全量引入（main.ts）

```ts
import { createApp } from 'vue'
import WeUI from '@tencent/vue-weui-next'
import App from './App.vue'
import '@tencent/vue-weui-next/dist/index.css'  // 不可省略

createApp(App).use(WeUI).mount('#app')
```

### v-model 用法

```vue
<MpInput v-model="name" />
<MpDialog v-model="dialogVisible" />
<MpToast v-model:show="toastVisible" />
```

### 常见错误对照

| ❌ 错误写法 | ✅ 正确写法 |
|-----------|-----------|
| 在 .vue 中单独 import MpButton | 全量引入后无需再 import |
| 忘记引入 CSS | `import '@tencent/vue-weui-next/dist/index.css'` |
| `<script setup>` 不加 `lang="ts"` | 加上 `lang="ts"` |
| `:value` + `@input` | 直接用 `v-model` |
| `@confirm` | 应使用 `@ok` |

## 参考资料

- [官方文档](https://vue-weui-next.pages.woa.com/docs/guide/quickstart.html)
- [API Reference](./references/api_reference.md)
- [工程模板](./references/project_template.md)
