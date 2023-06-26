@echo off
set file1=%~dp0list.yml
del "D:\softlzq\Clash\Data\profiles\list.yml"
mklink D:\softlzq\Clash\Data\profiles\list.yml %file1%
echo. 链接已建立
pause