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
  * 2.0 이상에서는 절대 따라하지 마시오. `unknown search element [facets]`
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

## 어그리게이션(aggregation)

* 최소값
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "price_min" : {
      "min" : { "field" : "price" }
    }
  }
}'
```

* 최대값
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "price_max" : {
      "max" : { "field" : "price" }
    }
  }
}'
```

* 합
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "price_sum" : {
      "sum" : { "field" : "price" }
    }
  }
}'
```

* 평균
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "price_avg" : {
      "avg" : { "field" : "price" }
    }
  }
}'
```

* 카운트
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "price_cnt" : {
      "value_count" : { "field" : "price" }
    }
  }
}'
```

* 기본 통계 정보
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "price_stats" : {
      "stats" : { "field" : "price" }
    }
  }
}'
```

* 확장된 통계 정보
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "price_ex_stats" : {
      "extended_stats" : { "field" : "price" }
    }
  }
}'
```

### 글로벌 어그리게이션
* 생성된 버킷에서 다시 하위 어그리게이션 적용
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "query" : {
    "term" : { "name" : "seoul" }
  },
  "aggs" : {
    "avg_price" : {
      "avg" : { "field" : "price" }
    }
  }
}'
```

* 글로벌 and 하위
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "query" : {
    "term" : { "name" : "seoul" }
  },
  "aggs" : {
    "all_price" : {
      "global" : {},
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```


### 필터 어그리게이션
* 주어진 필터에 해당하는 도큐먼트를 담는 버킷 생성
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "filter_name" : {
      "filter" : {
        "term" : { "name" : "seoul" }
      },
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```

### 누락(missing) 어그리게이션
* 지정한 필드가 없거나 필드 값이 null인 도큐먼트를 담는 버킷 생성
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "missing_service" : {
      "missing" : { "field" : "service" },
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```

### 텀 어그리게이션
* 검색된 텀별로 버킷 생성
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "term_stars" : {
      "terms" : { "field" : "stars" },
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```

* 오름차순, 내림차순

```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "term_stars" : {
      "terms" : {
        "field" : "stars",
        "order" : { "_term" : "desc" }
      },
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```

```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "term_stars" : {
      "terms" : {
        "field" : "stars",
        "order" : { "avg_price" : "asc" }
      },
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```


### 범위, 날짜 범위 어그리게이션

```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "range_room" : {
      "range" : {
        "field" : "rooms",
        "ranges" : [{"to":500}, {"from":500, "to":1000}, {"from":1000}]
      },
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```

* `keyed`
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "range_room" : {
      "range" : {
        "field" : "rooms",
        "keyed" : true,
        "ranges" : [{"to":500}, {"from":500, "to":1000}, {"from":1000}]
      },
      "aggs" : {
        "avg_price" : {
          "avg" : { "field" : "price" }
        }
      }
    }
  }
}'
```

* 날짜
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "date_r_checkin" : {
      "date_range" : {
        "field" : "checkin",
        "format" : "yyyy-MM-dd",
        "ranges" : [{"to": "now-4M"}, {"from": "now-4M"}]
      }
    }
  }
}'
```

```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "date_r_checkin" : {
      "date_range" : {
        "field" : "checkin",
        "format" : "yyyy-MM-dd hh:mm:ss",
        "ranges" : [{"to": "2014-03-05 12:30:45"}, {"from": "2014-03-05 12:30:45"}]
      }
    }
  }
}'
```


### 히스토그램

```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "histo_rooms" : {
      "histogram" : {
        "field" : "rooms",
        "interval" : 500
      }
    }
  }
}'
```

```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "histo_rooms" : {
      "histogram" : {
        "field" : "rooms",
        "interval" : 300,
        "min_doc_count" : 0
      }
    }
  }
}'
```


### 위치, 거리
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "aggs" : {
    "geo_location" : {
      "geo_distance" : {
        "field" : "location",
        "origin" : "37.52, 126.98",
        "distance_type" : "plane",
        "unit" : "km",
        "ranges" : [{"to":3},{"from":3, "to":6},{"from":6, "to":9},{"from":9}]
      }
    }
  }
}'
```

## 질의(QueryDSL)
* Query
  * 전문 검색(full text search)
  * scoring
  * 결과 캐싱 안함
  * 응답속도 느림
* Filter
  * Y/N조건의 바이너리 구분
  * no scoring
  * 결과 캐싱됨
  * 응답속도 빠름

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "term" : {
      "title" : "prince"
    }
  }
}
```

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "filter" : {
    "term" : {
      "title" : "prince"
    }
  }
}
```

### Query
* 형태소 분석
  * The Prince and the Pauper → the, prince, and, pauper
  * 모두 소문자로, 중복 삭제
  * the, prince, and, pauper 같은 토큰을 텀term 이라고 함

* 소문자로 검색
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "term" : {
      "title" : "prince"
    }
  }
}'
```
* terms query : 2개 이상의 term 검색
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "terms" : {
      "title" : ["prince", "king"]
    }
  }
}'
```

* minimum_should_match
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "terms" : {
      "title" : ["the", "and", "of"],
      "minimum_should_match" : 2
    }
  }
}'
```

