# vue-weui-next-demo

> Claude Code Skill · 一次生成 WeUI 小程序页面的三份交付物

输入页面需求，直接输出三份可用文件：**原型 + PRD、技术文档、Vue SFC**。

> 需要**完整五阶段流程**（brainstorm → 设计参考风格预览 → 原型 → 技术文档 → Vue）？
> 请使用 [product-weui-demo](https://github.com/PENGJANE/product-weui-demo-skill) skill。

---

## 触发短语

```
用 vue-weui-next 写         生成 WeUI 原型
生成 WeUI 组件              按照 WeUI 规范
生成 Demo                   写一个 WeUI 页面
出一个原型图                @tencent/vue-weui-next
```

---

## 交付物说明

每次调用**必须输出三份文件**：

| 文件 | 受众 | 内容 |
|------|------|------|
| `{页面名}.html` | 产品 / 设计 | 可交互原型 **+** 产品需求文档（每个状态的触发条件、界面呈现、用户操作、状态流转、数据来源）|
| `{页面名}_tech.html` | 开发 | 左列：完整页面截图；右列：组件卡片（WeUI 可用 = live 预览 + Vue 代码；自定义 = 说明 + 自定义预览）|
| `{页面名}.vue` | 开发 | 完整 Vue SFC，`<script setup lang="ts">`，直接复制进工程 |

生成完成后运行截图脚本填充 `_tech.html` 左列截图：

```bash
npm install puppeteer        # 首次安装
node ~/.codebuddy/skills/vue-weui-next-demo/scripts/screenshot.js {页面名}.html
```

---

## `{页面名}.html` — 原型 + PRD

双重角色：

- **原型**：WeUI CSS 渲染，浏览器直接预览，JS 切换多个页面状态
- **PRD**：每个页面状态配产品逻辑说明，严格以 HTML 展示的视觉状态为准，不描述代码实现

每个状态包含：**触发条件 · 界面呈现 · 用户操作 · 状态流转 · 数据来源**（如需调用外部 API）

组件块标记规范（截图脚本依赖）：

```html
<!-- ✅ 每个组件单独一个块 -->
<div data-component="主按钮" data-vue='<MpButton type="primary">提交</MpButton>'>
  <a class="weui-btn weui-btn_primary">提交</a>
</div>

<!-- ❌ 多个组件混在一个块里 -->
<div data-component="表单">...</div>
```

---

## `{页面名}_tech.html` — 技术文档

左右两列布局：

```
┌──────────────────────┬──────────────────────────────────┐
│  左列：完整页面截图    │  右列：组件卡片                    │
│                      │  ┌──────────────────────────────┐│
│                      │  │ 组件名    [WeUI 可用]          ││
│                      │  │ live WeUI HTML 预览            ││
│                      │  │ Vue 代码 <pre>                ││
│                      │  └──────────────────────────────┘│
│                      │  ┌──────────────────────────────┐│
│                      │  │ 组件名    [自定义]             ││
│                      │  │ 说明文字                       ││
│                      │  │ 自定义 HTML 预览               ││
│                      │  └──────────────────────────────┘│
└──────────────────────┴──────────────────────────────────┘
```

| 标签 | 卡片内容 |
|------|---------|
| `[WeUI 可用]` | `.comp-preview`（live HTML）+ `<pre>`（Vue 代码），**不附 HTML 代码** |
| `[WeUI 部分可用]` | `.comp-preview` + `<pre>` + 一句调整说明 |
| `[自定义]` | `.custom-note` 说明原因 + `.comp-preview`（自定义预览）|

---

## `{页面名}.vue` — Vue SFC

工程 `main.ts` 全量引入，`.vue` 文件无需单独 import：

```ts
import { createApp } from 'vue'
import WeUI from '@tencent/vue-weui-next'
import App from './App.vue'
import '@tencent/vue-weui-next/dist/index.css'

createApp(App).use(WeUI).mount('#app')
```

v-model 规范：

```vue
<MpInput v-model="name" />          <!-- ✅ -->
<MpDialog v-model="visible" />      <!-- ✅ -->
<MpToast v-model:show="show" />     <!-- ✅ -->
<MpInput :value="name" @input="…" /> <!-- ❌ -->
```

常见错误：

| 错误写法 | 正确写法 |
|---------|---------|
| 在 .vue 中单独 import MpButton | 全量引入后无需 import |
| 忘记引入 CSS | main.ts 中加 `import '@tencent/vue-weui-next/dist/index.css'` |
| `<script setup>` 不加 `lang="ts"` | 加上 `lang="ts"` |
| Dialog 事件用 `@confirm` | 应使用 `@ok` |

---

## 安装

```bash
# 方式一：clone 到 skill 目录
git clone https://github.com/PENGJANE/vue-weui-next-demo-skill.git \
  ~/.codebuddy/skills/vue-weui-next-demo

# 方式二：手动复制
cp SKILL.md ~/.claude/skills/vue-weui-next-demo/SKILL.md
cp SKILL.md ~/.codebuddy/skills/vue-weui-next-demo/SKILL.md
```

---

## 目录结构

```
vue-weui-next-demo/
├── SKILL.md                      # Skill 主配置
├── scripts/
│   └── screenshot.js             # Puppeteer 截图脚本
├── references/
│   ├── html_vue_mapping.md       # HTML 结构 ↔ Vue 组件对照表
│   ├── api_reference.md          # 所有 Mp* 组件 Props / Events / Slots
│   └── project_template.md      # Vue 工程 boilerplate
└── README.md
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 原型样式 | WeUI CSS 2.6.0（CDN）|
| Vue 组件库 | @tencent/vue-weui-next |
| Vue 版本 | Vue 3 Composition API + `<script setup lang="ts">` |
| 截图工具 | Puppeteer |

---

## 关联资源

- [product-weui-demo-skill](https://github.com/PENGJANE/product-weui-demo-skill) — 完整五阶段流程（含 brainstorm + 设计参考风格预览）
- [WeUI 官方文档](https://weui.io)
- [vue-weui-next 组件文档](https://vue-weui-next.pages.woa.com/docs/guide/quickstart.html)
- [HTML ↔ Vue 映射表](./references/html_vue_mapping.md)
- [API 参考](./references/api_reference.md)
