import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as S from './style/Comment.styled.js';
import { useSelector } from 'react-redux';

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

const Comment = () => {
  const param = useParams();
  const paramId = isNaN(parseInt(param.id)) ? 1 : parseInt(param.id);
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [isInputActive, setInputActive] = useState({
    name: false,
    content: false,
  });

  const nameRef = useRef();
  const contentRef = useRef();
  const editContentRef = useRef();

  const selectedData = useSelector(state => state.fanLetter.selectedData);

  // 로컬 스토리지 데이터 불러오기
  useEffect(() => {
    const savedComment = localStorage.getItem(`comment_${paramId}`);
    if (savedComment) {
      setComment(JSON.parse(savedComment));
    }
  }, [paramId]);

  // 로컬 스토리지 데이터 저장하기
  useEffect(() => {
    localStorage.setItem(`comment_${paramId}`, JSON.stringify(comment));
  }, [paramId, comment]);

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

      setComment(prevComment => [...prevComment, newComment]);

      nameRef.current.value = '';
      contentRef.current.value = '';
    } else {
      return alert('이름을 다시 선택해 주세요.');
    }
  };

  // TEXT 감지해서 등록 및 수정
  const handleChangeText = e => {
    switch (e.target.name) {
      case 'name':
        if (e.target.value.length > 20) return alert('20글자 이하로 작성해 주세요.');
        nameRef.current.value = e.target.value;
        break;
      case 'content':
        if (e.target.value.length > 100) return alert('100글자 이하로 작성해 주세요.');
        contentRef.current.value = e.target.value;
        break;
      case 'editContent':
        if (e.target.value > 100) return alert('100글자 이하로 작성해 주세요.');
        editContentRef.current.value = e.target.value;
        break;
      default:
        break;
    }
  };

  // 삭제
  const handleDeleteComment = id => setComment(prevComment => prevComment.filter(comment => comment.id !== id));

  // 수정
  const handleEditToggle = id => {
    setComment(prevComments =>
      prevComments.map(commentItem =>
        commentItem.id === id ? { ...commentItem, isEditing: !commentItem.isEditing } : commentItem,
      ),
    );
  };

  // 수정 완료
  const handleUpdateComment = id => {
    const updateComment = comment.map(item =>
      item.id === id
        ? { ...item, content: editContentRef.current.value, date: formattedDate(), isEditing: false }
        : item,
    );
    setComment(updateComment);
  };

  const handleInputFocus = fieldName => setInputActive({ ...isInputActive, [fieldName]: true });
  const handleInputBlur = (e, fieldName) =>
    !e.target.value
      ? setInputActive({ ...isInputActive, [fieldName]: false })
      : setInputActive({ ...isInputActive, [fieldName]: true });

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
        {comment.map(item => (
          <div key={item.id}>
            <S.Li>
              <S.UserIcon src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" />
              <S.LiLabel>
                <p>{item.name}</p>
                <p>{item.date}</p>

                {isEditing === item.isEditing ? (
                  // 수정할 때..
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
              {isEditing === item.isEditing ? (
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