* 매치, 다중 매치(multi match) 쿼리
  * 질의문을 형태소 분석한 뒤에 term 검색
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "match" : {
      "title" : "The And"
    }
  }
}'
```
  * operator 사용
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "match" : {
      "title" : {
        "query" : "The And",
        "operator" : "and"
      }
    }
  }
}'
```
  * analyzer 사용
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "match" : {
      "title" : {
        "query" : "prince king",
        "analyzer" : "whitespace"
      }
    }
  }
}'
```
  * type:phrase
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "match" : {
      "title" : {
        "query" : "and the",
        "type" : "phrase"
      }
    }
  }
}'
```
  * multi match
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "multi_match" : {
      "fields" : [ "title", "plot" ],
      "query" : "prince king"
    }
  }
}'
```
  
* Bool query
  * `must`, `must_not`, `should`
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "bool" : {
      "must" : {
        "term" : { "title" : "the" }
      },
      "must_not" : {
        "term" : { "plot" : "prince" }
      },
      "should" : [
        {"term" : { "title" : "time" } },
        {"term" : { "title" : "world" } }
      ]
    }
  }
}'
```

* String query
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "query_string" : {
      "query" : "title:prince"
    }
  }
}'
```

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "query_string" : {
      "query" : "pringce king",
      "default_field" : "plot",
      "default_operator" : "and"
    }
  }
}'
```

* prefix query
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "prefix" : {
      "title" : "prin"
    }
  }
}'
```

* range query
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "range" : {
      "pages" : { "gte" : 50, "lt" : 150 }
    }
  }
}'
```

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "range" : {
      "written" : {
        "gte" : "1600-01-01",
        "lt" : "1699-12-31"
      }
    }
  }
}'
```


* match_all query
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "match_all" : {}
  }
}'
```


* fuzzy query
  * 레벤슈타인 거리(Levenshtein distance) 알고리즘 기반
  * `tree`로 검색시 `three` 포함
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "fuzzy" : {
      "title" : "tree"
    }
  }
}'
```

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "fuzzy" : {
      "pages" : {
        "value" : 100,
        "fuzziness" : 20
      }
    }
  }
}'
```


### Filter
* term filter
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "filter" : {
    "term" : {
      "title" : "prince"
    }
  }
}'
```
* terms filter
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "filter" : {
    "terms" : {
      "title" : ["prince", "king"]
    }
  }
}'
```
  * execution option
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "field" : {
    "terms" : {
      "title" : ["and", "the"],
      "execution" : "and"
    }
  }
}'
```
* range filter
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "filter" : {
    "range" : {
      "pages" : { "gte" : 50, "lt" : 150 }
    }
  }
}'
```
* and, or, not filter
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "filter" : {
    "not" : {
      "range" : {
        "pages" : { "gte" : 50, "lt" : 150 }
      }
    }
  }
}'
```

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "filter" : {
    "and" : {
      "range" : {
        "pages" : { "gte" : 50, "lt" : 150 }
      }
    },
    {
      "term" : { "title" : "the" }
    }
  }
}'
```

* Bool filter
```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "filter" : {
    "bool" : {
      "must" : {
        "term" : { "title" : "the" }
      },
      "must_not" : {
        "term" : { "plot" : "prince" }
      },
      "should" : [
        {"term" : { "title" : "time" } },
        {"term" : { "title" : "world" } }
      ]
    }
  }
}'
```

