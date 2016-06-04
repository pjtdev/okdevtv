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


## 검색
* query방식은 2가지
  * URI방식 : REST API
  * request body방식 : http 데이터
* index/type 검색, index 검색, multi index 검색
* 시작하세요! 엘라스틱서치 예제
* downloads
  * `curl -O https://codeload.github.com/wikibook/elasticsearch/zip/master`
  * `git clone https://github.com/wikibook/elasticsearch`
```
#데이터 적재
cd elasticsearch/cd 05.검색
curl -XPOST http://localhost:9200/_bulk --data-binary @5_1_books.json
curl -XPOST http://localhost:9200/_bulk --data-binary @5_2_magazines.json
```

## 검색 API
* `curl localhost:9200/books/book/_search?q=keyword`
* q 파라미터
* index/type 단위로 검색, 또는 index로 검색 가능
* 결과는 hits 필드에 배열로 표시
* url 자체를 문자열처럼 '로 감싸서 조회 가능
  * "took" : 검색 소요시간 밀리초 단위
* multi tenancy
  * `curl 'localhost:9200/books,magazines/_search?q=time&pretty'`
  * `curl 'localhost:9200/_all/_search?q=time&pretty'`
  * `curl 'localhost:9200/_search?q=time&pretty'`
* URI 검색
  * `q`
    * 필드명:질의어
      * `curl 'localhost:9200/_search?q=title:time&pretty'`
    * 공백 처리
      * `curl 'localhost:9200/_search?q=title:time%20AND%20machine&pretty'`
  * `df`(default field)
    * `curl 'localhost:9200/_search?q=time&df=title&pretty'`
  * `default_operator`
    * `curl 'localhost:9200/_search?q=time%20machine&default_operator=AND&pretty'`
  * `explain`
    * 상세 점수(score) 표시
    * score : 검색어에 해당하는 데이터의 정확도
    * 점수가 높을수록 상위에 표시
    * `curl 'localhost:9200/_search?q=title:time&explain&pretty'`
  * `_source`
    * 기본값은 true
    * false로 설정한 경우 hit와 score같은 메타 정보만 출력
    * `curl 'localhost:9200/_search?q=title:time&_source=false&pretty'`
  * `fields`
    * 출력 결과에 해당 지정된 필드만 표시
    * `curl 'localhost:9200/_search?q=title:time&fields=title,author,category&pretty'`
  * `sort`
    * `curl 'localhost:9200/_search?q=author:jules&sort=pages&pretty'`
    * `curl 'localhost:9200/_search?q=author:jules&sort=pages:desc&pretty'`
    * `curl 'localhost:9200/_search?q=author:jules&fields=author,title&sort=title&pretty'`
    * `curl 'localhost:9200/_search?q=author:jules&fields=author,title&sort=title:desc&pretty'`
    * 값 전체로 정렬하려면 데이터 색인 전에 title 필드를 `not_analyzed`로 매핑(mapping)해야 함(8장 참고)
  * `from`
    * 몇 번째부터 출력할지 지정, 기본값 0
    * `curl 'localhost:9200/_search?q=author:jules&fields=author,title&from=1&pretty'`
* 리퀘스트 바디 검색
  * JSON 형태의 질의
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "term" : { "author" : "william" }
  }
}'
# 또는
curl 'localhost:9200/books/_search?pretty' -d '
{
  'query' : {
    'term' : { "author" : "william" }
  }
}'
```

  * 옵션
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  from : 1,
  size : 2,
  fields : ["title", "category"],
  "query" : {
    "term" : { "author" : "william" }
  }
}'
```

  * `sort`
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  fields : ["title", "author", "category", "pages"],
  sort : [{"category":"desc"}, "pages", "title"],
  "query" : {
    "term" : { "author" : "william" }
  }
}'
```

  * `_source`
    * false
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "_source" : false,
  "query" : {
    "term" : { "author" : "william" }
  }
}'
```
    * fields
```
curl 'localhost:9200/magazines/_search?pretty' -d '
{
  "_source" : [ "title", "c*" ]
}'
```

    * `include`, `exclude`
```
curl 'localhost:9200/magazines/_search?pretty' -d '
{
  "_source" : {
    "include" : "c*"
  }
}'
# exclude
curl 'localhost:9200/magazines/_search?pretty' -d '
{
  "_source" : {
    "include" : "c*",
    "exclude" : "*ry"
  }
}'
```

## 페이셋(facet)/'fæsəts/
* 시작하세요! 엘라스틱서치 6장
* 검색시 입력한 조건에 대해 각 결과의 갯수 확인 가능
* 1.0부터 페이셋의 단점을 보완한 어그리게이션(aggregation) 모듈 추가
* 2.0에서 삭제됨 `unknown search element [facets]`
* 카운트, 합계 등을 다루는 기술

* 6장 index mapping
```
curl -XPUT http://localhost:9200/hotels/ -d '
{
  "mappings" : {
    "hotel" : {
      "properties" : {
        "name" : { "type" : "string"},
        "stars" : { "type" : "long"},
        "rooms" : { "type" : "long"},
        "location" : { "type" : "geo_point"},
        "city" : { "type" : "string"},
        "address" : { "type" : "string"},
        "internet" : { "type" : "boolean"},
        "service" : { "type" : "string", "index" : "not_analyzed"},
        "checkin" : { "type" : "date", "format" : "dateOptionalTime"}
      }
    }
  }
}'
```

* 매핑 적용한 후에 데이터 적재
  * `curl -XPOST localhost:9200/_bulk --data-binary @6_1_hotels.json`


* Term facet
  * 검색 결과를 Term 별로 구분해서 표시
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "query" : {
    "term" : { "name" : "seoul" }
  },
  "facets" : {
    "term_service" : {
      "field" : "service"
    }
  }
}'
```

## 어그리케이션(aggregation)

### 최소, 최대, 합, 평균, 개수 aggs

### 통계

### 위치, 거리




## 참고
* 시작하세요! 엘라스틱서치 by 김종민
  * https://github.com/wikibook/elasticsearch
* http://elastic.co

