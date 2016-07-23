# MariaDB
* https://www.mariadb.org

## MariaDB + node.js
* https://github.com/felixge/node-mysql
* https://github.com/mscdex/node-mariasql
* install MariaDB
  * `vi /etc/yum.repos.d/MariaDB.repo`
```
# MariaDB 10.0 CentOS repository list - created 2015-06-10 04:26 UTC
# http://mariadb.org/mariadb/repositories/
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.0/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```
 * CentOS 6.x는 `baseurl = http://yum.mariadb.org/10.0/centos6-amd64`

 
```
# yum install MariaDB-server MariaDB-client
# service mysql start
# mysql_secure_installation
```
# MariaDB on ubuntu
* https://downloads.mariadb.org/mariadb/repositories/#mirror=kaist
```
sudo apt-get install software-properties-common
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
sudo add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://ftp.kaist.ac.kr/mariadb/repo/10.1/ubuntu trusty main'
```
