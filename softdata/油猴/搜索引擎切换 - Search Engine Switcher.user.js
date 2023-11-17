// ==UserScript==
// @name         搜索引擎切换 - Search Engine Switcher
// @namespace    https://ivanli.cc/
// @version      1.2.0
// @author       Ivan Li
// @description  A userscript to switch search engine with current keywords.
// @license      MIT
// @icon         data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgaGVpZ2h0PSIxZW0iIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNSwxNiBMMjEsMjIgTDE1LDE2IFogTTEwLDE4IEMxMy44NjU5OTMyLDE4IDE3LDE0Ljg2NTk5MzIgMTcsMTEgQzE3LDcuMTM0MDA2NzUgMTMuODY1OTkzMiw0IDEwLDQgQzYuMTM0MDA2NzUsNCAzLDcuMTM0MDA2NzUgMywxMSBDMywxNC44NjU5OTMyIDYuMTM0MDA2NzUsMTggMTAsMTggWiBNMjAsMSBMMjAsNyBNMTcsNCBMMjMsNCI+PC9wYXRoPjwvc3ZnPg==
// @match        *://www.baidu.com/*
// @match        *://www.google.com/*
// @match        *://www.google.com.hk/*
// @match        *://www.bing.com/*
// @match        *://cn.bing.com/*
// @match        *://bing.com/*
// @match        *://www.sogou.com/*
// @match        *://duckduckgo.com/*
// @match        *://yandex.com/*
// @match        *://www.zhihu.com/*
// @match        *://search.bilibili.com/*
// @match        *://s.taobao.com/search*
// @match        *://github.com/*
// @match        *://crates.io/*
// @match        *://npmjs.com/*
// @match        *://www.npmjs.com/*
// @grant        GM_log
// ==/UserScript==