* geo filter
  * geo_bounding_box
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "filter" : {
    "geo_bounding_box" : {
      "location" : {
        "top_left" : { "lat" : 38.00, "lon" : 126.00 },
        "bottom_right" : { "lat" : 37.00, "lon" : 127.00 }
      }
    }
  }
}'
```
  * geo_distance
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "filter" : {
    "geo_distance" : {
      "distance" : "5km",
      "location" : { "lat" : 37.52, "lon" : 126.98 }
    }
  }
}'
```
  * geo_distance_range
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "filter" : {
    "geo_distance_range" : {
      "from" : "5km",
      "to" : "10km",
      "location" : { "lat" : 37.52, "lon" : 126.98 }
    }
  }
}'
```
  * geo_polygon
```
curl 'localhost:9200/hotels/_search?pretty' -d '
{
  "filter" : {
    "geo_polygon" : {
      "location" : {
        "points" : [
          { "lat" : 38.00, "lon" : 127.00 },
          { "lat" : 37.00, "lon" : 127.00 },
          { "lat" : 38.00, "lon" : 128.00 }
        ]
      }
    }
  }
}'
```


## 매핑
* 데이터의 저장, 검색에 대한 명세
* `_mapping` api 사용
* PUT method
* 한번 설정된 매핑에 필드를 추가할 수 있지만, 변경, 삭제는 불가능


```
curl 'localhost:9200/books/_mapping?pretty'
```

* mapping 추가
```
curl -XPUT 'http://localhost:9200/books/_mapping/book' -d '
{
  "book" : {
    "properties" : {
      "read" : { "type" : "boolean"}
    }
  }
}'
```

### 내장필드
* 도큐먼트 데이터의 스키마 구조를 정의

* _id
  * 데이터의 특정 필드의 값이 도큐먼트 아이디로 저장되도록 설정 가능

```
curl -XDELETE 'http://localhost:9200/books'

curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "_id" : { "path"  : "title" }
    }
  }
}'

curl -XPOST localhost:9200/_bulk --data-binary @5_1_books.json

curl 'http://localhost:9200/books/_search?pretty'

curl 'http://localhost:9200/books/book/King%20Lear?pretty'
```

* _source
  * 원본 저장 여부 결정
  
```
curl -XDELETE 'http://localhost:9200/books'

curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "_source" : { "enabled"  : false }
    }
  }
}'

curl -XPOST localhost:9200/_bulk --data-binary @5_1_books.json

