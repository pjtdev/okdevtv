## nginx 설치

```
sudo yum install nginx -y
sudo service nginx start
curl -i http://localhost
sudo chown -R ec2-user:ec2-user /var/log/nginx /usr/share/nginx/html
echo "<h1>Hello World</h1>" > /usr/share/nginx/html/hello.html
```

* http://아이피/
* http://아이피/hello.html

### nginx (Optional)

* CentOS는 `yum install nginx` 전에 `yum install epel-release` 필요
* CentOS 6.x에서 epel-release는 1.0.x 버전의 구형 nginx 설치됨
* CentOS 7.x에서 service는 systemctl로 바뀜  

```
### CentOS 7.x
[root@elk1 local]# service nginx start
Redirecting to /bin/systemctl start  nginx.service
[root@elk1 local]# systemctl start nginx
[root@elk1 local]# systemctl stop nginx
[root@elk1 local]# ps -ef | grep nginx
root     17933  9025  0 20:47 pts/0    00:00:00 grep --color=auto nginx

[root@elk1 local]# systemctl start nginx
[root@elk1 local]# ps -ef | grep nginx
root     17952     1  0 20:48 ?        00:00:00 nginx: master process /usr/sbinnginx
nginx    17953 17952  0 20:48 ?        00:00:00 nginx: worker process
nginx    17954 17952  0 20:48 ?        00:00:00 nginx: worker process
root     17956  9025  0 20:48 pts/0    00:00:00 grep --color=auto nginx
[root@elk1 local]# 
```

### Ubuntu 14.x ngnix 설치
```
sudo apt-get install nginx -y
  404  Not Found [IP: 54.179.105.228 80]
Err http://ap-northeast-2.ec2.archive.ubuntu.com/ubuntu/ trusty-updates/main nginx-core amd64 1.4.6-1ubuntu3.3
# 위 에러를 만나면
sudo sed -i 's/ap-northeast-2.ec2\.//g' /etc/apt/sources.list
sudo apt-get update
```
from: http://www.develople.com/blog/archives/108

```
sudo apt-get install nginx -y
sudo service nginx start
curl -i http://localhost
sudo chown -R ubuntu:ubuntu /var/log/nginx /usr/share/nginx/html
echo "<h1>Hello World</h1>" > /usr/share/nginx/html/hello.html
```


## nginx 설치(for letsencrypt)
```
su
# 개발 관련 패키지 설치
yum install development #CentOS 7.x

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

## htpasswd 설정
```
sudo yum install httpd-tools
sudo htpasswd -c /etc/nginx/htpasswd.users kibanaadmin
sudo vi /etc/nginx/nginx.conf
```

* `/server_name` 으로 검색해서 아래와 같이 수정

```
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  localhost;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        auth_basic "Restricted Access";
        auth_basic_user_file /etc/nginx/htpasswd.users;
```


```
sudo service nginx restart
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

## 관련
* elk https://okdevtv.com/mib/elk
* letsencrypt https://okdevtv.com/mib/letsencrypt

## 참고
* http://nginx.org/
* https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-ubuntu-14-04

