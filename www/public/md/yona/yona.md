# Yona 
- 21세기 SW 협업 개발 환경
- http://yona.io
- GitHub의 설치형 + 프로젝트별 게시판
- 한국어, 영어, 일어 지원
- installation 
  * https://github.com/yona-projects/yona

## In AWS install Yona

### Prerequisite
* MariaDB 설치
  * CentOS
```
sudo yum update -y
sudo vi /etc/yum.repos.d/MariaDB.repo
```

    * MariaDB.repo
```
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.0/centos6-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

    * MariaDB config
```
sudo yum install MariaDB-server MariaDB-client
sudo service mysql start
sudo mysql_secure_installation
mysql -uroot -p
```

  * Ubuntu https://downloads.mariadb.org/mariadb/repositories/#mirror=kaist&distro=Ubuntu


  * yona 계정, DB 생성

```
GRANT ALL PRIVILEGES ON yona.* TO yona@localhost
IDENTIFIED BY 'yonadan' WITH GRANT OPTION;

set global innodb_file_format = BARRACUDA;
set global innodb_large_prefix = ON;
create database yona DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_bin;
```

  * Server config
```
sudo vi /etc/my.cnf.d/server.cnf
```

```
[mysqld]
collation-server=utf8mb4_unicode_ci
init-connect='SET NAMES utf8mb4'
character-set-server=utf8mb4
lower_case_table_names=1
innodb_file_format=barracuda
innodb_large_prefix=on
```

  * Client config
```
sudo vi /etc/my.cnf.d/mysql-clients.cnf
```

```
[mysql]
default-character-set=utf8mb4
```

* JDK 1.8 설치

```
yum list | grep jdk
sudo yum remove java-1.7.0-openjdk.x86_64
sudo yum install java-1.8.0-openjdk-devel.x86_64
```

### Install Yona
* Yona 설치
  
```
mkdir local && cd local
wget https://github.com/yona-projects/yona/releases/download/v1.0.2/yona-v1.0.2-bin.zip
unzip yona-v1.0.2-bin.zip
ln -s yona-1.0.2/ yona
cd yona
bin/yona # first for unarchive folders
vi conf/application.conf
```
  * DB info in conf/application.conf

```
# MariaDB
db.default.driver=org.mariadb.jdbc.Driver
db.default.url="jdbc:mariadb://127.0.0.1:3306/yona?useServerPrepStmts=true"
db.default.user=yona
db.default.password="yonadan"
```

  * run yona
```
bin/yona
```
* open browser and register admin account
* http://ipaddress:9000

## Run Yona in Background

```
nohup bin/yona &
```

## 참고
* gmail 보안 설정 조정법
  * http://okky.kr/article/343036