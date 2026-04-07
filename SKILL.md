---
name: vue-weui-next-demo
description: This skill should be used when the user wants to generate Vue 3 component demos or pages that comply with the @tencent/vue-weui-next design specification. It ensures correct usage of MpButton, MpInput, MpDialog, MpCells and other Mp* components with proper full-import setup via main.ts, correct v-model bindings, and Vite + TypeScript project structure. Trigger phrases include: "用 vue-weui-next 写", "生成 WeUI 组件", "按照 WeUI 规范", "生成 Demo", "写一个 WeUI 页面", "@tencent/vue-weui-next".
---

# vue-weui-next Demo 生成规范

## 技术栈

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite
- `@tencent/vue-weui-next` ~0.3.3（腾讯内网 npm 源）

## 核心规范

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

## 工程搭建流程

生成完整工程时，按以下顺序创建文件：

1. `package.json` — 包含 `@tencent/vue-weui-next: "~0.3.3"`
2. `vite.config.ts`
3. `tsconfig.json` — 包含 `"types": ["@tencent/vue-weui-next/global"]`
4. `index.html`
5. `src/main.ts` — 全量引入
6. `src/App.vue` — 布局
7. `src/router/index.ts`
8. `src/views/*.vue` — 各组件 Demo 页面

## Demo 页面结构规范

每个 Demo 页面统一使用以下结构：

```vue
<template>
  <div>
    <div class="section-label">分类标题</div>
    <div class="demo-card">
      <div class="demo-card__title">组件名</div>
      <div class="demo-card__body">
        <!-- 组件示例 -->
      </div>
    </div>
  </div>
</template>
```

## 参考资料

- 完整组件 API：`references/api_reference.md`（包含所有 Mp* 组件的 props/events/slots）
- 工程模板代码：`references/project_template.md`（包含完整 boilerplate）
- 官方文档：https://vue-weui-next.pages.woa.com/docs/guide/quickstart.html

## 常见错误规避

| 错误写法 | 正确写法 |
|---------|---------|
| `import { MpButton } from '@tencent/vue-weui-next'`（在 .vue 中） | 全量引入后无需再 import |
| 忘记引入 CSS | `import '@tencent/vue-weui-next/dist/index.css'` 在 main.ts |
| `<script setup>` 不加 `lang="ts"` | 加上 `lang="ts"` |
| v-model 写成 `:value` + `@input` | 直接用 `v-model` |
| Dialog 事件用 `@confirm` | 应使用 `@ok` |
