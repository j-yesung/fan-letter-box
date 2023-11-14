import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as S from './Comment.styled.js';

const Comment = props => {
  const [comment, setComment] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const param = useParams();
  const dataId = parseInt(props.data.groupInfo.id);
  const contentRef = useRef('');
  console.log('param.id: ', parseInt(param.id), dataId, props.data.selectedOption.id);

  useEffect(() => {
    if (dataId === parseInt(param.id)) {
      const savedComment = localStorage.getItem(`comment_${dataId}`);
      if (savedComment) {
        setComment(JSON.parse(savedComment));
      }
    }
  }, [dataId]);

  useEffect(() => {
    localStorage.setItem(`comment_${dataId}`, JSON.stringify(comment));
  }, [comment, dataId]);

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
    if (title.trim() === '' || content.trim() === '') return alert('제목과 내용을 입력해 주세요.');

    if (dataId === parseInt(props.data.selectedOption.id)) {
      const newComment = {
        id: uuidv4(),
        title: title,
        content: content,
        date: formattedDate,
      };

      setComment(prevComment => [...prevComment, newComment]);
      setTitle('');
      setContent('');
    } else {
      return alert('이름 다시 선택해주셈');
    }
  };

  // 인풋 박스 값 가져옴
  const handleChangeInput = useCallback(
    e => {
      console.log('e.target.value: ', e.target.value);
      e.target.name === 'name' ? setTitle(e.target.value) : setContent(e.target.value);
    },
    [setTitle],
  );

  // 수정할 내용 변경
  const handleChangeContent = useCallback(
    e => {
      setContent(e.target.value);
    },
    [setContent],
  );
  // const handleChangeInput = useCallback(
  //   e => {
  //     console.log('e.target.value: ', e.target.value);
  //     e.target.name === 'name' ? setTitle(e.target.value) : setContent(e.target.value);
  //   },
  //   [setTitle, setContent],
  // );

  // 삭제
  const handleDeleteComment = id => setComment(prevComment => prevComment.filter(comment => comment.id !== id));

  /**
   * 수정 중인 댓글 ID 설정
   * @param {*} id 선택한 댓글 item에서 가져온 id
   */
  const handleEditComment = id => {
    setEditCommentId(id);
  };

  /**
   * 수정한 댓글 업데이트
   * @param {*} id 선택한 댓글 item에서 가져온 id
   */
  const handleUpdateComment = id => {
    // const updateComment = comment.map(item => {
    //   return item.id === id ? { ...item, content: content, date: formattedDate } : item;
    // });

    // setComment(updateComment);
    // setEditCommentId(null); // 수정 완료하면 수정 ID 초기화..
    console.log(id, contentRef.current);
  };
  console.log('editCommentId: ', editCommentId);

  const handleInputChange = (id, value) => {
    console.log('id, value: ', id, value);
    // const { value } = e.target;
    // console.log('value: ', value);
    // setNewContent(value);
    // setContent({...content, value})
  };
  // 새로 감지할 내용 state 만들고 얘를 감지해서 기존 content에다가 넣기?

  return (
    <>
      <S.Form>
        <S.WriteBox>
          <S.Label>닉네임 :</S.Label>
          <S.Input type="text" name="name" placeholder="닉네임" value={title} onChange={handleChangeInput} />
        </S.WriteBox>
        <S.WriteBox>
          <S.Label>내용 :</S.Label>
          <S.TextArea placeholder="내용" value={content} maxLength="100" onChange={handleChangeInput}></S.TextArea>
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
                  <div>{item.title}</div>
                  <div>{item.date}</div>

                  {editCommentId === item.id ? (
                    // 수정할 때..
                    // <S.UpdateTextArea placeholder="내용" maxLength="100">
                    //   {item.content}
                    // </S.UpdateTextArea>
                    <S.UpdateTextArea
                      name="editContent"
                      placeholder="내용"
                      maxLength="100"
                      // value={item.content}
                      // onChange={handleChangeContent}
                      onChange={e => handleInputChange(item.id, e.target.value)}
                    ></S.UpdateTextArea>
                  ) : (
                    // 수정 안 할 때..
                    <S.AddTextArea value={item.content} disabled></S.AddTextArea>
                    // <AddTextarea disabled>{item.content}</AddTextarea> // => 이거 에러임
                  )}
                </S.LiLabel>
              </S.Li>
              {editCommentId === item.id ? (
                // 수정 중인 댓글의 경우 수정 완료 버튼 보여줌
                <S.UpdateButtonWrap>
                  <S.DeleteButton onClick={() => handleDeleteComment(item.id)}>삭제</S.DeleteButton>
                  <S.EditButton onClick={() => handleUpdateComment(item.id)}>수정 완료</S.EditButton>
                </S.UpdateButtonWrap>
              ) : (
                // 수정 중이 아닌 경우 수정 버튼 보여줌
                <S.UpdateButtonWrap>
                  <S.DeleteButton onClick={() => handleDeleteComment(item.id)}>삭제</S.DeleteButton>
                  <S.EditButton onClick={() => handleEditComment(item.id)}>수정</S.EditButton>
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
