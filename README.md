# EmotionDiary - 프로젝트 소개

감정과 일기 모두 기록할 수 있는 감정 일기장 사이트

개발 기간: 2024.01.14~2024.01.28(약 2주)

# 프로젝트 목표

React의 다양한 기능들을 효과적으로 익히기 위해 최대한 많은 기능을 구현하는 것이 목표.

# 사용 기술 스택 & 지원 기능

- Firebase & Firestore(DB)
    - 회원가입, 로그인, 로그아웃 기능 구현(Firebase)
    - 오늘 겪었던 일과 감정을 함께 작성 가능 (게시글 생성, 수정, 삭제 기능 구현)
    - LocalStorage를 활용해 자동 로그인 구현
- React Routing
    - SPA(Single Page Application) 형태로 개발
- useState
    - 각 페이지의 상태관리 
- React.memo, useMemo, useCallback
    - component 리렌더링 최적화 수행
    - Loading 컴포넌트 구현으로 페이지 구현을 위한 사전 작업 시 불필요한 렌더링 방지
    - 감정 점수(1~5)로 필터링 해서 과거의 감정들을 확인 가능
    - 게시글 정렬(최신순, 오래된순), 게시글 필터링(모두 보기, 내 글만 보기, 특정 조건 글 보기) 기능 구현(React의 usememo)
- Styled-Component
    - Toggle Button - 모두에게 공개하거나(public), 나 혼자 볼 수 있도록(private) 설정 가능

[감정일기장 사이트 바로가기](https://wooyoung-emotion-diary.web.app/)