# Pokemon Plus+
본 프로젝트는 포켓몬 관련 정보를 효율적으로 제공하는 웹 애플리케이션을 목표로 합니다.

## ☀︎ 초기 데이터 로드
- [x] 내부 API를 통해 1세대 포켓몬 데이터를 가져와 사용자에게 포켓몬 목록을 표기합니다.
- [x] 로딩 상태를 구현하여 사용자 경험 개선하였습니다.

## ☼ 메인 페이지 기능 구현
- [x] 회원가입 및 로그인 (인증 인가) 기능 : 입력 데이터의 유효성을 검사하고, 오류 메시지를 표시합니다. 이메일 형식, 비밀번호 길이 등을 체크합니다.
- [x] 검색 기능: 모든 페이지에서 포켓몬을 검색할 수 있는 기능을 추가합니다. 검색 결과는 실시간으로 업데이트됩니다.
- [x] 페이지네이션 기능: 포켓몬 목록을 페이지별로 나누어 표시하고, 페이지네이션을 추가하여 사용자가 쉽게 이동할 수 있도록 합니다.
- [x] 찜하기 기능 : 사용자가 포켓몬을 찜할 수 있는 기능을 구현합니다. 찜한 목록은 마이 페이지에서 확인할 수 있어야 합니다.

## ☀︎ 디테일 페이지 기능 구현
- [x] 포켓몬 정보: 포켓몬 API에서 제공하는 진화 정보, 이름, 타입, 특성, 기술 등을 Swiper를 사용하여 시각적으로 보여줍니다.
- [x] 댓글 CRUD 기능: 포켓몬 디테일 페이지에서 댓글을 생성, 읽기, 수정, 삭제할 수 있는 기능을 제공합니다.

## ☼ 마이페이지 기능 구현
- [x] 사용자 정보 표시: 마이페이지에서는 로그인한 사용자의 이름을 표시합니다.
- [x] 찜한 포켓몬 목록: 사용자가 찜한 포켓몬 목록을 확인할 수 있습니다.
- [x] 댓글 조회 기능: 사용자가 작성한 댓글을 마이페이지에서 모아서 볼 수 있습니다.

### ☀︎ 기타 사항
기술 스택: React, TypeScript, Next.js 등을 사용하여 프론트엔드를 구성합니다.
디자인: 사용자 경험을 고려한 UI/UX 디자인을 구현하며, 반응형 디자인을 지원합니다.

