import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as S from './Comment.styled.js';

const Comment = props => {
  const [comment, setComment] = useState([]);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [editContent, setEditContent] = useState(''); // 수정 content 상태 값

  const [isEditing, setIsEditing] = useState(null); // 수정 여부

  // Ref로 텍스트 저장 (리렌더링 방지되고 좋음)
  const nameRef = useRef('');
  const contentRef = useRef('');
  const editContentRef = useRef('');

  const param = useParams();
  const dataId = parseInt(props.data.groupInfo.id);

  console.log('렌더링');

  useEffect(() => {
    console.log('getItem');
    if (dataId === parseInt(param.id)) {
      const savedComment = localStorage.getItem(`comment_${dataId}`);
      if (savedComment) {
        setComment(JSON.parse(savedComment));
      }
    }
  }, [dataId]);

  useEffect(() => {
    console.log('setItem');
    localStorage.setItem(`comment_${dataId}`, JSON.stringify(comment));
  }, [dataId, comment]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate
    .getHours()
    .toString()
    .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  const handleClickAddComment = () => {
    const name = nameRef.current;
    const content = contentRef.current;

    if (name === '' || content === '') {
      name.focus();
      return alert('제목과 내용을 입력해 주세요.');
    }

    if (dataId === parseInt(props.data.selectedOption.id)) {
      const newComment = {
        id: uuidv4(),
        name,
        content,
        date: formattedDate,
        isEditing,
      };

      setComment(prevComment => [...prevComment, newComment]);

      // 인풋 값 초기화
      // nameRef.current.value = '';
      // contentRef.current.value = '';
    } else {
      return alert('이름 다시 선택해주셈');
    }
  };

  // TEXT 감지해서 등록 및 수정
  // 입력할 때 마다, 리렌더링 되는데 해결 방법 찾는 중..
  const handleChangeText = e => {
    switch (e.target.name) {
      case 'name':
        if (e.target.value.length > 20) return alert('20글자 이하로 작성해 주세요.');
        nameRef.current = e.target.value;
        break;
      case 'content':
        if (e.target.value.length > 100) return alert('100글자 이하로 작성해 주세요.');
        contentRef.current = e.target.value;
        break;
      case 'editContent':
        if (e.target.value > 100) return alert('100글자 이하로 작성해 주세요.');
        editContentRef.current = e.target.value;
        break;
      default:
        break;
    }
  };

  // 삭제
  const handleDeleteComment = id => setComment(prevComment => prevComment.filter(comment => comment.id !== id));

  /**
   * 수정 완료 버튼
   * @param {*} id 선택한 댓글 item에서 가져온 id
   */
  const handleUpdateComment = id => {
    const updateComment = comment.map(item =>
      item.id === id ? { ...item, content: editContentRef.current, date: formattedDate } : item,
    );
    setComment(updateComment);
    setIsEditing(false);
  };

  // 수정 버튼
  const handleEditToggle = item => {
    setIsEditing(prevId => {
      if (prevId === item.id) {
        // 이미 수정 중인 댓글이면 null을 반환하여 수정 종료
        return null;
      } else {
        // 수정 중인 댓글이 아니면 해당 댓글의 id를 return
        return item.id;
      }
    });

    if (isEditing !== item.id) {
      console.log('text: ', item.content);
      setEditContent(item.content);
    }
  };

  return (
    <>
      <S.Form>
        <S.WriteBox>
          <S.Label>닉네임 :</S.Label>
          <S.Input
            ref={nameRef}
            type="text"
            name="name"
            placeholder="닉네임"
            defaultValue=""
            onChange={handleChangeText}
          />
        </S.WriteBox>
        <S.WriteBox>
          <S.Label>내용 :</S.Label>
          <S.TextArea
            ref={contentRef}
            placeholder="내용"
            name="content"
            defaultValue=""
            maxLength="100"
            onChange={handleChangeText}
          ></S.TextArea>
        </S.WriteBox>
        <S.AddButtonWrap>
          <S.AddButton onClick={handleClickAddComment}>등록</S.AddButton>
        </S.AddButtonWrap>
      </S.Form>
      <div>
        <S.Ul>
          {comment.map(item => (
            <div key={item.id}>
              <S.Li>
                <S.UserIcon src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" />
                <S.LiLabel>
                  <div>{item.name}</div>
                  <div>{item.date}</div>

                  {isEditing === item.id ? (
                    // 수정할 때..
                    <S.UpdateTextArea
                      key={item.id}
                      name="editContent"
                      placeholder="내용"
                      maxLength="100"
                      defaultValue={item.content}
                      onChange={handleChangeText}
                    ></S.UpdateTextArea>
                  ) : (
                    // 수정 안 할 때..
                    <S.AddTextArea value={item.content} disabled></S.AddTextArea>
                  )}
                </S.LiLabel>
              </S.Li>
              {isEditing === item.id ? (
                // 수정 중인 댓글의 경우 수정 완료 버튼 보여줌
                <S.UpdateButtonWrap>
                  <S.DeleteButton onClick={() => handleDeleteComment(item.id)}>삭제</S.DeleteButton>
                  <S.EditButton onClick={() => handleUpdateComment(item.id)}>수정 완료</S.EditButton>
                </S.UpdateButtonWrap>
              ) : (
                // 수정 중이 아닌 경우 수정 버튼 보여줌
                <S.UpdateButtonWrap>
                  <S.DeleteButton onClick={() => handleDeleteComment(item.id)}>삭제</S.DeleteButton>
                  <S.EditButton onClick={() => handleEditToggle(item)}>수정</S.EditButton>
                </S.UpdateButtonWrap>
              )}
            </div>
          ))}
        </S.Ul>
      </div>
    </>
  );
};

export default Comment;
