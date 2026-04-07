---
name: vue-weui-next-demo
description: |
  Use when generating WeUI mini-program prototype pages that need to align product, design, and development. Trigger phrases: "用 vue-weui-next 写", "生成 WeUI 原型", "生成 WeUI 组件", "按照 WeUI 规范", "生成 Demo", "写一个 WeUI 页面", "出一个原型图", "@tencent/vue-weui-next". Produces four files: interactive HTML prototype, PRD Word doc (with screenshots via pandoc), tech doc HTML, and a .vue file.
---

# vue-weui-next 生成规范

## 输出文件（每次必须输出四份）

| 文件 | 受众 | 内容 |
|------|------|------|
| `{页面名}.html` | 产品 / 设计 | **可交互原型**：WeUI CSS 渲染，JS 切换多个页面状态 |
| `{页面名}_prd.docx` | 产品 / 设计 | **产品需求文档**：Word 格式，每个状态含触发条件 / 界面呈现 / 用户操作 / 状态流转 / 数据来源 + 截图，直接交付 |
| `{页面名}_tech.html` | 开发 | 每个页面状态截图（左）+ 组件卡片拆解（右）：live WeUI 预览 + Vue 代码 |
| `{页面名}.vue` | 开发 | 完整 Vue SFC，直接复制进工程使用 |

生成完四份文件后，**必须按顺序执行以下步骤**：

```bash
# 第一步：生成截图（截图脚本依赖原型 HTML）
npm install puppeteer   # 首次安装
node ~/.codebuddy/skills/vue-weui-next-demo/scripts/screenshot.js {页面名}.html

# 第二步：截图就位后，再转换为 Word 文档
pandoc {页面名}_prd.html -o {页面名}_prd.docx
```

**顺序不可颠倒**：pandoc 必须在截图生成后执行，否则 .docx 内图片全部空缺。

---

## 一、可交互原型（`{页面名}.html`）

### 定位

**纯原型**，不含产品说明文字。WeUI CSS 渲染，浏览器直接预览，JS 切换多个页面状态。

### 多状态切换结构

```html
<script>
function showState(name) {
  document.querySelectorAll('.state-panel').forEach(el => el.style.display = 'none')
  document.getElementById('state-' + name).style.display = 'block'
}
</script>

<!-- 顶部状态切换标签 -->
<div class="state-tabs">
  <button onclick="showState('partial')">部分满足</button>
  <button onclick="showState('all')">全部满足</button>
</div>

<div id="state-partial" class="state-panel"><!-- 状态一 --></div>
<div id="state-all"     class="state-panel" style="display:none"><!-- 状态二 --></div>
```

### 组件块标记（截图脚本依赖）

每个组件必须用 `<div data-component="..." data-vue="...">` 包裹：

- `data-component`：组件中文名（用于技术文档标题和截图文件名）
- `data-vue`：对应 Vue 组件完整写法（单行字符串）

```html
<!-- ✅ 正确：每个组件单独一个 data-component 块 -->
<div data-component="主按钮" data-vue='<MpButton type="primary">提交</MpButton>'>
  <a class="weui-btn weui-btn_primary">提交</a>
</div>

<!-- ❌ 错误：多个组件混在一个块里 -->
<div data-component="表单">
  <a class="weui-btn weui-btn_primary">提交</a>
  <div class="weui-cell weui-cell_input">...</div>
</div>
```

### 样式引入

```html
<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.6.0/weui.min.css" />
```

---

## 二、产品需求文档（`{页面名}_prd.html` → `{页面名}_prd.docx`）

### 定位

独立 PRD 文件，面向产品 / 设计。**Claude 生成中间 HTML，截图就位后用 pandoc 转为 Word（.docx）直接交付。**

### 整体结构

```
封面
  页面名称 / 版本 / 日期 / 作者

目录
  各状态编号 + 名称

正文（每个页面状态一节）
  ## {编号}. {状态名称}
  ### 触发条件
  ### 界面呈现
  ### 用户操作
  ### 状态流转
  ### 数据来源（如有）
  [截图]

修订记录
```

### 截图嵌入

截图由截图脚本生成，放在 `{页面名}_screenshots/` 目录：

```html
<img src="./{页面名}_screenshots/{编号}_{状态名}.png"
     alt="{状态名} 页面截图"
     style="max-width:375px; border:1px solid #eee; border-radius:8px; display:block; margin:16px 0;" />
```

