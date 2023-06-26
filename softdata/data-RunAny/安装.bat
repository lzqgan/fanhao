@echo off
set file1=%~dp0RunAny.ini
set file2=%~dp0RunAnyConfig.ini
del "D:\softlzq\RunAny\RunAny.ini"
del "D:\softlzq\RunAny\RunAnyConfig.ini"
mklink D:\softlzq\RunAny\RunAny.ini %file1%
mklink "D:\softlzq\RunAny\RunAnyConfig.ini" %file2%
echo. 链接已建立
pause