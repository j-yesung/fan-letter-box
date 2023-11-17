import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as S from './style/Comment.styled.js';
import { useSelector } from 'react-redux';

// 날짜 포맷팅
export const formattedDate = () => {
  var date = new Date();

  var hours = date.getHours();
  var ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;

  var formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(
    date.getDate(),
  ).padStart(2, '0')}. `;
  formattedDate += `${ampm} ${String(hours).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
    date.getSeconds(),
  ).padStart(2, '0')}`;

  return formattedDate;
};

const Comment = () => {
  const param = useParams();
  const paramId = isNaN(parseInt(param.id)) ? 1 : parseInt(param.id);
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  const nameRef = useRef();
  const contentRef = useRef();
  const editContentRef = useRef();

  const selectedData = useSelector(state => state.fanLetter.selectedData);

  // const { selectedOption } = useContext(SelectedContext); // 셀럭트 옵션 값

  /**
   * 로컬 스토리지 데이터 불러오기
   * 항상 파라미터 ID 기준으로 댓글 목록 보여주기
   */
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

  /**
   * 팬레터 추가하기
   * @returns
   */
  const handleClickAddComment = () => {
    const name = nameRef.current;
    const content = contentRef.current;
    if (name.value === '' || content.value === '') {
      name.focus();
      return alert('제목과 내용을 입력해 주세요.');
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

      // 인풋 값 초기화
      nameRef.current.value = '';
      contentRef.current.value = '';
    } else {
      return alert('이름 다시 선택해주셈');
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
  const handleEditToggle = item => setIsEditing(isEditing => (isEditing === item.isEditing ? true : false));

  // 수정 완료
  const handleUpdateComment = id => {
    const updateComment = comment.map(item =>
      item.id === id ? { ...item, content: editContentRef.current.value, date: formattedDate() } : item,
    );
    setComment(updateComment);
    setIsEditing(true);
  };

  return (
    <>
      <S.FORM_WARPPER>
        <S.Form>
          <S.TEXT_BOX>
            <S.Label>닉네임 :</S.Label>
            <S.Input
              ref={nameRef}
              type="text"
              name="name"
              placeholder="최대 20글자까지 작성할 수 있습니다."
              defaultValue=""
              onChange={handleChangeText}
            />
          </S.TEXT_BOX>
          <S.TEXT_BOX>
            <S.Label>내용 :</S.Label>
            <S.TextArea
              ref={contentRef}
              placeholder="최대 100자까지만 작성할 수 있습니다."
              name="content"
              defaultValue=""
              maxLength="100"
              onChange={handleChangeText}
            ></S.TextArea>
          </S.TEXT_BOX>
          <S.ButtonWrap>
            <S.Button color={'#42adff'} border={'#42adff'} backcolor={'#42adff'} onClick={handleClickAddComment}>
              등록
            </S.Button>
          </S.ButtonWrap>
        </S.Form>
      </S.FORM_WARPPER>
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
                    placeholder="내용"
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
                  <S.Button
                    color={'#ff4742'}
                    border={'#ff4742'}
                    backcolor={'#ff4742'}
                    onClick={() => handleDeleteComment(item.id)}
                  >
                    삭제
                  </S.Button>
                  <S.Button
                    color={'#49da59'}
                    border={'#49da59'}
                    backcolor={'#49da59'}
                    onClick={() => handleUpdateComment(item.id)}
                  >
                    수정 완료
                  </S.Button>
                </S.ButtonWrap>
              ) : (
                <S.ButtonWrap>
                  <S.Button
                    color={'#ff4742'}
                    border={'#ff4742'}
                    backcolor={'#ff4742'}
                    onClick={() => handleDeleteComment(item.id)}
                  >
                    삭제
                  </S.Button>
                  <S.Button
                    color={'#49da59'}
                    border={'#49da59'}
                    backcolor={'#49da59'}
                    onClick={() => handleEditToggle(item)}
                  >
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
