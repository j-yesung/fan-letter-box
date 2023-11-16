import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as S from './style/Comment.styled.js';
import { useDispatch, useSelector } from 'react-redux';
// import { SelectedContext } from 'context/SelectedContext.js';

// 날짜 포맷팅
const currentDate = new Date();
export const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate
  .getHours()
  .toString()
  .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
  .getSeconds()
  .toString()
  .padStart(2, '0')}`;

const Comment = () => {
  const param = useParams();
  const paramId = isNaN(parseInt(param.id)) ? 1 : parseInt(param.id); // 파라미터 id 값 없으면 1 디폴트
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const nameRef = useRef();
  const contentRef = useRef();
  const editContentRef = useRef();

  const selectedData = useSelector(state => state.fanLetter.selectedData);
  // const dispatch = useDispatch();

  // const { selectedOption } = useContext(SelectedContext); // 셀럭트 옵션 값
  console.log('------------------------- Comment selectedData: ', selectedData);

  // console.log('Comment 렌더링');

  /**
   * 로컬 스토리지 데이터 불러오기
   * 항상 파라미터 ID 기준으로 댓글 목록 보여주기
   */
  useEffect(() => {
    // console.log('------------------------- getItem');
    const savedComment = localStorage.getItem(`comment_${paramId}`);
    if (savedComment) {
      setComment(JSON.parse(savedComment));
    }
  }, [paramId]);

  // 로컬 스토리지 데이터 저장하기
  useEffect(() => {
    // console.log('------------------------- setItem');
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
        date: formattedDate,
        isEditing,
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

  // DELETE
  const handleDeleteComment = id => setComment(prevComment => prevComment.filter(comment => comment.id !== id));
  /**
   * EDIT SUCCESS BUTTON
   * @param {*} id 선택한 댓글 item에서 가져온 id
   */
  const handleUpdateComment = id => {
    const updateComment = comment.map(item =>
      item.id === id ? { ...item, content: editContentRef.current.value, date: formattedDate } : item,
    );
    setComment(updateComment);
    setIsEditing(false);
  };

  // EDIT BUTTON
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
              placeholder="닉네임"
              defaultValue=""
              onChange={handleChangeText}
            />
          </S.TEXT_BOX>
          <S.TEXT_BOX>
            <S.Label>내용 :</S.Label>
            <S.TextArea
              ref={contentRef}
              placeholder="내용"
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

                {isEditing === item.id ? (
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
                  // 수정 안 할 때..
                  <S.AddTextArea value={item.content} disabled></S.AddTextArea>
                )}
              </S.LiLabel>
              {isEditing === item.id ? (
                // 수정 중인 댓글의 경우 수정 완료 버튼 보여줌
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
                // 수정 중이 아닌 경우 수정 버튼 보여줌
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
