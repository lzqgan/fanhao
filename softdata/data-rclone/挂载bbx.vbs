dim objShell 
set objShell=wscript.createObject("WScript.Shell") 
iReturnCode=objShell.Run("rclone mount  bbx:/ q: --config d:\test\rclone.conf --cache-dir d:\test  --allow-other --attr-timeout 5m --vfs-cache-mode full --vfs-cache-max-age 2h --vfs-cache-max-size 10G --vfs-read-chunk-size-limit 100M --buffer-size 100M --fast-list --checkers 64 --transfers 64",0,TRUE)