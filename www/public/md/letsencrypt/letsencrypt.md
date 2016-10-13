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
* [nginx 설치](./nginx/nginx.md)

## letencrypt 설치
* certbot 가이드 이용한 설치 가이드 추천
  * https://certbot.eff.org/

* 아래는 이전 방법

```
su
git clone https://github.com/certbot/certbot
cd certbot
./certbot-auto --help
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
        ssl_certificate /etc/letsencrypt/live/okdevtest.com/fullchain.pem;
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


## HTTP to HTTPS redirect
```
server {
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name _;
	return 301 https://$host$request_uri;
}
```
* https://bjornjohansen.no/redirect-to-https-with-nginx

## apache2.2.15 on CentOS 6.8
```
yum update -y
yum install git
yum install httpd
vi /etc/httpd/conf/httpd.conf
service httpd restart
sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
cd /opt/letsencrypt/
yum install epel-release
yum install -y python-pip
pip install virtualenv
./letsencrypt-auto --apache -d www.okdevtest.com
```


## wireshark 패킷 테스트
* http vs https
* http://www.wireshark.org


## update alert email
```
Hello,

Your certificate (or certificates) for the names listed below will expire in 20 days (on 31 Oct 16 03:55 +0000). Please make sure to renew your certificate before then, or visitors to your website will encounter errors.

okdevtv.com
www.okdevtv.com

For any questions or support, please visit https://community.letsencrypt.org/. Unfortunately, we can't provide support by email.
```

## nginx update expiry
```
service nginx stop
./letsencrypt-auto certonly --renew-by-default -a standalone -d okdevtest.com -d www.okdevtest.com
service nginx start
```
* 무중단 갱신 가능 : http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=tipntech&wr_id=80590
  * thanks to @shjxenoside

## 참고
* SSL Test
  * https://www.ssllabs.com/ssltest/analyze.html
* for windows
  * http://youtil.wo.tc/163
* 설치 동영상
  * https://youtu.be/sWl8W0ILUmE
* Let's Encrypt를 적용시켜 보았다
  * https://blog.korsnack.kr/entry/lets-encrypt-with-nginx
* Lets' Encrypt로 무료로 HTTPS 지원하기 - by Outsider
  * https://blog.outsider.ne.kr/1178
* https://danpalmer.me/blog/ssl-labs-grade-a
* https://www.gypthecat.com/how-to-install-a-ssl-certificate-on-nginx
* https://community.letsencrypt.org/t/getting-certbot-auto-to-include-the-x3-public-key/18472
