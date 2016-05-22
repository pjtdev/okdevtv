# Elasticsearch

* Shay Banon
* http://elastic.co
* [Lucene](http://lucene.apache.org) 라이브러리 사용
* Lucene 검색 엔진을 잘 이용하는 제품입니다.
* 경쟁제품 Solr, Tica
* Java 7 이상 필요

* [설치 및 실행](http://okdevtv.com/mib/elk/elk)

## 플러그인 설치
* `bin/plugin install {org}/{user/component}/{version}`
* head : `bin/plugin install mobz/elasticsearch-head`
  * http://localhost:9200/_plugin/head

## 데이터 구조 및 입출력
* 데이터 구조

| RDB | Elasticsearch |
|----|----|
| Database | Index |
| Table | Type |
| Record | Document |
| Column | Field |
| Schema | Mapping |

* 데이터 입출력

| HTTP method | Elasticsearch |
|----|----|
| Create | POST |
| Read | GET |
| Update | PUT |
| Delete | DELETE |

## 데이터 입력
```
curl -XPOST http://localhost:9200/books/book/1 -d '
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
curl -XGET http://localhost:9200/books/book/1
# 또는
curl -XGET http://localhost:9200/books/book/1\?pretty
```

## 데이터 갱신
```
curl -XPOST http://localhost:9200/books/book/1 -d '
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
curl -XDELETE http://localhost:9200/books/book/1
```

## 데이터 배치 입력(_bulk API)
* data.txt

```
{ "delete" : { "_index" : "books", "_type" : "book", "_id" : "1" } }
{ "update" : { "_index" : "books", "_type" : "book", "_id" : "2" } }
{ "doc" : { "date" : "2014-05-01" } }
{ "create" : { "_index" : "books", "_type" : "book", "_id" : "3" } }
{ "title" : "Elasticsearch Guide II", "author" : "Park", "pages" : 400 }
```

* 파일 입력

```
curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @data.txt
```


## 참고
* 시작하세요! 엘라스틱서치 by 김종민
  * https://github.com/wikibook/elasticsearch
* http://elastic.co

