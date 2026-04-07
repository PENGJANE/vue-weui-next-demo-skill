# vue-weui-next-demo Skill

> 基于微信 WeUI 设计规范，帮助产品经理在设计原型时按照已有组件规范快速出图，让设计与开发在同一套语言体系下对齐，减少沟通成本。

## 解决什么问题

在 WeUI 体系下，产品画原型、设计出稿、开发实现，三个角色往往用着不同的"语言"：

- 产品用 Axure / Figma 画线框，不知道对应哪个组件
- 设计出的稿件和组件库有出入，开发需要反复确认
- 开发拿到原型不知道该用 `MpButton` 还是自己写样式

这个 Skill 的核心思路是：**以 HTML 原型为桥梁**，每个 HTML 结构都标注对应的 Vue `Mp*` 组件，让三个角色拿到同一份输出物，各自找到自己需要的信息。

```
产品 → 浏览器打开 HTML，直接看交互效果
设计 → HTML 样式来自 WeUI 官方 CSS，视觉完全对齐
开发 → 看注释里的 Vue 组件写法，直接复制使用
```

## 输出示例

输入：`出一个带输入框和提交按钮的登录页`

输出 HTML 原型（节选）：
```html
<!-- Vue: <MpInput v-model="phone" type="phone" placeholder="请输入手机号" /> -->
<div class="weui-cell weui-cell_input">
  <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
  <div class="weui-cell__bd">
    <input class="weui-input" type="tel" placeholder="请输入手机号" />
  </div>
</div>

<!-- Vue: <MpButton type="primary" @click="onSubmit">登录</MpButton> -->
<a class="weui-btn weui-btn_primary">登录</a>
```

## 安装

```bash
git clone https://github.com/PENGJANE/vue-weui-next-demo-skill.git \
  ~/.codebuddy/skills/vue-weui-next-demo
```

## 触发方式

在 Claude Code 中输入以下任意短语即可激活：

```
出一个原型图
用 vue-weui-next 写一个表单页
生成 WeUI 原型
按照 WeUI 规范写一个登录页
生成 Demo
写一个 WeUI 页面
@tencent/vue-weui-next
```

## 输出格式说明

| 场景 | 输出格式 |
|------|---------|
| 产品出原型 / 设计确认 / 未明确说明 | **HTML 原型**（含 Vue 组件注释） |
| 开发需要可运行代码 | **Vue 3 + Vite + TypeScript 工程** |

## 目录结构

```
vue-weui-next-demo/
├── SKILL.md                         # Skill 主配置（Claude Code 读取）
├── references/
│   ├── html_vue_mapping.md          # HTML 结构 ↔ Vue 组件双向对照表（核心）
│   ├── api_reference.md             # 所有 Mp* 组件 Props / Events / Slots
│   └── project_template.md         # Vue 工程 boilerplate 模板
└── assets/                          # 预留资源目录
```

## 技术栈

| 层级 | 技术 |
|------|------|
| 原型样式 | WeUI CSS 2.6.0（CDN 引入） |
| Vue 组件库 | @tencent/vue-weui-next ~0.3.3 |
| Vue 版本 | Vue 3 Composition API |
| 构建工具 | Vite 5 + TypeScript |

## 参考资料

- [WeUI 官方文档](https://weui.io)
- [vue-weui-next 组件文档](https://vue-weui-next.pages.woa.com/docs/guide/quickstart.html)
- [HTML ↔ Vue 映射表](./references/html_vue_mapping.md)
- [API 参考](./references/api_reference.md)
