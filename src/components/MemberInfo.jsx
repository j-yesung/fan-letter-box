import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isActive, selectedData } from 'modules/fanLetter';

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${props => props.$img});
  background-position: center;
  background-size: cover;
  transition: 0.25s;
  width: 500px;
  height: 300px;
  margin: 20px;
  cursor: pointer;
  filter: ${props => (props.$isActive ? 'grayscale(0)' : 'grayscale(1)')};

  &:hover {
    filter: grayscale(0);
    transform: scale(1.1);
  }
`;

const MemberInfo = () => {
  const fanLetter = useSelector(state => state.fanLetter);
  console.log('fanLetter: ', fanLetter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 민지 디폴트
  useEffect(() => {
    dispatch(isActive('1'));
  }, []);

  const goToContentPage = item => {
    dispatch(isActive(item.id));
    dispatch(selectedData(fanLetter.data[item.id - 1]));
    navigate(`/content/${item.id}`);
  };

  return (
    <>
      {/* Main 컴포넌트 전용 이미지 버튼 */}
      {fanLetter.data.map(item => {
        return (
          <ImgBox
            key={item.id}
            $img={item.img}
            $isActive={fanLetter.isActive === item.id}
            onClick={() => goToContentPage(item)}
          ></ImgBox>
        );
      })}
    </>
  );
};

export default React.memo(MemberInfo);
