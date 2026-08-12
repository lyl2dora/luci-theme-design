# 版本兼容性说明

## 支持的版本

| 版本 | 状态 | 说明 |
|---|---|---|
| ImmortalWrt / OpenWrt 25.12.x | ✅ 支持 | 主要适配目标，apk 包管理器 |
| ImmortalWrt / OpenWrt 24.10.x | ✅ 支持 | 模板引擎与 25.12 相同 |
| 23.05 及更早 | ❌ 不支持 | 请使用 v7.0 及更早版本 |

## 8.0 的主要变化

### 1. 模板迁移到 ucode

LuCI 从 24.10 起，调度器与模板引擎都改成了 ucode。官方主题（bootstrap / material /
openwrt-2020）以及 argon 的模板都已经是 `.ut`。

本主题原先的 Lua 模板 `luasrc/view/themes/design/*.htm` 已删除，改为：

```
ucode/template/themes/design/header.ut
ucode/template/themes/design/footer.ut
ucode/template/themes/design/sysauth.ut
```

安装后落在 `/usr/share/ucode/luci/template/themes/design/`。

新版 LuCI 仍保留 Lua 模板的回退路径（需要 `luci-lua-runtime`），但那条路上
当前节点信息挂在顶层作用域 `dispatched` 而不是 `luci.dispatcher.context.dispatched`，
旧模板取到的 `node` 恒为 nil，会导致页面标题丢失、插件自带的 `node.css` 不加载。
所以这里做的是彻底迁移，而不是靠回退凑合。

顺带去掉了 `+luci-lua-runtime` 依赖（`luasrc/` 存在时 `luci.mk` 会自动加上）。

### 2. 登录页由主题自绘

主题现在提供 `sysauth.ut`，调度器在需要登录时会优先使用它
（`modules/luci-base/ucode/dispatcher.uc` 里的 `themes/<theme>/sysauth`）。

登录页复用 `header.ut` / `footer.ut` 的 `blank_page` 模式，只输出 `<head>` 和
一个居中的登录卡片，样式集中在 `style.css` 的 `.login-*` 一段，跟随主题的
CSS 变量自动适配深色模式。

### 3. 去掉 jQuery

- 删除内置的 `jquery.min.js`（约 88KB）和 `compat.js`
- `menu-design.js`、`style.js` 里的 jQuery 分支收敛为原生实现
- `style.js` 里的 `DOMSubtreeModified`（Mutation Events，已被现代浏览器移除）
  换成 `MutationObserver`

### 4. 页面路径变更

`admin/system/opkg` 在新版里改名为 `admin/system/package-manager`
（由 `luci-app-package-manager` 提供），CSS 选择器已同步更新。

### 5. 资源版本号

`luci.mk` 会自动把 `.ut` 里形如 `"{{ media }}/xxx.css"` 的引用改写成
`"...css?v=<PKG_VERSION>"`，模板里不需要再手写 `?v=`。

## 需要在真机上核对的页面

模板和编译已经验证过，样式回归只能在实机上看。建议按下面的顺序过一遍：

- [ ] 登录页（浅色 / 深色 / 手机竖屏）
- [ ] 概览、防火墙状态（`admin/status/nftables` 是新页面，主题只针对旧的
      `admin/status/iptables` 做过微调）
- [ ] 网络 → 接口 / 无线
- [ ] 系统 → 软件包（`admin/system/package-manager`，apk 版界面）
- [ ] 系统 → 管理权、重启
- [ ] 常用第三方插件（openclash / passwall / vssr 等）
- [ ] 侧边菜单展开收起、移动端底部导航栏
- [ ] 深色模式跟随系统切换

## 反馈问题

如果在特定版本遇到问题，请提供：

1. 固件版本（`cat /etc/openwrt_release`）
2. LuCI 版本（`apk info luci-base` 或界面底部）
3. 浏览器类型和版本
4. 具体问题截图
