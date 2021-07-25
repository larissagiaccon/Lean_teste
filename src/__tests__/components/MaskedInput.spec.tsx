import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MaskedInput } from '../../components/MaskedInput';

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

describe('MaskedInput Component', () => {
  it('should be able to render a masked input', async () => {
    const { getByTestId } = render(
      <MaskedInput name="cpf" mask="999.999.999-99" data-testid="input-cpf" />,
    );

    expect(getByTestId('input-cpf')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByTestId } = render(
      <MaskedInput name="cpf" mask="999.999.999-99" data-testid="input-cpf" />,
    );

    const inputElement = getByTestId('input-cpf');
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
