import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'RixInooAriDuriR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/RixInooAriDuriR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  #root {
    display: flex;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    border: 2px solid ${({ theme }) => theme.borderColor};
    gap: 10px;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    font-family: 'RixInooAriDuriR';
  }
  header, footer, main, section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
