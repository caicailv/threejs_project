@echo off
echo git pull
cmd /c "git pull"
echo git add .
cmd /c "git add ."
cmd /c "git commit -m 'push.bat-ci'"
echo git push
cmd /c "git push"
exit