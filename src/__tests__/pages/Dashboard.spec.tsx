import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Dashboard } from '../../pages/Dashboard';

const mockedAddToast = jest.fn();
const mockedDeleteUser = jest.fn();

const mockedListUsers = [
  {
    id: 'id_joao',
    name: 'João',
    email: 'joao@example.com',
    cpf: '123.456.789-01',
    phone: '(12) 34567-8901',
  },
  {
    id: 'id_carlos',
    name: 'Carlos',
    email: 'carlos@example.com',
    cpf: '234.567.890-12',
    phone: '(23) 45678-9012',
  },
];

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to list all users', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const { getByText } = render(<Dashboard />);

    const userName = getByText('João');

    expect(userName).toBeTruthy();
  });

  it('should be able to list empty', async () => {
    const { getByTestId } = render(<Dashboard />);

    expect(() => getByTestId('user_container')).toThrow(
      'Unable to find an element',
    );
  });

  it('should be able to select user', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const { getAllByTestId } = render(<Dashboard />);

    const containerElement = getAllByTestId('user-container');
    fireEvent.click(containerElement[0]);

    await waitFor(() => {
      expect(containerElement[0]).toHaveStyle(
        'background-color: var(--blue_300)',
      );
    });
  });

  it('should be able to delete user selected', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const containerElement = getAllByTestId('user-container');
    fireEvent.click(containerElement[0]);

    const buttonDelete = getByTestId('user-delete');
    fireEvent.click(buttonDelete);

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should be able to open for editing by the selected user', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const containerElement = getAllByTestId('user-container');
    fireEvent.click(containerElement[0]);

    const buttonEdit = getByTestId('user-edit');
    fireEvent.click(buttonEdit);

    const containerData = getByTestId('user-data');

    await waitFor(() => {
      expect(containerData).toBeInTheDocument();
    });
  });

  it('should be able to open for editing and close the modal', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const { getByTestId, getAllByTestId } = render(<Dashboard />);

    const containerElement = getAllByTestId('user-container');
    fireEvent.click(containerElement[0]);

    const buttonEdit = getByTestId('user-edit');
    fireEvent.click(buttonEdit);

    const containerData = getByTestId('user-data');

    const buttonEditClose = getByTestId('user-edit-close');
    fireEvent.click(buttonEditClose);

    await waitFor(() => {
      expect(containerData).not.toBeInTheDocument();
    });
  });

  it('should be able to edit user', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const { getByTestId, getByText, getAllByTestId } = render(<Dashboard />);

    const containerElement = getAllByTestId('user-container');
    fireEvent.click(containerElement[0]);

    const buttonEdit = getByTestId('user-edit');
    fireEvent.click(buttonEdit);

    const nameField = getByTestId('input-name');
    const emailField = getByTestId('input-email');
    const cpfField = getByTestId('input-cpf');
    const phoneField = getByTestId('input-phone');

    const buttonElement = getByText('Atualizar');

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

  it('should not be able to edit user with cpf already registered', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const { getByTestId, getByText, getAllByTestId } = render(<Dashboard />);

    const containerElement = getAllByTestId('user-container');
    fireEvent.click(containerElement[0]);

    const buttonEdit = getByTestId('user-edit');
    fireEvent.click(buttonEdit);

    const nameField = getByTestId('input-name');
    const emailField = getByTestId('input-email');
    const cpfField = getByTestId('input-cpf');
    const phoneField = getByTestId('input-phone');

    const buttonElement = getByText('Atualizar');

    fireEvent.change(nameField, { target: { value: 'Antônio' } });
    fireEvent.change(emailField, { target: { value: 'antonio@hotmail.com' } });
    fireEvent.change(cpfField, { target: { value: '23456789012' } });
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

  it('should not be able to edit user with invalid data', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return JSON.stringify(mockedListUsers);
    });

    const { getByTestId, getByText, getAllByTestId } = render(<Dashboard />);

    const containerElement = getAllByTestId('user-container');
    fireEvent.click(containerElement[0]);

    const buttonEdit = getByTestId('user-edit');
    fireEvent.click(buttonEdit);

    const nameField = getByTestId('input-name');
    const emailField = getByTestId('input-email');
    const cpfField = getByTestId('input-cpf');
    const phoneField = getByTestId('input-phone');

    const buttonElement = getByText('Atualizar');

    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.change(emailField, { target: { value: 'antonio@hotmailcom' } });
    fireEvent.change(cpfField, { target: { value: '987654321' } });
    fireEvent.change(phoneField, { target: { value: '9876543' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).not.toHaveBeenCalled;
    });
  });
});
