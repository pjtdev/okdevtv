# ElasticSearch

* Shay Banon
* http://elastic.co

* Lecene 라이브러리 사용

* 경쟁제품 Solr, Tica

* Java 7 이상 필요

* Lucene 검색 엔진을 잘 이용하는 제품입니다.

* [설치 및 실행](/mib/elk/elk)

## 플러그인 설치
* `bin/plugin install {org}/{user/component}/{version}`
* head : `bin/plugin install mobz/elasticsearch-head`
  * http://localhost:9200/_plugin/head

## 데이터 구조

| RDB | Elasticsearch |
|----|----|
| Database | Index |
| Table | Type |
| Record | Document |
| Column | Field |
| Schema | Mapping |

| HTTP method | Elasticsearch |
|----|----|
| Create | POST |
| Read | GET |
| Update | PUT |
| Delete | DELETE |

## 데이터 입력
```
curl -XPOST http://localhost:9200/book/books/1 -d '
{
  "title" : "elasticsearch guide",
  "author" : "Kim",
  "date" : "2016-05-22",
  "pages" : 250
}
'
```

## 데이터 조회
```
curl -XGET http://localhost:9200/book/books/1
# 또는
curl -XGET http://localhost:9200/book/books/1\?pretty
```

## 데이터 갱신
```
curl -XPOST http://localhost:9200/book/books/1 -d '
{
  "title" : "elasticsearch guide",
  "author" : ["Kim", "Heo"],
  "date" : "2016-05-22",
  "pages" : 300
}
'
```

## 데이터 삭제
```
curl -XDELETE http://localhost:9200/book/books/1
```


## 참고
* 시작하세요! 엘라스틱서치 by 김종민
  * https://github.com/wikibook/elasticsearch
* http://elastic.co