curl 'http://localhost:9200/books/_search?q=prince&pretty'
```
  * 특정 필드만 원본으로 저장
  
```
curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "_source" : {
        "includes" : ["title", "author", "category"]
      }
    }
  }
}'
```
  * 특정 필드 제외
  
```
curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "_source" : {
        "excludes" : ["p*"]
      }
    }
  }
}'
```
  

* _all
```
curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "_all" : { "enabled" : true },
      "properties" : {
        "title" : {
          "include_in_all" : true,
          "type" : "string"
        },
        "plot" : {
          "include_in_all" : false,
          "type" : "string"
        }
      }
    }
  }
}'
```
  

* _analyzer
  * 사용할 분석기 지정
```
curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "_analyzer" : { "path" : "analyze_value" }
    }
  }
}'
```


* _timestamp
  * 색인 시점의 타임스탬프 저장
```
curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "books" : {
      "_timestamp" : {
        "enabled" : true,
        "sort" : true
      }
    }
  }
}'
```
  
* _ttl(time to live)
```
curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "books" : {
      "_ttl" : {
        "enabled" : true,
        "default" : "2m"
      }
    }
  }
}'
```


### 데이터 타입

* 문자열
  * 옵션  

| 이름 | 설명 | 기본값 |
|---|---|---|
|store | 필드값 저장 여부 |  false 
|index | 분석기 적용 여부 analyzed, not_analyzed, no | . 
|boost | 필드 가중치 | 1.0
|null_value | 필드 없는 경우 기본값 지정 | . 
|analyzer | 분석기 지정 | . 
|index_analyzer | 데이터 색인에 사용될 분석기 지정 | .
|search_analyzer | 문자열 검색에 사용될 분석기 지정 | .
|include_in_all | _all 매핑 필드 적용된 경우 색인 여부 지정 | . 
|ignore_above | 지정값보다 큰 크기의 문자열 색인 제외 | .

```
curl -XPUT 'http://localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "properties" : {
        "title" : { "type" : "string", "boost" : 2.0 },
        "category" : { "type" : "string", "index" : "not_analyzed" }
      }
    }
  }
}'
```

* `curl 'localhost:9200/books/_search?q=prince&pretty'`
* `curl 'localhost:9200/books/_search?q=category:science&pretty'`
* `curl 'localhost:9200/books/_search?q=category:Science%20Fiction&pretty'`

* 숫자
  * 정수: byte, short, integer, long
  * 실수: float, double
  * 자바의 자료형과 같은 범위

```
curl -XPUT 'localhost:9200/test_nums' -d '
{
  "mappings" : {
    "test_num" : {
      "properties" : {
        "num_val" : { "type" : "integer", "ignore_malformed" : true }
      }
    }
  }
}'
```

```
curl -XPUT 'localhost:9200/test_nums/test_num/1' -d '
{
  "num_val": "hello"
}'
```

```
curl 'localhost:9200/test_nums/test_num/1'
```

```
curl 'localhost:9200/test_nums/_search?pretty' -d '
{
  "aggs" : {
    "num_stat" : {
      "stats" : { "field" : "num_val" }
    }
  }
}'
```


* 날짜
  * 엔진 내부적으로는 long으로 저장
  * `ignore_malformed`, `format` 옵션
  
* 불린
  * `true`, `false`

* 바이너리
  * base64로 변환된 이미지 저장 가능
  * 옵션
    * `store`, `compress`, `compress_threshold`

* 객체
  * object type 저장 가능
  * 색인 안 됨

* 중첩
  * 트리 형태가 아닌 독립 데이터로 저장
  * `user.name`
  * 색인 가능
  
* 좌표
```
curl -XPUT localhost:9200/test_geos/ -d '
{
  "mappings" : {
    "test_geo" : {
      "properties" : {
        "name" : { "type" : "string" },
        "location" : { "type" : "geo_point" }
      }
    }
  }
}'
```

```
curl -XPUT 'localhost:9200/test_geos/test_geo/1' -d '
{
  "name" : "Conrad Seoul",
  "location" : "37.525308, 126.926644"
}'
```


```
curl 'http://localhost:9200/test_geos/_search?pretty' -d '
{
  "filter" : {
    "geo_bounding_box" : {
      "location" : {
        "top_left": { "lat" : 37.53, "lon" : 126.92 },
        "bottom_right" : {"lat" : 37.52, "lon" : 126.93 }
      }
    }
  }
}'

```
* 위치 모형
  * 선, 원, 사각형, 다각형 geo shape 타입의 필드
  * 옵션
    * precision : 1~12 표준정밀도 또는 1km 같은 길이값
    * distance_error_pct
```
curl -XPUT localhost:9200/test_geos/ -d '
{
  "mappings" : {
    "test_geo" : {
      "properties" : {
        "location" : {
          "type" : "geo_shape",
          "precision" : 10
        }
      }
    }
  }
}'
```


### 다중필드
* 하나의 필드 값을 서로 다른 설정의 여러 필드에 자동 반복 저장
* title 필드를 인덱싱하고 풀검색하도록 하는 경우
```
curl 'localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "properties" : {
        "title" : {
          "type" : "string", "index" : "analyzed",
          "fields" : {
            "raw" : { "type" : "string", "index" : "not_analyzed" }
          }
        }
      }
    }
  }
}'
```

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "query" : {
    "term" : { "title.raw" : "The Prince and the Pauper" }
  }
}'
```


* 토큰 수
```
curl 'localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "properties" : {
        "title" : {
          "type" : "string", "index" : "analyzed",
          "fields" : {
            "tokens" : { 
              "type" : "token_count",
              "store" : true,
              "analyzer" : "standard"
            }
          }
        }
      }
    }
  }
}'
```

```
curl 'localhost:9200/books/_search?pretty' -d '
{
  "fields" : [ "title", "title.tokens" ],
  "query" : {
    "term" : { "title" : "the" }
  }
}'
```



