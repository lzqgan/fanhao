��������:
Gui, Add, Edit,xm r9 vkey w350, Text to appear inside the edit control (omit this parameter to start off empty).
Gui, Add, ddl,section w60 g���� vsousuo, �ٶ�||�ٶȷ���|google|΢��|֪��|����|Yandex|GitHub
Gui, Add, Button,ys g���� w30, OK
Gui, Add, ddl,ys w60 g���� vav, jable||JavBus
Gui, Add, Button,ys g���� w30, OK
Gui, Add, ddl,ys w60 gӰ�� vyingshi, bilibili||�豭��
Gui, Add, Button,ys gӰ�� w30, OK
gui show
return

GuiEscape:
GuiClose:
Gui, Cancel
return


����:
Gui, Submit, NoHide
If (sousuo="�ٶ�")
run https://www.baidu.com/s?wd=%key%
If (sousuo="�ٶȷ���")
run https://fanyi.baidu.com/#zh/en/%key%
If (sousuo="google")
run http://google.com/search?q=%key%
If (sousuo="΢��")
run https://weixin.sogou.com/weixin?p=01030402&type=2&ie=utf8&query=%key%
If (sousuo="֪��")
run https://www.zhihu.com/search?type=content&q=%key%
If (sousuo="����")
run http://movie.douban.com/subject_search?cat=1002&search_text=%key%
If (sousuo="Yandex")
run https://yandex.com/search/?text=%key%
If (sousuo="GitHub")
run https://github.com/search?q=%key%
return

����:
Gui, Submit, NoHide
If (av="jable")
run https://jable.tv/videos/%key%
If (av="JavBus")
run https://www.javbus.com/search/%key%
return

Ӱ��:
Gui, Submit, NoHide
If (yingshi="�豭��")
run https://www.cupfox.com/?type=download&key=%key%
If (yingshi="bilibili")
run https://search.bilibili.com/all?keyword=%key%
return

;����
^q::
;clipboard := ""  ; �ü������ʼΪ��, ��������ʹ�� ClipWait ����ı�ʲôʱ�򱻸��Ƶ���������.
Send ^c
;ClipWait  ; �ȴ��������г����ı�.
GuiControl,, key, %Clipboard%
gui show
return



