# LetsEncrypt SSL
* SSL 무료 서비스
  * Secure Socket Layer
* 세계적인 루트 인증기관이 도메인을 안전하다고 보증하는 서비스
  * DigiCert, VeriSign, Thawte, ...
  * 고비용, 도메인값 * 10, 대략 20만원/1년
* https://letsencrypt.org/
* https 프로토콜을 무료로 서비스
  * 네트워크 패킷을 암호화
  * 중간에 패킷을 가로채서 볼 수 없음
  * 보안성이 좋아짐
* 2016.01.02 현재 베타 서비스 중
* 90일마다 갱신이 필요함


## 필요사항
* 도메인 (예 okdevtest.com)
* 서버 (예 digitalocean.com 임대)
  * http://80port.com 도메인 서비스 추천
  * CentOS 7.1(python 2.7 built-in)로 예제 실행
  * python 2.6은 안됨(?)

## nginx 설치
```
su
# 개발 관련 패키지 설치
yum install development

# 사용자id dev 생성 
adduser dev
passwd dev

# nginx 설치, 시작
yum install epel-release #centos7.*
yum install nginx -y
service nginx start #centos6.*
systemctl start nginx #centos7.*
curl -i http://localhost

# 폴더 접근권한 변경
chown -R dev:dev /var/log/nginx /usr/share/nginx/html

# html 파일 생성
su - dev
echo "<h1>Hello World</h1>" > /usr/share/nginx/html/hello.html
```
## centos6.* 경우
* epel의 ngninx 버전이 1.0.*로 낮음
* ssl_stapling 옵션 지원 안됨.
```
nginx           x86_64           1.0.15-12.el6           @epel           1.1 M
```
* nginx repo 지정 후 설치
```
vi /etc/yum.repos.d/nginx.repo
```

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/6/$basearch/
gpgcheck=0
enabled=1
```

## letencrypt 설치
```
su
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
./letsencrypt-auto \
  --help
```


```
service nginx stop #centos6.x
systemctl stop nginx #centos7.x
```


```
./letsencrypt-auto certonly \
  -a standalone \
  -d okdevtest.com \
  -d www.okdevtest.com
```
* tld : top level domain; .com, .net, .co.kr, .pe.kr, .kr, ...

## 인증서 확인
```
# ls /etc/letsencrypt/live/okdevtest.com/
cert.pem  chain.pem  fullchain.pem  privkey.pem
```


## nginx 설정
```
vi /etc/nginx/nginx.conf
#또는
vi /etc/nginx/conf.d/default.conf
```
* `listen 80;` 라인 밑에 추가
```
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/okdevtest.com/cert.pem;
        ssl_certificate_key /etc/letsencrypt/live/okdevtest.com/privkey.pem;
        ssl_stapling on;
        ssl_stapling_verify on;
        ssl_trusted_certificate /etc/letsencrypt/live/okdevtest.com/fullchain.pem;
```

## nginx 설정 테스트
```
nginx -t

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful


```


## wireshark 패킷 테스트
* http vs https
* http://www.wireshark.org


## 참고
* 설치 동영상
  * https://youtu.be/sWl8W0ILUmE
* Let's Encrypt를 적용시켜 보았다
  * https://blog.korsnack.kr/entry/lets-encrypt-with-nginx
* Lets' Encrypt로 무료로 HTTPS 지원하기 - by Outsider
  * https://blog.outsider.ne.kr/1178
