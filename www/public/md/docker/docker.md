# Docker

* http://docker.io
* Build, Ship, Run
* 개발자와 시스템어드민을 위한 분산 애플리케이션용 오픈 플랫폼

## Install
* Docker Toolbox 다운로드
* https://www.docker.com/products/docker-toolbox
* docker quick start terminal 실행
* `docker run hello-world`
  * docker : 시스템에 있는 docker 사용
  * run : 서브명령, 컨테이너 실행
  * hello-world : 컨테이너에 실을 이미지 이름
  
 
* Docker 창시자 발표 https://youtu.be/Q5POuMHxW-0

```
docker ps
docker images
docker images ubuntu
docker run -i -t ubuntu:12.10 /bin/bash

ps faxw
ls
rm -rf /var /usr /lib
ls /var
exit

ssh dockerdev
sudo -s
docker ps
docker diff 7b882b11bc8e
docker commit 7b882b11bc8e shykes/broken-ubuntu
docker run -i -t shykes/broken-ubuntu /bin/bash

docker push shykes/broken-ubuntu
https://index.docker.io
```

## 참고
* Getting Started for non-technical
  * https://docs.docker.com/mac/
