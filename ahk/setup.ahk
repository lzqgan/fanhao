;=======自动软件设置20230627=============

; 设置缓存目录test,下载目录test\dsoft,检测配置文件
softtemp:="D:\test"
if !FileExist("D:\test\dsoft" OR "D:\test\asoft")
{
FileCreateDir ,D:\test\dsoft
FileCreateDir ,D:\test\asoft
}
if !FileExist("D:\test\lzq.txt")
UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/ahk/lzq.txt,%softtemp%\lzq.txt

; 设置强制单实例模式(添加到程序顶部)
#SingleInstance force

; 为菜单栏创建子菜单:
Menu, download, Add, 更新, downloadUp
Menu, download, Add, 7Z, download7Z
Menu, download, Add, 帮助, downloadhelp
Menu, rclone, Add, 挂载alist, 挂载
Menu, rclone, Add, 下载rclone, downloadrclone
Menu, rclone, Add, 下载winfsp, downloadwinfsp
; 创建用来附加子菜单的菜单栏:
Menu, MyMenuBar, Add, 帮助, help
Menu, MyMenuBar, Add, 下载, :download
Menu, MyMenuBar, Add, rclone, :rclone
Menu, MyMenuBar, Add, 编辑, editahk
; 添加菜单栏到窗口:
Gui, Menu, MyMenuBar

;设置tab
Gui, Add, Tab3,x0 y0 w630 h346, 软件|View|设置


; 读取lzq.txt文件内容到一个数组中
array := []
FileRead, content, %softtemp%\lzq.txt
Loop, Parse, content, `n
{
    array[A_Index] := A_LoopField
}

; 创建GUI窗口
Gui, +Resize
;Gui, Add, Text,, 请选择要打开的软件：
Loop, % array.Length()
{
    softwareName := StrSplit(array[A_Index], "|")[1]
    sofy:= "y" . A_Index*30
    Gui, Add, Button, x5 %sofy% w80 h25 gRunSoftware, %softwareName%
}
Gui, Show,w300,软件

#Include 热字串.txt
Return

; 运行选定的软件
RunSoftware:
	MouseGetPos,,,,Bcontrol 
	StringTrimLeft,ButtonNum,Bcontrol,6
	softwareAddress := StrSplit(array[ButtonNum], "|")[2]   ;运行第几个按钮
	;msgbox, % "运行路径:"StrSplit(array[ButtonNum], "|")[2]"`n下载路径:"StrSplit(array[ButtonNum], "|")[3]
	;if FileExist(softwareAddress)
	if FileExist(StrSplit(array[ButtonNum], "|")[2])
	{
	;msgbox, %softwareAddress%
	;run, % StrSplit(array[ButtonNum], "|")[2]
	run, %softwareAddress%
	}
	else
	{
	Gosub dsoft
	}
	return

dsoft:
	dsoftAddress:= StrSplit(array[ButtonNum], "|")[3]
	dsoftName:=StrSplit(dsoftAddress,"/")[StrSplit(dsoftAddress,"/").MaxIndex()]
	msgbox,下载地址：%dsoftAddress%`n程序名：%dsoftName%
	UrlDownloadToFile , %dsoftAddress% ,%softtemp%\dsoft\%dsoftName%
	MsgBox, 下载完成
	run D:\test\asoft\7z\7z.exe x %softtemp%\dsoft\%dsoftName% -o%softtemp%\asoft\%softwareName% -aoa  ;解压文件夹
	MsgBox, 解压完成
	return




; 菜单事件
help:
	if !FileExist(softtemp . "\AutoHotkey_CN_1.1.30.03.chm")
	UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/ahk/AutoHotkey_CN_1.1.30.03.chm,%softtemp%\AutoHotkey_CN_1.1.30.03.chm
	run %softtemp%\AutoHotkey_CN_1.1.30.03.chm
	Return
download7Z:
	FileCreateDir ,D:\test\asoft\7z
	UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/tool/7z/7z.dll,%softtemp%\asoft\7z\7z.dll
	UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/tool/7z/7z.exe,%softtemp%\asoft\7z\7z.exe
	msgbox 下载完成
	Return
downloadhelp:
	msgbox 测试菜单2
	Return
downloadUp:
	UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/ahk/lzq.txt,%softtemp%\lzq.txt
	Reload
	Return
挂载:
	if !FileExist(softtemp . "\挂载alist.vbs")
	{
	UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/softdata/data-rclone/rclone.conf,%softtemp%\rclone.conf
	UrlDownloadToFile,https://github.moeyy.xyz/https://raw.githubusercontent.com/lzqgan/fanhao/main/softdata/data-rclone/挂载alist.vbs,%softtemp%\挂载alist.vbs
	}
	run %softtemp%\挂载alist.vbs
	;run o:\
	Return
downloadrclone:
	UrlDownloadToFile,https://downloads.rclone.org/v1.62.2/rclone-v1.62.2-windows-amd64.zip,%softtemp%\dsoft\rclone.zip
	MsgBox, 下载完成
	Return
downloadwinfsp:
	UrlDownloadToFile,https://github.com/winfsp/winfsp/releases/download/v2.0/winfsp-2.0.23075.msi,%softtemp%\dsoft\winfsp-2.0.23075.msi
	run %softtemp%\dsoft\winfsp-2.0.23075.msi
	Return
editahk:
	run notepad.exe %A_ScriptName%
	Return



; 按下 F9 键或者双击系统托盘图标时显示 GUI 窗口
GuiClose:
	Gui, Hide
	Return

F9::
ToggleGui()
Return

;TrayTip, My Script, Double-click tray icon to show GUI.

;Menu, Tray, Tip, % "My Script`nDouble-click tray icon to show GUI"
;Menu, Tray, Icon, Shell32.dll, 42           ; 更改托盘图标

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



