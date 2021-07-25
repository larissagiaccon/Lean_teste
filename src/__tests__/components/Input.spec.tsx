import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Input } from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'name',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to render a input', async () => {
    const { getByTestId } = render(
      <Input name="name" data-testid="input-name" />,
    );

    expect(getByTestId('input-name')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByTestId } = render(
      <Input name="name" data-testid="input-name" />,
    );

    const inputElement = getByTestId('input-name');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: var(--gray_300)');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: var(--white_gray)');
    });
  });
});
