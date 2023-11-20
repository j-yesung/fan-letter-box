import React from 'react';
import styled from 'styled-components';
import MemberInfo from 'components/MemberInfo';
import Comment from 'components/Comment';
import Select from 'components/Select';

const MainContainer = styled.main`
  margin: 10px;
  transition: 0.25s;
`;
const Section = styled.section`
  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'NanumSquareNeo-Variable';
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  return (
    <>
      <MainContainer>
        <MemberInfo></MemberInfo>
      </MainContainer>
      <Section>
        <Select />
        <Comment />
      </Section>
    </>
  );
};

export default React.memo(Main);
