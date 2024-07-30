# 🔖 <span id="top">목차</span>

> ## [✨ 프로젝트 소개](#-프로젝트소개-notion)
>
> ## [👥 팀원 소개](#-팀원-소개-1)
>
> ## [💼 역할 분담](#-역할-분담-1)
>
> ## [🤝 협업 방식](#-협업-방식-1)
>
> ## [📚 프로젝트 진행 상황 관리](#-프로젝트-진행-상황-관리-1)
>
> ## [🔍 브랜치 전략](#-브랜치-전략-1)
>
> ## [✔ 컨벤션](#-컨벤션-1)
>
> ## [🛠 개발 도구](#-개발-도구-1)
>
> ## [📆 프로젝트 일정](#-프로젝트-일정-1)
>
> ## [📄 API 명세서&ERD 설계도](#-api-명세서erd-설계도-1)
>
> ## [🖥 화면 구현](#-화면-구현-1)
>
> <br/>

## ✨ 프로젝트 소개 [Notion](https://imminent-rocket-de6.notion.site/Team-Project-c6054fbe771747b481d8c49bc3b0247f?pvs=4)

### 🌟 제목

- <h1>Table Maid</h1>

### 🚀 목적

- 사용자의 휴대폰 QR코드로 음식 주문이 가능한 비대면 주문 결제 서비스 구현

### 🤝 팀 프로젝트

- 팀원 4명

### 📆 제작 기간

- 2024.05.24 ~

### 🔎 주요 기능

- 회원가입 및 로그인

  > 아이디 및 비밀번호 찾기

  > 비밀번호 변경

  > 기간별 매출 및 제품별 매출 조회

  > 매출 대시보드

  > 메뉴 및 옵션 추가/관리

  > 회원 조회

  > 점포 관리(가게 설정, 비밀번호 변경하기)

- 사용자 모드 메뉴

  > 메뉴 선택

  > 장바구니

  > 직원 호출

- 포스 화면

  > 테이블 합석, 이동, 분리

  > 테이블 단체지정 및 결제

  > 주문내역

  > 환경설정 (테이블 구조 변경)

<br/>
<br/>

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

## 👥 팀원 소개

<div align="center">
<table >
    <thead>
        <tr>
            <th align="center"><span>이정찬</span></th>
            <th align="center"><span>김세진</span></th>
            <th align="center"><span>이지언</span></th>
            <th align="center"><span>정건희</span></th>
        </tr>
    </thead>
    <tbody>
        <td align="center">
            <a href="https://github.com/chhann">
                <img src="https://github.com/user-attachments/assets/fd28a631-34f3-4c54-9983-818353400aa8" width="150" height="150" />
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/ez0603">
                <img src="" width="150" height="150" />
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/ez0603">
                <img src="https://github.com/user-attachments/assets/40d69d34-aaee-4840-917e-2101861e8e2b" width="150" height="150" />
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/donasman">
                <img src="https://github.com/user-attachments/assets/09b759b5-1ea2-44d0-98eb-ae30964fdaa6" width="150" height="150" />
            </a>
        </td>
    </tbody>
</table>
</div>

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

## 💼 역할 분담

<table>
  <tr>
    <th style="width: 15%">팀원</th>
    <th>Back-End</th>
    <th>Front-End</th>
  </tr>
  <tr>
    <td>🐶 이정찬</td>
     <td>메뉴 판매<br>주문 영수증<br>환불
    <td>로그인 및 회원가입<br>포스 환경설정</td>
  </tr>
  <tr>
    <td>🦝 김세진</td>
     <td>메뉴 추가, 수정, 삭제<br>카테고리 추가, 수정, 삭제<br>옵션이름 추가, 수정, 삭제<br>옵션제목 추가, 수정, 삭제
    <td>사용자 메뉴 선택<br>사용자 메뉴 상세보기 <br>장바구니
  <tr>
    <td>🐰 이지언</td>
     <td>회원가입 및 로그인<br>관리자 비밀번호 변경<br>아이디 및 비밀번호 찾기<br>임시 비밀번호 전송<br>총 매출 조회<br>선택된 날짜 매출 조회</td>
    <td>로그인 및 회원가입 CSS<br>매출 대시보드<br>기간별 매출 조회<br>메뉴별 매출 조회<br>포스 주문 화면</td></td>
  </tr>
  <tr>
    <td>🐨 정건희</td>
  <td>아이디 및 비밀번호 찾기<br>임시 비밀번호 전송<br>서버 헬스 체크<br>서버 env 확인
    <td>메뉴 간편 조회<br>메뉴 리스트 조회<br>메뉴 상세 조회 <br>포스 주문 상세 화면</td>
  </tr>
  <tr>
    <td><b>공동 작업</b></td>
    <td>디자인 도안 작업<br>Front 명세서 작성<br> API 명세서 작성<br>DB 설계</td>
    <td></td>
  </tr>
