# WeUI HTML 结构 ↔ Vue 组件映射表

> 产品/设计用 HTML 出原型，开发按此表找对应的 Vue `Mp*` 组件实现。
> 每段 HTML 均引用 WeUI 官方 CSS class，视觉效果与 Vue 组件保持一致。

---

## 使用说明

HTML 原型页面统一引入以下样式：

```html
<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.6.0/weui.min.css" />
```

---

## Button 按钮

**HTML 原型**
```html
<!-- 主按钮 → MpButton type="primary" -->
<a class="weui-btn weui-btn_primary">主操作</a>

<!-- 默认按钮 → MpButton type="default" -->
<a class="weui-btn weui-btn_default">次要操作</a>

<!-- 警告按钮 → MpButton type="warn" -->
<a class="weui-btn weui-btn_warn">危险操作</a>

<!-- Mini 按钮 → MpButton type="primary" size="mini" -->
<a class="weui-btn weui-btn_mini weui-btn_primary">Mini</a>

<!-- 禁用状态 → MpButton :disabled="true" -->
<a class="weui-btn weui-btn_primary weui-btn_disabled">禁用</a>
```

**Vue 组件**
```vue
<MpButton type="primary">主操作</MpButton>
<MpButton type="default">次要操作</MpButton>
<MpButton type="warn">危险操作</MpButton>
<MpButton type="primary" size="mini">Mini</MpButton>
<MpButton type="primary" :disabled="true">禁用</MpButton>
```

---

## Input 输入框

**HTML 原型**
```html
<!-- 单行输入 → MpInput v-model="value" -->
<div class="weui-cell weui-cell_input">
  <div class="weui-cell__hd"><label class="weui-label">用户名</label></div>
  <div class="weui-cell__bd">
    <input class="weui-input" type="text" placeholder="请输入用户名" />
  </div>
</div>

<!-- 错误状态 → MpInput status="warn" -->
<div class="weui-cell weui-cell_input weui-cell_warn">
  <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
  <div class="weui-cell__bd">
    <input class="weui-input" type="tel" placeholder="请输入手机号" />
  </div>
  <div class="weui-cell__ft">
    <i class="weui-icon-warn"></i>
  </div>
</div>
```

**Vue 组件**
```vue
<MpInput v-model="username" placeholder="请输入用户名" />
<MpInput v-model="phone" type="phone" status="warn" placeholder="请输入手机号" />
```

---

## Textarea 多行文本

**HTML 原型**
```html
<!-- → MpTextarea v-model="value" :show-count="true" :maxlength="200" -->
<div class="weui-cell weui-cell_textarea">
  <div class="weui-cell__bd">
    <textarea class="weui-textarea" placeholder="请输入留言" rows="3"></textarea>
    <div class="weui-textarea-counter">0/200</div>
  </div>
</div>
```

**Vue 组件**
```vue
<MpTextarea v-model="content" placeholder="请输入留言" :maxlength="200" :show-count="true" />
```

---

## Switch 开关

**HTML 原型**
```html
<!-- 开启 → MpSwitch v-model="checked"（true） -->
<div class="weui-cell weui-cell_switch">
  <div class="weui-cell__bd">开启通知</div>
  <div class="weui-cell__ft">
    <input class="weui-switch" type="checkbox" checked />
  </div>
</div>

<!-- 关闭 → MpSwitch v-model="checked"（false） -->
<div class="weui-cell weui-cell_switch">
  <div class="weui-cell__bd">接收推送</div>
  <div class="weui-cell__ft">
    <input class="weui-switch" type="checkbox" />
  </div>
</div>
```

**Vue 组件**
```vue
<MpCells>
  <MpCell title="开启通知">
    <template #extra><MpSwitch v-model="notify" /></template>
  </MpCell>
</MpCells>
```

---

## Cells + Cell 列表/表单行

**HTML 原型**
```html
<!-- → MpCells title="分组标题" -->
<div class="weui-cells weui-cells_after-title">

  <!-- 普通列表行 → MpCell title="标题" value="右侧" -->
  <div class="weui-cell">
    <div class="weui-cell__bd">标题</div>
    <div class="weui-cell__ft">右侧文字</div>
  </div>

  <!-- 可点击行（带箭头） → MpCell title="标题" :is-link="true" -->
  <a class="weui-cell weui-cell_access" href="#">
    <div class="weui-cell__bd">进入详情</div>
    <div class="weui-cell__ft weui-cell__ft_in-access"></div>
  </a>

  <!-- 带描述行 → MpCell title="标题" label="描述文字" -->
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <p>标题</p>
      <p class="weui-cell__desc">描述文字</p>
    </div>
  </div>

</div>
```

**Vue 组件**
```vue
<MpCells title="分组标题">
  <MpCell title="标题" value="右侧文字" />
  <MpCell title="进入详情" :is-link="true" @click="goDetail" />
  <MpCell title="标题" label="描述文字" />
</MpCells>
```

---

## Dialog 对话框

