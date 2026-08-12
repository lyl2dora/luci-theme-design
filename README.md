<img src="./preview/light.png"/> 

# luci-theme-design

**luci-theme-design**基于[luci-theme-neobird](https://github.com/thinktip/luci-theme-neobird)二次开发

## 版本支持

- ✅ ImmortalWrt / OpenWrt 25.12.x
- ✅ ImmortalWrt / OpenWrt 24.10.x
- ❌ 21.02 / 22.03 / 23.05 请使用 [v7.0](../../releases) 及更早版本

> 8.0 起主题模板已迁移到 ucode（`.ut`），不再依赖 `luci-lua-runtime`。
> 新版 LuCI（24.10 起）的模板引擎就是 ucode，旧的 Lua `.htm` 模板在新版上只能降级运行。

## 主要特点

- 针对移动端优化，特别适合手机端做为webapp使用
- 修改和优化了很多插件显示，完善的icon图标，尽量视觉统一
- 简洁的登录界面，底部导航栏，类App的沉浸式体验；
- 适配深色模式，适配系统自动切换；

## 体验Webapp方法

- 在移动端(iOS/iPadOS)浏览器打开管理界面，添加到主屏幕即可。
- 想要实现完全的沉浸式（无浏览器导航、无地址栏等）体验，需要使用SSL证书，请自行申请域名、证书、安装并启用。
- 如果不使用SSL证书，基于安全原因，iOS/iPadOS 在打开新的页面后，将会显示浏览器顶部菜单栏。

## PS

- 资源接口icon未完善，如果有能力画图的欢迎pr，但请确保跟现有icon颜色风格一致
- 有bug欢迎提issue
- 主题个人配色可能会不符合大众胃口，欢迎提配色建议

## 自行编译

主题包是 `PKGARCH:=all`，用任意架构的 SDK 编译一次即可在所有设备上安装。

用官方 OpenWrt 的同版本 SDK 编译也可以：本主题只依赖 `luci-base`、不含任何编译产物，
两边编译出的安装树已实测逐字节一致（49 个文件 md5 全同，包依赖同为 `+libc +luci-base`）。
国内网络下官方源通常快很多。

### 用 SDK 编译（推荐）

```bash
# 以 ImmortalWrt 25.12.1 x86-64 SDK 为例
VER=25.12.1
BASE=https://downloads.immortalwrt.org/releases/$VER/targets/x86/64
SDK=$(curl -s "$BASE/" | grep -oE 'immortalwrt-sdk-[^"]+\.Linux-x86_64\.tar\.zst' | head -1)

wget "$BASE/$SDK" && tar --zstd -xf "$SDK" && mv "${SDK%.tar.zst}" sdk && cd sdk

git clone https://github.com/lyl2dora/luci-theme-design.git package/luci-theme-design
./scripts/feeds update -a && ./scripts/feeds install -a

echo "CONFIG_PACKAGE_luci-theme-design=y" >> .config
make defconfig
make package/luci-theme-design/compile V=s -j$(nproc)

find bin/ -name 'luci-theme-design*'
```

### 在完整源码树里编译

```bash
cd immortalwrt
git clone https://github.com/lyl2dora/luci-theme-design.git package/luci-theme-design
make menuconfig     # LuCI -> 3. Themes -> luci-theme-design
make package/luci-theme-design/compile V=s
```

## 安装

25.12 使用 apk 包管理器：

```bash
scp luci-theme-design-*.apk root@192.168.1.1:/tmp/
ssh root@192.168.1.1 'apk add --allow-untrusted /tmp/luci-theme-design-*.apk'
```

24.10 及更早使用 opkg：

```bash
opkg install /tmp/luci-theme-design-*.ipk
```

## 手动激活主题

安装脚本会自动切换主题，如果没有生效可以手动设置：

```bash
uci set luci.themes.Design='/luci-static/design'
uci set luci.main.mediaurlbase='/luci-static/design'
uci commit luci
```

## 故障排除

### 主题显示异常

1. 清除浏览器缓存（Ctrl+F5 强制刷新）
2. 确认主题文件完整：`/usr/share/ucode/luci/template/themes/design/` 下应有
   `header.ut`、`footer.ut`、`sysauth.ut`
3. 如果 LuCI 右上角出现 "Theme fallback" 提示，说明主题模板加载失败，
   点开可以看到具体报错

### 菜单无法展开

1. 检查浏览器控制台是否有 JavaScript 错误
2. 确认 `/www/luci-static/resources/menu-design.js` 存在
3. 尝试禁用浏览器扩展

### 移动端显示问题

1. 确保使用 HTTPS（WebApp 模式需要）
2. 清除浏览器缓存
3. 重新添加到主屏幕

## 版本兼容性

详细的兼容性信息请查看 [COMPATIBILITY.md](COMPATIBILITY.md)

## 预览(ps: 下面PC端普通字体为苹果浏览器字体，只有移动端是正常显示的)

<details> <summary>iOS</summary>
<img src="./preview/webapp_home.PNG"/>
<img src="./preview/webapp_vssr.PNG"/>
</details>

<details> <summary>iPadOS</summary>
<img src="./preview/IMG_0328.PNG"/>
<img src="./preview/IMG_0329.PNG"/>
</details>

<img src="./preview/login.png"/>
<img src="./preview/home.png"/>
<img src="./preview/home1.png"/>
<img src="./preview/wifi.png"/>
<img src="./preview/iface.png"/>
