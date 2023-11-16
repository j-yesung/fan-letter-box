import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import Comment from 'components/Comment';

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  /* position: fixed; */
  left: 250px;
`;
const ContentImg = styled.img`
  width: 360px;
  height: 500px;
`;
const ContentMemberName = styled.label`
  color: white;
`;

const Content = () => {
  const param = useParams();
  const location = useLocation();
  const groupInfo = { ...location.state };
  console.log('데이터: ', groupInfo);

  // useEffect(() => {
  //   console.log('', getParam);
  // });

  /**
   * 이제 id 값 마다 보여지는 화면 다르게 하기
   * 이름, 이미지 가져오고 댓글 입력 창 만들기
   *
   * TODO : 로컬 스토리지 적용 (useEffect)
   */

  return (
    <>
      <ContentBox>
        <ContentMemberName>{groupInfo.name}</ContentMemberName>
        <ContentImg src={groupInfo.img} />
      </ContentBox>
      <Comment></Comment>
    </>
  );
};

export default Content;
