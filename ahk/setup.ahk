;=======自动软件设置20230627=============

; 设置强制单实例模式(添加到程序顶部)
#SingleInstance force

; 为菜单栏创建子菜单:
Menu, download, Add, 7Z, download7Z
Menu, download, Add, 帮助, downloadhelp
; 创建用来附加子菜单的菜单栏:
Menu, MyMenuBar, Add, 帮助, help
Menu, MyMenuBar, Add, 下载, :download
Menu, MyMenuBar, Add, 编辑, editahk
; 添加菜单栏到窗口:
Gui, Menu, MyMenuBar



; 读取lzq.txt文件内容到一个数组中
array := []
FileRead, content, lzq.txt
Loop, Parse, content, `n
{
    array[A_Index] := A_LoopField
}

; 创建GUI窗口
Gui, Add, Text,, 请选择要打开的软件：
Loop, % array.Length()
{
    softwareName := StrSplit(array[A_Index], "|")[1]
    sofy:= "y" . A_Index*30
    Gui, Add, Button, x5 %sofy% w100 h25 gRunSoftware, %softwareName%
}
Gui, Show
Return

; 运行选定的软件
RunSoftware:
MouseGetPos,,,,Bcontrol 
StringTrimLeft,ButtonNum,Bcontrol,6
softwareAddress := StrSplit(array[ButtonNum], "|")[2]   ;运行第几个按钮
;msgbox, %softwareAddress%
run, %softwareAddress%
return


; 菜单事件
help:
	if !FileExist("AutoHotkey_CN_1.1.30.03.chm")
	UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/ahk/AutoHotkey_CN_1.1.30.03.chm,AutoHotkey_CN_1.1.30.03.chm
	run "AutoHotkey_CN_1.1.30.03.chm"
	Return
download7Z:
	msgbox 测试菜单1
	Return
downloadhelp:
	msgbox 测试菜单2
	UrlDownloadToFile,https://gitee.com/lzqgan/data/raw/master/softdata/rclone.conf,rclone.conf
editahk:
	run notepad.exe %A_ScriptName%


; 按下 F9 键或者双击系统托盘图标时显示 GUI 窗口
GuiClose:
	Gui, Hide
	Return

F9::
ToggleGui()
Return

TrayTip, My Script, Double-click tray icon to show GUI.

Menu, Tray, Tip, % "My Script`nDouble-click tray icon to show GUI"
Menu, Tray, Icon, Shell32.dll, 42           ; 更改托盘图标

TrayIconClick:
ToggleGui()
Return

; 切换 GUI 显示状态
ToggleGui() {
    If WinExist("ahk_class AutoHotkeyGUI")
    {
        Gui, Hide
    }
    Else
    {
        Gui, Show, , My Software Launcher
        ;WinSet, AlwaysOnTop, On, My Software Launcher  ; 让窗口始终在顶部
        TrayTip, My Script, Click the button or press F9 to hide the GUI.
    }
}