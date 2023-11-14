import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    background: #ffffff;
    gap: 10px;
    width: 100%;
    height: 100wv;
    flex-direction: column
  }
  header, footer, main, section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyle;
