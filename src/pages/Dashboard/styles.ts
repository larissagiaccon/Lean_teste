import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  max-width: 70rem;
  margin: 4rem auto;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;

const apperButton = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 10rem;
  max-height: 10rem;
  cursor: pointer;
  border-radius: 0.625rem;
  color: var(--white);
  background-color: var(--blue_200);

  &:hover {
    background-color: var(--blue_300);
  }

  button.delete {
    border: 0;
    position: absolute;
    background-color: var(--red_200);
    margin-top: 8.6rem;
    width: 16rem;
    padding: 0.1rem;
    border-radius: 0 0 0.65rem 0.65rem;

    animation: ${apperButton} 1s;
  }

  button.edit {
    border: 0;
    position: absolute;
    background: none;
    color: var(--white);
    margin-left: 13.5rem;
    margin-bottom: 7rem;
    padding: 0.5rem;

    animation: ${apperButton} 1s;
  }
`;

export const Overlay = styled.div`
  background: rgba(33, 121, 181, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: default;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OverlayContainer = styled.div`
  position: relative;
  background-color: var(--white);
  padding: 2rem;
  border-radius: 0.625rem;
  opacity: 1;

  p {
    font-family: 'Lato', sans-serif;
    font-weight: 900;
    color: var(--gray_200);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  button {
    border: 0;
    margin-top: 2rem;
    border-radius: 6rem;
    height: 2.5rem;
    width: 15rem;
    background: var(--blue_200);
    margin-left: 5rem;

    font-size: 1rem;
    font-weight: 700;
    color: var(--white);

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ButtonCloseModal = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: var(--blue_300);
  cursor: pointer;

  svg {
    width: 1.875rem;
    height: 1.875rem;
  }
`;