</table>

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

<br/>
<br/>

## 🤝 협업 방식

1. 해당하는 업무에 대해 GitHub Issue를 생성합니다.
2. GitHub Actions에 의해 자동으로 생성된 브랜치로 전환하여 해당하는 업무를 진행합니다.
3. 작업을 완료하면 각자의 생성한 브랜치에서 코드를 push합니다.
4. PR(Pull Request) 을 오픈합니다.

- 팀원들의 코드 스타일은 다같이 공유하며 서로 잘 이해할 수 있도록 다 같이 정리하는 시간을 가지도록 하였습니다.

5. PR이 merge되어 close 되면 해당 이슈는 자동으로 Done상태로 변경됩니다.

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

<br/>
<br/>

## 📚 프로젝트 진행 상황 관리

- <a href="https://github.com/table-maid/table_maid_front/issues">📋 GitHub Issues(Front) & </a>
  <a href="https://github.com/table-maid/table_maid_back/issues"> GitHub Issues(Back) </a>
  - 간편한 이슈 생성을 위해 이슈 템플릿을 만들어 사용했습니다. + 팀원이 현재 어떤 작업을 진행하고 있는지를 바로 알 수 있어 의사소통 비용을 줄일 수 있었습니다.
- <a href="https://github.com/orgs/table-maid/projects/1">📁 GitHub Projects</a>
  - 칸반 보드로 프로젝트 진행 상황을 한 눈에 확인할 수 있어 일정을 관리하기 수월했습니다.

<p align="right" dir="auto">
<a href="https://github.com/Novel-Ideas/gumeonggage-front">TOP 🔼</a>
</p>
    
<br/>
<br/>

## 🔍 브랜치 전략

<h3>💡 GitHub Flow 전략</h3>

- 개발과 동시에 지속적으로 배포를 진행할 것이 아니라, 기능을 모두 개발하고 최종적으로 배포를 할 예정이었기 때문에 Git flow에 비해 흐름이 단순해짐에 따라 그 규칙도 단순한 GitHub Flow 전략이 적합하다고 생각했습니다.

- 프로젝트 기간 동안 팀원들이 같은 시간에 작업하기 때문에 잦은 충돌이 발생할 것을 우려하여 충돌의 크기를 줄이고자 GitHub Flow 전략을 채택하여 작은 단위로 이슈를 쪼개 이슈 별로 브랜치를 분기하고 main 브랜치에 지속적으로 merge 하는 방식으로 진행했습니다.

- 기본적으로 master branch에 대한 규칙만 정확하게 정립되어 있다면 나머지 가지들에 대해서는 특별한 관여를 하지 않으며 pull request기능을 사용하도록 권장하였습니다.

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

<br/>
<br/>

## ✔ 컨벤션

팀원 간의 원활한 소통과 협업을 위해 커밋 컨벤션과, 코드 컨벤션을 만들어 이를 따랐습니다.

<h3>
💡 커밋 컨벤션</a>
</h3>

<div>
<pre background-color="#dbdbdb">
<p>
1. 커밋 유형 지정
    - 커밋 유형은 영어 대문자로 작성하기
    - 커밋 유형
    - Feat : 새로운 기능 추가
    - Fix : 버그 수정
    - Docs : 문서 수정
    - Style : 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
    - Refactor : 코드 리팩토링
    - Test : 테스트 코드, 리팩토링 테스트 코드 추가
    - Chore : 패키지 매니저 수정, 그 외 기타 수정 ex > .gitignore
    - Design : CSS 등 사용자 UI 디자인 변경
    - Comment : 필요한 주석 추가 및 변경
    - Rename : 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
    - Remove : 파일을 삭제하는 작업만 수행한 경우
    - !BREAKING CHANGE : 커다란 API 변경의 경우
    - !HOTFIX : 급하게 치명적인 버그를 고쳐야 하는 경우

🧾 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

#️⃣ 3. 제목 첫 글자는 대문자로, 끝에는 . 금지

↩️ 4. 제목은 영문 기준 50자 이내로 할 것

⏺️ 5. 자신의 코드가 직관적으로 바로 파악할 수 있다고 생각하지 말자

👆 6. 여러가지 항목이 있다면 글머리 기호를 통해 가독성 높이기

✝ 7. 깃 이슈 네임 등록 할 때 ex > [ 메뉴관리BE ] 메뉴등록

</p>
</pre>
</div>

<h3>
💡 코드 컨벤션</a>
</h3>
<div>
<pre>
<p>
🛼 문자열을 처리할 때는 쌍따옴표를 사용하도록 합니다.

🐫 문장이 종료될 때는 세미콜론을 붙여줍니다.

💄 함수명, 변수명은 카멜케이스로 작성합니다.

