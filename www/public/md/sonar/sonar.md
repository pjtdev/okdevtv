# SonarQube
* 코드 품질 검사 도구
* https://www.sonarqube.org/

## android sonar
* `app/build.gradle`

```
apply plugin: "sonar-runner"
sonarRunner {
    sonarProperties {
        property "sonar.host.url", "http://localhost:9000/"
//        property "sonar.jdbc.url", "jdbc:mysql://DB의 url 및 ip:3306/sonar?useUnicode=true&characterEncoding=utf8"
//        property "sonar.jdbc.username", "sonar"
//        property "sonar.jdbc.password", "sonar"
//        property "sonar.login", "admin"
//        property "sonar.password", "admin"
        property "sonar.projectKey", "Sonar:Test"
        property "sonar.projectName", "프로젝트명"
        property "sonar.projectVersion", "1.0"
        property "sonar.sourceEncoding", "UTF-8"
        property "sonar.language", "java"
        property "sonar.sources", "src/main/java"
        property "sonar.profile", "Sonar way"
    }
}
```
* `./gradlew sonarRunner`
* `open http://localhost:9000`

## ref
* http://galmaegi74.tistory.com/9
