# gitflow
* branch strategy 브랜치 전략
* git은 브랜치를 맘대로 빠르게 누구도 모르게 딸 수 있다.
* 로컬에서 브랜치를 맘대로
* 리모트로 공유도 가능, 삭제도 가능

## branch
* 목록
  * `git branch`
  * `git branch -v`
* 생성
  * `git checkout -b branchname`
* 삭제
  * `git branch -d branchname`
* 브랜치 머지
  * master, develop 두 브랜치가 있다면
  * master로 checkout, 베이스가 master 브랜치임
  * `git checkout master`
  * `git merge develop`
* 리모트 공유
  * `git push origin develop`
* 리모트 삭제
  * `git push origin :develop`
* 리모트 브랜치를 로컬로 가져오기
  * `git checkout -b develop origin/develop`

## git flow
* `git flow init`
* `git flow feature start iss51`
* `git flow feature finish iss51`


## References
* http://nvie.com/posts/a-successful-git-branching-model/
* https://github.com/nvie/gitflow
* Git 브랜치 - 리모트 브랜치
  * https://git-scm.com/book/ko/v1/Git-브랜치-리모트-브랜치
* git flow
  * http://ohgyun.com/402
  
  