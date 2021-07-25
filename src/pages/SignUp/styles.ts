import styled, { css, keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.jpg';

interface ContentProps {
  isSubmit: boolean;
}

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const apperFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-3.125rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Background = styled.div`
  flex: 1;
  animation: ${apperFromLeft} 1s;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    background-color: var(--blue_200);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }

  &:hover::after {
    background-color: #2179b5;
  }
`;

const apperFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(3.125rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  animation: ${apperFromRight} 1s;

  form {
    h1 {
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      font-size: 2rem;
      margin-bottom: 3rem;
    }

    p {
      font-family: 'Lato', sans-serif;
      font-weight: 900;
      color: var(--gray_200);
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    div.buttons {
      display: flex;
      margin-top: 3rem;
      justify-content: space-between;

      flex-direction: row;

      button.cadastrar {
        border: 0;
        border-radius: 6rem;
        height: 2.5rem;
        width: 15rem;

        font-size: 1rem;
        font-weight: 700;

        ${props =>
          props.isSubmit
            ? css`
                color: var(--gray_100);
                background: var(--white_gray);
              `
            : css`
                color: var(--white);
                background: var(--blue_200);
              `}

        &:hover {
          opacity: 0.7;
        }
      }

      button.login {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 1rem;
        border: 0;
        background: none;

        color: var(--gray_200);
        font-size: 1rem;
        font-weight: 500;

        svg {
          margin-left: 0.5rem;
          color: var(--gray_300);
        }
      }
    }
  }
`;