### A4 排版 CSS（直接复制）

```html
<style>
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  background: #f0f0f0;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #111;
  font-size: 14px;
  line-height: 1.8;
}
.page {
  width: 794px;       /* A4 96dpi */
  min-height: 1123px;
  margin: 32px auto;
  background: #fff;
  padding: 72px 80px;
  box-shadow: 0 2px 12px rgba(0,0,0,.1);
}
/* 封面 */
.cover { text-align: center; padding: 120px 0 80px; border-bottom: 2px solid #07c160; margin-bottom: 48px; }
.cover h1 { font-size: 28px; font-weight: 700; margin: 0 0 12px; }
.cover .meta { font-size: 13px; color: #888; line-height: 2; }
/* 目录 */
.toc h2 { font-size: 18px; font-weight: 700; border-left: 4px solid #07c160; padding-left: 12px; margin-bottom: 16px; }
.toc ol { padding-left: 20px; }
.toc li { margin-bottom: 6px; font-size: 14px; }
/* 正文 */
.section { margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; }
.section h2 { font-size: 20px; font-weight: 700; margin: 0 0 20px; color: #07c160; }
.section h3 { font-size: 15px; font-weight: 600; margin: 20px 0 8px; color: #333; }
.section p  { margin: 0 0 10px; }
.section ul { padding-left: 20px; margin: 0 0 10px; }
.section li { margin-bottom: 4px; }
.screenshot-wrap { margin: 20px 0; }
.screenshot-wrap img { max-width: 375px; border: 1px solid #eee; border-radius: 8px; display: block; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.screenshot-wrap figcaption { font-size: 12px; color: #999; margin-top: 6px; }
/* 修订记录 */
.revision table { width: 100%; border-collapse: collapse; font-size: 13px; }
.revision th, .revision td { border: 1px solid #eee; padding: 8px 12px; text-align: left; }
.revision th { background: #f5f5f5; font-weight: 600; }
/* 打印 */
@media print {
  body { background: #fff; }
  .page { margin: 0; box-shadow: none; padding: 36px 48px; }
  .section { page-break-inside: avoid; }
}
</style>
```

### 产品逻辑说明原则

- **以展示状态为准**：按 HTML 原型的视觉状态写，不描述代码变量名、computed、ref 等实现细节
- **外部数据必须标注**：凡需调用第三方 API（如 WE分析评分、日活数据）必须注明数据来源和接入方式
- **覆盖所有状态变体**：不能遗漏任何一个状态

---

## 三、技术文档（`{页面名}_tech.html`）

### 布局结构

每个页面状态一个 `.page-block`，内部分为**左右两列**：

```
┌─────────────────────────────────────────────────────────┐
│  [01] 页面状态名称                                        │
│  页面描述（一句话）                                        │
├──────────────────────┬──────────────────────────────────┤
│  左列：完整截图        │  右列：组件区域拆解               │
│  （页面全屏截图）      │  ┌─────────────────────────────┐│
│                      │  │ 组件名    [WeUI可用]          ││
│                      │  │ live WeUI HTML 预览           ││
│                      │  │ Vue 代码 <pre>               ││
│                      │  └─────────────────────────────┘│
│                      │  ┌─────────────────────────────┐│
│                      │  │ 组件名    [自定义]            ││
│                      │  │ 说明文字                      ││
│                      │  │ live 预览 / 自定义 HTML       ││
│                      │  └─────────────────────────────┘│
└──────────────────────┴──────────────────────────────────┘
```

### 组件卡片规范

| 标签 | 含义 | 卡片内容 |
|------|------|---------|
| `[WeUI 可用]` | 直接用 WeUI / MpXxx 实现 | `.comp-preview`（live WeUI HTML）+ `<pre>`（Vue 代码） |
| `[WeUI 部分可用]` | WeUI 有近似结构，需小幅调整 | `.comp-preview` + `<pre>` + 说明需调整的地方 |
| `[自定义]` | WeUI 无对应组件 | 说明文字 + `.comp-preview`（自定义 HTML 预览） |

**WeUI 可用组件只给 Vue 代码，不需要附 HTML 代码。**

### CSS 框架（复制此结构）

