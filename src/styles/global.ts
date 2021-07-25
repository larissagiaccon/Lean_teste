import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    body {
      -webkit-font-smoothing: antialiased;
    }

    body, input, button {
      font-family: 'Lato', serif;
      font-size: 1rem;
    }

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 300;
    }

    button {
      cursor: pointer;
    }
  }

  html {
    font-size: 100%;

    @media (max-width: 1080px) {
      font-size: 58%;
    }

    @media (max-width: 720px) {
      font-size: 54%;
    }

    @media (max-width: 425px) {
      font-size: 48%;
    }

    @media (max-width: 320px) {
      font-size: 44%;
    }
  }

  :root {
    --red_200: #C53030;
    --red_100: #FDDEDE;

    --green_300: #2E656A;
    --green_100: #E6FFFA;

    --blue_300: #2179b5;
    --blue_200: #40c8f4;
    --blue_100: #EBF8FF;

    --gray_300: #555555;
    --gray_200: #999999;
    --gray_100: #dddcdc;

    --white_gray: #f6f6f6;
    --white: #FFFFFF;
  }
`;
