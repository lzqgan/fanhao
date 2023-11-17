// ==UserScript==
// @name         知乎、简书、csdn、实验楼剪切板消毒
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  复制一些网站文字时，会在你剪切板的最后加上链接什么的信息，很讨厌。把这些额外的东西全干掉
// @author       You
// @match        *://*.shiyanlou.com/*
// @match        *://*.jianshu.com/*
// @match        *://*.zhihu.com/*
// @match        *://*.csdn.net/*
// @match        *://*.imooc.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function addLink(e) {
    e.preventDefault();
    var pagelink = '\nRead more: ' + document.location.href,
    copytext = window.getSelection();
    var clipdata = e.clipboardData || window.clipboardData;
    if (clipdata) {
        clipdata.setData('Text', copytext);
    }
}
document.addEventListener('copy', addLink);
})();