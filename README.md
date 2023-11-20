# 팬레터 사이트 구현

## 사용 스택

- React
- Redux
- Styled Components

## 기능 구현

- 등록, 불러오기, 수정, 삭제

```
../src/components/Comment.jsx

등록
handleClickAddComment

불러오기 (useEffect Hook 사용)
useEffect(() => {
    const savedComment = localStorage.getItem(`comment_${paramId}`);
    if (savedComment) {
      dispatch(getLocalCommentData(JSON.parse(savedComment)));
    }
  }, [dispatch, paramId]);

  // 로컬 스토리지 데이터 저장하기
  useEffect(() => {
    localStorage.setItem(`comment_${paramId}`, JSON.stringify(comments));
  }, [comments, paramId]);

수정/수정완료 버튼
handleEditToggle, handleUpdateComment

삭제
handleDeleteComment
```

- 인풋 애니메이션

```
handleInputFocus
handleInputBlur
```
