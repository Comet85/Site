# 🛍️ Shopping Mall Project (develop)

쇼핑몰 웹 프론트엔드(WEB)와 백엔드(WAS) 소스코드를 통합 관리하는 단일 브랜치 프로젝트입니다.  
웹 리소스는 `src/main/webapp/`에 보관되며, WAS 빌드 시 자동으로 최종 **WAR (Web Application Archive)** 파일에 포함됩니다.

---

## 🎨 주요 웹 페이지 구성 (WEB)

| 페이지 | 파일 경로 | 주요 기능 |
| :--- | :--- | :--- |
| **홈 (메인)** | [`index.html`](./src/main/webapp/index.html) | 히어로 프로모션 배너, 카테고리 퀵메뉴, 실시간 인기 상품 그리드, 멤버십 혜택 배너 |
| **상품 목록** | [`products.html`](./src/main/webapp/products.html) | 카테고리 필터(패션/디지털/뷰티/리빙), 가격대 필터, 정렬(가격순/평점순), 실시간 검색 |
| **상품 상세** | [`product-detail.html`](./src/main/webapp/product-detail.html) | 갤러리 썸네일, 옵션/수량 선택, 장바구니 담기, 즉시 구매, 상품 상세스펙 탭 |
| **장바구니** | [`cart.html`](./src/main/webapp/cart.html) | LocalStorage 기반 장바구니 실시간 동기화, 수량 조절 및 자동 금액 계산, 주문 요약 |
| **로그인/가입** | [`login.html`](./src/main/webapp/login.html) | 로그인/회원가입 탭 전환 폼, 소셜 로그인 인터페이스 |
| **주문 완료** | [`order-success.html`](./src/main/webapp/order-success.html) | 주문 번호 자동 생성, 배송지 및 결제 정보 요약 안내 |

---

## 📁 프로젝트 디렉토리 구조

```text
Site/
├── .gitignore
├── pom.xml                               # Maven WAR 빌드 설정 파일
├── build-war.ps1                         # PowerShell 즉시 WAR 패키징 스크립트
├── README.md                             # 프로젝트 안내 문서
└── src/
    └── main/
        ├── java/com/shop/                # ☕ [WAS] 백엔드 Java 소스코드
        │   └── Application.java
        ├── resources/                    # ⚙️ [WAS] 백엔드 설정 파일
        │   └── application.properties
        └── webapp/                       # 🌐 [WEB] 쇼핑몰 웹 리소스
            ├── index.html                # 쇼핑몰 메인 페이지
            ├── products.html             # 상품 목록 & 필터 페이지
            ├── product-detail.html       # 상품 상세 페이지
            ├── cart.html                 # 장바구니 페이지
            ├── login.html                # 로그인/회원가입 페이지
            ├── order-success.html        # 주문 완료 페이지
            ├── css/
            │   └── style.css             # 모던 반응형 디자인 시스템
            ├── js/
            │   └── app.js                # 장바구니(LocalStorage), 토스트 알림, 필터
            └── WEB-INF/
                └── web.xml               # 서블릿 배포 서술자
```

---

## 💻 로컬에서 미리보기 (Preview)

웹 브라우저를 통해 지금 바로 확인하실 수 있습니다:

- **메인 홈**: [src/main/webapp/index.html](file:///C:/Users/Comet/Documents/Code/Site/src/main/webapp/index.html) 더블 클릭
- 또는 PowerShell 실행:
  ```powershell
  Start-Process "C:\Users\Comet\Documents\Code\Site\src\main\webapp\index.html"
  ```

---

## 📦 WAR 파일 빌드 & 서버 배포

### 1. WAR 빌드 실행
```powershell
.\build-war.ps1
```
- 결과물: `Site/target/shopping-mall.war` (약 25KB, 모든 웹페이지 포함)

### 2. 서버 배포 안내
- **Nginx (정적 웹)**: `src/main/webapp/` 내용을 `/usr/share/nginx/html/`로 복사
- **Tomcat (WAS)**: `target/shopping-mall.war` 파일을 Tomcat의 `webapps/`로 복사

---

## 📄 라이선스 (License)

이 프로젝트는 [Apache License 2.0](./LICENSE)을 따릅니다.
