# curl
* call url
* RESTful API 작업에 유용

## method 지정
* GET, POST, PUT, DELETE
```
curl -XGET https://okdevtv.com
curl -XGET https://okdevtv.com\?param=value
curl -XGET 'https://okdevtv.com?param=value'
```

## 다운로드
```
curl -O http://downloadlink
```

## 헤더 설정
* `-H` or `--header`
```
curl --header 'headername: value' http://okdevtv.com
```
