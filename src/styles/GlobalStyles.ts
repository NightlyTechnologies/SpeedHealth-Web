import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
  }
  *, button, input {
    border: 0;
    outline: 0;
    background: none;
    font-family: "Ubuntu" ,sans-serif;
  }
  button {
    user-select: none;
  }
  :root {
    --black: #000000;
    --white: #FFFFFF;
    --gray: #BEBEBE;
    --red: #ff0000;
    --primary: #22DAAE;
    --secundary: #95EFA9;
  }
  @media (min-width: 1500px) {
    html {
      font-size: 80%;
    }
  }
  @media (max-width: 1024px) {
    html {
      font-size: 40%;
    }
  }
  @media (max-width: 700px) {
    html {
      font-size: 30%;
    }
  }
`;