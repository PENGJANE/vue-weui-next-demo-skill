---
name: vue-weui-next-demo
description: |
  This skill should be used when the user wants to generate WeUI prototype pages or Vue 3 component demos that comply with the @tencent/vue-weui-next design specification. The primary output format is standalone HTML (using WeUI CSS classes) so that product managers and designers can preview prototypes directly in a browser. Each HTML element must include a comment mapping it to the corresponding Vue Mp* component (e.g., <!-- MpButton type="primary" -->), so developers know exactly which component to use. When a full Vue project is requested, it uses Vite + TypeScript with full-import setup. Trigger phrases include: "用 vue-weui-next 写", "生成 WeUI 原型", "生成 WeUI 组件", "按照 WeUI 规范", "生成 Demo", "写一个 WeUI 页面", "出一个原型图", "@tencent/vue-weui-next".
---

# vue-weui-next 生成规范

## 输出优先级

> **产品/设计需求 → 优先输出 HTML 原型**
> **开发需求 → 输出 Vue 3 工程代码**

### 判断规则
- 用户说「出原型」「设计稿」「看效果」「产品确认」→ 输出 **HTML 原型**
- 用户说「写代码」「Vue 工程」「开发用」「跑起来」→ 输出 **Vue 3 工程代码**
- 未明确说明时 → **默认输出 HTML 原型**，并在末尾附上 Vue 组件对照

---

## 一、HTML 原型规范（默认输出格式）

### 1. 样式引入

所有 HTML 原型统一引入 WeUI 官方 CDN CSS：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>页面标题</title>
  <link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.6.0/weui.min.css" />
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

### 2. Vue 组件映射注释（必须遵循）

每个 HTML 结构块必须在**开头注释**中标注对应的 Vue `Mp*` 组件写法，格式如下：

```html
<!-- Vue: <MpButton type="primary">主操作</MpButton> -->
<a class="weui-btn weui-btn_primary">主操作</a>

<!-- Vue: <MpInput v-model="name" placeholder="请输入姓名" /> -->
<div class="weui-cell weui-cell_input">
  <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
  <div class="weui-cell__bd">
    <input class="weui-input" type="text" placeholder="请输入姓名" />
  </div>
</div>
```

### 3. 页面结构规范

```html
<div class="page">

  <!-- 页面标题区 -->
  <div class="weui-msg__hd">
    <h1 class="weui-msg__title">页面标题</h1>
  </div>

  <!-- 分组标签 -->
  <div class="weui-cells__title">分组名称</div>

  <!-- 组件区域 -->
  <div class="weui-cells">
    <!-- 各组件 HTML -->
  </div>

  <!-- 底部操作按钮 -->
  <div class="weui-btn-area">
    <!-- Vue: <MpButton type="primary">提交</MpButton> -->
    <a class="weui-btn weui-btn_primary">提交</a>
  </div>

</div>
```

### 4. HTML ↔ Vue 组件完整映射

详见 `references/html_vue_mapping.md`，涵盖所有 `Mp*` 组件的双向对照。

---

## 二、Vue 工程规范

### 1. 全量引入（必须遵循）

所有 Demo 项目必须在 `main.ts` 中全量引入，**样式必须单独引入**：

```ts
import { createApp } from 'vue'
import WeUI from '@tencent/vue-weui-next'
import App from './App.vue'
import '@tencent/vue-weui-next/dist/index.css'  // 不可省略

createApp(App).use(WeUI).mount('#app')
```

全量引入后，`.vue` 文件中**无需** import 任何 `Mp*` 组件，直接在 `<template>` 使用。

### 2. 组件命名规则

所有组件以 `Mp` 为前缀，例如：
- `<MpButton>` `<MpInput>` `<MpTextarea>` `<MpSwitch>`
- `<MpCells>` `<MpCell>` `<MpDialog>` `<MpToast>`
- `<MpLoading>` `<MpProgress>` `<MpBadge>` `<MpGrid>` `<MpGridItem>`
- `<MpNavbar>` `<MpSteps>` `<MpSearchBar>` `<MpSlider>` `<MpBlock>`

### 3. v-model 规范

- 所有组件的 v-model 对应 `modelValue`（Vue 3 标准），**不再使用 `value`**
- Dialog 使用 `v-model`（绑定 boolean）
- Toast 使用 `v-model:show`

```vue
<!-- 正确 -->
<MpInput v-model="name" />
<MpDialog v-model="dialogVisible" />
<MpToast v-model:show="toastVisible" />

<!-- 错误 -->
<MpInput :value="name" @input="name=$event" />
```

### 4. Script Setup 规范

所有组件使用 `<script setup lang="ts">`，使用 `ref` / `reactive` 管理状态：

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

const visible = ref(false)
const form = reactive({ name: '', phone: '' })
</script>
```

### 5. 样式规范

使用 `<style scoped>` 避免样式污染。全局基础样式放在 `src/styles/global.css`。

### 6. 工程搭建流程

生成完整工程时，按以下顺序创建文件：

1. `package.json` — 包含 `@tencent/vue-weui-next: "~0.3.3"`
2. `vite.config.ts`
3. `tsconfig.json` — 包含 `"types": ["@tencent/vue-weui-next/global"]`
4. `index.html`
5. `src/main.ts` — 全量引入
6. `src/App.vue` — 布局
7. `src/router/index.ts`
8. `src/views/*.vue` — 各组件 Demo 页面

---

## 参考资料

- HTML ↔ Vue 映射表：`references/html_vue_mapping.md`（每个组件的双向对照）
- 完整组件 API：`references/api_reference.md`（所有 Mp* 组件的 props/events/slots）
- 工程模板代码：`references/project_template.md`（完整 boilerplate）
- 官方文档：https://vue-weui-next.pages.woa.com/docs/guide/quickstart.html

---

## 常见错误规避

| 错误写法 | 正确写法 |
|---------|---------|
| HTML 原型不写 Vue 映射注释 | 每个组件块开头加 `<!-- Vue: <MpXxx ... /> -->` |
| `import { MpButton } from '@tencent/vue-weui-next'`（在 .vue 中） | 全量引入后无需再 import |
| 忘记引入 CSS | HTML 用 CDN link；Vue 在 main.ts 引入 dist/index.css |
| `<script setup>` 不加 `lang="ts"` | 加上 `lang="ts"` |
| v-model 写成 `:value` + `@input` | 直接用 `v-model` |
| Dialog 事件用 `@confirm` | 应使用 `@ok` |