### 필드 복사
* 다른 필드로 복사
```
curl 'localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "properties" : {
        "title" : { "type" : "string", "copy_to" : "pk_data" },
        "author" : { "type" : "string", "copy_to" : "pk_data" },
        "pk_data" : { "type" : "string", "store" : true }
      }
    }
  }
}'
```

```
curl 'localhost:9200/books' -d '
{
  "mappings" : {
    "book" : {
      "properties" : {
        "title" : { "type" : "string", "copy_to" : ["title_1", "title_2"] },
        "title_1" : { "type" : "string", "store" : true },
        "title_2" : { "type" : "string", "store" : true }
      }
    }
  }
}'
```

## 분석
* 1개 이상의 토크나이저, 0개 이상의 토큰필터로 구성

```
curl -XPOST 'localhost:9200/_analyze?tokenizer=whitespace&pretty' -d 'Around the World in Eighty Days'

curl -XPOST 'localhost:9200/_analyze?tokenizer=whitespace&filters=lowercase&pretty' -d 'Around the World in Eighty Days'

curl -XPOST 'localhost:9200/_analyze?tokenizer=whitespace&filters=lowercase,stop&pretty' -d 'Around the World in Eighty Days'
```

* books 인덱스 삭제 후 분석기 설정
```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "my_analyzer" : {
          "tokenizer" : "whitespace",
          "filter" : [ "lowercase", "stop" ]
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?pretty' -d 'Around the World in Eighty Days'
```


### 분석기
* standard 분석기
```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "standard" : {
          "type" : "standard",
          "stopwords" : ["in", "the", "world"],
          "max_token_length" : 512
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=standard&pretty' -d 'Around the World in Eighty Days'
```

* simple 분석기
* whitespace 분석기
* stop 분석기

```
echo 'in
the
world' > config/stopword_list.txt
```

```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "stop" : {
          "type" : "stop",
          "stopwords_path" : "stopword_list.txt"
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=stop&pretty' -d 'Around the World in Eighty Days'
```

* keyword 분석기
* pattern 분석기
```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "pattern" : {
          "type" : "pattern",
          "lowercase" : false,
          "pattern" : "[A-Z]"
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=pattern&pretty' -d 'Around the World in Eighty Days'
```

```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "pattern" : {
          "type" : "pattern",
          "pattern" : "\\d"
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=pattern&pretty' -d 'Around the World in 80 Days'
```

* 다국어 분석기
```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "language" : {
          "type" : "english"
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=language&pretty' -d '삼국지(三國志)'
```

```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "language" : {
          "type" : "cjk"
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=language&pretty' -d '삼국지(三國志)'
```

* snowball 분석기
  * days -> day
  
```
curl -XPUT 'localhost:9200/books' -d '
{
  "settings" : {
    "analysis" : {
      "analyzer" : {
        "snowball" : {
          "type" : "snowball",
          "pattern" : "english"
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=snowball&pretty' -d 'Around the World in Eighty Days'
```

### 토크나이저
* standard 토크나이저
* nGram 토크나이저

### 토큰필터

### 한글 형태소 분석기
* 2.x 에 맞춰진 것 찾지 못함

```
bin/plugin -install chanil1218/elasticsearch-analysis-korean/1.3.0
```

```
curl -XPUT localhost:9200/books -d '
{
  "settings":{
    "index":{
      "analysis":{
        "analyzer":{
          "korean_analyzer":{
            "type":"kr_analyzer"
          }
        }
      }
    }
  }
}'
```

```
curl -XPOST 'localhost:9200/books/_analyze?analyzer=korean_analyzer&pretty' -d '동해물과 백두산이 마르고 닳도록'
```



### 부분삭제 
* query 된 목록 삭제
* `delete-by-query` 플러그인 설치 후 elasticsearch 재시작 필요
```
./bin/plugin install delete-by-query
```

```
curl -XDELETE 'http://localhost:9200/twitter/tweet/_query?q=user:kimchy'

#or 
curl -XDELETE 'http://localhost:9200/twitter/tweet/_query' -d '
{
  "query" : {
    "term" : {
      "user" : "kimchy"
    }
  }
}'

```




## 참고
* 시작하세요! 엘라스틱서치 by 김종민
  * https://github.com/wikibook/elasticsearch
* http://elastic.co

* 은전한닢+elasticsearch
  * http://blog.lyuwonkyung.com/elasticsearch/