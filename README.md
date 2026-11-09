# 🛍️ Shopping Mall Project (develop)

쇼핑몰 웹 프론트엔드(WEB)와 백엔드(WAS) 소스코드를 통합 관리하는 단일 브랜치 프로젝트입니다.  
웹 리소스는 변경 빈도가 낮으므로 `src/main/webapp/`에 보관되며, WAS 빌드 시 자동으로 최종 **WAR (Web Application Archive)** 파일에 포함됩니다.

---

## 📁 프로젝트 디렉토리 구조

Java Web 표준(Maven / Gradle) 디렉토리 레이아웃을 따릅니다:

```text
Site/
├── pom.xml                               # Maven WAR 빌드 설정 파일
├── build-war.ps1                         # 간이 WAR 빌드 스크립트 (PowerShell)
├── README.md                             # 프로젝트 안내 문서
└── src/
    └── main/
        ├── java/                         # ☕ [WAS] 백엔드 Java 소스코드
        │   └── com/shop/
        │       └── Application.java
        ├── resources/                    # ⚙️ [WAS] 백엔드 설정 파일
        │   └── application.properties
        └── webapp/                       # 🌐 [WEB] 웹 프론트엔드 리소스 (변경 최소화)
            ├── index.html                # 쇼핑몰 메인 페이지
            ├── css/
            │   └── style.css             # 스타일시트
            ├── js/
            │   └── app.js                # 클라이언트 스크립트
            ├── images/                   # 정적 이미지 리소스
            └── WEB-INF/
                └── web.xml               # 서블릿 배포 서술자
```

---

## 🛠️ 역할 구분 및 개발 방법

1. **🌐 웹 (WEB) 리소스**:
   - 위치: [`src/main/webapp/`](./src/main/webapp/)
   - 정적 웹 페이지(HTML, CSS, JS, 이미지)가 위치합니다.
   - 평상시 변경이 거의 없더라도, WAS 빌드 시 자동으로 WAR 파일의 루트(`/`)로 패키징되므로 별도 복사 작업이 필요 없습니다.

2. **☕ WAS 백엔드 개발**:
   - 위치: [`src/main/java/`](./src/main/java/) 및 [`src/main/resources/`](./src/main/resources/)
   - 비즈니스 로직, 서블릿/컨트롤러, DB 연동 코드를 개발합니다.

---

## 📦 WAR 파일 빌드 방법

### 방법 1. 간이 빌드 (PowerShell 스크립트 - Java/Maven 미설치 시 추천)
`Site` 디렉토리에서 아래 스크립트를 실행하면 즉시 `target/shopping-mall.war`가 생성됩니다:

```powershell
.\build-war.ps1
```

### 방법 2. Maven 표준 빌드 (JDK 및 Maven 환경)
```bash
mvn clean package
```
- 빌드 결과물: `target/shopping-mall.war`

---

## 🚀 배포 방법

생성된 `shopping-mall.war` 파일을 Apache Tomcat 등의 WAS 서버 `webapps/` 디렉터리에 복사한 후 서버를 구동하면 자동으로 배포됩니다:
- 접속 주소: `http://localhost:8080/shopping-mall/`

---

## 📄 라이선스 (License)

이 프로젝트는 [Apache License 2.0](./LICENSE)을 따릅니다.

