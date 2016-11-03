# Django
* python의 웹프레임워크
* https://www.djangoproject.com/
* 경쟁 제품 : [flask](http://flask.pocoo.org/)

## 요구사항
* [python](https://python.org)


## 설치
```
sudo pip install --upgrade pip
sudo ln -s /usr/local/bin/pip /usr/bin/pip
sudo pip install django

django-admin startproject mysite
```

## virtualenv 환경
```
sudo pip install virtualenv
sudo pip install virtualenvwrapper
virtualenv -p python3 .venv  # 환경 생성
source .venv/bin/activate  # 환경 진입
```

## 참고
* django 
  * https://www.djangoproject.com/
* django unittest
  * https://docs.djangoproject.com/ja/1.9/topics/testing/overview/