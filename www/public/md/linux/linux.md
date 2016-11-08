# Linux

## File Encoding
* 확인
  `file -bi filename`


## Ref
* vi 에디터에서 utf8, euc-kr 전환하기
  * http://egloos.zum.com/indirock/v/3791689

## LC_CTYPE warning
* /etc/environment
```
LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```

## Timezone
* ~/.bash_profile
```
# .bash_profile
TZ='Asia/Seoul'; export TZ
```