🐫 가독성을 위해 한 줄에 하나의 문장만 작성합니다.

❓ 주석은 설명하려는 구문에 맞춰 들여쓰기 합니다.

🔠 연산자 사이에는 공백을 추가하여 가독성을 높입니다.

🔢 콤마 다음에 값이 올 경우 공백을 추가하여 가독성을 높입니다.

💬 생성자 함수명의 맨 앞글자는 대문자로 합니다.

🔚 var는 절대 사용하지 않는다. (const를 let 보다 위에 선언한다)

👆 const와 let은 사용 시점에 선언 및 할당을 한다. (함수는 변수 선언문 다음에 오도록한다.)

✏️ 외부 모듈과 내부 모듈을 구분하여 사용한다.

🧮 배열과 객체는 반드시 리터럴로 선언한다. (new 사용 X)

📠 배열 복사 시 반복문을 사용하지 않는다.

😎 배열의 시작 괄호 안에 요소가 줄 바꿈으로 시작되었다면 끝 괄호 이전에도 일관된 줄 바꿈 해야한다. (일관되게 모두 줄 바꿈을 해주어야 한다.)

🧶 객체의 프로퍼티가 1개인 경우에만 한 줄 정의를 허용하며, 2개 이상일 경우에는 개행을 강제한다. (객체 리터럴 정의 시 콜론 앞은 공백을 허용하지 않음 콜론 뒤는 항상 공백을 강제)

🧂 메서드 문법 사용 시 메서드 사이에 개행을 추가한다.

🌭 화살표 함수의 파라미터가 하나이면 괄호를 생략한다.

🍳 변수 등을 조합해서 문자열을 생성하는 경우 템플릿 문자열을 이용한다.

🧇 변수 등을 조합해서 문자열을 생성하는 경우 템플릿 문자열을 이용한다.

🥞 wildcard import는 사용하지 않는다. (import문으로부터 직접 export하지 않는다.)

🥖 한 줄짜리 블록일 경우라도 {}를 생략하지 않으며 명확히 줄 바꿈 하여 사용한다.

🥯 switch-case 사용 시 첫 번째 case문을 제외하고 case문 사용 이전에 개행한다.

🥐 삼중 등호 연산자인 ===, !==만 사용한다.

🚐 반복문 사용은 일반화된 순회 메서드 사용을 권장한다.

🚑 람다함수 안에서 밖에 있는 변수를 사용하지 말라

🚚 코드 블럭 주석 처리를 위해서는 한 줄 주석을 사용한다. 여러 줄 주석을 작성할 때는 \*의 들여쓰기를 맞춘다. 주석의 첫 줄과 마지막 줄은 비워둠

💫 시작 괄호 바로 다음과 끝 괄호 바로 이전에 공백이 있으면 안 된다.

</p>
</pre>
</div>

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

<br/>
<br/>

## 🛠 개발 도구

### 1. Back-End

<p>
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon Aws-232F3E?style=for-the-badge&logo=Amazon Aws&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"/>
</p>

### 2. Front-End

<p>
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JAVASCRIPT&logoColor=black"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTMl5&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>
</p>

### 3. Database

<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>

### 4. SCM & Deployment

<p>
<img src="https://img.shields.io/badge/Git-181717?style=for-the-badge&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
</p>

### 5. Library

- ### Back-end

