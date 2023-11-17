// ==UserScript==
// @name         获取[标题](链接)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!在网页上按 Shift+q 直接复制MD格式的网页标题和链接,[标题](链接),方便写文章。
// @author       tfnmdmx
// @match        *://*/*
// @run-at       document_start
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @icon         https://www.google.com/s2/favicons?sz=64&domain=csdn.net
// ==/UserScript==

(function() {
    'use strict';
    async function copyPageUrl(md) {
        try {
            await navigator.clipboard.writeText(md);
            console.log('已复制:'+md);
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                type: 'success',
                title: "已复制!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            try {
                console.log('不安全的链接http');
                // 创建text area
                const textArea = document.createElement('textarea')
                textArea.value = md
                // 使text area不在viewport，同时设置不可见
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                return new Promise((res, rej) => {
                    // 执行复制命令并移除文本框
                    document.execCommand('copy') ? res() : rej()
                    textArea.remove()
                })
                console.log('已复制:'+md);
                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    type: 'success',
                    title: "已复制!",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (e) {
                console.error('Failed to copy: ', e);
                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    type: 'error',
                    title: "出错了!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    window.addEventListener('keydown' , (e) => {
        //console.log(e.keyCode);
        if(e.shiftKey && e.keyCode== 81){
            var url=window.location.href
            var title=document.title
            console.log('title:'+title);
            console.log('url:'+url);

            if(title.indexOf("CSDN博客") != -1){
                var pos = title.indexOf('_');
                if(title.indexOf('_', pos) != -1){
                    pos = title.indexOf('_', pos);
                }
                title = title.substr(0,pos);
            }else if(title.indexOf("博客园") != -1 || title.indexOf("简书") != -1 || title.indexOf("知乎") != -1 || title.indexOf("搜索") != -1){
                pos = title.indexOf('-');
                if(title.indexOf('-', pos) != -1){
                    pos = title.indexOf('-', pos);
                }
                title = title.substr(0,pos);
            }else if(title.indexOf("菜鸟教程") != -1){
                pos = title.indexOf('|');
                if(title.indexOf('|', pos) != -1){
                    pos = title.indexOf('|', pos);
                }
                title = title.substr(0,pos);
            }
            var md = "["+title+"]("+url+")";
            copyPageUrl(md);
        }
    })
})();
