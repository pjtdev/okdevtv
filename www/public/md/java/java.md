# Java

## JDK, JRE
* Java Development Kit
* Java Runtime Environment
* JDK = JRE + javac

## Install
* http://java.sun.com
* CentOS
```
yum list | grep jdk
sudo yum remove java-1.7.0-openjdk.x86_64
sudo yum install java-1.8.0-openjdk-devel.x86_64
```

* Ubuntu
```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
sudo apt-get install oracle-java8-set-default
```

## 참고
* 2시간만에 자바를 쉽게 배우고 싶어요.
  * http://www.slideshare.net/kenu/java-start01-in-2hours