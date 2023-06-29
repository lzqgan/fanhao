划词搜索:
Gui, Add, Edit,xm r9 vkey w350, Text to appear inside the edit control (omit this parameter to start off empty).
Gui, Add, ddl,section w60 g搜索 vsousuo, 百度||百度翻译|google|微信|知乎|豆瓣|Yandex|GitHub
Gui, Add, Button,ys g搜索 w30, OK
Gui, Add, ddl,ys w60 g番号 vav, jable||JavBus
Gui, Add, Button,ys g番号 w30, OK
Gui, Add, ddl,ys w60 g影视 vyingshi, bilibili||茶杯狐
Gui, Add, Button,ys g影视 w30, OK
gui show
return

GuiEscape:
GuiClose:
Gui, Cancel
return


搜索:
Gui, Submit, NoHide
If (sousuo="百度")
run https://www.baidu.com/s?wd=%key%
If (sousuo="百度翻译")
run https://fanyi.baidu.com/#zh/en/%key%
If (sousuo="google")
run http://google.com/search?q=%key%
If (sousuo="微信")
run https://weixin.sogou.com/weixin?p=01030402&type=2&ie=utf8&query=%key%
If (sousuo="知乎")
run https://www.zhihu.com/search?type=content&q=%key%
If (sousuo="豆瓣")
run http://movie.douban.com/subject_search?cat=1002&search_text=%key%
If (sousuo="Yandex")
run https://yandex.com/search/?text=%key%
If (sousuo="GitHub")
run https://github.com/search?q=%key%
return

番号:
Gui, Submit, NoHide
If (av="jable")
run https://jable.tv/videos/%key%
If (av="JavBus")
run https://www.javbus.com/search/%key%
return

影视:
Gui, Submit, NoHide
If (yingshi="茶杯狐")
run https://www.cupfox.com/?type=download&key=%key%
If (yingshi="bilibili")
run https://search.bilibili.com/all?keyword=%key%
return

;划词
^q::
;clipboard := ""  ; 让剪贴板初始为空, 这样可以使用 ClipWait 检测文本什么时候被复制到剪贴板中.
Send ^c
;ClipWait  ; 等待剪贴板中出现文本.
GuiControl,, key, %Clipboard%
gui show
return