**HTML 原型**
```html
<!-- → MpDialog v-model="visible" title="标题" -->
<div class="weui-dialog__wrp">
  <div class="weui-mask"></div>
  <div class="weui-dialog">
    <div class="weui-dialog__hd"><strong class="weui-dialog__title">标题</strong></div>
    <div class="weui-dialog__bd">对话框内容说明</div>
    <div class="weui-dialog__ft">
      <!-- → @close -->
      <a class="weui-dialog__btn weui-dialog__btn_default">取消</a>
      <!-- → @ok -->
      <a class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
    </div>
  </div>
</div>
```

**Vue 组件**
```vue
<MpDialog v-model="visible" title="标题" confirm-text="确定" cancel-text="取消" @ok="onConfirm" @close="onClose">
  <p>对话框内容说明</p>
</MpDialog>
```

---

## Toast 轻提示

**HTML 原型**
```html
<!-- 成功 → MpToast v-model:show="visible" type="success" title="操作成功" -->
<div class="weui-toast">
  <i class="weui-icon-success-no-circle weui-icon_toast"></i>
  <p class="weui-toast__content">操作成功</p>
</div>

<!-- 加载 → MpToast type="loading" title="加载中" -->
<div class="weui-toast">
  <i class="weui-loading weui-icon_toast"></i>
  <p class="weui-toast__content">加载中</p>
</div>
```

**Vue 组件**
```vue
<MpToast v-model:show="visible" type="success" title="操作成功" />
<MpToast v-model:show="loading" type="loading" title="加载中" />
```

---

## Progress 进度条

**HTML 原型**
```html
<!-- → MpProgress :percent="75" -->
<div class="weui-progress">
  <div class="weui-progress__inner-bar" style="width: 75%"></div>
</div>
```

**Vue 组件**
```vue
<MpProgress :percent="75" stroke-color="#07c160" />
```

---

## SearchBar 搜索框

**HTML 原型**
```html
<!-- → MpSearchBar v-model="keyword" placeholder="搜索" -->
<div class="weui-search-bar">
  <div class="weui-search-bar__form">
    <div class="weui-search-bar__box">
      <i class="weui-icon-search"></i>
      <input class="weui-search-bar__input" type="search" placeholder="搜索" />
    </div>
  </div>
</div>
```

**Vue 组件**
```vue
<MpSearchBar v-model="keyword" placeholder="搜索" @search="onSearch" />
```

---

## Grid 宫格

**HTML 原型**
```html
<!-- → MpGrid :column="4" -->
<div class="weui-grids">
  <!-- MpGridItem -->
  <a class="weui-grid" href="#">
    <div class="weui-grid__icon"><!-- 图标 --></div>
    <p class="weui-grid__label">名称</p>
  </a>
  <a class="weui-grid" href="#">
    <div class="weui-grid__icon"><!-- 图标 --></div>
    <p class="weui-grid__label">名称</p>
  </a>
</div>
```

**Vue 组件**
```vue
<MpGrid :column="4">
  <MpGridItem v-for="item in list" :key="item.label" @click="onClick(item)">
    <img :src="item.icon" />
    <p>{{ item.label }}</p>
  </MpGridItem>
</MpGrid>
```

---

## Steps 步骤条

**HTML 原型**
```html
<!-- → MpSteps :current="1" :steps="[...]" -->
<div class="weui-steps">
  <!-- 已完成 step -->
  <div class="weui-step weui-step_done">
    <div class="weui-step__indicator"><i class="weui-icon-success-no-circle"></i></div>
    <div class="weui-step__content"><p class="weui-step__title">步骤一</p></div>
  </div>
  <!-- 当前 step -->
  <div class="weui-step weui-step_doing">
    <div class="weui-step__indicator"><i class="weui-step__indicator-dot"></i></div>
    <div class="weui-step__content"><p class="weui-step__title">步骤二</p></div>
  </div>
  <!-- 未开始 step -->
  <div class="weui-step">
    <div class="weui-step__indicator"><i class="weui-step__indicator-dot"></i></div>
    <div class="weui-step__content"><p class="weui-step__title">步骤三</p></div>
  </div>
</div>
```

**Vue 组件**
```vue
<MpSteps :current="1" :steps="[{ title: '步骤一' }, { title: '步骤二' }, { title: '步骤三' }]" />
```

---

## Navbar 顶部导航/Tab

**HTML 原型**
```html
<!-- → MpNavbar v-model="activeIndex" :tabs="[...]" -->
<div class="weui-navbar">
  <a class="weui-navbar__item weui-bar__item_on">Tab 1</a>
  <a class="weui-navbar__item">Tab 2</a>
  <a class="weui-navbar__item">Tab 3</a>
</div>
```

**Vue 组件**
```vue
<MpNavbar v-model="activeIndex" :tabs="[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]" />
```

---

## Badge 徽标

**HTML 原型**
```html
<!-- 数字徽标 → MpBadge :value="3" -->
<span class="weui-badge">3</span>

<!-- 红点 → MpBadge dot -->
<span class="weui-badge weui-badge_dot"></span>
```

**Vue 组件**
```vue
<MpBadge :value="3"><div>内容</div></MpBadge>
<MpBadge dot><div>内容</div></MpBadge>
```
