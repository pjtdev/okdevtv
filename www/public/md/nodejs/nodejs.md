# node.js
[toc]

## JS Warm Up

* JavaScript platform
* [JSON](http://www.json.org)

## 설치
* https://nodejs.org
* LTS (Long Term Support) 버전 또는 Current
* `node` and `npm`

## node.js 개요

```
Node.js® is a platform 
built on Chrome's JavaScript runtime 
for easily building fast, scalable network applications. 
Node.js uses an event-driven, non-blocking I/O model 
that makes it lightweight and efficient, perfect 
for data-intensive real-time applications 
that run across distributed devices.
```

### 특징
* JavaScript 기반 플랫폼
* Server-side
* Command Tool
* Desktop Application

### 장점
* 쉬운 시작
* 안정적인 서비스 w/ pm2
* 모듈 248,062 total packages(2016/03/04)
* 성능 개선
  * [linkedin 사례](http://highscalability.com/blog/2012/10/4/linkedin-moved-from-rails-to-node-27-servers-cut-and-up-to-2.html)
    * 서버 감축 Ruby + Mongrel 30대 -> node.js 3대
    * Frontend, Backend 개발자 소통 원활
    * 잡다한 작업 감소해서 로직에 집중
  * [paypal 사례](https://www.paypal-engineering.com/2013/11/22/node-js-at-paypal/)
    * Java를 Node.js로 대치
    * 더 적은 인원으로 개발 2배 정도 빨라짐
    * 코드량 33%, 파일 40% 감소
    * 성능 개선됨 (15-user: 11.3 vs 21.6 pages/sec)
* C/C++ Addon
  * https://nodejs.org/api/addons.html

### 단점
* No Silver Bullet
  * CPU과다 사용시 이슈
* 예외처리 실수하면 서버 다운 (pm2로 자동 재시작 가능)
* Callback Hell (Async로 커버 가능)
  * http://callbackhell.com


## 비동기 프로그래밍
* 자바스크립트의 경우 비동기 코드 패턴이 다반사
* 기존 코드와 달리 콜백 함수를 함께 넘겨주는 형태
* 이벤트 핸들링에 많이 쓰이는 기법
* 이벤트 루프 사용으로 싱글쓰레드 동작

### blocking, non-blocking

* Input/Output
* IO latency
  * L1: 3 cycles
  * L2: 14 cycles
  * RAM: 250 cycles
  * DISK: 41,000,000 cycles 
  * NETWORK: 240,000,000 cycles

from: https://www.dropbox.com/s/o9g4m7tug3yt1xx/jsconf2009-nodejs.pdf?dl=0

* blocking code
```
var result = db.query("select * from T");
// use result
```

* non-blocking code
```
db.query("select * from T", 
  function(result) {
    // use result
  }
);
```


### 이벤트 루프

![event loop](images/event-loop.png)

from [blog.udemy.com/learn-node-js/](https://lh4.googleusercontent.com/pwtI1uBbT5Gthva6sGtKu_L3Ih3w2oxt-LA28mEamjrz6dKl87NFKiTxgzlHfGhIuFF107PxLFeWMdc8z3dchWtpqpcaqE4D4nrcSx3UQmfEDmJTL_LzNKQVjg)

* 이벤트 루프 사용으로 싱글쓰레드 동작
  * 기존 서버는 쓰레드 기반
  * 아파치 등은 커넥션 증가에 따라서 메모리 증가
* nginx는 이벤트 루프 방식


### 안티 패턴
```
“헤이, probablyExpensiveFunction(), 니 일을 해줘. 
하지만 나 Single Node.js 쓰레드는 네가 끝낼 때까지 여기서 기다리지 않을거야. 
네 아래에 있는 코드 라인을 계속 실행할거야. 
그러니 여기 이 callbackFunction()을 가져가서 
네가 너의 비싼 일을 모두 끝냈을 때 호출해 주겠니? 
고마워!”
```
from: http://www.nodebeginner.org/index-kr.html#how-to-not-do-it

## 서버사이드 자바스크립트 개발환경 설치
* http://nodejs.org

## 모듈 만들고 참조하기
* commonjs
* require()

## npm 을 통한 확장
* http://npmjs.org
* package.json

## socket.io 모듈
* socket.io
  * [채팅 튜토리얼](https://okdevtv.com/kr/socket.io-chat-kr.html)
* 52라인으로 웹채팅 가능
* index.html

```
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>

<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
</script>
  </body>
</html>
```

* index.js

```
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

* package.json

```
{
  "name": "socket-chat-example",
  "version": "0.0.1",
  "description": "my first socket.io app",
  "dependencies": {
    "express": "^4.14.0",
    "socket.io": "^1.5.0"
  }
}
```

## expressjs 웹 프레임워크
* http://expressjs.com/
* npm install -g express-generator
* express myapp



## node.js PaaS 활용 - heroku
* node.js 지원하는 PaaS
  * 무료사용 가능
* https://www.heroku.com/
* http://okdevtv.com/tip/nodehosting.html


## MairaDB 설치
* [설치링크](/mib/mariadb)

## DB schema와 계정, 테이블 설정
* **root** mysql 로그인
```
mysql -u root -p
```

* 계정 생성, DB schema, table 생성 후 레코드 추가

```
GRANT ALL PRIVILEGES ON *.* TO javauser@'%'
  IDENTIFIED BY 'javadude' WITH GRANT OPTION;

create database javatest;
use javatest;
create table testdata (
   id int not null auto_increment primary key,
   foo varchar(25),
   bar int);
insert into testdata values(null, 'hello', 12345);

```

```
mysql -ujavatest -p -h104.236.46.34
```

## MongoDB + node.js
* http://okdevtv.com/mongodb_nodejs.html



## node cluster 시작하기
* native cluster api
  * https://nodejs.org/api/cluster.html
  * 0.12.7 Unstable

```
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
```

### node.js clustering with PM2
* https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/


## 디버깅
* https://nodejs.org/api/debugger.html
* node-inspector
  * https://github.com/node-inspector/node-inspector#node-inspector
  * 크롬브라우저를 독립적으로 띄워서 크롬 인스펙터 UI로 디버깅 가능
  * http://okjsp.tistory.com/1165644244


## Test Frameworks
* QUnit
  * http://qunitjs.com/
  * http://backbonejs.org/test/
    * test source  https://github.com/jashkenas/backbone/blob/master/test/index.html
* Testing Essentials
  * http://thenodeway.io/posts/testing-essentials/

* UI 테스트
  * GUITAR
    * http://naver.github.io
    * http://dev.naver.com/projects/guitar
  * jmeter maven
    * jenkins jmeter


## 서버 모니터링
* uptime
  * https://github.com/fzaninotto/uptime
  * http://localhost:8082/

```
$ cd ~/dev/mongodb/bin
$ mkdir -p ~/data/db
$ ./mongod --dbpath=/Users/kenu/data/db

$ cd ~/dev/mongodb/bin
$ mongo
MongoDB shell version: 2.4.9
connecting to: test
> use uptime
switched to db uptime
> db.addUser('uptime', 'okpass');
{
	"user" : "uptime",
	"readOnly" : false,
	"pwd" : "fdc9e10c8f90fac0c9fe786f28cc04f4",
	"_id" : ObjectId("5577b97a62555c0332f63e6f")
}
> exit


$ git clone git://github.com/fzaninotto/uptime.git
$ cd uptime
$ npm install


```

* node server monitor
  * [alternative](https://strongloop.com/strongblog/comparison-tools-to-automate-restarting-node-js-server-after-code-changes-forever-nodemon-nodesupervisor-nodedev/)
  * forever
  * nodemon
  * node-supervisor
  * node-dev
* PM2
  * https://github.com/Unitech/PM2




## 참고
* node.js
  * http://nodejs.org
* http://bit.ly/okjavascript
* http://bit.ly/oknodejs
* node.js 내가-쓰기로-선택한-이유
  * https://vinebrancho.wordpress.com/2014/03/24/node-js-내가-쓰기로-선택한-이유/
* octobersky.js
  * https://github.com/octoberskyjs
* PM2 (Process Monitor 2)
  * http://devo.ps/blog/goodbye-node-forever-hello-pm2/
* node.js for other languages
  * https://okdevtv.com/mib/nodejs/otherlanguages