<p>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white"/><img src="https://img.shields.io/badge/MyBatis-271e1f?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABuElEQVR4nO3US4hPcRQH8H9RI+Wx8FohkVfkUdQkC5FXxs6WhZSysSBCTWyRZpryWDHZi7LxSGRBKUtKMmGiRB6ZIvPRqbP4u917/zP/maXv6t77u+f7Ped8z/k1GiMANuI29mJuY7yBM/7F2bGQLcR2TMR8rMVsHMJd/MSftirBKgwrx03Mwv1839BuBdHnAfzCezzH1yR9gjv53IdH+IR3uIWudkXn4G0Sf8GQapxuV2QLvmENJqRXXTiGG0k+lAmsrCLpRTc2Y2rJ+YqKuGhVYFmrLPubSh1ODx7jepSOzoq4+E8mNg+TyxKMH1fnCNahP1pUiNuKF2n2ASzBDxwuE7moNQ5iJqZVVLQYr7G+7HA6XrYQuIxd+I2HOIUdafyUaA/WFSttFlmEjzUCx7G/5rynzuiOVI9snpYED2R77tUI7C4jjrKOYjAn6Fx+25bP13ACM3L2qxDxHc3Em3A1l6iID7iAPblo0ZYH6nGkmPl544dncQuXtWcfvo+RfBALWl1ol3L0RotXWF5JXhBamstW5kkRkcyV2J0RkReEJmFnehTGvsHnvLZjuU7GKI+a+D8aBfwFL0hrRFV1ciwAAAAASUVORK5CYII=&logoColor=white">
<img src="https://img.shields.io/badge/Lombok-ca0124?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2aW4hVVRjHP01HzZJGJcpuU6l00Uqzgl4sCrqgDz5IZZjZQxlEaKBJWVA9pEEG3QkqESrtAqWhY+WDQZBpF2ys1DLz0s3spqU2Nr/42GvR19eZaVpzBtaZs39wmLPP3vs/a+219ndbS6SkpKSkpKSk1gEOA14H/gBukXoDmMHfvCf1BHAU8L15AHOlngAeNJ3/Augv9QIwAjhoHsAkqSeAl03nV0tPAjgDuBt4E9gItAAXm/NnAW2h8/r3HOkJAKcElxY7Z1lmrnvE/L5cegLAJGAflTkE3GCu3WnOfQyMlFoGmBw6GWkFloTfTwcGmWsHVHhAvwDjpRYBTnMj/2lH7zQwtJ1Zshc4U2oNYIXr/OBOhL77jQHUjkc+AHpLrQCMcu/52Z2870Vz33bgN3N8tdQKwP2m4Uv/x30nAdvCfa8C9xidt6RWoAhfIxPduaOBdcAmf87kAZcBhwPHGNeps6FBcgcYZzr/M9DPnZ/mjNzzQFMHel+aa0+U3AEWmAYvrnB+mOtUdI865a8HRodZol5kivMkx0nOAL2Are1Nf3PdIOCpdiLD9mjNPisELu1o+le4/oIw8n924gF8KLkDrDQNfiMYLv3b9z/uawJuDpng2mBE1VD+aPRulBrw/W2hsTqi35nGj0rQ09kR+QkYKDkDLDINft98/wrok6C32GgslJyhmMK2imOt/KwEPfUCB8L9OqtGSM4AL5kOf+YM4ZEJevOMRrPkDDDeNLbNjf78BL2BwG6jMUFyhSKD+8g0dr35/quGsgmas41GS9ZZIIXrivwO7DHHdyToaVHkW6MxWXIFODWMcuRdl8oOSNCcaTQ+yXb0gb4hYLGuzkZz1yVo9gd2GY1rJFeA+1yMriMeWa05QRct/2a1L5Kx1T9kGvuOM3xNCZrDXAnsKskRYLhzUS0uo0uK14EXjMbbKTOo2wEGhypOZI8zgs2JU3+i0dCZNUZyA+gHrDEN3e8ehhrBoQm6jW4x5CHJDaCPFjZNI3XKL3P+f2xi8URrAZHPtQ4oOQE0AK/wT+4EnjPH0xK1b3NTP68VIAq/vNx1/olw7njgMWB6ovYVwX1G7pKcoEhIVrnOP1mNsrS+Ls7lNWcV8VGEuBtc51eFabqxK++prg26SpHqNUouUCxI2IRGmQ+8Zo7PTdQ+D/jB6HytK0GSAxQW+XYX4WmF56Zw/vyQ9i5KCVGBqcFbRL5JqRN256akNW7UdXQurIK2prePOu1tWZS4KPz7bDcyMbY/tgr6lwBbnLYWTE6oTg+6bujWuca1hve9oQrl8aUVVn2ezmJlh6Liandhxg0IY7ug2Vt3e4WFDb/Ko//rWskFim1qNqafm1i31/f7IuABYAf/Rh/EM8AQyQngWdPIe0NCYj9HmDC4MdT8dUPTlcCtwMMhZY11+0odX5KNlfcAc+ge1HMs1IclOQMMcSWsVNrCXj7d3Hh5tiWsSgAnh50ZO8MKrP3EjUkHwvHWELLq9tbHQxY3ISX/LykpKSkpKZHu5C8+ETRdu+5D6AAAAABJRU5ErkJggg==&logoColor=white">
</p>

- ### Front-end
<p>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Emotion-cb0096?style=for-the-badge&logo=react&logoColor=white">
</p>

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

<br/>
<br/>

## 📆 프로젝트 일정

<a href="https://www.notion.so/ff5b2f6ddf6d4a10a77a749c3820d65c?v=405a3fc0de464e3aaa354f44f967606c">프로젝트 일정 보기</a>

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

<br/>
<br/>

## 📄 API 명세서&ERD 설계도

### 🛰 API 명세서

https://www.notion.so/88d73303c2b543c5b9870e03a997b664?v=521e4b16175f46ec83169ad83928a3a2

### 📐 ERD 설계도

https://www.notion.so/40991af39a1a4145b7d07f1dd6f6ca8d?v=8a80e6294eeb4d6884ede663bcd73982

<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

<br/>
<br/>


<p align="right" dir="auto">
<a href="#top">TOP 🔼</a>
</p>

</br>
</br>
