import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { SignUp } from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to sign up', async () => {
    const { getByTestId, getByText } = render(<SignUp />);

    const nameField = getByTestId('input-name');
    const emailField = getByTestId('input-email');
    const cpfField = getByTestId('input-cpf');
    const phoneField = getByTestId('input-phone');

    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'Antônio' } });
    fireEvent.change(emailField, { target: { value: 'antonio@hotmail.com' } });
    fireEvent.change(cpfField, { target: { value: '98765432109' } });
    fireEvent.change(phoneField, { target: { value: '98765432109' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to sign up with cpf already registered', async () => {
    const { getByTestId, getByText } = render(<SignUp />);

    const nameField = getByTestId('input-name');
    const emailField = getByTestId('input-email');
    const cpfField = getByTestId('input-cpf');
    const phoneField = getByTestId('input-phone');

    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'Antônio' } });
    fireEvent.change(emailField, { target: { value: 'antonio@hotmail.com' } });
    fireEvent.change(cpfField, { target: { value: '98765432109' } });
    fireEvent.change(phoneField, { target: { value: '98765432109' } });

    fireEvent.change(nameField, { target: { value: 'Antônio' } });
    fireEvent.change(emailField, { target: { value: 'antonio@hotmail.com' } });
    fireEvent.change(cpfField, { target: { value: '98765432109' } });
    fireEvent.change(phoneField, { target: { value: '98765432109' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should not be able to sign up with invalid data', async () => {
    const { getByTestId, getByText } = render(<SignUp />);

    const nameField = getByTestId('input-name');
    const emailField = getByTestId('input-email');
    const cpfField = getByTestId('input-cpf');
    const phoneField = getByTestId('input-phone');

    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.change(emailField, { target: { value: 'invalid@hotmailcom' } });
    fireEvent.change(cpfField, { target: { value: '987654321' } });
    fireEvent.change(phoneField, { target: { value: '9876543' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).not.toHaveBeenCalled;
    });
  });

  it('should be able to go dashboard with click in button login', async () => {
    const { getByText } = render(<SignUp />);

    const buttonElement = getByText('Login');

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalled;
    });
  });
});