(function () {
  'use strict';

  var _GM_log = /* @__PURE__ */ (() => typeof GM_log != "undefined" ? GM_log : void 0)();
  const twText = '/*\n! tailwindcss v3.3.2 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: \'\';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user\'s configured `sans` font-family by default.\n5. Use the user\'s configured `sans` font-feature-settings by default.\n6. Use the user\'s configured `sans` font-variation-settings by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n  font-variation-settings: normal; /* 6 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user\'s configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type=\'button\'],\n[type=\'reset\'],\n[type=\'submit\'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type=\'search\'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user\'s configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role="button"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don\'t get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.fixed {\n  position: fixed;\n}\n.absolute {\n  position: absolute;\n}\n.-left-16 {\n  left: -64px;\n}\n.-right-3 {\n  right: -12px;\n}\n.left-4 {\n  left: 16px;\n}\n.top-1\\/2 {\n  top: 50%;\n}\n.top-1\\/3 {\n  top: 33.333333%;\n}\n.block {\n  display: block;\n}\n.inline {\n  display: inline;\n}\n.flex {\n  display: flex;\n}\n.h-6 {\n  height: 24px;\n}\n.w-6 {\n  width: 24px;\n}\n.-translate-y-1\\/2 {\n  --tw-translate-y: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.rotate-180 {\n  --tw-rotate: 180deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.flex-col {\n  flex-direction: column;\n}\n.items-center {\n  align-items: center;\n}\n.justify-center {\n  justify-content: center;\n}\n.divide-y > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-y-reverse: 0;\n  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));\n}\n.divide-dotted > :not([hidden]) ~ :not([hidden]) {\n  border-style: dotted;\n}\n.divide-sky-300 > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(125 211 252 / var(--tw-divide-opacity));\n}\n.rounded {\n  border-radius: 4px;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.bg-sky-100\\/50 {\n  background-color: rgb(224 242 254 / 0.5);\n}\n.bg-sky-700\\/50 {\n  background-color: rgb(3 105 161 / 0.5);\n}\n.px-4 {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n.py-2 {\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n.pr-0 {\n  padding-right: 0px;\n}\n.pr-0\\.5 {\n  padding-right: 2px;\n}\n.text-xl {\n  font-size: 20px;\n  line-height: 28px;\n}\n.text-inherit {\n  color: inherit;\n}\n.text-sky-100 {\n  --tw-text-opacity: 1;\n  color: rgb(224 242 254 / var(--tw-text-opacity));\n}\n.text-sky-700 {\n  --tw-text-opacity: 1;\n  color: rgb(3 105 161 / var(--tw-text-opacity));\n}\n.no-underline {\n  text-decoration-line: none;\n}\n.opacity-50 {\n  opacity: 0.5;\n}\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.backdrop-blur {\n  --tw-backdrop-blur: blur(8px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.transition {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.hover\\:bg-sky-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(224 242 254 / var(--tw-bg-opacity));\n}\n.hover\\:opacity-100:hover {\n  opacity: 1;\n}\n@media (prefers-color-scheme: dark) {\n\n  .dark\\:bg-sky-800\\/10 {\n    background-color: rgb(7 89 133 / 0.1);\n  }\n\n  .dark\\:text-sky-500 {\n    --tw-text-opacity: 1;\n    color: rgb(14 165 233 / var(--tw-text-opacity));\n  }\n\n  .dark\\:hover\\:bg-sky-800\\/20:hover {\n    background-color: rgb(7 89 133 / 0.2);\n  }\n}';
  const searchEngines = [
    {
      id: "v2ex",
      name: "V2EX",
      url: (w) => `https://www.google.com/search?q=site:v2ex.com/t%20${w}`,
      regUrl: /https:\/\/www.google.com\/search\?q=site:v2ex\.com\/t%20/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        const q = url.searchParams.get("q");
        console.log(q, q == null ? void 0 : q.replace("site:v2ex.com/t ", ""));
        return (q == null ? void 0 : q.replace("site:v2ex.com/t ", "")) ?? null;
      }
    },
    {
      id: "baidu",
      name: "百度搜索",
      url: (w) => `https://www.baidu.com/s?wd=${w}`,
      regUrl: /www.baidu.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("wd");
      }
    },
    {
      id: "google",
      name: "Google",
      url: (w) => `https://www.google.com/search?q=${w}`,
      regUrl: /www.google.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "bing",
      name: "Bing",
      url: (w) => `https://www.bing.com/search?q=${w}`,
      regUrl: /www.bing.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "bing-cn",
      name: "必应",
      url: (w) => `https://cn.bing.com/search?q=${w}`,
      regUrl: /cn.bing.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "duckduckgo",
      name: "DuckDuckGo",
      url: (w) => `https://duckduckgo.com/?q=${w}`,
      regUrl: /duckduckgo.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "yandex",
      name: "Yandex",
      url: (w) => `https://yandex.com/search/?text=${w}`,
      regUrl: /yandex.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("text");
      }
    },
    {
      id: "sogou",
      name: "搜狗",
      url: (w) => `https://www.sogou.com/web?query=${w}`,
      regUrl: /www.sogou.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("query");
      }
    },
    {
      id: "github",
      name: "GitHub",
      url: (w) => `https://github.com/search?q=${w}&ref=opensearch&type=repositories`,
      regUrl: /github.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "taobao",
      name: "淘宝",
      url: (w) => `https://s.taobao.com/search?q=${w}`,
      regUrl: /s.taobao.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "npm",
      name: "NPM",
      url: (w) => `https://www.npmjs.com/search?q=${w}`,
      regUrl: /www.npmjs.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "Crate",
      name: "Crate",
      url: (w) => `https://crates.io/search?q=${w}`,
      regUrl: /crates.io/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "zhihu",
      name: "知乎",
      url: (w) => `https://www.zhihu.com/search?q=${w}`,
      regUrl: /www.zhihu.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("q");
      }
    },
    {
      id: "bilibili",
      name: "哔哩哔哩",
      url: (w) => `http://search.bilibili.com/all?keyword=${w}`,
      regUrl: /search.bilibili.com/i,
      getSearchWord: () => {
        const url = new URL(window.location.href);
        return url.searchParams.get("keyword");
      }
    }
  ];
  customElements.define(
    "engine-switch",
    class extends HTMLElement {
      connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const twStyle = document.createElement("style");
        twStyle.textContent = twText;
        shadow.appendChild(twStyle);
        function createIndexPanel(shadow2) {
          const indexPanel2 = shadow2.appendChild(document.createElement("div"));
          indexPanel2.setAttribute("id", "ivan_search-engine-switch");
          indexPanel2.className = "fixed -left-16 top-1/3 -translate-y-1/2 rounded shadow-lg flex flex-col transition-all bg-sky-100/50 backdrop-blur text-sky-700 dark:bg-sky-800/10 dark:text-sky-500";
          indexPanel2.style.zIndex = "999999";
          setTimeout(() => {
            indexPanel2.classList.remove("-left-16");
            indexPanel2.classList.add("left-4");
          });
          const ol = indexPanel2.appendChild(document.createElement("ol"));
          ol.className = "divide-dotted divide-y divide-sky-300";
          for (let i = 0; i < searchEngines.length; i++) {
            const engine = searchEngines[i];
            {
              const li = ol.appendChild(document.createElement("li"));
              li.className = "hover:bg-sky-100 dark:hover:bg-sky-800/20 transition";
              const a = li.appendChild(document.createElement("a"));
              a.className = `block px-4 py-2 switch-search-engine ${engine.id} block text-inherit no-underline`;
              a.dataset.engineId = engine.id;
              a.href = "javascript::void(0);";
              a.text = engine.name;
            }
          }
          const foldBtn = indexPanel2.appendChild(
            document.createElement("button")
          );
          foldBtn.className = "absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full shadow-lg bg-sky-700/50 backdrop-blur text-sky-100 flex items-center justify-center text-xl";
          const foldBtnIcon2 = foldBtn.appendChild(document.createElement("span"));
          foldBtnIcon2.className = " pr-0.5 transition";
          foldBtnIcon2.innerHTML = `<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z" fill="currentColor"></path></svg>`;
          foldBtn.onclick = function() {
            console.log("click");
            const folded = foldBtnIcon2.classList.contains("rotate-180");
            if (folded) {
              unfoldPanel();
            } else {
              foldPanel();
            }
          };
          return {
            indexPanel: indexPanel2,
            foldBtnIcon: foldBtnIcon2,
            foldBtn
          };
        }
        const { indexPanel, foldBtnIcon } = createIndexPanel(shadow);
        function unfoldPanel() {
          indexPanel.classList.add("left-4");
          foldBtnIcon.classList.remove("rotate-180");
          indexPanel.classList.remove("opacity-50");
          indexPanel.classList.remove("hover:opacity-100");
          indexPanel.style.left = "";
        }
        function foldPanel() {
          indexPanel.classList.remove("left-4");
          indexPanel.classList.add("opacity-50");
          indexPanel.classList.add("hover:opacity-100");
          foldBtnIcon.classList.add("rotate-180");
          const rightBoardPosX = `-${indexPanel.offsetLeft + indexPanel.offsetWidth - 4}px`;
          indexPanel.style.left = rightBoardPosX;
        }
        function registerJump(shadow2) {
          const linkElems = shadow2.querySelectorAll(
            ".switch-search-engine"
          );
          for (const elem of linkElems) {
            elem.addEventListener("click", function() {
              const currUrl = new URL(window.location.href);
              const currSearchEngine = searchEngines.find(
                (it) => {
                  var _a;
                  return (_a = it.regUrl) == null ? void 0 : _a.test(currUrl.toString());
                }
              );
              if (!currSearchEngine) {
                _GM_log(
                  `The current page does not match the preset search engine. url: ${currUrl}`
                );
                return;
              }
              const words = currSearchEngine.getSearchWord();
              _GM_log(`match words: "${words}", url: ${currUrl}`);
              const engineId = elem.dataset.engineId;
              const targetEngine = searchEngines.find(
                (it) => it.id === engineId
              );
              if (words == null) {
                const url = new URL(targetEngine.url(""));
                url.search = "";
                url.hash = "";
                url.pathname = "";
                elem.setAttribute("href", url.toString());
              } else {
                elem.setAttribute("href", targetEngine.url(words));
              }
            });
          }
        }
        registerJump(shadow);
        function autoHidePanel() {
          const currUrl = new URL(window.location.href);
          const currSearchEngine = searchEngines.find(
            (it) => {
              var _a;
              return (_a = it.regUrl) == null ? void 0 : _a.test(currUrl.toString());
            }
          );
          const keywords = currSearchEngine == null ? void 0 : currSearchEngine.getSearchWord();
          if (keywords == null) {
            foldPanel();
          } else {
            unfoldPanel();
          }
        }
        setTimeout(() => {
          autoHidePanel();
        });
      }
    }
  );
  document.body.appendChild(
    document.createElement("engine-switch")
  );

})();
