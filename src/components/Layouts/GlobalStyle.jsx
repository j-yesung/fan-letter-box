import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #root {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: grid;
    grid-template-columns: 3fr;
    grid-template-rows: 100px auto 50px;
    grid-template-areas: 'header header' 'main main' 'footer footer';
  }
  header, footer, main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyle;
