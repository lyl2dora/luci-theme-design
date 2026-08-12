# 更新日志

## [8.0] - 2026-08-13

适配 ImmortalWrt / OpenWrt 25.12，同时兼容 24.10。不再支持 23.05 及更早版本。

### 新增
- ✨ 主题模板迁移到 ucode：`ucode/template/themes/design/{header,footer}.ut`
- ✨ 自绘登录页 `sysauth.ut`，配套 `.login-*` 样式，跟随主题变量适配深色模式

### 改进
- 🔧 Makefile：`LUCI_DEPENDS:=+luci-base`、补充 `PKG_LICENSE`、`LUCI_MINIFY_CSS:=0`、
  新增 `postrm` 清理 `luci.themes.Design`
- 🔧 资源版本号交给 `luci.mk` 自动追加，模板里不再手写 `?v=`
- 🔧 CI 改用 ImmortalWrt SDK（`.tar.zst`，自动探测 SDK 文件名），
  产物同时兼容 `.apk` / `.ipk`；改为直接打包当前 commit 而不是重新 clone
- 🔧 修复 `compat.css` 里损坏的中文注释编码

### 移除
- 🗑️ 删除 Lua 模板 `luasrc/`，去掉隐式的 `+luci-lua-runtime` 依赖
- 🗑️ 删除内置 `jquery.min.js`（约 88KB）和 `compat.js`，全部改为原生实现

### 修复
- 🐛 `.ifacebadge` 文字溢出徽章后以白字落在浅色背景上（`admin/status/nftables`
  页面表现为"任意数据包"等文案不可读）：`compat.css` 把 `.ifacebadge > em`
  一并定成 16×16，而 LuCI 里这个 `<em>` 装的是文本不是图标，
  内容被挤出徽章外仍继承 `color:#fff`。改为只约束 `<img>`，
  并给徽章加上 `flex-wrap`/`white-space:normal` 允许长内容换行
- 🐛 进度条读数（概览页内存/存储、连接数等）字号过小到几乎看不清：
  声明的 `0.75rem` 之外还叠了 `font-size-adjust: .38`，把实际渲染再压到约 70%，
  合计只有 7.7px。去掉 `font-size-adjust` 并提到 `0.85rem`（实际 12.5px）
- 🐛 `admin/network/diagnostics` 页三个输入框（全局 `select, input` 的 2.8rem）
  与三个按钮（`.cbi-button` 的 35px）高度不一致且顶边错位。该页按钮统一到 2.8rem；
  Ping/Traceroute 的 `ui.ComboButton` 渲染为 `div.cbi-dropdown.btn.cbi-button`，
  被 compat.css 压成 `inline-block` 导致标签贴顶，恢复 `inline-flex` 居中
- 🐛 `admin/status/processes` 页面命令列撑破视口：`.td` 默认 `nowrap`，
  几百字符的命令把该列撑到 2500px 以上，CPU/内存/动作三列被顶出屏幕、整页横向滚动。
  改为让中间的命令列换行吸收宽度（两侧列保持自然宽度），空间不足时由表格自身
  横向滚动；并给该列 `min-width: 14rem` 下限，避免窄屏被压到一个字一行。
  原本负责这件事的规则写的是 `.node-status-processes`，而实际 body 类是
  `.node-admin-status-processes`，从未生效
- 🐛 `.cbi-value-field > ul > li .ifacebadge` 用浅灰背景配继承来的白字，
  改用成对的 `--inputbg_color` / `--inputtext_color`
  （`--badgebg_color` 在深色配色里是 `#fefefe`，与 `--text_color` 撞车，未采用）
- 🐛 `style.js` 的 indicators 图标改用 `MutationObserver`
  （`DOMSubtreeModified` 已被现代浏览器移除，原实现在新浏览器上失效）
- 🐛 CSS 选择器 `admin-system-opkg` → `admin-system-package-manager`
- 🐛 删除 `style.css` 里重复了两遍的登录页样式

## [7.0] - 2025-12-05

### 新增
- ✨ 支持 OpenWrt 23.x 版本
- ✨ 支持 OpenWrt 24.x 版本
- ✨ 新增版本兼容层 (`compat.js`)

### 改进
- 🔧 优化 LuCI API 调用，兼容新旧版本
- 🔧 jQuery 依赖改为可选，无 jQuery 环境下自动降级
- 🔧 改进 ubus 调用方式，支持不同版本
- 🔧 优化菜单渲染逻辑，增加空值检查
- 🔧 改进资源加载，添加版本化 URL

### 修复
- 🐛 修复新版本 LuCI 中 `dispatchpath` 未定义问题
- 🐛 修复新版本中 `requestpath` 访问错误
- 🐛 修复无 jQuery 环境下动画失效问题
- 🐛 修复某些元素可能不存在导致的错误

### 技术改进
- 📦 更新 Makefile 版本号到 7.0
- 📦 改进错误处理和边界检查
- 📦 优化代码结构，提高可维护性

## [6.0] - 2023-02-24

### 之前的更新
- 修复安装 package 提示信息背景泛白
- 优化菜单缩放
- 优化显示网口 down 状态显示图标
- 优化 logo 显示
- 新增各设备状态图标显示
- 更换 logo 显示为字体 "OpenWrt"，支持以主机名显示 logo
- 修复部分插件显示 bug
- 修复 vssr 状态 bar
- 修复诸多 bug
- 修复兼容部分插件样式
- 修复 aliyundrive-webdav 样式
- 修复 vssr 在 iOS/iPadOS WebApp 模式下显示异常
- 修复 openclash 插件在 iOS/iPadOS WebApp 模式下 env(safe-area-inset-bottom) = 0
- 优化菜单 hover action 状态分辨
- 支持 luci-app-wizard 向导菜单
- Update header box-shadow style
- Update uci-change overflow
- Fix nlbw component
- Added QSDK/QWRT wizard and iStore menu icon fonts
