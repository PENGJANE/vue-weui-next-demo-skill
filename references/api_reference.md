# @tencent/vue-weui-next 组件 API 参考

## 引入规范（全量引入）

```ts
// main.ts
import { createApp } from 'vue'
import WeUI from '@tencent/vue-weui-next'
import App from './App.vue'
import '@tencent/vue-weui-next/dist/index.css' // 样式必须单独引入

createApp(App).use(WeUI).mount('#app')
```

全量引入后，所有 `Mp*` 组件无需在每个 `.vue` 文件中单独 import，直接在 `<template>` 中使用。

---

## 版本说明

- 包名：`@tencent/vue-weui-next`
- 推荐版本锁定：`"~0.3.3"`（用 `~` 而非 `^`，因为 Minor 版本可能有破坏性更新）
- 来源：腾讯内网 npm 源 `https://mirrors.tencent.com/npm/`

---

## 组件列表与 API

### MpButton 按钮

```vue
<MpButton type="primary" size="mini" :loading="false" :disabled="false" @click="fn">
  按钮文字
</MpButton>
```

| Prop | 类型 | 可选值 | 默认值 |
|------|------|--------|--------|
| type | string | default / primary / warn | default |
| size | string | mini | - |
| loading | boolean | - | false |
| disabled | boolean | - | false |
| href | string | - | - |

| Event | 说明 |
|-------|------|
| click | 点击时触发 |

---

### MpInput 输入框

```vue
<MpInput
  v-model="value"
  placeholder="请输入"
  type="text"
  :clearable="true"
  :maxlength="100"
/>
```

| Prop | 类型 | 可选值 | 默认值 |
|------|------|--------|--------|
| modelValue (v-model) | string/number | - | '' |
| type | string | text/email/idCard/number/phone/url/password | text |
| placeholder | string | - | - |
| disabled | boolean | - | false |
| readonly | boolean | - | false |
| clearable | boolean | - | false |
| maxlength | number | - | 0 |
| status | string | normal/warn | normal |
| countable | boolean | - | false |
| multi | boolean | - | false |

| Event | 说明 |
|-------|------|
| input | 输入时触发 |
| blur | 失焦时触发 |
| clear | 清除时触发 |
| validate-ok | 校验成功 |
| validate-error | 校验失败 |

---

### MpTextarea 多行文本

```vue
<MpTextarea v-model="value" placeholder="请输入" :maxlength="200" :show-count="true" />
```

---

### MpSwitch 开关

```vue
<MpSwitch v-model="checked" :disabled="false" />
```

---

### MpRadio / MpCheckbox

```vue
<MpRadio :value="item.value" v-model="selected" />
<MpCheckbox :value="item.value" v-model="checkedList" />
```

---

### MpSlider 滑块

```vue
<MpSlider v-model="value" :min="0" :max="100" :step="1" :disabled="false" />
```

---

### MpCells + MpCell 列表

```vue
<MpCells title="分组标题">
  <MpCell title="标题" value="右侧文字" :is-link="true" label="描述文字" @click="fn">
    <template #hd><!-- 左侧内容 --></template>
    <template #extra><!-- 右侧扩展 --></template>
  </MpCell>
</MpCells>
```

MpCell 常用 Props：
| Prop | 说明 | 类型 |
|------|------|------|
| title | 左侧标题 | string |
| value | 右侧文字 | string |
| label | 标题下描述 | string |
| is-link | 显示箭头 | boolean |

MpCell Slots：`hd`（左侧）、`default`（内容）、`extra`（右侧扩展）

---

### MpDialog 对话框

```vue
<MpDialog
  v-model="visible"
  title="标题"
  confirm-text="确定"
  cancel-text="取消"
  @ok="onConfirm"
  @close="onClose"
>
  <p>对话框内容</p>
</MpDialog>
```

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue (v-model) | boolean | false | 是否显示 |
| title | string | - | 标题 |
| closable | boolean | true | 显示关闭按钮 |
| mask-closable | boolean | false | 点遮罩关闭 |
| confirm-text | string | 确定 | 确认按钮文字 |
| cancel-text | string | 取消 | 取消按钮文字 |
| half-screen | boolean | false | 半屏弹窗 |

| Event | 说明 |
|-------|------|
| ok | 点击确认 |
| close | 点击关闭 |
| visible-change | 显隐变化 |

Slots：`default`（内容）、`header`（自定义页头）、`footer`（自定义页脚）

---

### MpToast 轻提示

```vue
<MpToast v-model:show="visible" type="success" title="操作成功" />
```

type 可选值：`success` / `loading` / `fail` / `text`

---

### MpLoading 加载

```vue
<MpLoading type="circle" />
```

type 可选值：`circle` / `dot`

---

### MpProgress 进度条

```vue
<MpProgress :percent="75" stroke-color="#07c160" />
```

---

### MpBadge 徽标

```vue
<MpBadge :value="3">
  <div>内容</div>
</MpBadge>
<MpBadge dot>
  <div>内容</div>
</MpBadge>
```

---

### MpGrid + MpGridItem 宫格

```vue
<MpGrid :column="4">
  <MpGridItem v-for="item in list" :key="item.label" @click="fn">
    <!-- 自定义内容 -->
  </MpGridItem>
</MpGrid>
```

---

### MpNavbar 顶部导航

```vue
<MpNavbar v-model="activeIndex" :tabs="[{ label: 'Tab1' }, { label: 'Tab2' }]" />
```

---

### MpSteps 步骤条

```vue
<MpSteps :current="1" :steps="[{ title: '步骤1' }, { title: '步骤2' }]" />
```

---

### MpSearchBar 搜索框

```vue
<MpSearchBar v-model="keyword" placeholder="搜索..." @search="onSearch" />
```

---

### MpBlock 页面内容卡片

```vue
<MpBlock title="页面标题" desc="描述" inner-title="内容标题">
  <p>内容区</p>
</MpBlock>
```

---

## tsconfig.json 类型配置

```json
{
  "compilerOptions": {
    "types": ["@tencent/vue-weui-next/global"]
  }
}
```

配置后 VSCode 可获得所有 `Mp*` 组件的类型提示。
