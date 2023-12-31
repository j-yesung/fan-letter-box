import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as S from './style/Comment.styled.js';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment, editComment, getLocalCommentData, updateComment } from 'modules/comment.js';
import { setInputActive } from 'modules/input.js';

// 날짜 포맷팅
const formattedDate = () => {
  let date = new Date();

  let hours = date.getHours();
  let amps = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;

  let formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(
    date.getDate(),
  ).padStart(2, '0')}. `;
  formattedDate += `${amps} ${String(hours).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
    date.getSeconds(),
  ).padStart(2, '0')}`;

  return formattedDate;
};

// 인풋 길이 체크
const validateInput = (targetRef, maxLength) => {
  if (targetRef.current.value.length > maxLength) {
    alert(`${maxLength}글자 이하로 작성해 주세요.`);
    return false;
  }
  return true;
};

const Comment = () => {
  const param = useParams();
  const paramId = isNaN(parseInt(param.id)) ? 1 : parseInt(param.id);

  // DOM 선택
  const nameRef = useRef();
  const contentRef = useRef();
  const editContentRef = useRef();

  // 상태 가져오기
  const selectedData = useSelector(state => state.fanLetter.selectedData);
  const comments = useSelector(state => state.comment.comments);
  const isInputActive = useSelector(state => state.input.isInputActive);
  const dispatch = useDispatch();

  // 로컬 스토리지 데이터 불러오기
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

  // 등록
  const handleClickAddComment = () => {
    const name = nameRef.current;
    const content = contentRef.current;
    if (name.value === '' || content.value === '') {
      name.focus();
      return alert('빈칸을 입력해 주세요.');
    }

    if (parseInt(selectedData.id) === paramId) {
      const newComment = {
        id: uuidv4(),
        name: name.value,
        content: content.value,
        date: formattedDate(),
        isEditing: false,
      };

      dispatch(addComment(newComment));

      name.value = '';
      content.value = '';
    } else {
      return alert('이름을 다시 선택해 주세요.');
    }
  };

  const handleChangeText = e => {
    switch (e.target.name) {
      case 'name':
        if (!validateInput(nameRef, 20)) return;
        break;
      case 'content':
        if (!validateInput(contentRef, 100)) return;
        break;
      case 'editContent':
        if (!validateInput(editContentRef, 100)) return;
        break;
      default:
        break;
    }
  };

  // 삭제
  const handleDeleteComment = id => dispatch(deleteComment(id));
  // 수정
  const handleEditToggle = id => dispatch(editComment(id));
  // 수정 완료
  const handleUpdateComment = id => {
    const updateContent = editContentRef.current.value;
    const updateDate = formattedDate();
    dispatch(updateComment(id, updateContent, updateDate));
  };
  // 인풋 애니메이션
  const handleInputFocus = fieldName => dispatch(setInputActive(fieldName, true));
  const handleInputBlur = (e, fieldName) => {
    const isActive = !!e.target.value;
    dispatch(setInputActive(fieldName, isActive));
  };

  return (
    <>
      <S.FORM_WRAPPER>
        <S.Form>
          <S.TEXT_BOX>
            <S.Input
              ref={nameRef}
              type="text"
              name="name"
              // placeholder="최대 20글자까지 작성할 수 있습니다."
              required
              spellCheck="false"
              defaultValue=""
              onChange={handleChangeText}
              onFocus={() => handleInputFocus('name')}
              onBlur={e => handleInputBlur(e, 'name')}
            />
            <S.Placeholder $isActive={isInputActive.name}>닉네임</S.Placeholder>
          </S.TEXT_BOX>
          <S.TEXT_BOX>
            <S.Input
              ref={contentRef}
              // placeholder="최대 100자까지만 작성할 수 있습니다."
              name="content"
              defaultValue=""
              maxLength="100"
              onChange={handleChangeText}
              onFocus={() => handleInputFocus('content')}
              onBlur={e => handleInputBlur(e, 'content')}
            />
            <S.Placeholder $isActive={isInputActive.content}>내용</S.Placeholder>
          </S.TEXT_BOX>
          <S.ButtonWrap>
            <S.Button buttoncolor={'#42adff'} onClick={handleClickAddComment}>
              등록
            </S.Button>
          </S.ButtonWrap>
        </S.Form>
      </S.FORM_WRAPPER>

      <S.Ul>
        {comments.map(item => (
          <div key={item.id}>
            <S.Li>
              <S.UserIcon src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" />
              <S.LiLabel>
                <p>{item.name}</p>
                <p>{item.date}</p>

                {item.isEditing ? (
                  <S.UpdateTextArea
                    ref={editContentRef}
                    key={item.id}
                    name="editContent"
                    maxLength="100"
                    defaultValue={item.content}
                    onChange={handleChangeText}
                  ></S.UpdateTextArea>
                ) : (
                  <p>{item.content}</p>
                )}
              </S.LiLabel>
              {item.isEditing ? (
                <S.ButtonWrap>
                  <S.Button buttoncolor={'#ff4742'} onClick={() => handleDeleteComment(item.id)}>
                    삭제
                  </S.Button>
                  <S.Button buttoncolor={'#49da59'} onClick={() => handleUpdateComment(item.id)}>
                    수정 완료
                  </S.Button>
                </S.ButtonWrap>
              ) : (
                <S.ButtonWrap>
                  <S.Button buttoncolor={'#ff4742'} onClick={() => handleDeleteComment(item.id)}>
                    삭제
                  </S.Button>
                  <S.Button buttoncolor={'#49da59'} onClick={() => handleEditToggle(item.id)}>
                    수정
                  </S.Button>
                </S.ButtonWrap>
              )}
            </S.Li>
          </div>
        ))}
      </S.Ul>
    </>
  );
};

export default React.memo(Comment);
