import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CommonContext } from 'context/CommonContext';
import { SelectedContext } from 'context/SelectedContext';

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
  const data = useContext(CommonContext);
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const { setSelectedOption } = useContext(SelectedContext); // 셀럭트 옵션 값

  // 민지 디폴트
  useEffect(() => {
    setActiveId('1');
  }, []);

  const goToContentPage = item => {
    setActiveId(item.id);
    setSelectedOption(data[item.id - 1]);
    navigate(`/content/${item.id}`);
  };
  return (
    <>
      {/* Main 컴포넌트 전용 이미지 버튼 */}
      {data.map(item => {
        return (
          <ImgBox
            key={item.id}
            $img={item.img}
            $isActive={activeId === item.id}
            onClick={() => goToContentPage(item)}
          ></ImgBox>
        );
      })}
    </>
  );
};

export default React.memo(MemberInfo);
