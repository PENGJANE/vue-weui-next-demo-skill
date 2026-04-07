# vue-weui-next-demo Skill

> 基于微信 WeUI 设计规范，帮助产品经理在设计原型时按照已有组件规范快速出图，让设计与开发在同一套语言体系下对齐，减少沟通成本。

## 解决什么问题

在 WeUI 体系下，产品画原型、设计出稿、开发实现，三个角色往往用着不同的"语言"：

- 产品用 Axure / Figma 画线框，不知道对应哪个组件
- 设计出的稿件和组件库有出入，开发需要反复确认
- 开发拿到原型不知道该用 `MpButton` 还是自己写样式

这个 Skill 每次生成**三份文件**，各角色各取所需：

| 文件 | 给谁 | 用途 |
|------|------|------|
| `页面名.html` | 产品 / 设计 | 浏览器直接打开，预览交互效果 |
| `页面名_tech.html` | 开发 | 每个组件：截图效果 + HTML 结构 + Vue 写法三列并排 |
| `页面名.vue` | 开发 | 直接复制进 Vue 工程使用 |

---

## 快速开始

### 1. 安装 Skill

```bash
git clone https://github.com/PENGJANE/vue-weui-next-demo-skill.git \
  ~/.codebuddy/skills/vue-weui-next-demo
```

### 2. 安装截图依赖（一次性）

```bash
npm install puppeteer
```

### 3. 在 Claude Code 中触发

```
出一个登录页原型，包含手机号输入、密码输入和登录按钮
```

Claude 会输出 `login.html` 和 `login.vue`，然后运行：

```bash
node ~/.codebuddy/skills/vue-weui-next-demo/scripts/screenshot.js login.html
```

自动生成 `login_tech.html`（技术文档，含组件截图）。

---

## 技术文档长这样

`_tech.html` 里每个组件都是三列并排：

```
┌─────────────────────────────────────────────────────────┐
│  手机号输入框                                             │
├──────────────┬──────────────────┬───────────────────────┤
│              │  HTML 结构        │  Vue 组件写法           │
│  [截图]      │  <div class=      │  <MpInput             │
│              │   "weui-cell…">  │    v-model="phone"    │
│              │    ...           │    type="phone" />    │
└──────────────┴──────────────────┴───────────────────────┘
```

---

## 触发方式

```
出一个原型图
用 vue-weui-next 写一个表单页
生成 WeUI 原型
按照 WeUI 规范写一个登录页
写一个 WeUI 页面
@tencent/vue-weui-next
```

---

## 目录结构

```
vue-weui-next-demo/
├── SKILL.md                         # Skill 主配置
├── scripts/
│   └── screenshot.js                # Puppeteer 截图 + 技术文档生成脚本
├── references/
│   ├── html_vue_mapping.md          # HTML 结构 ↔ Vue 组件对照表
│   ├── api_reference.md             # 所有 Mp* 组件 Props / Events / Slots
│   └── project_template.md         # Vue 工程 boilerplate
└── assets/
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 原型样式 | WeUI CSS 2.6.0（CDN） |
| Vue 组件库 | @tencent/vue-weui-next ~0.3.3 |
| Vue 版本 | Vue 3 Composition API + `<script setup>` |
| 构建工具 | Vite 5 + TypeScript |
| 截图工具 | Puppeteer |

---

## 参考资料

- [WeUI 官方文档](https://weui.io)
- [vue-weui-next 组件文档](https://vue-weui-next.pages.woa.com/docs/guide/quickstart.html)
- [HTML ↔ Vue 映射表](./references/html_vue_mapping.md)
- [API 参考](./references/api_reference.md)
