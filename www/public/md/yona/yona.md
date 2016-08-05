# Yona 
- 21세기 SW 협업 개발 환경
- http://yona.io
- installation 
  * https://github.com/yona-projects/yona

## In AWS install Yona

### Prerequisite
* MariaDB 설치

```
sudo yum update -y
sudo vi /etc/yum.repos.d/MariaDB.repo
sudo yum install MariaDB-server MariaDB-client
sudo service mysql start
sudo mysql_secure_installation
mysql -uroot -p
sudo vi /etc/my.cnf.d/server.cnf
sudo vi /etc/my.cnf.d/mysql-clients.cnf
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

bin/yona
```
* open browser and register admin account
* http://ipaddress:9000

## Run Yona in Background

```
nohup bin/yona &
```

