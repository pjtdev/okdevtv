# Linux

## File Encoding
* 확인
  `file -bi filename`

## File opened count
* `lsof | wc -l`

## Port check
* `lsof -i tcp:3000`

## LC_CTYPE warning
* /etc/environment
```
LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```

## date
```
date '+%Y%m%d %H%M%S' # today
date -v-3d '+%Y%m%d %H%M%S' # 1 days before
```

## Timezone
* ~/.bash_profile
```
# .bash_profile
TZ='Asia/Seoul'; export TZ
```

## sudo
```
# vi /etc/sudoers
```

```
## Allows people in group wheel to run all commands
# %wheel        ALL=(ALL)       ALL
%dev    ALL=(ALL)       ALL
```

## Ref
* vi 에디터에서 utf8, euc-kr 전환하기
  * http://egloos.zum.com/indirock/v/3791689
* Linux file descriptors
  * https://www.cyberciti.biz/tips/linux-procfs-file-descriptors.html
