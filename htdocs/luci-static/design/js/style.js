(function () {
	'use strict';

	// 修复某些插件导致在 https 下 env(safe-area-inset-bottom) 为 0 的情况
	if (/(iPhone|iPad|iPod|iOS|Mac|Macintosh)/i.test(navigator.userAgent) &&
	    self.location.href.indexOf('openclash') != -1) {
		var meta = document.createElement('meta');

		meta.name = 'viewport';
		meta.content = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover';
		document.head.appendChild(meta);
	}

	// 设置 indicators 图标（放在 menu script 执行之前，
	// 避免 passwall 等插件的脚本报错中断导致设置失败）
	var indicators = document.getElementById('indicators');

	if (indicators) {
		// iconfont 中的图标字形，U+E6B9
		var glyph = String.fromCharCode(0xe6b9);

		var applyIcon = function () {
			var child = indicators.firstElementChild;

			// 判等后再写，避免观察器被自己的改动反复唤醒
			if (child && child.getAttribute('data-indicator') != 'uci-changes' &&
			    child.textContent != glyph)
				child.textContent = glyph;
		};

		new MutationObserver(applyIcon).observe(indicators, {
			childList: true,
			subtree: true,
			characterData: true
		});

		applyIcon();
	}

	// 监听窗口大小，动态设置 header box 阴影长度
	var setHeaderShadow = function () {
		var header = document.querySelector('header');

		if (header)
			header.style.boxShadow = (window.innerWidth <= 992)
				? '0 2px 4px rgb(0 0 0 / 8%)'
				: '17rem 2px 4px rgb(0 0 0 / 8%)';
	};

	window.addEventListener('resize', setHeaderShadow);
})();