```html
<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.6.0/weui.min.css" />
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif; background: #f5f5f5; }
.doc-header { background: #07c160; color: #fff; padding: 28px 40px; }
.doc-header h1 { margin: 0 0 6px; font-size: 22px; }
.doc-header p  { margin: 0; opacity: .8; font-size: 13px; }
.legend { display: flex; gap: 16px; padding: 16px 40px; background: #fff; border-bottom: 1px solid #eee; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #555; }
.tag-weui    { background: #e8f8ee; color: #07c160; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 10px; }
.tag-custom  { background: #f5f5f5; color: #999;    font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 10px; }
.tag-partial { background: #fff7e6; color: #fa9d3b; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 10px; }
.doc-body { max-width: 1400px; margin: 32px auto; padding: 0 24px 60px; }
.page-block { background: #fff; border-radius: 12px; margin-bottom: 40px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,.08); }
.page-block-header { display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: #fafafa; border-bottom: 1px solid #f0f0f0; }
.page-num  { background: #07c160; color: #fff; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 10px; }
.page-name { margin: 0; font-size: 16px; font-weight: 600; color: #111; }
.page-desc { margin: 0; padding: 8px 24px 12px; font-size: 12px; color: #888; border-bottom: 1px solid #f5f5f5; }
.page-content { display: grid; grid-template-columns: 560px 1fr; }
.screenshot-col { padding: 20px; border-right: 1px solid #f0f0f0; }
.screenshot-col img { width: 100%; border-radius: 8px; border: 1px solid #eee; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.component-col { padding: 20px; }
.component-col > h4 { margin: 0 0 14px; font-size: 13px; color: #555; font-weight: 600; }
.comp-card { border: 1px solid #eee; border-radius: 8px; margin-bottom: 12px; overflow: hidden; }
.comp-card-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #fafafa; border-bottom: 1px solid #eee; }
.comp-name { font-size: 13px; font-weight: 600; color: #111; }
.comp-body { padding: 12px 14px; }
.comp-body .custom-note { font-size: 12px; color: #aaa; margin: 0 0 10px; line-height: 1.7; }
.comp-preview { padding: 14px; background: #f9f9f9; border-radius: 6px; border: 1px solid #eee; overflow: auto; margin-bottom: 8px; }
pre { margin: 0; padding: 10px 12px; background: #f8f8f8; border-radius: 6px; font-size: 11px; line-height: 1.7; font-family: 'SF Mono', 'Menlo', monospace; overflow-x: auto; white-space: pre; color: #333; }
.kw  { color: #07c160; }
.attr{ color: #0070bb; }
.val { color: #c7254e; }
.cm  { color: #aaa; font-style: italic; }
</style>
```

### 截图来源

截图文件放在 `{页面名}_screenshots/` 目录，由截图脚本生成：

```html
<img src="./{页面名}_screenshots/{编号}_{状态名}.png" alt="..." />
```

---

## 四、Vue 文件规范（`{页面名}.vue`）

### 全量引入前提

项目 `main.ts` 必须全量引入，`.vue` 文件中**无需**单独 import 组件：

```ts
import { createApp } from 'vue'
import WeUI from '@tencent/vue-weui-next'
import App from './App.vue'
import '@tencent/vue-weui-next/dist/index.css'

createApp(App).use(WeUI).mount('#app')
```

### v-model 规范

```vue
<MpInput v-model="name" />          <!-- ✅ -->
<MpDialog v-model="visible" />      <!-- ✅ -->
<MpToast v-model:show="show" />     <!-- ✅ -->
<MpInput :value="name" @input="…" /> <!-- ❌ -->
```

### Script Setup 模板

```vue
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
const form = reactive({ username: '', password: '' })
const dialogVisible = ref(false)
</script>
```

### 常见错误规避

| 错误写法 | 正确写法 |
|---------|---------|
| 在 .vue 中单独 import MpButton | 全量引入后无需 import |
| 忘记引入 CSS | main.ts 中加 `import '@tencent/vue-weui-next/dist/index.css'` |
| `<script setup>` 不加 `lang="ts"` | 加上 `lang="ts"` |
| Dialog 事件用 `@confirm` | 应使用 `@ok` |

---

## 参考资料

- HTML ↔ Vue 映射表：`references/html_vue_mapping.md`
- 完整组件 API：`references/api_reference.md`
- 工程模板代码：`references/project_template.md`
- 截图脚本：`scripts/screenshot.js`
- 官方文档：https://vue-weui-next.pages.woa.com/docs/guide/quickstart.html
