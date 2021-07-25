import styled, { css } from 'styled-components';

import { Tooltip } from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red_200);
    `}

  ${props =>
    props.isFocused
      ? css`
          color: var(--gray_300);
        `
      : css`
          color: var(--white_gray);
        `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--white_gray);
    `}

  input {
    flex: 1;
    background: transparent;
    width: 25rem;
    border-width: 0 0 0.063rem;
    border-bottom-color: var(--white_gray);
  }
`;

export const Error = styled(Tooltip)`
  height: 1.25rem;
  margin-left: 1rem;

  svg {
    margin: 0;
  }
`;
