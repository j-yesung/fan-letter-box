import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberInfo from 'components/MemberInfo';
import Comment from 'components/Layouts/Comment';
import { useLocation } from 'react-router-dom';

const MainBox = styled.main`
  margin: 10px;
  /* position: relative; */
  transition: 0.25s;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  // console.log('Main 렌더링');
  const location = useLocation();
  const groupInfo = { ...location.state };
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  // 딱 한 번만 실행됨
  useEffect(() => {
    const jsonUrl = '/fakeData.json';

    const fetchData = async () => {
      try {
        const response = await fetch(jsonUrl);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData.data); // 데이터를 state에 설정
        }
      } catch (error) {
        console.error('Error : ', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = e => {
    const selectedName = e.target.value;
    const selectedData = data.find(item => item.name === selectedName);
    // console.log('selectedName: ', selectedName, selectedData);

    if (selectedName === '') return alert('이름을 선택해 주세요.');
    setSelectedOption(selectedData);
  };
  // console.log(selectedOption);

  return (
    <>
      <MainBox>
        <MemberInfo data={data}></MemberInfo>
      </MainBox>
      <Section>
        <select onChange={handleSelectChange}>
          <option value="">선택하셈</option>
          {data.map(item => {
            return <option key={item.id}>{item.name}</option>;
          })}
        </select>
        <Comment data={{ selectedOption, groupInfo }}></Comment>
      </Section>
    </>
  );
};

export default Main;
